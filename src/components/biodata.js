
import '../styles/aboutme.css';



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
            <div className='con-sticky'>
                <div className='sticky'>
                    
                        
                        <div className='image-profile' id='inp'></div>
                        <h1 id='namamu'>Firdhan Abivandya.</h1>
                        
                        <div className='bio' id='bio'>
                            <h1>Information</h1>
                            <ul className='list-bio'>
                                <li>
                                    <div className='text-bio'><span className='bio-icon'><i class="fi fi-rs-cake-birthday"></i></span><p>Birthday</p></div>
                                    <div className='text-bio'><p>21 June 2007</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><span className='bio-icon'><i class="fi fi-rs-marker"></i></span><p>Address</p></div>
                                    <div className='text-bio'><p>Surakarta, Central Java</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><span className='bio-icon'><i class="fi fi-rs-at"></i></span><p>Email</p></div>
                                    <div className='text-bio'><p>abivandyafirdhan@gmail.com</p></div>
                                </li>
                                <li>
                                    <div className='text-bio'><span className='bio-icon'><i class="fi fi-rs-phone-call"></i></span><p>Phone</p></div>
                                    <div className='text-bio'><p>+62 877-3977-0494</p></div>
                                </li>
                            </ul>
                        </div>

                        <div className='contactme'>Contact Me</div>
                
                </div>
            </div>
    )
    
}

export default Biodata;