import '../styles/introduction.css'
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as StarIcon } from '../assets/plus-paricle.svg';
import CircularText from './CircularText';
import AnimatedContent from './AnimatedContent';
import FadeContent from './FadeContent';
import Magnet from './Magnet';
import Lenis from '@studio-freight/lenis';
import lenis from './lenisSc';
import bgImage from '../assets/e3b4ba54-3742-495d-aa8e-1e0c75f69437 (1).jpg'
function Introduction() {
    const conImageRef = useRef(null);

        useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            gestureDirection: 'vertical',
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);

            const scrollY = window.scrollY || window.pageYOffset;

            // Hitung scale antara 1 ke 0 berdasarkan scrollY (ubah angka sesuai kebutuhan)
            const maxScroll = 4000; // scroll sejauh 500px scale jadi 0
            let scale = 1 + scrollY / maxScroll;
            scale = Math.max(1, Math.min(1.5, scale)); // clamp agar di antara 0 dan 1
            const translateY = (1 - scale) * -100; // ketika scale = 1 → 0%, scale = 0 → 50%
            // const opacity = (100 + scale) / 100; // ketika scale = 1 → 0%, scale = 0 → 50%

            if (conImageRef.current) {
                  conImageRef.current.style.transform = `scale(${scale}) translateY(${translateY}%)`;
                //   conImageRef.current.style.opacity = `${opacity}%`;
            }

            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    const scrollToSection = () => {
        const section = document.getElementById('sc2');
        if (section) {
            lenis.scrollTo(section);
        }
    };

    return (

        <div className='section' id='sc1' >
        <img className='bgImage-INT' src={bgImage} ref={conImageRef}></img>
            {/* <StarIcon className='star star1' width={100} height={100} background='red'/>
            <StarIcon className='star star2' width={100} height={100} /> */}
            <svg width="100" height="100" viewBox="0 0 120 121" fill="none" xmlns="http://www.w3.org/2000/svg" class="plus-particle" background="red"><path d="M64.5 55H120V64H64.5V120.5H55.5V64H0V55H55.5V0.5H64.5V55Z" fill="#D9D9D9"></path></svg>
            <svg className='con-star con-star1' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star1" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <svg className='con-star con-star2' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star2" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <svg className='con-star con-star3' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star3" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <p className='number'></p>
            <div className='text'>
                <FadeContent blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
                    <p className='revealed'>Hi i'm ✦ Firdhan Abivandya</p>
                </FadeContent>


                <AnimatedContent
                    className='con-text-it'
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 100, friction: 30 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0}
                    delay={500}
                >
                    <p className='AnimatedContent'>— Discover the</p>
                </AnimatedContent>
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 100, friction: 30 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0.2}
                    delay={600}
                >
                    <p className='AnimatedContent AnimatedContentItalic'>ideas and works</p>
                </AnimatedContent>


                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 100, friction: 30 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0}
                    delay={700}
                >
                    <p className='AnimatedContent'>that define me<span className='dot-introduction'></span></p>
                </AnimatedContent>

            </div>
            {/* <div className='con-image' >
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    // config={{ tension: 80, friction: 10 }}
                    initialOpacity={0}
                    animateOpacity
                    delay={1000}
                    scale={1}
                    threshold={0}
                >
                    <div className='image'></div>
                </AnimatedContent>
            </div> */}
            {/* <div className='con-image-introduction'>
                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    // config={{ tension: 80, friction: 10 }}
                    initialOpacity={0}
                    animateOpacity
                    delay={1700}
                    scale={1}
                    threshold={0}
                >

                    <div className='bg-image-introduction'></div>
                </AnimatedContent>
            </div> */}
            <button onClick={scrollToSection} className="arrow-to-sc2">
                <i class="fi fi-rs-chevron-double-down"></i>
            </button>
        </div>
    )
}

export default Introduction;