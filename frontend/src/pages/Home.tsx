import {
  FaCode,
  FaLink,
  FaBrain,
  FaSearch,
  FaImages,
  FaRocket,
} from "react-icons/fa";
import Intro from "../components/Intro";

export default function Home() {
  return (
    <div className="w-full flex p-12">
      <div>
        <div className="flex items-center">
          <div className="flex flex-col gap-7 md:gap-20">
            <p className="text-lg">
              <span className="text-2xl font-bold">Genius </span> an AI-powered
              app built with MERN Stack.
            </p>
            <Intro />
            <div className="flex gap-2 items-center text-blue-700 font-bold">
              <FaCode />
              Engineered by{" "}
              <a
                href="https://new-portfolio-theta-jade.vercel.app/"
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tushar Bhatt <FaLink />
              </a>{" "}
              <FaCode />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-7 text-center">
            <div className="flex items-center gap-2 text-green-500 shadow-md p-3 md:p-7 rounded-lg">
              <FaBrain size={20} />
              <span className="font-bold">Smart Answers</span>
            </div>
            <div className="flex items-center gap-2 text-blue-500 shadow-md p-3 md:p-7 rounded-lg">
              <FaSearch size={20} />
              <span className="font-bold">Search Engine</span>
            </div>
            <div className="flex items-center gap-2 text-purple-500 shadow-md p-3 md:p-7 rounded-lg">
              <FaImages size={20} />
              <span className="font-bold">Image Responses</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500 shadow-md p-3 md:p-7 rounded-lg">
              <FaRocket size={20} />
              <span className="font-bold">Fast & Efficient</span>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}
