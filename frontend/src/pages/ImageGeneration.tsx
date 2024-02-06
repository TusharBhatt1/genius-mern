import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import Processing from "../components/Processing";
import Chat from "../components/Chat";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import useChats from "../hook/useChats";
import InputSend from "../components/InputSend";

interface ChatProps {
  user: string | null;
  genius: string | null;
}

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetchingChats, setIsFetchingChats] = useState(false);
  const { allChats, onAddImageChat, OnSetAllChats } = useChats();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);
    setIsError(false);
    let updatedChats: ChatProps[] = [...allChats.imageChats];
    updatedChats = [...updatedChats, { user: prompt, genius: "" }];

    onAddImageChat(updatedChats);

    setPrompt("");

    try {
      const response = await fetch("https://genius-be.onrender.com/getImage", {
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
      updatedChats[updatedChats.length - 1].genius = resultData.url;

      onAddImageChat(updatedChats);
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

      OnSetAllChats(fetchedChats);
    } catch (error) {
      console.error("Error fetching chats:", error);
      setIsError(true);
    } finally {
      setIsFetchingChats(false);
      setIsProcessing(false)
    }
  };
  useEffect(() => {
    if (
      allChats.codeChats[0].user === null &&
      allChats.imageChats[0].user === null
    ) {
      setIsProcessing(true)
      setIsFetchingChats(true);
      fetchChats();
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [isProcessing, onAddImageChat, allChats]);

  return (
    <form onSubmit={handleSend}>
      <div className="flex flex-col  justify-between h-full w-[100vw] md:w-[80vw] py-7 p-5">
        <div
          ref={chatContainerRef}
          className="w-full max-h-[70vh] p-4 overflow-y-auto"
        >
          <div className="flex items-center   gap-2 text-slate-400">
            <img src={logo} height={18} width={18} alt="Genius" />
            <span> Get any image with just a prompt</span>
            {isFetchingChats && (
              <span className="animate-spin">
                <CgSpinnerTwoAlt />
              </span>
            )}
          </div>
          <Chat chats={allChats.imageChats} isText={false} />
          <Processing isProcessing={isProcessing} isError={isError} />
        </div>

        <InputSend
          placeholder="The Indian Flag"
          prompt={prompt}
          onClick={handleSend}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
    </form>
  );
}
