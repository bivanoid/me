import React, { useEffect, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [isLink, setIsLink] = useState(false); // 👈 Tambahan

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const hoverableSelectors = [
      'a',
      'button',
      'input',
      'img',
      '.circular-text',
      '.hover-area',
      '.prev',
      '.next'
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
        setIsLink(true); // 👈 Aktifkan warna biru
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (isHoverable(target)) {
        setActive(false);
      }
      if (target.closest('.prev, .next')) {
        setIsLink(false); // 👈 Nonaktifkan warna biru
      }
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
      className={`custom-cursor ${active ? 'active' : ''} ${isLink ? 'cursor-blue' : ''}`}
      style={{
        top: position.y,
        left: position.x,
      }}
    />
  );
};

export default CustomCursor;
