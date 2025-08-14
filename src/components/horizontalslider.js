// src/components/horizontalslider.js
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/scrollhorizontal.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import riyadh from '../assets/riyadhmckp.png';
import bicture from '../assets/bicturemckp.png';
import kasir from '../assets/Casier.png';
import calc from '../assets/calc.png';
import gallery from '../assets/galpod-app.png';
import EaktuAhkir from '../assets/WAKTU AHKIR.jpg'
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

  const gambarRefs = useRef([]);

  //   useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY || window.pageYOffset;
  //     const maxScroll = 3000;
  //     let scale = scrollY / maxScroll;
  //     scale = Math.max(0.1, Math.min(1, scale)); // batas minimal dan maksimal scale

  //     gambarRefs.current.forEach((img) => {
  //       if (img) {
  //         img.style.transform = `scale(${scale})`;
  //       }
  //     });
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (

    <div className='con-swiper' id='sc3'>

      <div className='title-swiper'>
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={1}
          delay={500}

        >
          <h1>Latest <span>Project</span></h1>
        </AnimatedContent>
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={0}
          delay={1000}
        >
          <p>individual or collective projects. </p>
        </AnimatedContent>
      </div>

      <FadeContent blur={false} delay={1000} duration={1500} easing="ease-out" initialOpacity={0}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".next-hz",
            prevEl: ".prev-hz",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 0,
            },
          }}
          className="mySwiper"
        >
        <SwiperSlide>
          <div className='gambar' ref={(el) => (gambarRefs.current[0] = el)}>
            <img onClick={handleImageClick} className='' src={riyadh} alt="Alquran Website"></img>
            <a href='https://github.com/Vandyaaa/Riyadh-Al-quran'><i class="fi fi-rs-arrow-up-right-from-square"></i></a>
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
          <div className='gambar' ref={(el) => (gambarRefs.current[1] = el)}>
            <img onClick={handleImageClick} className='' src={bicture} alt="Bicture"></img>
            <a href='https://github.com/Vandyaaa/bicture-app'><i class="fi fi-rs-arrow-up-right-from-square"></i></a>
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
          <div className='gambar' ref={(el) => (gambarRefs.current[2] = el)}>
            <img onClick={handleImageClick} className='' src={calc} alt="Calculator"></img>
            <a href='https://vandyaaa.github.io/calculablew/'><i class="fi fi-rs-arrow-up-right-from-square"></i></a>
          </div>
          <h2 className='gambar-h2'>individual</h2>
          <h1 className='gambar-h1'>Calculator</h1>
          <div className='tag-language'>
            <div className='taglang'>JAVASCRIPT</div>
            <div className='taglang'>CSS</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='gambar' ref={(el) => (gambarRefs.current[3] = el)}>
            <img onClick={handleImageClick} className='' src={gallery} alt="gallery"></img>
          </div>
          <h2 className='gambar-h2'>individual</h2>
          <h1 className='gambar-h1'>Mockup CRUD Apps</h1>
          <div className='tag-language'>
            <div className='taglang'>FIGMA</div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className='gambar' ref={(el) => (gambarRefs.current[5] = el)}>
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
        <SwiperSlide>
          <div className='gambar' ref={(el) => (gambarRefs.current[5] = el)}>
            <img onClick={handleImageClick} className='' src={EaktuAhkir} alt="WaktuAhkir"></img>
          </div>
          <h2 className='gambar-h2'>individual</h2>
          <h1 className='gambar-h1'>Waktu Ahkir</h1>
          <div className='tag-language'>
            <div className='taglang'>FIGMA</div>
            <div className='taglang'>DESIGN</div>
          </div>
        </SwiperSlide>
      </Swiper>

      </FadeContent>
      <div className='con-swiper-button-hz'>
        <div className='prev prev-hz'>Swipe Left</div>
        <div className='next next-hz'>Swipe Right</div>
      </div>
    </div>

  );
}
