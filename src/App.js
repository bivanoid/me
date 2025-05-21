import './App.css';
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Introduction from './components/introduction';
import PopupImage from './components/popupimage';
import FadeContent from './components/FadeContent';
// Halaman
import Home from './pages/home';
import AddFeedback from './pages/addfeedback';
import Blog from './pages/blog';

function App() {
  return (
    <Router>
        <div className='body'>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-feedback" element={<AddFeedback />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;
