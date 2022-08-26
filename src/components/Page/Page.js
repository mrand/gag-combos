import React, { useState, useEffect, useRef } from 'react';
import './Page.css';
import { HeaderDesktop, HeaderMobile } from '../Header/Header';
import InfoCard from '../InfoCard/InfoCard';
import CogCard from '../CogCard/CogCard';
import ToonsCard from '../ToonsCard/ToonsCard';
import Combos from '../Combos/Combos';


function PageMobile({ state, dispatch, recommendations }) {
  const [page, setPage] = useState('home');

  let displayedComponent;
  if (page === 'toons') {
    displayedComponent = (
      <ToonsCard
        state={state}
        dispatch={dispatch}
      />
    );
  } else if (page === 'cog') {
    displayedComponent = (
      <CogCard
        state={state}
        dispatch={dispatch}
      />
    );
  } else if (page === 'combos') {
    displayedComponent = (
      <Combos 
        state={state}
        dispatch={dispatch}
        recommendations={recommendations}
      />
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
      <div className='page-wrap'>
        {displayedComponent}
      </div>
    </div>
  );
}


function PageDesktop({ state, dispatch, recommendations }) {
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
          <ToonsCard
            state={state}
            dispatch={dispatch}
          />
          <Combos 
            state={state}
            dispatch={dispatch}
            recommendations={recommendations}
          />
          <CogCard 
            state={state}
            dispatch={dispatch}
          />
        </div>
      )}
    </div>
  );
} 


// const debounce = (fn, delay) => {
//   let timerId;
//   return (...args) => {
//     clearTimeout(timerId);
//     timerId = setTimeout(fn, delay, [...args]);
//   };
// };

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


export default function Page({ state, dispatch, recommendations }) {
  console.log('page re-render')
  let windowWidth = useRef(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1150);

  const debouncedChangeHandler = throttle(() => {
      // console.log(windowWidth.current, window.innerWidth);
      console.log('resize listener');
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
