import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { HeaderDesktop, HeaderMobile } from './components/Header/Header';
import InfoCard from './components/InfoCard/InfoCard';
import CogCard from './features/cog';
import ToonsCard from './features/toons';
import CombosCard from './features/combos';


function PageMobile() {
  const [page, setPage] = useState('home');

  let displayedComponent;
  if (page === 'toons') {
    displayedComponent = (
      <ToonsCard />
    );
  } else if (page === 'cog') {
    displayedComponent = (
      <CogCard />
    );
  } else if (page === 'combos') {
    displayedComponent = (
      <CombosCard />
    );
  } else {
    displayedComponent = (
      <InfoCard />
    );
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

  const debouncedChangeHandler = throttle(() => {
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
    window.addEventListener("resize", debouncedChangeHandler);
    return () => {
      window.removeEventListener("resize", debouncedChangeHandler)
    };
  }, [debouncedChangeHandler]);

  return isMobile ? <PageMobile /> : <PageDesktop />;
}

export default App;