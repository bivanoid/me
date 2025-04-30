import '../styles/aboutme.css'
import Biodata from './biodata';

function AboutMe() {

    return (
        <div className='section2' id='sc2'>
            <p className='number'>02</p>
        <Biodata/>
        
            <div className='contents'>
                
                <div className='abouts'>
                     <div className='text-abouts'><p className='title-about'>About</p><br></br>
                     <p className='content-about'>
                        Hello! My name is Firdhan Abivandya. I was born on June 21, 2007, in Surakarta, Central Java. I am currently a student at SMKN 5 Surakarta, majoring in Software Engineering (RPL). From an early age, I’ve been passionate about technology, especially in the field of software and mobile app development. I enjoy learning new things, exploring creative solutions, and building applications that provide real value to users.
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                    Throughout my journey as a software engineering student, I’ve worked on various projects, ranging from Android apps using Firebase to data management systems. I believe technology is a powerful tool for positive change, and I aspire to be a part of that innovation. Through this portfolio, I hope to share my work, learning experiences, and progress in the world of information technology.
                     </p>
                     </div>
                      <div className='text-abouts'><p className='title-about'>Carrier</p><br></br>
                     <p className='content-about'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        <br></br>
                        <br></br>      
                        <br></br>      
                        <br></br>      
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                     </p>
                     </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AboutMe;