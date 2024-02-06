import React from "react";

interface InputProps{
    placeholder:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    value:string
}

export default function Input({placeholder,onChange,value}:InputProps) {
  return (
    <div className="w-full">
        <input value={value} className="border border-black w-full rounded-full p-2 py-5" placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}
