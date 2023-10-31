
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { updateUserStart,updateUserSuccess,updateUserFailure } from '../redux/user/userSlice';


export default function Profile() {
  const fileRef=useRef(null)
  const [image, setImage]=useState(undefined)
  const [formData, setformData]=useState({})
  const [imagePercent, setImagePercent]=useState(0)
  const [imageError, setImageError]=useState(false)
  const dispatch=useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  
  useEffect(()=> {
    if(image) {
      console.log(image);
      handleFileUpload(image)
    }
  },[image])
  const handleFileUpload =async(image)=>{
    const storage = getStorage(app)
    const filename= new Date().getTime() + image.name;
    const storageRef=ref(storage, filename);
    const uploadTask= uploadBytesResumable(storageRef,image);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred /
      snapshot.totalBytes) * 100;
      setImagePercent(Math.round(progress))
    },
    
    (error) => {
     setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setformData({...formData,profilePicture:downloadURL})
      })
    }
    )
  }
  const handleChange = (e)=>{
    setformData({...formData,[e.target.id]:e.target.value})
    console.log(formData);
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(updateUserStart())
    try {
      axios.post(`http://localhost:5000/api/users/update/${currentUser._id}`, {
        ...formData
      })
      .then(response=> {
     
       console.log(response.data.rest,response.status,response.statusText);
       dispatch(updateUserSuccess(response.data.rest))
       navigate('/')
       
       
      }).catch(error=>{
        console.log(error);
        dispatch(updateUserFailure(error))
        
        return
      });
    } catch (error) {
      console.log(error);
      dispatch(updateUserFailure(error))
    }
  }
  return (
   

   
  
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>
        setImage(e.target.files[0])}/>
        {/* allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
        <img
          src={currentUser.displayPicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
        onClick={()=> fileRef.current.click()} />
        <p className='text-sm self-center'>
          {imageError ? (<span className='text-red-700'>Error uploading Image</span>)
           : imagePercent > 0 && imagePercent<100 ?(<span className='text-green-700'>{`uploading image ${imagePercent} %`}</span>):imagePercent===100?(<span className='text-green-700'>Uploaded</span>):''
          }
        </p>
        <input
          defaultValue={currentUser.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3' onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3' onChange={handleChange}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'  onChange={handleChange}
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
    </div>
    
  );
}