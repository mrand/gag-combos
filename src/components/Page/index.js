import React, { useState, useEffect } from 'react';
import PageDesktop from './PageDesktop';
import PageMobile from './PageMobile';
import './page.css';


function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}


function ResizeCover() {
  return (
    <div id='resize-cover'>
      <h2>Gag<br />Combos</h2>
    </div>
  );
}


export default function PageIndex({ state, dispatch }) {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [resizing, setResizing] = useState(false);

  const debounce = (fn, delay) => {
    let timerId;
    return (...args) => {
      setResizing(true);
      clearTimeout(timerId);
      timerId = setTimeout(fn, delay, [...args]);
    };
  };

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowSize(getWindowSize());
      setResizing(false);
    }, 500);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize)
    };
  }, []);

  let isMobile = (windowSize.innerWidth <= 1150);

  if (resizing) {
    return (<ResizeCover />);
  } else if (isMobile) {
    return (
      <PageMobile
        state={state}
        dispatch={dispatch}
      />
    );
  } else {
    return (
      <PageDesktop
        state={state}
        dispatch={dispatch}
      />
    );
  }
}