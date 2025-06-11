import { Link } from 'react-router-dom';
import '../styles/navigation.css';
import Biodata from './biodata';
import logo from '../assets/logo.png'
import React, { useState } from 'react';
import Logo from './logo';

function open() {
    ['menu', 'close', 'logomenu', 'thecontent'].forEach(id => document.getElementById(id)?.classList.toggle('open'))
}
  

function Navigation() {
    const [darkMode, setDarkMode] = useState(true);

    function toggleTheme() {
        const root = document.documentElement;
        ['swchbtn1', 'swchbtn2'].forEach(id => document.getElementById(id)?.classList.toggle('switchTheme'))

        if (darkMode) {
            // Light mode
            root.style.setProperty('--primary', '#fafaff');
            root.style.setProperty('--primary2', '#eef0f2');
            root.style.setProperty('--primary3', '#ecebe4');
            root.style.setProperty('--button', '#1c1c1c');
            root.style.setProperty('--border', '#00000014');
        } else {
            // Dark mode
            root.style.setProperty('--primary', '#131316');
            root.style.setProperty('--primary2', '#1c1c21');
            root.style.setProperty('--primary3', '#26262c');
            root.style.setProperty('--button', '#e9ecef');
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
                <button className='theme theme2' onClick={toggleTheme}>
                    <div id='swchbtn2' className='button-swch'>{darkMode ? (<i class="fi fi-rs-moon-stars"></i>) : (<i class="fi fi-rs-brightness"></i>)}</div>
                </button>
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
            <Logo/>
            <button className='theme theme1' onClick={toggleTheme}>
                <div id='swchbtn1' className='button-swch'>{darkMode ? (<i class="fi fi-rs-moon-stars"></i>): (<i class="fi fi-rs-brightness"></i>)}</div>
            </button>

        </div>
    );
}

export default Navigation;
