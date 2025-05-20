import '../styles/aboutme.css'
import Biodata from './biodata';
import HorizontalSlider from './horizontalslider'; // sesuaikan dengan path kamu
import Feedback from './feedback';
import FadeContent from './FadeContent';

function AboutMe({ onImageClick }) {


    return (
        <div className='section2' >
            
            <p className='number number2' id='sc2'></p>
            <Biodata/>
        
            <div className='contents'>
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div className='abouts'>
                     <div className='text-abouts'><p className='title-about'>About</p><br></br>
                     <p className='content-about'>
                        Hello! My name is Firdhan Abivandya June 21, 2007, in Surakarta, Central Java. I am currently a student at SMKN 5 Surakarta, majoring in Software Engineering (RPL). From an early age, I’ve been passionate about technology, especially in the field of software and mobile app development. I enjoy learning new things, exploring creative solutions, and building applications that provide real value to users.
                <br></br>
                <br></br>
      
                    Throughout my journey as a software engineering student, I’ve worked on various projects, ranging from Android apps using Firebase to data management systems. I believe technology is a powerful tool for positive change, and I aspire to be a part of that innovation. Through this portfolio, I hope to share my work, learning experiences, and progress in the world of information technology.
                     </p>
                     </div>
                      <div className='text-abouts  '><p className='title-about title-about2'>Carrier</p><br></br>
                     <p className='content-carrier'>
                      Throughout my time in the Software Engineering (RPL) program, I have built a solid foundation in technology, particularly in application development and data management. I actively participated in both individual and group projects, including the creation of Bicture, a feature-rich Android photo gallery app that includes uploading, commenting, bookmarking, and a unique appreciation system.<br></br><br></br>

During my internship program, I gained real-world experience by working in a professional environment where I was responsible for managing marketing data with high accuracy. This experience taught me the value of discipline, consistency, and responsibility in the workplace. It also sharpened my programming logic, teamwork skills, and perseverance in completing projects.<br></br><br></br>

Driven by a strong passion for learning and self-improvement, I am fully prepared to advance to the next stage of my journey in the field of information technology.<br></br>
                     </p>
                     </div>
                    
                </div>
                </FadeContent>
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