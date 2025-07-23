import { Link } from 'react-router-dom';
import '../styles/navigation.css';
import Biodata from './biodata';
import logo from '../assets/logo.png'
import React, { useState } from 'react';
import Logo from './logo';

function open() {
    ['menu', 'close', 'thecontent', 'logoMenuIcon', 'expandMenuIcon'].forEach(id => document.getElementById(id)?.classList.toggle('open'))
}
  

function Navigation() {
    const [darkMode, setDarkMode] = useState(true);

    function toggleTheme() {
        const root = document.documentElement;
        ['swchbtn1', 'swchbtn2'].forEach(id => document.getElementById(id)?.classList.toggle('switchTheme'))

        if (darkMode) {
            // Light mode
            root.style.setProperty('--primary', '#e3ccfc9e');
            root.style.setProperty('--primary2', '#4e41ff4b');
            root.style.setProperty('--primary3', '#99b7f0ff');
            root.style.setProperty('--blue', '#29007d');
            root.style.setProperty('--button', '#1c1c1c');
            root.style.setProperty('--border', '#0000001c');
        } else {
            // Dark mode
            root.style.setProperty('--primary', '#0a0a0a');
            root.style.setProperty('--primary2', '#12021b');
            root.style.setProperty('--primary3', '#232222');
            root.style.setProperty('--blue', '#7870fd');
            root.style.setProperty('--button', '#e9ecef');
            root.style.setProperty('--border', '#ffffff0e');

            
        }

        setDarkMode(!darkMode);
    }

    return (
        <div className='navigation'>
            <div className='menu-button' id='expandMenuIcon' onClick={open}><i class="fi fi-rs-expand-arrows"></i></div>
            <div className='close' id='close' onClick={open}><i class="fi fi-rs-down-left-and-up-right-to-center"></i></div>
            <ul className='navigasi-menu' id='menu'>
                <h1>— Menus<span class="dot-introduction"></span></h1>
                <li><Link to="/">PORTOFOLIO <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></Link></li>
                <li><a href='https://github.com/Vandyaaa'>REPOSITORY <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></a></li>
                <li><Link to='/blog'>MY BLOG <div className='arrow'><i class="fi fi-rs-arrow-up-right-from-square"></i></div></Link></li>
                <button className='theme theme2' onClick={toggleTheme}>
                    <div id='swchbtn2' className='button-swch'>{darkMode ? (<i class="fi fi-rs-moon-stars"></i>) : (<i class="fi fi-rs-brightness"></i>)}</div>
                </button>
            </ul>
       
            <div id='logoMenuIcon'>
                <Logo />
            </div>
            <button className='theme theme1' onClick={toggleTheme}>
                <div id='swchbtn1' className='button-swch'>{darkMode ? (<i class="fi fi-rs-moon-stars"></i>): (<i class="fi fi-rs-brightness"></i>)}</div>
            </button>

        </div>
    );
}

export default Navigation;
