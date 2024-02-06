import Input from "./Input";
import SendButton from "./SendButton";

interface InputSendProps{
    prompt:string;
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    onClick:(e:React.FormEvent)=>void
}
export default function InputSend({
prompt,
placeholder,
onChange,
onClick
}:InputSendProps) {
  return (
    <div className="flex w-full mt-2">
    <Input
      value={prompt}
      placeholder={placeholder}
      onChange={onChange}
    />
    <SendButton onClick={onClick} disabled={prompt === ""} />
  </div>
  )
}
