import React, { useState, useEffect } from 'react';
import PageDesktop from './PageDesktop';
import PageMobile from './PageMobile';


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


export default function PageIndex({ state, dispatch }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Throttled Resize Listener Callback Function
    const handleResize = throttle(() => {
      // Ignore Height Changes
      if (windowWidth !== window.innerWidth) { 
        setWindowWidth(window.innerWidth);
      }
    }, 500);
    // Add Listener
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, [windowWidth]);

  // Return Appropriate Layout 
  let isMobile = (windowWidth <= 1150);
  return (
    (isMobile) ? (
      <PageMobile
        state={state}
        dispatch={dispatch}
      />
    ) : (
      <PageDesktop
        state={state}
        dispatch={dispatch}
      />
    )
  );

}