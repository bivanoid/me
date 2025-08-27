import '../styles/footer.css';
import logo from '../assets/logo.png'
import AnimatedContent from './AnimatedContent';
import Logo from './logo';
import lenis from './lenisSc';
import LogoPattern from './LogoPattern';

export default function Footer() {

    const toSc1 = () => {
        const section = document.getElementById('sc1');
        if (section) {
            lenis.scrollTo(section);
        }
    };

    const toSc2 = () => {
        const section = document.getElementById('sc2');
        if (section) {
            lenis.scrollTo(section);
        }
    };
    const toSc3 = () => {
        const section = document.getElementById('sc3');
        if (section) {
            lenis.scrollTo(section);
        }
    };

    const toSc4 = () => {
        const section = document.getElementById('sc4');
        if (section) {
            lenis.scrollTo(section);
        }
    }

    return (
        
            <div className="footer">
                <div className='footer-header'>
                    <div className='triple-shapes'>
                        <div className='rectangle'></div>
                        <div className='triangle'></div>
                        <div className='circle'></div>
                    </div>
                </div>

                <div className='footer-main'>
                    
                    <div className='footer2'>
                        <div className='top-footer2'>
                        <div className='logo-footer logo-footer1'>
                        <LogoPattern/>
                        </div>
                        <div className='logo-footer logo-footer2'>
                        <Logo/>
                        </div>
                            <p>Creative developer passionate about building exceptional digital experiences with modern<br/> technologies.</p>
                            <p>Connect with me.</p>
                            <div className='social-media-footer'>
                                <a href='https://www.instagram.com/bivanoid/' className='ig'><i class="fi fi-brands-instagram"></i></a>
                                <a href='' className='lnkdn'><i class="fi fi-brands-linkedin"></i></a>

                                <a href='https://x.com/riyadhlearning' className='twt'><i class="fi fi-brands-twitter-alt-circle"></i></a>
                                <a href='https://wa.me/087739770494' className='wa'><i class="fi fi-brands-whatsapp"></i></a>
                                <a href='https://t.me/Teufelie' className='tele'><i class="fi fi-brands-telegram"></i></a>
                                <a href='https://github.com/Vandyaaa' className='gth'><i class="fi fi-brands-github"></i></a>
                            </div>
                        </div>

                        <p className='copyright
                        '>© 2025 Firdhan Abivandya. All rights reserved.</p>
                      
                    </div>
                    <div className='footer3'>
                        <div className='get-in-touch'>
                            <h1>Get In Touch</h1>
                            <ul>
                                <li><a href='mailto:abivandyafirdhan@gmail.com'>abivandyafirdhan@gmail.com</a></li>
                                <li><a href='https://wa.me/087739770494'>+62 877-3977-0494</a></li>
                                <li><a href='https://id.wikipedia.org/wiki/Indonesia'>Indonesia</a></li>
                                
                            </ul>
                        </div>
                        <div className='navigation-link-footer'>
                        <h1>Navigation</h1>
                            <ul>
                                <li onClick={toSc1}>Dashboard</li>
                                <li onClick={toSc2}>Aboutme</li>
                                <li onClick={toSc3}>Projects</li>
                                <li onClick={toSc4}>Feedback</li>
                                <li>Footer</li>
                            </ul>
                        </div>
                    </div>

                    <div className='footer1'>
                        <div className='footer1-main'>
                            
                        </div>
                    </div>
                    <div className='copyright2'><p>&copy; 2025 Firdhan Abivandya. All rights reserved.</p></div>
                </div>
            </div>
        
        
    )
}