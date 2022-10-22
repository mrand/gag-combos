import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { HeaderDesktop, HeaderMobile } from './features/ui/Header';
import InfoCard from './features/ui/InfoCard';
import CogCard from './features/cog/CogCard';
import ToonsCard from './features/toons/ToonsCard';
import CombosCard from './features/combos/CombosCard';


function PageMobile() {
  const [page, setPage] = useState('home');

  let displayedComponent;
  if (page === 'toons') {
    displayedComponent = <ToonsCard />;
  } else if (page === 'cog') {
    displayedComponent = <CogCard />;
  } else if (page === 'combos') {
    displayedComponent = <CombosCard />;
  } else {
    displayedComponent = <InfoCard />;
  }

  return (
    <div className='mobile'>
      <HeaderMobile
        page={page}
        setPage={setPage}
      />
      <div className='page-wrap custom-scrollbar'>
        {displayedComponent}
      </div>
    </div>
  );
}


function PageDesktop() {
  // User Brought to Info Page Only on 1st Visit
  // localStorage.clear();
  const [infoActive, setInfoActive] = useState(
    ((localStorage.getItem('saw-info-card')) ? false : true )
  );

  return (
    <div className='desktop'>
      <HeaderDesktop
        infoActive={infoActive}
        setInfoActive={setInfoActive}
      />
      {infoActive ? (
        <div className='popup'>
          <InfoCard
            includeLink={true}
            setInfoActive={setInfoActive}
            />
        </div>
      ) : (
        <div className='page-wrap'>
          <ToonsCard />
          <CombosCard />
          <CogCard />
        </div>
      )}
    </div>
  );
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

function App() {
  let windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);

  const throttledChangeHandler = throttle(() => {
      // console.log(windowWidth.current, window.innerWidth);
      if (
        (windowWidth.current <= 1150 && window.innerWidth > 1150) ||
        (windowWidth.current > 1150 && window.innerWidth <= 1150)
      ) {
        windowWidth.current = window.innerWidth;
        // console.log('updated', windowWidth.current, window.innerWidth);
        setIsMobile(windowWidth.current <= 1150);
      }
    }, 200);

  useEffect(() => {
    window.addEventListener("resize", throttledChangeHandler);
    return () => {
      window.removeEventListener("resize", throttledChangeHandler)
    };
  }, [throttledChangeHandler]);

  return isMobile ? <PageMobile /> : <PageDesktop />;
}

export default App;
