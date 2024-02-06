import { IoSend } from "react-icons/io5";

interface ButtonProps {
  onClick: (e:React.FormEvent) => void;
  disabled: boolean;
}

export default function SendButton({ onClick, disabled }: ButtonProps) {
  return (
    <button
      type="submit"
      className={`px-4 py-2 rounded-full ${disabled ? "text-green-300" : "text-green-500 hover:bg-slate-100"}`}
      onClick={onClick}
      disabled={disabled}
    >
      <IoSend size={22} />
    </button>
  );
}
