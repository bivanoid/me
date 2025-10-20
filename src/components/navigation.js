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
        ['swchbtn1', 'swchbtn2'].forEach(id => {
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
                <button className='theme theme2' onClick={toggleTheme}>
                    <div id='swchbtn2' className='button-swch'>{darkMode ? (<p></p>) : (<p></p>)}</div>
                </button>
            </ul>


            <button className='theme theme1' onClick={toggleTheme}>
                <div id='swchbtn1' className='button-swch'>{darkMode ? (<p></p>) : (<p></p>)}</div>
            </button>

        </div>
    );
}

export default Navigation;