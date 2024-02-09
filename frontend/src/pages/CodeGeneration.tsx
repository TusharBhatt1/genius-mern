import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import Processing from "../components/Processing";
import Chat from "../components/Chat";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useChats from "../hook/useChats";
import InputSend from "../components/InputSend";

export interface ChatProps {
  user: string | null;
  genius: string | null;
}

export default function CodeGeneration() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const [showCopiedText, setCopiedText] = useState(false);
  const [isError, setIsError] = useState(false);
  const { allChats, OnSetAllChats, onAddCodeChat } = useChats();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);
    setIsError(false);

    allChats.codeChats = [...allChats.codeChats, { user: prompt, genius: "" }];

    setPrompt("");

    try {
      const response = await fetch("https://genius-be.onrender.com/getCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const resultData = await response.json();
      if (resultData.success === false) {
        alert("API LIMIT EXCEEDED");
        return;
      }
      allChats.codeChats[allChats.codeChats.length - 1].genius =
        resultData.responseText;

      onAddCodeChat(allChats.codeChats);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      console.error("Error:", error);
      setIsError(true);
    } finally {
      setIsProcessing(false);
    }
  };
  const fetchChats = async () => {
    try {
      const response = await fetch("https://genius-be.onrender.com/getChats", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedChats = await response.json();

      // Update the component state with the fetched chats
      OnSetAllChats(fetchedChats);
    } catch (error) {
      // Handle errors if needed
      console.error("Error fetching chats:", error);
    } finally {
      setIsFetchingChats(false);
    }
  };
  useEffect(() => {
    if (
      allChats.codeChats[0].user === null &&
      allChats.imageChats[0].user === null
    ) {
      setIsFetchingChats(true);
      fetchChats();
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isProcessing, onAddCodeChat, allChats]);

  return (
    <form onSubmit={handleSend}>
      <div className="flex flex-col  justify-between h-[85vh] md:h-full overflow-hidden w-[100vw] md:w-[80vw] p-5 py-7">
        <div className="flex items-center  gap-2 text-slate-400">
          <img src={logo} height={18} width={18} alt="Genius" />
          <span> Generate or Translate code </span>
          {isFetchingChats && (
            <span className="animate-spin text-black">
              <CgSpinnerTwoAlt size={18} />
            </span>
          )}
        </div>
        <div
          ref={chatContainerRef}
          className="w-[100vw] md:w-full  max-h-[70vh] overflow-y-auto p-1 md:p-0"
        >
          <Chat
            chats={allChats.codeChats}
            isText
            setCopiedText={setCopiedText}
          />

          <Processing isProcessing={isProcessing} isError={isError} />
        </div>
        <div>
          {showCopiedText && (
            <span className=" absolute top-1/2 right-1/2 bg-slate-200 text-black p-2 rounded-xl">
              Copied!
            </span>
          )}
          <InputSend
            placeholder="custom hook in react"
            prompt={prompt}
            onClick={handleSend}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
