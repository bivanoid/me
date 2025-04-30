import '../styles/navigation.css';
import Biodata from './biodata';

function open() {
    ['menu', 'close', 'logomenu', 'thecontent'].forEach(id => document.getElementById(id)?.classList.toggle('open'))
}

function Navigation() {
    return (
        <div className='navigation'>
            <div className='menu-button' onClick={open}><i class="fi fi-rs-expand-arrows"></i></div>
            <div className='close' id='close' onClick={open}><i class="fi fi-rs-down-left-and-up-right-to-center"></i></div>
            <ul className='navigasi-menu' id='menu'>
                <li>PORTOFOLIO <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></li>
                <li>REPOSITORY <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></li>
                <li>ABOUT ME <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></li>
            </ul>
            <div className='logo-menu' id='logomenu'></div>
            <div className='logo-web'>fr.</div>
            <a href='https://wa.me/087739770494' className='contact'>Contact me</a>
        </div>
    );
}

export default Navigation;
