import React, { useState, useEffect } from 'react';
import '../App.css';
import '../styles/home/home.css';

import Introduction from '../components/introduction';
import AboutMe from '../components/aboutme';
import Form from '../components/form';
import Footer from '../components/footer';
import Navigation from '../components/navigation';
import PopupImage from '../components/popupimage';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollSmoother from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollSmoother);

export default function Home() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setFullscreenImage(imageUrl);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };



// useEffect(() => {
//   const lenis = new Lenis()

//   function raf(time) {
//     lenis.raf(time)
//     requestAnimationFrame(raf)
//   }

//   requestAnimationFrame(raf)

//   return () => lenis.destroy()
// }, []);


  return (
    <div>
      <div>
        <div className='body body-home'>
          <div id='thenav'>
            <Navigation />
          </div>
          <PopupImage imageUrl={fullscreenImage} onClose={closeFullscreen} />
          <div id='thecontent'>
            <Introduction />
            <AboutMe onImageClick={handleImageClick} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
