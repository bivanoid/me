import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Introduction from './components/introduction';
import Navigation from './components/navigation';
import PopupImage from './components/popupimage';

// Halaman
import Home from './pages/home';
import AddFeedback from './pages/addfeedback';

function App() {
  return (
    <Router>
      <div className='body'>
        <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/add-feedback" element={<AddFeedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
