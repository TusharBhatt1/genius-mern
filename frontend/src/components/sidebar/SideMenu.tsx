import {Link, useLocation} from "react-router-dom";
// import { useParams, usePathname, useSearchParams } from "next/navigation";


interface SideMenuProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

export default function SideMenu({
  label,
  icon,
  color,
  href,

 
}: SideMenuProps) {

  const params=useLocation()
 
  return (
    <div>
    <Link
      to={href}
     
      className={`${params.pathname===href  && "bg-slate-800"} w-full md:w-[18vw] flex items-center gap-4 hover:bg-slate-800 p-4 rounded-full`}
    >
      <span className={`text-3xl text-${color}`}>{icon}</span>
      <span className="w-full">{label}</span>
    </Link>
    </div>
  );
}

