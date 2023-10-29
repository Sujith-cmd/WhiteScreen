import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.PNG'
import axios from 'axios'


const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
    
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log(formData);
    try {
      setLoading(true)
      setError(false)
      let result=axios
      .post("http://localhost:5000/api/users/signup", {
        ...formData
      })
      .then(response=> {
     
       console.log(response.data,response.status,response.statusText);
       setError(false)
      }).catch(error=>{
        console.log(error);
        setError(true)
      });
      
      
      setLoading(false)
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      setError(true)
    }
   
  };
    
  
  return (
    <div className='max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7 text-amber-500'>SignUp</h1>
      <div className='flex  gap-9 mt-4 box1 ' >
        <span>

      <img src={logo} alt="" className=''/>
        </span>
        <span>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-1'>
        <input type="text" placeholder='Enter name' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="email" placeholder='Enter email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Enter password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
      <button  disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Loading':'SignUp'}</button>
      </form>
        </span>
      </div>
      <div className='flex gap-2 justify-center text-1xl'>
        <p className='text-white'>Have an account?</p>
        <Link to="/signin">
          <span className='text-amber-500'>SignIn</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'something went wrong'}</p>
    </div>
  )
}
export default SignUp