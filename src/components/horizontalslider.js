// src/components/horizontalslider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/scrollhorizontal.css';
import { Pagination } from 'swiper/modules';
import riyadh from '../assets/e3b4ba54-3742-495d-aa8e-1e0c75f69437 (1).jpg';
import bicture from '../assets/duo.jpg';
import kasir from '../assets/woman.jpg';
import tdl from '../assets/e3b4ba54-3742-495d-aa8e-1e0c75f69437 (1).jpg';
import FadeContent from './FadeContent';
import AnimatedContent from './AnimatedContent';
import Magnet from './Magnet';


export default function HorizontalSlider({ onImageClick }) {
  const handleImageClick = (e) => {
    if (e.currentTarget.tagName === 'IMG') {
      const imgSrc = e.currentTarget.src;
      onImageClick(imgSrc);
    }
  };
  
  return (
    
    <div className='con-swiper'>
      
        <div className='title-swiper'>
          <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0.2}
            threshold={1}
          >
            <h1>Latest Project —</h1>
          </AnimatedContent>
          <AnimatedContent
            distance={10}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={1}
            threshold={1}
          >
          <p>individual or collective projects. </p>
          </AnimatedContent>
        </div>
      
      <FadeContent blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            701: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img onClick={handleImageClick} className='gambar' src={riyadh} alt="Alquran Website"></img>
            <h2 className='gambar-h2'>collective</h2>
            <h1 className='gambar-h1'>Alquran Website</h1>
            <div className='tag-language'>
              <div className='taglang'>PHP</div>
              <div className='taglang'>CSS</div>
              <div className='taglang'>MYSQL</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img onClick={handleImageClick} className='gambar' src={bicture} alt="Bicture Apps (Gallery Photo Online)"></img>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>Gallery Photo</h1>
            <div className='tag-language'>
              <div className='taglang'>JAVA</div>
              <div className='taglang'>XML</div>
              <div className='taglang'>FIREBASE</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img onClick={handleImageClick} className='gambar' src={kasir} alt="Cashier"></img>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>Cashier</h1>
            <div className='tag-language'>
              <div className='taglang'>PHP</div>
              <div className='taglang'>CSS</div>
              <div className='taglang'>BOOTSRAP</div>
              <div className='taglang'>MYSQL</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img onClick={handleImageClick} className='gambar' src={tdl} alt='To Do List'></img>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>To Do List</h1>
            <div className='tag-language'>
              <div className='taglang'>PHP</div>
              <div className='taglang'>CSS</div>
              <div className='taglang'>MYSQL</div>
            </div>
          </SwiperSlide>
        </Swiper>
      </FadeContent>
      {/* <div className='con-all-project'>
        <a className='see-all'>See All</a>
      </div> */}
    </div>

  );
}
