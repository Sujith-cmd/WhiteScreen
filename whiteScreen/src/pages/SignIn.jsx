import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import logo from '../assets/images/logo.PNG'
import axios from 'axios'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
useDispatch
const SignIn = () => {
  const [formData, setFormData] = useState({})
  const {loading,error}=useSelector((state)=> state.user)
const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
    
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log(formData);
    try {
      dispatch(signInStart())
      // setError(false)

      let result=axios
      .post("http://localhost:5000/api/users/login", {
        ...formData
      })
      .then(response=> {
     
       console.log(response.data.rest,response.status,response.statusText);
       dispatch(signInSuccess(response.data.rest))
       navigate('/')
       
       
      }).catch(error=>{
        console.log(error);
        dispatch(signInFailure(error))
        
        return
      });
      
      
      
    } catch (error) {
      dispatch(signInFailure(error))
      
    }
   
  };
    
  
  return (
    <div className='max-w-xl mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-amber-500 uppercase'>Sign In</h1>
      <div className='flex  gap-9 box1 ' >
        <span>

      <img src={logo} alt="" className=''/>
        </span>
        <span>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-1'>
        <input type="email" placeholder='Enter email' id='email' className='bg-slate-100 p-3 w-80 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Enter password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
      <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading':'SignIn'}</button>
       <OAuth/>
      </form>
        </span>
      </div>
      <div className='flex gap-2 justify-center text-1xl'>
        <p className='text-white'>Dont have an account?</p>
        <Link to="/signup">
          <span className='text-amber-500'>SignUp</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error ? error.message|| 'something went wrong':""}</p>
    </div>
  )
}
export default SignIn