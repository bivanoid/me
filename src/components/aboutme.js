import '../styles/aboutme.css'
import Biodata from './biodata';
import HorizontalSlider from './horizontalslider'; // sesuaikan dengan path kamu
import Feedback from './feedback';

function AboutMe({ onImageClick }) {


    return (
        <div className='section2' >
            <p className='number number2' id='sc2'>02</p>
            <Biodata/>
        
            <div className='contents'>
                
                <div className='abouts'>
                     <div className='text-abouts'><p className='title-about'>About</p><br></br>
                     <p className='content-about'>
                        Hello! My name is <span className='highlight'>Firdhan Abivandya</span>. I was born on <span className='highlight'>June 21, 2007, in Surakarta, Central Java.</span> I am currently a student at <span className='highlight'>SMKN 5 Surakarta</span>, majoring in Software Engineering (RPL). From an early age, I’ve been passionate about technology, especially in the field of software and mobile app development. <span className='highlight'>I enjoy learning new things, exploring creative solutions, and building applications that provide real value to users</span>.
                <br></br>
                <br></br>
      
                    Throughout my journey as a software engineering student, I’ve worked on various projects, ranging from Android apps using Firebase to data management systems. I believe technology is a powerful tool for positive change, and I aspire to be a part of that innovation. Through this portfolio, I hope to share my work, learning experiences, and progress in the world of information technology.
                     </p>
                     </div>
                      <div className='text-abouts  '><p className='title-about title-about2'>Carrier</p><br></br>
                     <ul className='content-carrier'>
                      Throughout my time in the Software Engineering (RPL) program, I have built a solid foundation in technology, particularly in application development and data management. I actively participated in both individual and group projects, including the creation of Bicture, a feature-rich Android photo gallery app that includes uploading, commenting, bookmarking, and a unique appreciation system.<br></br><br></br>

During my internship program, I gained real-world experience by working in a professional environment where I was responsible for managing marketing data with high accuracy. This experience taught me the value of discipline, consistency, and responsibility in the workplace. It also sharpened my programming logic, teamwork skills, and perseverance in completing projects.<br></br><br></br>

Driven by a strong passion for learning and self-improvement, I am fully prepared to advance to the next stage of my journey in the field of information technology.<br></br>
                     </ul>
                     </div>
                    
                </div>

                <HorizontalSlider onImageClick={onImageClick}/>
                <Feedback/>
            </div>
            
        </div>
        
    )
}

export default AboutMe;