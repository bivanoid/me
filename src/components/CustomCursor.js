// components/CustomCursor.jsx
import React, { useEffect, useState } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.matches('a, button, input, img')) {
        setActive(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target.matches('a, button, input, img')) {
        setActive(false);
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
      className={`custom-cursor ${active ? 'active' : ''}`}
      style={{
        top: position.y,
        left: position.x,
      }}
    />
  );
};

export default CustomCursor;
