import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import SendButton from "../components/SendButton";

import logo from "../assets/logo.png";
import Processing from "../components/Processing";
import Chat from "../components/Chat";

interface ChatProps {
  user: string | null;
  genius: string | null;
}

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);

  const [chats, setChats] = useState<ChatProps[]>([
    {
      user: "",
      genius: "",
    },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsProcessing(true);
    setIsError(false);
    let updatedChats: ChatProps[] = [...chats];
    updatedChats = [...updatedChats, { user: prompt, genius: "" }];

    setChats(updatedChats);

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

      setChats(updatedChats);
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
      setChats(fetchedChats.imageChats);
    } catch (error) {
      // Handle errors if needed
      console.error("Error fetching chats:", error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <form onSubmit={handleSend}>
      <div className="flex flex-col  justify-between h-full w-[100vw] md:w-[80vw] py-7 p-5">
        <div
          ref={chatContainerRef}
          className="w-full max-h-[70vh] overflow-y-auto"
        >
          <p className="flex items-center  gap-2">
            <img src={logo} height={18} width={18} alt="Genius" />
            Get any image with just a prompt !
          </p>
          <Chat chats={chats} isText={false} />
          <Processing isProcessing={isProcessing} isError={isError} />
        </div>

        <div className="flex w-full">
          <Input
            value={prompt}
            placeholder="a red color car"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <SendButton onClick={handleSend} disabled={prompt === ""} />
        </div>
      </div>
    </form>
  );
}
