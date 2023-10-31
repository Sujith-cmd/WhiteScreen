import React from 'react'

import '../css/Home.css'
import Search from '../components/search/Search';
import SignUps from '../components/signUps/SignUps';
const Home = () => {
  return (
    <>
    <Search/>
    <div className="hero-container">
      <img
        className="hero-image h-96"
        src="https://www.onmanorama.com/content/dam/mm/en/entertainment/entertainment-news/images/2022/9/15/eesho-jaffer-idukki.jpg.transform/845x440/image.jpg" // Replace with the path to your image file
        alt="Hero"
        />
      <div className="hero-content">
        <h1>Streaming Soon</h1>
        <p>Discover Amazing Experience Near You</p>
        {/* Add more content as needed */}
      </div>
    </div>
    {/* <SignUps/> */}
        </>
  );
}
export default Home