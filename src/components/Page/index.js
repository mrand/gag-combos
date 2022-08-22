import React, { useState, useEffect } from 'react';
import PageDesktop from './PageDesktop';
import PageMobile from './PageMobile';


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

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
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize(getWindowSize());
    }, 500);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  let isMobile = (windowSize.innerWidth <= 1150);

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