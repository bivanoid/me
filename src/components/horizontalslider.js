import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../styles/scrollhorizontal.css';

// import required modules
import { Pagination } from 'swiper/modules';

  


export default function HorizontalSlider() {
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const handleImageClick = (e) => {
  const slide = e.currentTarget;
  const bgImage = window.getComputedStyle(slide).backgroundImage;
  const urlMatch = bgImage.match(/url\("(.*)"\)/);
  if (urlMatch) {
    setFullscreenImage(urlMatch[1]);
  }
};


  const closeFullscreen = () => {
    setFullscreenImage(null);
  };
  return (
    <div className='con-swiper'>
      <div className='title-swiper'><h1>What recent i do</h1> <p>slide</p></div>
      <Swiper
  slidesPerView={2}
  spaceBetween={30}
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    701: {
      slidesPerView: 2,
    }
  }}
  modules={[Pagination]}
  className="mySwiper"
>
        <SwiperSlide onClick={handleImageClick} className='gambar gambar1'>
          <h1>Bicture Apps (Gallery Photo Online)</h1>
        </SwiperSlide>
        <SwiperSlide onClick={handleImageClick} className='gambar gambar2'>
          <h1>Al-Quran Website</h1>
        </SwiperSlide>
        <SwiperSlide onClick={handleImageClick} className='gambar gambar3'>
          <h1>Administration</h1>
        </SwiperSlide>
        <SwiperSlide onClick={handleImageClick} className='gambar gambar4'>
          <h1>To do List</h1>
        </SwiperSlide>

      </Swiper>
      <div className='con-all-project'>
        <div className='circle-arrow-all-project'><i class="fi fi-rs-arrow-right"></i></div><p>See All</p>
      </div>
      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <img src={fullscreenImage} alt="Fullscreen" />
        </div>
      )}
    </div>
  );


}
