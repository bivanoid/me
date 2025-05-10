import './App.css';
import React, { useState } from 'react';
import Introduction from './components/introduction';
import Navigation from './components/navigation';
import AboutMe from './components/aboutme';
import Form from './components/form';
import Footer from './components/footer';
import PopupImage from './components/popupimage';
// import popupImage from './popupimage';

function App() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };
  return (  
    <div className='body'>
      <Navigation/>
      <PopupImage imageUrl={fullscreenImage} onClose={closeFullscreen} />
      <div id='thecontent'>
        <Introduction/>
        <AboutMe onImageClick={handleImageClick} />
        
        <Form/>
        <Footer/>
      </div>
    </div>

  )
}

export default App;