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
        <SwiperSlide className='gambar gambar1'>
          <h1>Bicture Apps (Gallery Photo Online)</h1>
        </SwiperSlide>
        <SwiperSlide className='gambar gambar2'>
          <h1>Title 1</h1>
        </SwiperSlide>
        <SwiperSlide className='gambar gambar3'>
          <h1>Title 1</h1>
        </SwiperSlide>
        <SwiperSlide className='gambar gambar4'>
          <h1>Title 1</h1>
        </SwiperSlide>

      </Swiper>
      <div className='con-all-project'>
        <div className='circle-arrow-all-project'><i class="fi fi-rs-arrow-right"></i></div><p>See All</p>
      </div>
    </div>
  );
}
