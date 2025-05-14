import '../styles/introduction.css'
import { ReactComponent as StarIcon } from '../assets/plus-paricle.svg';


function Introduction() {
    const scrollToSection = () => {
        const section = document.getElementById('sc2');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
      
    return (
        <div className='section'>
            {/* <StarIcon className='star star1' width={100} height={100} background='red'/>
            <StarIcon className='star star2' width={100} height={100} /> */}
            <svg width="100" height="100" viewBox="0 0 120 121" fill="none" xmlns="http://www.w3.org/2000/svg" class="plus-particle" background="red"><path d="M64.5 55H120V64H64.5V120.5H55.5V64H0V55H55.5V0.5H64.5V55Z" fill="#D9D9D9"></path></svg>
            <svg className='con-star con-star1' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star1" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <svg className='con-star con-star2' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star2" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <svg className='con-star con-star3' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path class="star star3" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
            </svg>
            <p className='number'></p>
            <div className='text'>
                <p>Hi i'm Firdhan Abivandya</p>
                <p>— Discover the<br></br>ideas and works<br></br>that define me<span className='dot-introduction'></span></p>
            </div>
            <div className='image'></div>
            <div className='bg-image-introduction'></div>   
            <div onClick={scrollToSection} className='arrow-to-sc2'>
                <i class="fi fi-rs-caret-down"></i>
            </div>
        </div>
    )
}

export default Introduction;