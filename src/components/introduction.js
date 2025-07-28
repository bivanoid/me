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
    const maxScroll = 4000;

    let scale = 1 + scrollY / maxScroll;
    scale = Math.max(1, Math.min(1.5, scale));

    let opacity = 1 - scrollY / (maxScroll / 8);
    opacity = Math.max(0, Math.min(1, opacity));

    const translateVal = (1 - scale) * -100;

    const isMobile = window.innerWidth <= 767;

    if (conImageRef.current) {
        if (isMobile) {
            // Mobile: hanya scale
            conImageRef.current.style.transform = `scale(${scale})`;
        } else {
            // Desktop: scale + translateX
            conImageRef.current.style.transform = `scale(${scale}) translateX(${translateVal}%)`;
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
            <div className='conParticle-INT'>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
                <span>✦</span>
            </div>
            {/* <img className='bgImage-INT' src={bgImage}></img> */}
            <p className='number'></p>
            
            <div className='text' ref={conImageRef} style={{opacity: 1}}>
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
                    delay={200}
                >
                    <p className='AnimatedContent'>Discover the</p>
                </AnimatedContent>

                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 100, friction: 30 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0.2}
                    delay={400}
                >
                    <p className='AnimatedContent AnimatedContentItalic'>ideas <span className='andText'>and</span> works</p>
                </AnimatedContent>

                <AnimatedContent
                    distance={50}
                    direction="vertical"
                    reverse={false}
                    config={{ tension: 100, friction: 30 }}
                    initialOpacity={0}
                    animateOpacity
                    threshold={0}
                    delay={600}
                >
                    <p className='AnimatedContent AnimatedContent2'>that define me<span className='dot-introduction'></span></p>
                </AnimatedContent>
            </div>
            
            <button onClick={scrollToSection} className="arrow-to-sc2">
                <i className="fi fi-rs-chevron-double-down"></i>
            </button>
        </div>
    )
}

export default Introduction;