import React, { useState, useEffect, useRef } from 'react';
import PageDesktop from './PageDesktop';
import PageMobile from './PageMobile';
import './Page.css';


const debounce = (fn, delay) => {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(fn, delay, [...args]);
  };
};


export default function PageIndex({ state, dispatch, recommendations }) {
  // console.log('re-render');

  let windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);

  const debouncedChangeHandler = debounce(() => {
      // console.log(windowWidth.current, window.innerWidth);
      if (
        (windowWidth.current <= 1150 && window.innerWidth > 1150) ||
        (windowWidth.current > 1150 && window.innerWidth <= 1150)
      ) {
        windowWidth.current = window.innerWidth;
        // console.log('updated', windowWidth.current, window.innerWidth);
        setIsMobile(windowWidth.current <= 1150);
      }
    }, 500);

  useEffect(() => {
    window.addEventListener("resize", debouncedChangeHandler);
    return () => {
      window.removeEventListener("resize", debouncedChangeHandler)
    };
  }, [debouncedChangeHandler]);

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