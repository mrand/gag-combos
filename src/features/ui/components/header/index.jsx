import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./index.module.css";


function HeaderNav({ location, mobileNavActive }) {
  return (
    <nav className={`${styles.headerNav} ${mobileNavActive ? styles.displayed : ""}`}>
      <Link 
        to="/" 
        className={`${styles.headerLink} ${styles.navLink} ${location === "/" ? styles.active : ""}`}
      >
        Home
      </Link>
      <Link 
        to="/calculator"
        className={`${styles.headerLink} ${styles.navLink} ${location === "/calculator" ? styles.active : ""}`}
      >
        Calculator
      </Link>
      <Link 
        to="/recommendations"
        className={`${styles.headerLink} ${styles.navLink} ${location === "/recommendations" ? styles.active : ""}`}
      >
        Recommendations
      </Link>
      <Link 
        to="/faq" 
        className={`${styles.headerLink} ${styles.navLink} ${location === "/faq" ? styles.active : ""}`}
      >
        FAQ
      </Link>
    </nav>
  );
}


function HamburgerButton({ mobileNavActive, setMobileNavActive }) {
  return (
    <button 
      className={`btn ${styles.headerNavMenuBtn} ${mobileNavActive ? styles.active : ""}`}
      aria-label="Toggle Main Navigation Menu"
      title="Toggle Main Navigation Menu"
      onClick={() => setMobileNavActive(!mobileNavActive)}
    >
      {
        mobileNavActive ? (
          <>
            <span>Close</span>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504L738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512L828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496L285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512L195.2 285.696a64 64 0 0 1 0-90.496z" />
            </svg>
          </>
        ) : (
          <>
            <span>Menu</span>
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5H2V3h12v2zm0 4H2V7h12v2zM2 13h12v-2H2v2z" />
            </svg>
          </>
        )
      }
    </button>
  );
}


function MobileNavBg({ setMobileNavActive }) {
  return (
    <button
      className={styles.mobileNavBg}
      onClick={() => setMobileNavActive(false)}
      aria-label="Close Main Navigation Menu"
      title="Close Main Navigation Menu"
    ></button>
  );
}


export default function Header() {
  const location = useLocation().pathname;
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={`custom-scrollbar wrapper ${styles.headerWrap}`}>

          {/* Logo */}
          <h1>
            <Link 
              to="/" 
              title="Navigate to Homepage"
              className={`${styles.headerLink} ${styles.logoLink} ${(location === "/") ? styles.active : ""}`}
            >
              <span className={styles.logoTextSm}>GC</span>
              <span className={styles.logoTextLg}>Gag Combos Info</span>
            </Link>
          </h1>

          {/* Hamburger Button */}
          <HamburgerButton 
            mobileNavActive={mobileNavActive} 
            setMobileNavActive={setMobileNavActive}
          />

          {/* Navigation */}
          <HeaderNav location={location} mobileNavActive={mobileNavActive} />
        
        </div>
      </header>

      {/* Mobile Nav Background */}
      {
        mobileNavActive && (
          <MobileNavBg setMobileNavActive={setMobileNavActive} />
        )
      }

    </>
  );
}
