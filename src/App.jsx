import React, { useState, useEffect, useRef, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "~/pages/home";
import Recommendations from "~/pages/recommendations";
import Calculator from "~/pages/calculator";
import Changelog from "~/pages/changelog";
import PrivacyPolicy from "~/pages/privacy";
import FAQ from "~/pages/faq";
import PageNotFound from "~/pages/page-not-found";


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


export const DeviceContext = createContext();


function getDefaultFontSize() {
  const element = document.createElement("div");
  element.style.width = "1rem";
  element.style.display = "none";
  document.body.append(element);
  const widthMatch = window
      .getComputedStyle(element)
      .getPropertyValue("width")
      .match(/\d+/);
  element.remove();
  if (!widthMatch || widthMatch.length < 1) {
      return null;
  }
  const result = Number(widthMatch[0]);
  return !isNaN(result) ? result : null;
}





export default function App() {

  let initialDevice = useRef(getDevice());
  const [device, setDevice] = useState(initialDevice.current);


  /**
   * Categorize screens as "mobile" or "desktop"
   * based on their width in "rem" units.
   */ 
  // get current device width
  function getDevice() {
    const breakpoint = 72;  // rem
    // get window width in rem units
    const width = window.innerWidth / getDefaultFontSize();
    // categorize as desktop or mobile
    const device = width > breakpoint ? "desktop" : "mobile";
    return device;
  }
  // check current device width against stored device width
  function checkDevice() {
    const currDevice = getDevice();
    if (initialDevice.current !== currDevice) {
      initialDevice.current = currDevice;
      setDevice(currDevice);
    }
  }


  // Resize Handler - throttled event listener
  const throttledResizeHandler = throttle(() => {
    checkDevice();
  }, 200);
  useEffect(() => {
    window.addEventListener("resize", throttledResizeHandler);
    return () => {
      window.removeEventListener("resize", throttledResizeHandler)
    };
  }, [throttledResizeHandler]);

  // Font Size Change Handler - check every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      checkDevice();
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  
  return (
    <DeviceContext.Provider value={device}>
      <div className={`${styles.pageWrap} ${device}`}>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            {/* 404 */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

      </div>
    </DeviceContext.Provider>
  );
}
