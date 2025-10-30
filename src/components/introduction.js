import '../styles/introduction.css'
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as StarIcon } from '../assets/plus-paricle.svg';
import AnimatedContent from './AnimatedContent';
import FadeContent from './FadeContent';
import Magnet from './Magnet';
import Lenis from '@studio-freight/lenis';
import lenis from './lenisSc';
import bgImage from '../assets/e3b4ba54-3742-495d-aa8e-1e0c75f69437 (1).jpg';
import Logo from './logo';
import DownSvg from '../iconSvg/scrollToBottomic';
import LogoMiring from '../iconSvg/logoMiring';

function Introduction() {
    const conImageRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update waktu setiap detik
    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timeInterval);
    }, []);

    // Format waktu menjadi HH:MM:SS
    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours} :. ${minutes} :. ${seconds}`;
    };

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
            const maxScroll = 4000;
            let opacity = 1 - scrollY / (maxScroll / 8);
            opacity = Math.max(0, Math.min(1, opacity));

            const isMobile = window.innerWidth <= 767;

            if (conImageRef.current) {
                if (isMobile) {
                    // Mobile: hanya scale

                } else {
                    // Desktop: scale + translateX

                }

                conImageRef.current.style.opacity = `${opacity}`;
            }

            requestAnimationFrame(raf);
        }

        // Set initial opacity explicitly
        if (conImageRef.current) {
            conImageRef.current.style.setProperty('opacity', '1', 'important');
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
        <div className='section' id='sc1'>
            {/* <img className='bgImage-INT' src={bgImage}></img> */}
            <p className='number'></p>

            <div className='text' ref={conImageRef} style={{ opacity: 1 }}>
                <FadeContent blur={false} duration={1500} easing="ease-out" initialOpacity={0}>
                    <div className='header-int'>
                        <p className='revealed'><strong>BY bIVANOId</strong></p>
                        <p className='currndate'>{formatTime(currentTime)}</p>
                    </div>
                </FadeContent>

                <div className='hero'>
                    <div className='hero-1'>
                    
                            <AnimatedContent
                                distance={10}
                                direction="vertical"
                                config={{ tension: 100, friction: 30 }}
                                reverse={true}
                                initialOpacity={0}
                                animateOpacity
                                delay={500}
                                
                            >
                                <p>E<span><Logo /></span>plore The</p>
                                <h1>Ideas and works</h1>
                            </AnimatedContent>
                        
                        
                    </div>
                    <LogoMiring />
                    <div className='hero-2'>
                        <AnimatedContent
                            distance={10}
                            direction="vertical"
                            config={{ tension: 100, friction: 30 }}
                            reverse={false}
                            initialOpacity={0}
                            animateOpacity
                            delay={500}

                        >
                            <h1>that define me.</h1>
                        </AnimatedContent>
                        
                    </div>
                </div>

                <button onClick={scrollToSection} className="arrow-to-sc2">
                    <DownSvg />
                </button>
            </div>
        </div>
    )
}

export default Introduction;