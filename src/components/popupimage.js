
import React from 'react';
import '../styles/scrollhorizontal.css'; // atau file CSS yang berisi .fullscreen-overlay

export default function PopupImage({ imageUrl, onClose }) {
  if (!imageUrl) return null;

  return (
    <div className="fullscreen-overlay" onClick={onClose}>
      <img src={imageUrl} alt="Fullscreen" />
      
    </div>
  );
}
