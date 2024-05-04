import React, { useState } from "react";
import styles from "./index.module.css";

export default function ScrollTopButton() {

  const [visible, setVisible] = useState(false);

  const throttle = (func, delay) => {
    let inProgress = false;
    /* fire before delay */
    return (...args) => {
      if (inProgress) {
        return;
      }
      inProgress = true;
      func(...args);
      setTimeout(() => {
        inProgress = false;
      }, delay);
    }
  };

  const toggleVisible = throttle(() => {
    const scrollPos = document.documentElement.scrollTop;
    setVisible( (scrollPos > 1000) || false);
  }, 100);

  const scrollToTop = () => { 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
    }); 
  }; 
  
  window.addEventListener('scroll', toggleVisible);

  return (
    <button
      aria-label="Scroll to Top"
      className={`btn ${styles.scrollTopButton}`}
      title="Scroll to Top"
      style={{display: visible ? 'inline' : 'none'}}
      onClick={scrollToTop}
    >
      <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
      <svg
        height="1.5rem"
        viewBox="0 0 512 512"
        width="1.5rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path>
      </svg>
    </button>
  );
}
