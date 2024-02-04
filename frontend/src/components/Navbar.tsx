import logo from  "../assets/logo.png"
import { Link } from 'react-router-dom'
import Myphoto from "../assets/my.webp"

export default function Navbar() {
  return (
    <div className='shadow-md p-3 px-14 bg-white flex justify-between items-center'>
      <Link to="/" className='flex items-center gap-2 cursor-pointer'>
        <img src={logo} alt='Genius' className="h-10 w-10"/>
        <span className='font-bold'>Genius</span>
      </Link>
      <a href="https://new-portfolio-theta-jade.vercel.app/" target="_blank">
        <img src={Myphoto} className="h-12 w-12 rounded-full" />
      </a>
    </div>
  )
}
