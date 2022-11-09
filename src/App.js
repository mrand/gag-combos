import React, { useState, useEffect, useRef, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from 'pages/home';
import Dashboard from 'pages/dashboard';
import Calculator from 'pages/calculator';
import Changelog from 'pages/changelog';
import PrivacyPolicy from 'pages/privacy';
import FAQ from 'pages/faq';


const throttle = (func, delay) => {
  let inProgress = false;
  return (...args) => {
    if (inProgress) {
      return;
    }
    inProgress = true;
    setTimeout(() => {
      func(...args);
      inProgress = false;
    }, delay);
  }
};


export const PageSizeContext = createContext();

export default function App() {
  let windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);

  const throttledChangeHandler = throttle(() => {
    if (
      (windowWidth.current <= 1150 && window.innerWidth > 1150) ||
      (windowWidth.current > 1150 && window.innerWidth <= 1150)
    ) {
      windowWidth.current = window.innerWidth;
      setIsMobile(windowWidth.current <= 1150);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledChangeHandler);
    return () => {
      window.removeEventListener("resize", throttledChangeHandler)
    };
  }, [throttledChangeHandler]);

  const mobileOrDesktop = isMobile ? 'mobile' : 'desktop';
  return (
    <PageSizeContext.Provider value={mobileOrDesktop}>
      <div 
        id='page-wrap'
        className={mobileOrDesktop}
      >

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            {/* 404 - redirect to Home */}
            <Route 
              path="*" 
              element={<Navigate replace to="/" />} 
            />
          </Routes>
        </BrowserRouter>

      </div>
    </PageSizeContext.Provider>
    
  );
}
