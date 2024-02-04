import { uniquePoints } from "../assets/UniquePoints";
import { BiCheck } from "react-icons/bi";

export default function Intro() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg">What makes it unique</p>
      {uniquePoints.map((point, index) => (
        <div key={index} className="flex items-center gap-2">
          <BiCheck size={20} color="#4CAF50" />
          <span>{point}</span>
        </div>
      ))}
    </div>
  );
}
