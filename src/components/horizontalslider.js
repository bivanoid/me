// src/components/horizontalslider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/scrollhorizontal.css';
import { Pagination } from 'swiper/modules';
import riyadh from '../assets/riyadhmckp.png';
import bicture from '../assets/bicturemckp.png';
import kasir from '../assets/Casier.png';
import calc from '../assets/calc.png';
import gallery from '../assets/galpod-app.png';
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
    
    <div className='con-swiper' id='sc3'>
      
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
            distance={30}
            direction="vertical"
            delay={200}
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0}
            threshold={1}
          >
          <p>individual or collective projects. </p>
          </AnimatedContent>
        </div>
      
      <FadeContent blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
        <Swiper
          slidesPerView={3}
          spaceBetween={0}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            701: { slidesPerView: 2.5 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className='gambar'>
              <img onClick={handleImageClick} className='' src={riyadh} alt="Alquran Website"></img>
              <a href='https://github.com/Vandyaaa/Riyadh-Al-quran'>link <i className="fi fi-rs-arrow-up-right"></i></a>
            </div>
            <h2 className='gambar-h2'>collective</h2>
            <h1 className='gambar-h1'>Alquran Website</h1>
            <div className='tag-language'>
              <div className='taglang'>PHP</div>
              <div className='taglang'>CSS</div>
              <div className='taglang'>MYSQL</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='gambar'>
              <img onClick={handleImageClick} className='' src={bicture} alt="Bicture"></img>
              <a href='https://github.com/Vandyaaa/bicture-app'>link <i className="fi fi-rs-arrow-up-right"></i></a>
            </div>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>Gallery Photo</h1>
            <div className='tag-language'>
              <div className='taglang'>JAVA</div>
              <div className='taglang'>XML</div>
              <div className='taglang'>FIREBASE</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='gambar'>
              <img onClick={handleImageClick} className='' src={calc} alt="Calculator"></img>
              <a href='https://vandyaaa.github.io/calculablew/'>link <i className="fi fi-rs-arrow-up-right"></i></a>
            </div>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>Calculator</h1>
            <div className='tag-language'>
              <div className='taglang'>JAVASCRIPT</div>
              <div className='taglang'>CSS</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='gambar'>
              <img onClick={handleImageClick} className='' src={gallery} alt="gallery"></img>
              
            </div>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>Mockup CRUD Apps</h1>
            <div className='tag-language'>
              <div className='taglang'>JAVA</div>
              <div className='taglang'>XML</div>
              <div className='taglang'>FIREBASE</div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='gambar'>
              <img onClick={handleImageClick} className='' src={kasir} alt="Cashier"></img>

            </div>
            <h2 className='gambar-h2'>individual</h2>
            <h1 className='gambar-h1'>Cashier</h1>
            <div className='tag-language'>
              <div className='taglang'>PHP</div>
              <div className='taglang'>BOOTSRAP</div>
              <div className='taglang'>MYSQL</div>
            </div>
          </SwiperSlide>


        </Swiper>
      </FadeContent>
      <div className='con-swipe '>
        <p className='swipe'> <i className="fi fi-rs-angle-small-left"></i> <p>slide to left / right</p> <i className="fi fi-rs-angle-small-right"></i></p>
      </div>
    </div>

  );
}
