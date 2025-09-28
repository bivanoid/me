
import '../styles/aboutme.css';
import AnimatedContent from './AnimatedContent';
import FadeContent from './FadeContent';
import CircularText from './CircularText';
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Biodata() {
    


    var ya = document.getElementById('inp');

        // Fungsi untuk memantau posisi scroll
        // window.onscroll = function() {
        //     if (ya.scrollTop > 400 || document.documentElement.scrollTop > 650) {
        //         ya.style.filter = "grayscale(100%) brightness(20%)"; 
                
        //     } else {
        //         ya.style.filter = "grayscale(0%)"; 
        //     }
        // };
    return (
        

            <FadeContent className='con-sticky' blur={false} duration={500} easing="ease-out" initialOpacity={0}>
            
                <div className='sticky'>
                
                        
                        <div className='sticky-header'>
                            <AnimatedContent
                                distance={0}
                                direction="horizontal"
                                reverse={true}
                                config={{ tension: 80, friction: 10 }}
                                initialOpacity={0}
                                animateOpacity
                                scale={0}
                                delay={400}
                                threshold={1}
                            >
                                <div className='con-image-bio'>
                                </div>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={50}
                                direction="horizontal"
                                reverse={false}
                                config={{ tension: 80, friction: 40 }}
                                initialOpacity={0}
                                animateOpacity
                                threshold={0}
                            >
                                <h1 id='namamu'>Firdhan <span>Abivandya.</span></h1>
                            </AnimatedContent>
                            
                        </div>
                        <FadeContent blur={false} breakpoints={{747: {blur: false}}} delay={1000} duration={500} easing="ease-out" initialOpacity={0}>
                            <div className='bio' id='bio'>
                            <h1>Information</h1>
                            <ul className='list-bio'>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-cake-birthday"></i><p>21 June 2007</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-thumbtack"></i><p>Surakarta, Centar Java</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-envelope"></i><p>abivandyafirdhan@gmail.com</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><i class="fi fi-rs-phone-rotary"></i><p>+62 877-3977-0494</p></div>
                                </li>

                            </ul>
                            <h1>Skills</h1>
                            <div className='skills'>
                                
                                <div className='box-skill'>HTML</div>
                                <div className='box-skill'>CSS</div>
                                <div className='box-skill'>JAVA SCRIPT</div>
                                <div className='box-skill'>PHP</div>
                                <div className='box-skill'>REACT</div>
                                <div className='box-skill'>MYSQL</div>
                                <div className='box-skill'>JAVA</div>
                                <div className='box-skill'>BOOTSTRAP</div>
                                <div className='box-skill'>TAILWIND</div>
                                <div className='box-skill'>FIGMA</div>
                                <div className='box-skill'>XML</div>
                                <div className='box-skill'>UI / UX DESIGN</div>
                            </div>
                        </div>
                        </FadeContent>
                        

                        <div className='con-hire-me'>
                            <a href='https://wa.me/087739770494' className='contactme'><p>Contact Me</p></a>
                            
                        </div>
                
                </div>
            </FadeContent >
    )
    
}

export default Biodata;