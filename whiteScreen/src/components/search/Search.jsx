import React from 'react'

const Search = () => {
  return (
    
        <div className='flex bg-white p-2 justify-center'>
            <form className='flex  items-center gap-4'>
        <div className='flex '>

        <div className='flex items-center'><span className='m-1'>Location</span><input className='rounded-lg bg-slate-300 h-7' type="text" /></div>
        <div className='flex items-center'><span className='m-1'>Seats</span><input className='rounded-lg bg-slate-300 h-7' type="number" /></div>
        </div>
        <div className='mx-2'>
        <input className='mx-1' type="radio"  name="station" /> Theatre
        <input className='mx-1' type="radio"  name="station" /> Game
        
      </div>   
      <button className='bg-sky-950 p-1 rounded-lg text-white w-24'>Search</button>
            </form>
        </div>
    
  )
}

export default Search