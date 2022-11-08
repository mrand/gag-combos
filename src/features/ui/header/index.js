import React, { useState, useContext } from 'react';
import { PageSizeContext } from 'App'
import { useLocation, Link } from 'react-router-dom';
import './index.css';


function HeaderNav({ location }) {
  return (
    <nav>
      <Link 
        to="/" 
        className={location === "/" ? "active" : ""}
      >
        Home
      </Link>
      <Link 
        to="/calculator"
        className={location === "/calculator" ? "active" : ""}
      >
        Calculator
      </Link>
      <Link 
        to="/dashboard"
        className={location === "/dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link 
        to="/faq" 
        className={location === "/faq" ? "active" : ""}
      >
        FAQ
      </Link>
    </nav>
  );
}


function HamburgerButton({ mobileNavActive, setMobileNavActive }) {
  return (
    <button 
      id="header-nav-menu-btn" 
      aria-label="Toggle Main Navigation Menu"
      title="Toggle Main Navigation Menu"
      onClick={() => setMobileNavActive(!mobileNavActive)}
      className={mobileNavActive ? "active" : ""}
    >
      {
        mobileNavActive ? (
          <>
            <span>Close</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
            </svg>
          </>
        ) : (
          <>
            <span>Menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
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
      id='mobile-nav-bg'
      onClick={() => setMobileNavActive(false)}
      aria-label="Close Main Navigation Menu"
      title="Close Main Navigation Menu"
    ></button>
  );
}


export default function Header() {
  const pageSize = useContext(PageSizeContext);
  const location = useLocation().pathname;
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <>
      <header>
        <div className='wrapper'>
          {/* Logo */}
          <h1>
            <Link 
              to="/" 
              title="Navigate to Homepage"
              className={location === "/" ? "active" : ""}
            >
              {pageSize==='mobile' ? "GC" : "Gag Combos Info"}
            </Link>
          </h1>
          {/* Desktop Nav */}
          {
            pageSize==='desktop' ? (
              <HeaderNav location={location} />
            ) : null
          }
          {/* Hamburger Button */}
          {
            pageSize==='mobile' ? (
              <HamburgerButton 
                mobileNavActive={mobileNavActive} 
                setMobileNavActive={setMobileNavActive}
              />
            ) : null
          }
        </div>
        {/* Mobile Nav */}
        {
          pageSize==='mobile' && mobileNavActive ? (
            <div id='mobile-header-nav' className='wrapper'>
              <HeaderNav location={location} />          
            </div>
          ) : null
        }
      </header>
      {/* Mobile Nav Background */}
      {
        pageSize==='mobile' && mobileNavActive ? (
          <MobileNavBg setMobileNavActive={setMobileNavActive} />
        ) : null
      }
    </>
  );
}
