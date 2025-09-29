  import React, { useEffect, useState } from 'react';
  import '../styles/cursor.css';
import MouseIc from '../iconSvg/mouseic';

  const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);
    const [isLink, setIsLink] = useState(false); // 👈 Tambahan
    const [isClose, setIsClose] = useState(false); // 👈 Tambahan
    

    useEffect(() => {
      const move = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      const hoverableSelectors = [
        'a',
        'button',
        'input',
        '.gambar',
        '.circular-text',
        '.hover-area',
        '.prev',
        '.next',
        '.clstgr'
      ];

      const isHoverable = (element) => {
        if (!element) return false;
        return hoverableSelectors.some((selector) => element.closest(selector));
      };

      const handleMouseOver = (e) => {
        const target = e.target;
        if (isHoverable(target)) {
          setActive(true);
        }
        if (target.closest('.prev, .next')) {
          setIsLink(true);
        } 
        if (target.closest('.clstgr')) {
          setIsClose(true)
        }
      };

      const handleMouseOut = (e) => {
        const target = e.target;
        if (isHoverable(target)) {
          setActive(false);
          setIsLink(false); 
          setIsClose(false); 
        }
        // if (target.closest('.prev, .next')) {
        //   setIsLink(false); 
        // }
        // if (target.closest('.clstgr')) {
        //   setIsClose(false); 
        // }
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    }, []);

    return (
      <div
        className={`custom-cursor ${active ? 'active' : ''} ${isLink ? 'cursor-blue' : ''} ${isClose ? 'cursor-close' : ''}`}
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        {/* <div className='iccsr'>✦</div> */}
        <MouseIc/>
      </div>
    );
  };

  export default CustomCursor;
