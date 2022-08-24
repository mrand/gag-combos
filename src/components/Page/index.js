import React, { useState, useEffect } from 'react';
import PageDesktop from './PageDesktop';
import PageMobile from './PageMobile';
import './page.css';


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


export default function PageIndex({ state, dispatch, recommendations }) {
  // console.log('re-render');
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(fn, delay, [...args]);
    };
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize(getWindowSize());
    }, 500);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  let isMobile = (windowSize.innerWidth <= 1150);

  if (isMobile) {
    return (
      <PageMobile
        state={state}
        dispatch={dispatch}
        recommendations={recommendations}
      />
    );
  } else {
    return (
      <PageDesktop
        state={state}
        dispatch={dispatch}
        recommendations={recommendations}
      />
    );
  }
}