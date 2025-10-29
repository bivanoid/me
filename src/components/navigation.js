import { Link } from 'react-router-dom';
import '../styles/navigation.css';
import React, { useState, useEffect } from 'react';
import Logo from './logo';
import ShareSvg from '../iconSvg/shareic';
import Menus from '../iconSvg/menus';
import Close from '../iconSvg/close';

function open() {
    ['menu', 'close', 'thecontent', 'logoMenuIcon', 'expandMenuIcon'].forEach(id => document.getElementById(id)?.classList.toggle('open'))
}

// Fungsi untuk update theme color di browser navigation bar
function updateBrowserThemeColor(color) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Jika meta tag belum ada, buat yang baru
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.setAttribute('content', color);
}

function Navigation() {
    // Inisialisasi state berdasarkan CSS variable yang sedang aktif
    const [darkMode, setDarkMode] = useState(() => {
        const root = document.documentElement;
        const currentPrimary = getComputedStyle(root).getPropertyValue('--primary').trim();
        // Jika primary adalah warna gelap (#0a0a0a), maka dark mode = true
        return currentPrimary === '#0a0a0a' || currentPrimary === 'rgb(10, 10, 10)';
    });

    // Sinkronkan button UI dengan state saat komponen mount
    useEffect(() => {
        const isDark = darkMode;
        ['swchbtn1', 'swchbtn2', 'theme', 'theme2'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (isDark) {
                    element.classList.remove('switchTheme');
                } else {
                    element.classList.add('switchTheme');
                }
            }
        });

        // Update theme-color meta tag saat mount
        updateBrowserThemeColor(isDark ? '#0a0a0a' : '#dbdbce');
    }, [darkMode]); // Jalankan setiap darkMode berubah

    function toggleTheme() {
        const root = document.documentElement;
        ['swchbtn1', 'swchbtn2'].forEach(id => document.getElementById(id)?.classList.toggle('switchTheme'))

        if (darkMode) {
            // Light mode
            root.style.setProperty('--primary', '#dbdbce');
            root.style.setProperty('--primary2', '#dadaddff');
            root.style.setProperty('--primary3', '#fafaff');
            root.style.setProperty('--blue', '#173ff0');
            root.style.setProperty('--button', '#1c1c1c');
            root.style.setProperty('--border', '#0000001e');

            root.style.setProperty('--red-cl', 'rgba(184, 50, 50, 1)');
            root.style.setProperty('--orange-cl', 'rgba(182, 99, 51, 1)');
            root.style.setProperty('--yellow-cl', 'rgba(223, 182, 49, 1)');
            root.style.setProperty('--lime-cl', 'rgba(125, 187, 43, 1)');
            root.style.setProperty('--green-cl', 'rgba(36, 170, 81, 1)');

            // Update browser navigation bar color
            updateBrowserThemeColor('#dbdbce');
        } else {
            // Dark mode
            root.style.setProperty('--primary', '#0a0a0a');
            root.style.setProperty('--primary2', '#131313');
            root.style.setProperty('--primary3', '#232222');
            root.style.setProperty('--blue', '#729cf7');
            root.style.setProperty('--button', '#e9ecef');
            root.style.setProperty('--border', '#ffffff0e');

            root.style.setProperty('--red-cl', 'rgb(252, 88, 88)');
            root.style.setProperty('--orange-cl', 'rgb(250, 134, 66)');
            root.style.setProperty('--yellow-cl', 'rgb(252, 214, 88)');
            root.style.setProperty('--lime-cl', 'rgb(181, 252, 88)');
            root.style.setProperty('--green-cl', 'rgb(88, 252, 143)');

            // Update browser navigation bar color
            updateBrowserThemeColor('#0a0a0a');
        }

        setDarkMode(!darkMode);
    }

    return (
        <div className='navigation'>
            <div className='menu-button' id='expandMenuIcon' onClick={open}><Menus /></div>
            <div className='close' id='close' onClick={open}><div className='menu-button'><Close /></div></div>
            <div id='logoMenuIcon'>
                <Logo />
            </div>
            <ul className='navigasi-menu' id='menu'>
                <h1>/Menus<span className="dot-introduction"></span></h1>
                <li><Link to="/">PORTOFOLIO <div className='arrow'><ShareSvg /></div></Link></li>
                <li><a href='https://github.com/Vandyaaa'>REPOSITORY <div className='arrow'><ShareSvg /></div></a></li>
                <li><Link to='/blog'>MY BLOG <div className='arrow'><ShareSvg /></div></Link></li>
                <button id='theme2' className='theme theme2' onClick={toggleTheme}>
                    <div id='swchbtn2' className='button-swch'>{darkMode ? (<p></p>) : (<p></p>)}</div>
                </button>
            </ul>


            <button id='theme' className='theme theme1' onClick={toggleTheme}>
                <div id='swchbtn1' className='button-swch'>{darkMode ? (<p></p>) : (<p></p>)}</div>
            </button>

        </div>
    );
}

export default Navigation;