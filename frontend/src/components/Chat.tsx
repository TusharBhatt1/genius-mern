import { FiEye } from "react-icons/fi";
import { ChatProps } from "../pages/CodeGeneration";
import logo from "../assets/logo.png";
import CopyText from "./CopyText";
import { FaUser } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Markdown from "https://esm.sh/react-markdown@9";

interface ChatWindowProps {
  chats: ChatProps[];
  setCopiedText?: (value: boolean) => void;
  isText: boolean;
}
export default function Chat({
  chats,
  setCopiedText=()=>{},
  isText,
}: ChatWindowProps) {

  if(chats.length===0) return <p className="text-slate-400 mt-7 text-xs">No chat here</p>
  return (
    <div className="flex flex-col w-full">
      {chats.map((chat, index) => (
        <div key={index} className="flex flex-col gap-4 mt-12">
          <>
            {chat.user && (
              <p className="flex items-start gap-3">
                <FaUser size={18} />
                {chat.user}
              </p>
            )}
          </>

          <>
            {chat.genius &&
              (isText ? (
                <div className="flex w-full gap-2 items-start">
                  <img src={logo} height={18} width={18} alt="Genius" />
                  <p className="flex flex-col gap-2">
                    <span className="bg-slate-100 w-full p-2 flex flex-wrap rounded-xl mr-4 px-2">
                      <Markdown className="max-w-[80vw] overflow-x-auto flex flex-col gap-1">{chat.genius}</Markdown>
                    </span>

                    <CopyText
                      chat={chat.genius}
                      setCopiedText={setCopiedText}
                    />
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 items-start">
                  <img src={logo} height={18} width={18} alt="Genius" />
                  <div className="cursor-pointer">
                    <a
                      href={chat.genius}
                      target="_blank"
                      className="flex gap-2"
                    >
                      <img
                        className="hover:cursor"
                        src={chat.genius}
                        alt="data"
                        height={120}
                        width={120}
                      />

                      <button
                        type="button"
                        className="text-blue-500 rounded-full"
                      >
                        <FiEye className="hover:text-blue-700 " />
                      </button>
                    </a>
                  </div>
                </div>
              ))}
          </>
        </div>
      ))}
    </div>
  );
}
