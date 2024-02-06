// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";

interface CopyTextProps{
    chat:string;
    setCopiedText:(value:boolean)=>void
}

export default function 
CopyText({chat,setCopiedText}:CopyTextProps) {
  return (
    <CopyToClipboard text={chat || ""}>
    <button
      type="button"
      onClick={() => {
        setCopiedText(true);
        setTimeout(() => {
          setCopiedText(false);
        }, 1000);
      }}
      className="text-blue-500 rounded-full"
    >
      <FiCopy className="hover:text-blue-700 " />
    </button>
  </CopyToClipboard>
  )
}
