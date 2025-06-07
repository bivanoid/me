import '../styles/footer.css';
import logo from '../assets/logo.png'
import AnimatedContent from './AnimatedContent';

export default function Footer() {
    return (
        <AnimatedContent
            distance={30}
            direction="vertical"
            reverse={false}
            config={{ tension: 80, friction: 20 }}
            initialOpacity={0}
            threshold={0.5}
        >
            <div className="footer">
                <div className='footer-header'>
                    <div className='triple-shapes'>
                        <div className='rectangle'></div>
                        <div className='triangle'></div>
                        <div className='circle'></div>
                    </div>
                </div>

                <div className='footer-main'>
                    <div className='footer1'>

                        <div className='footer1-main'>
                            <img src={logo}></img>
                        </div>

                        <div className='footer1-main'>
                            <p>Dashboard</p>
                            <p>Aboutme</p>
                            <p>Recent Project</p>
                            <p>Feedback</p>
                        </div>


                    </div>
                    <div className='footer2'>
                        <h1>— Social Media</h1>
                        <div className='con-social-media'>
                            <a href='https://www.instagram.com/bivanoid/' className='ig'><i class="fi fi-brands-instagram"></i></a>
                            <a href='https://www.linkedin.com/in/firdhan-abivandya-b193072a1/' className='lnkdn'><i class="fi fi-brands-linkedin"></i></a>
                            <a href='https://x.com/riyadhlearning' className='twt'><i class="fi fi-brands-twitter-alt-circle"></i></a>
                            <a href='https://wa.me/087739770494' className='wa'><i class="fi fi-brands-whatsapp"></i></a>
                            <a href='https://t.me/Teufelie' className='tele'><i class="fi fi-brands-telegram"></i></a>
                            <a href='https://github.com/Vandyaaa' className='gth'><i class="fi fi-brands-github"></i></a>
                        </div>
                    </div>
                    <div className='footer3'>

                    </div>
                    {/* <div className='copyright'><p>&copy; 2025 Firdhan Abivandya. All rights reserved.</p></div> */}
                    <svg className='con-star con-starfuter' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path class="star starfuter" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
                    </svg>
                </div>
            </div>
        </AnimatedContent>
        
    )
}