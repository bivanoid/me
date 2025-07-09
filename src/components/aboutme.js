import '../styles/aboutme.css'
import Biodata from './biodata';
import HorizontalSlider from './horizontalslider'; 
import Feedback from './feedback';
import { useMediaQuery } from 'react-responsive';
import AnimatedContent from './AnimatedContent';
import FadeContent from './FadeContent';

function AboutMe({ onImageClick }) {
    const isLargeScreen = useMediaQuery({ minWidth: 701 });

    return (
        <div className='section2' >
            
            <p className='number number2' id='sc2'></p>
            <Biodata/>
            <div className='contents'>
                <div className='abouts'>
                    <AnimatedContent
                        distance={60}
                        direction="horizontal"
                        reverse={true}
                        // config={{ tension: 80, friction: 20 }}
                        initialOpacity={0}
                    >
                        <div className='text-abouts'><p className='title-about'>About</p><br></br>
                        <p className='content-about'>
                          Hello! My name is Firdhan Abivandya, born on June 21, 2007, in Surakarta, Central Java. I am currently a student at SMKN 5 Surakarta, majoring in Software Engineering (RPL). Since an early age, I’ve been passionate about technology—especially in software and mobile application development. I enjoy exploring new ideas, solving problems creatively, and building applications that bring real value to users.
                          <br></br>
                          <br></br>
                          Throughout my studies, I’ve worked on various projects, including Android applications using Firebase and several data management systems. These experiences have strengthened my belief that technology can be a powerful tool for positive impact. I am committed to growing as a developer and contributing to meaningful innovations. Through this portfolio, I aim to showcase my projects, skills, and progress in the field of information technology.
                        </p>

                        </div>
                    </AnimatedContent>
                    <AnimatedContent
                        distance={60}
                        direction="horizontal"
                        reverse={!isLargeScreen}
                        // config={{ tension: 80, friction: 20 }}
                        initialOpacity={0}
                    >
                        <div className='text-abouts  '><p className='title-about title-about2'>Carrier</p><br></br>
                            <ul className='content-carrier'>
                            <FadeContent blur={false} duration={1500} delay={0} easing="ease-in" initialOpacity={0}>
                                <li><span><div className='circle-crr'></div></span> <p>SDN PURWODININGRATAN NO.34</p></li>
                            </FadeContent>
                            <FadeContent blur={false} duration={1500} delay={100} easing="ease-in" initialOpacity={0}>
                                <hr></hr>
                            </FadeContent>
                            <FadeContent blur={false} duration={1500} delay={200} easing="ease-in" initialOpacity={0}>
                                <li><span><div className='circle-crr'></div></span> <p>SMPN 14 SURAKARTA</p></li>
                            </FadeContent>
                            <FadeContent blur={false} duration={1500} delay={300} easing="ease-in" initialOpacity={0}>
                                <hr></hr>
                            </FadeContent>
                            <FadeContent blur={false} duration={1500} delay={400} easing="ease-in" initialOpacity={0}>
                                <li><span><div className='circle-crr'></div></span> <p>SMKN 5 SURAKARTA</p></li>
                            </FadeContent>
                            <FadeContent blur={false} duration={1500} delay={500} easing="ease-in" initialOpacity={0}>
                                <hr></hr>
                            </FadeContent>
                            <FadeContent blur={false} duration={1500} delay={600} easing="ease-in" initialOpacity={0}>
                                <li><span><div className='circle-crr'></div></span> <p>UNIVERSITAS PIGNATELI PUTRA</p></li>
                            </FadeContent>
                            </ul>
                        </div>
                    </AnimatedContent>
                     
                    
                </div>
                <svg className='con-star con-star5' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path class="star star5" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
                </svg>
                <svg className='con-star con-star6' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <path class="star star6" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
                </svg>
                <HorizontalSlider onImageClick={onImageClick}/>
                <Feedback/>
            </div>
            
        </div>
        
    )
}

export default AboutMe;