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
            <Biodata />
            <div className='contents'>
                <div className='abouts'>
                    <FadeContent blur={false} delay={500} duration={300} easing="ease-out" initialOpacity={0}>
                        <div className='text-abouts'><p className='title-about'>About</p><br></br>
                            <p className='content-about'>
                                Hello! My name is Firdhan Abivandya, born on June 21, 2007, in Surakarta, Central Java. I am currently a student at SMKN 5 Surakarta, majoring in Software Engineering (RPL). Since an early age, I’ve been passionate about technology—especially in software and mobile application development. I enjoy exploring new ideas, solving problems creatively, and building applications that bring real value to users.
                                <br></br>
                                <br></br>
                                Throughout my studies, I’ve worked on various projects, including Android applications using Firebase and several data management systems. These experiences have strengthened my belief that technology can be a powerful tool for positive impact. I am committed to growing as a developer and contributing to meaningful innovations. Through this portfolio, I aim to showcase my projects, skills, and progress in the field of information technology.
                            </p>

                        </div>
                    </FadeContent>
                    <AnimatedContent
                        distance={50}
                        direction="horizontal"
                        reverse={!isLargeScreen}
                        config={{ tension: 100, friction: 30 }}
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
                <HorizontalSlider onImageClick={onImageClick} />
                <Feedback />
            </div>

        </div>

    )
}

export default AboutMe;