import React from 'react'
import logo from "../../assets/images/logo.PNG"
import "./Header.css"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='bg-sky-950 py-0' >
        <div className='flex flex-row justify-between py-0 navItems'>
           <Link to="/">
            <img className='logo' src={logo} alt="logo" />
           </Link>

<ul className='text-white flex gap-11 mx-20 '>
   <Link>
    <li>Home</li>
   </Link>
   <Link>
    <li>Profile</li>
   </Link>
   <Link>
    <li>About</li>
   </Link>
</ul>
        </div>
       
        </div>
  )
}

export default Header