import './App.css';
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Introduction from './components/introduction';
import PopupImage from './components/popupimage';
import FadeContent from './components/FadeContent';
// Halaman
import Home from './pages/home';
import AddFeedback from './pages/addfeedback';
import Blog from './pages/blog';
import CustomCursor from './components/CustomCursor';
import ArticlePage from './pages/ArticlePages';
import AnimatedContent from './components/AnimatedContent';
import Loading from './components/loading';

function AppRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={
        <AnimatedContent
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={0}
          
        >
          <Home/>
        </AnimatedContent>
      } />
      <Route path="/add-feedback" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <AddFeedback />
        </FadeContent>
      } />
      <Route path="/blog" element={
        <FadeContent blur={false} duration={500} easing="ease-out" initialOpacity={0}>
          <Blog />
        </FadeContent>
      } />
      <Route path="/article/:id" element={
        <AnimatedContent 
          distance={50}
          direction="vertical"
          reverse={false}
          config={{ tension: 100, friction: 30 }}
          initialOpacity={0}
          animateOpacity
          threshold={0}
          delay={500}
        >
          <ArticlePage />
        </AnimatedContent>
      } />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // 3 detik

    return () => clearTimeout(timer); // Bersihkan timer jika komponen unmount
  }, []);

  return (
    <Router>
      <div className='body'>
      <CustomCursor />
        {loading ? (
          <Loading/>
        ) : (
          <div>
            <AppRoutes />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;