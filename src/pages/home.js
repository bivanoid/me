import '../App.css';
import React, { useState } from 'react';
import Introduction from '../components/introduction';
import AboutMe from '../components/aboutme';
import Form from '../components/form';
import Footer from '../components/footer';
import Navigation from '../components/navigation'
import PopupImage from '../components/popupimage';
// import popupImage from './popupimage';

export default function Home() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };
  return (  
    <div className='body'>
      <Navigation  />
      <PopupImage imageUrl={fullscreenImage} onClose={closeFullscreen} />
      <div id='thecontent'>
        <Introduction/>
        
        <AboutMe onImageClick={handleImageClick} />
        <Footer/>
      </div>
    </div>

  )
}

