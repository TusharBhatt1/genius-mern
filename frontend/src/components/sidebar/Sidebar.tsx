import { useState } from "react";
import SideMenu from "./SideMenu";
import { CiHome } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { BiCode } from "react-icons/bi";
import { IoClose, IoMenuSharp } from "react-icons/io5";

export default function Sidebar() {
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <>
      <div className="bg-black hidden shadow-md  md:flex flex-col justify-start items-start gap-4 p-1 z-20  text-white h-[90.5vh] w-[25vw] py-12">
        <SideMenu
          label="Home"
          icon={<CiHome size={18} />}
          color={"white"}
          href={"/"}
        />
        <SideMenu
          label="Code Translator"
          icon={<BiCode size={18} />}
          color={"pink-400"}
          href={"/code"}
        />
        <SideMenu
          label="Image Generation"
          icon={<CiImageOn size={18} />}
          color={"blue-400"}
          href={"/image"}
        />
      </div>

      {/* mobile view */}
      <div>
        {!showSideBar && (
          <button
            onClick={() => setShowSideBar(true)}
            className="absolute right-2 top-18 md:hidden "
          >
            <IoMenuSharp size={28} />
          </button>
        )}
        {showSideBar && (
          <div className="bg-black flex h-[91vh] w-full absolute md:hidden flex-col justify-start items-start p-1 text-white  py-12">
            <div
              className="flex flex-col gap-4 px-4 w-full"
              onClick={() => setShowSideBar(false)}
            >
              <IoClose size={18} className="mb-4" />

              <SideMenu
                label="Home"
                icon={<CiHome size={18} />}
                color={"white"}
                href={"/"}
              />
              <SideMenu
                label="Code Translator"
                icon={<BiCode size={18} />}
                color={"pink-400"}
                href={"/code"}
              />
              <SideMenu
                label="Image Generation"
                icon={<CiImageOn size={18} />}
                color={"blue-400"}
                href={"/image"}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
