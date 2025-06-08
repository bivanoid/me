import { Link } from 'react-router-dom';
import '../styles/navigation.css';
import Biodata from './biodata';
import logo from '../assets/logo.png'
import React, { useState } from 'react';


function open() {
    ['menu', 'close', 'logomenu', 'thecontent'].forEach(id => document.getElementById(id)?.classList.toggle('open'))
}
  

function Navigation() {
    const [darkMode, setDarkMode] = useState(true);

    function toggleTheme() {
        const root = document.documentElement;
        var swchbtn = document.getElementById('swchbtn');
        swchbtn.classList.toggle('switchTheme')

        if (darkMode) {
            // Light mode
            root.style.setProperty('--primary', '#e0e0e0');
            root.style.setProperty('--primary2', '#d1d1d1');
            root.style.setProperty('--primary3', '#bebebe4f');
            root.style.setProperty('--button', '#0a0a0a');
            root.style.setProperty('--border', 'rgba(0, 0, 0, 0.089)');
        } else {
            // Dark mode
            root.style.setProperty('--primary', '#0a0a0a');
            root.style.setProperty('--primary2', '#111111');
            root.style.setProperty('--primary3', '#1616163d');
            root.style.setProperty('--button', '#f8f8f8');
            root.style.setProperty('--border', '#ffffff0e');
        }

        setDarkMode(!darkMode);
    }

    return (
        <div className='navigation'>
            <div className='menu-button' onClick={open}><i class="fi fi-rs-expand-arrows"></i></div>
            <div className='close' id='close' onClick={open}><i class="fi fi-rs-down-left-and-up-right-to-center"></i></div>
            <ul className='navigasi-menu' id='menu'>
                <li><Link to="/">PORTOFOLIO <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></Link></li>
                <li><a href='https://github.com/Vandyaaa'>REPOSITORY <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></a></li>
                <li><Link to='/blog'>MY BLOG <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></Link></li>
            </ul>
            <div className='logo-menu' id='logomenu'>
                <h1>
                    <span>
                        <svg className='con-star con-star-span' width="100" height="100" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" >
                            <path class="star star-span" d="M107.729 40.5811C112.721 66.7848 133.215 87.2792 159.419 92.2705L200 100L159.419 107.729C133.215 112.721 112.721 133.215 107.729 159.419L100 200L92.2705 159.419C87.2792 133.215 66.7848 112.721 40.5811 107.729L0 100L40.5811 92.2705C66.7848 87.2792 87.2792 66.7848 92.2705 40.5811L100 0L107.729 40.5811Z" fill="#D9D9D9"></path>
                        </svg>
                    </span>
                    
                    <span>F</span>
                    <span>R</span>
                    <span>D</span>
                    <span>N</span>
                    <span>A</span>
                    <span>V</span>
                    <span>N</span>
                </h1>
            </div>
            <div className='logo-web'>fr.</div>
            <button className='theme' onClick={toggleTheme}>
                
                <div id='swchbtn' className='button-swch'>{darkMode ? (<i class="fi fi-rs-moon-stars"></i>): (<i class="fi fi-rs-brightness"></i>)}</div>
            </button>

        </div>
    );
}

export default Navigation;
