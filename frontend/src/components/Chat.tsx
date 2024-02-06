import { FiEye, FiUser } from "react-icons/fi";
import { ChatProps } from "../pages/CodeGeneration";
import logo from "../assets/logo.png";
import CopyText from "./CopyText";
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
  return (
    <div className="flex flex-col">
      {chats.map((chat, index) => (
        <div key={index} className="flex flex-col gap-4 mt-12">
          <>
            {chat.user && (
              <p className="flex items-start gap-3">
                <FiUser size={18} />
                {chat.user}
              </p>
            )}
          </>

          <>
            {chat.genius &&
              (isText ? (
                <div className="flex gap-2 items-start">
                  <img src={logo} height={18} width={18} alt="Genius" />
                  <p className="flex flex-col gap-2">
                    <span className="bg-slate-100 p-2 rounded-xl mr-4">
                      <Markdown>{chat.genius}</Markdown>
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
