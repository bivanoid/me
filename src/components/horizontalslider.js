// src/components/horizontalslider.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import '../styles/scrollhorizontal.css';
import { Pagination } from 'swiper/modules';
import riyadh from '../assets/riyadh.png';
import bicture from '../assets/iklanbicture.jpg';
import kasir from '../assets/kasir.png';
import tdl from '../assets/todolist.png';

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
        <h1>Latest Project —</h1> <p>slide </p>
      </div>

      <Swiper
        slidesPerView={3}
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
          <h1 className='gambar-h1'>Alquran Website</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img onClick={handleImageClick} className='gambar' src={bicture} alt="Bicture Apps (Gallery Photo Online)"></img>
          <h1 className='gambar-h1'>Bicture Apps (Gallery Photo Online)</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img onClick={handleImageClick} className='gambar' src={kasir} alt="Cashier"></img>
          <h1 className='gambar-h1'>Cashier</h1>
        </SwiperSlide>
        <SwiperSlide>
          <img onClick={handleImageClick} className='gambar' src={tdl} alt='To Do List'></img>
          <h1 className='gambar-h1'>To Do List</h1>
        </SwiperSlide>
      </Swiper>

      <div className='con-all-project'>
        <div className='circle-arrow-all-project'>
          <i className="fi fi-rs-arrow-right"></i>
        </div>
        <p>See All</p>
      </div>
    </div>
  );
}
