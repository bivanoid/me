// src/components/horizontalslider.js
import React, { useRef } from 'react';
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
import EaktuAhkir from '../assets/WAKTU AHKIR.jpg';

import FadeContent from './FadeContent';
import AnimatedContent from './AnimatedContent';
import ShareSvg from '../iconSvg/shareic';

export default function HorizontalSlider({ onImageClick }) {
  const gambarRefs = useRef([]);

  const projects = [
    {
      img: riyadh,
      alt: "Alquran Website",
      type: "collective",
      title: "Alquran Website",
      tags: ["PHP", "CSS", "MYSQL"],
      link: "https://github.com/Vandyaaa/Riyadh-Al-quran"
    },
    {
      img: bicture,
      alt: "Bicture",
      type: "individual",
      title: "Gallery Photo",
      tags: ["JAVA", "XML", "FIREBASE"],
      link: "https://github.com/Vandyaaa/bicture-app"
    },
    {
      img: calc,
      alt: "Calculator",
      type: "individual",
      title: "Calculator",
      tags: ["JAVASCRIPT", "CSS"],
      link: "https://vandyaaa.github.io/calculablew/"
    },
    {
      img: gallery,
      alt: "gallery",
      type: "individual",
      title: "Mockup CRUD Apps",
      tags: ["FIGMA"]
    },
    {
      img: kasir,
      alt: "Cashier",
      type: "individual",
      title: "Cashier",
      tags: ["PHP", "BOOTSTRAP", "MYSQL"]
    },
    {
      img: EaktuAhkir,
      alt: "WaktuAhkir",
      type: "individual",
      title: "Waktu Ahkir",
      tags: ["FIGMA", "DESIGN"]
    },
  ];

  const handleImageClick = (e) => {
    if (e.currentTarget.tagName === 'IMG') {
      onImageClick(e.currentTarget.src);
    }
  };

  return (
    <div className='con-swiper' id='sc3'>

      <div className='title-swiper'>
        <AnimatedContent
          distance={50}
          direction="vertical"
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
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={0}
          delay={1000}
        >
          <p>individual or collective projects.</p>
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
            640: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 0 },
            1024: { slidesPerView: 2.5, spaceBetween: 0 },
          }}
          className="mySwiper"
        >
          {projects.map((proj, index) => (
            <SwiperSlide key={index}>
              <div className='gambar' ref={(el) => (gambarRefs.current[index] = el)}>
                <img onClick={handleImageClick} src={proj.img} alt={proj.alt} />
                {proj.link && (
                  <a href={proj.link} target="_blank" rel="noopener noreferrer">
                    <ShareSvg/>
                  </a>
                )}
              </div>
              <h2 className='gambar-h2'>{proj.type}</h2>
              <h1 className='gambar-h1'>{proj.title}</h1>
              <div className='tag-language'>
                {proj.tags.map((tag, i) => (
                  <div key={i} className='taglang'>{tag}</div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </FadeContent>

      <div className='con-swiper-button-hz'>
        <div className='prev prev-hz'>Swipe Left</div>
        <div className='next next-hz'>Swipe Right</div>
      </div>
    </div>
  );
}
