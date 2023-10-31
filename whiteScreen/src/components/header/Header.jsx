import React from 'react'
import logo from "../../assets/images/logo.PNG"
import "./Header.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const currentUser=useSelector((state)=>state.user)
  return (
    <div className='bg-sky-950 py-0 max-h-20' >
        <div className='flex flex-row justify-between py-0 navItems'>
           <Link to="/">
            <img className=' max-h-16' src={logo} alt="logo" />
           </Link>

<ul className='text-white flex gap-11 mx-20 '>
   <Link to="/">
    <li>Home</li>
   </Link>
   
   <Link to="/signin">
    <li >Sign In</li>
   </Link>
   <Link to="/profile">
    {currentUser ? (<li> <img  src={currentUser.displayPicture} alt="pic" className='w-5 h-5 rounded-full object-cover'/></li>) : (<li className="text-blue-500">Sign In</li>)}
   </Link>
   
   </ul>
 </div>
 </div>
        
  )
}

export default Header

