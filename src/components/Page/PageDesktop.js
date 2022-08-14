import React, { useState } from 'react';
import './PageDesktop.css';

import HeaderDesktop from '../Header/HeaderDesktop';
import InfoCard from '../InfoCard/InfoCard';
import CogCard from '../CogCard/CogCard';
import ToonsCard from '../ToonsCard/ToonsCard';
import Combos from '../Combos/Combos';


function InfoPopup({ setInfoActive }) {
  return (
    <div className='popup'>
      <InfoCard />
      <button 
          className='popup-btn'
          onClick={() => {
            localStorage.setItem('saw-info-card', true);
            setInfoActive(false);
          }}
        >
          Take Me to the Dashboard!
        </button>
    </div>
  );
}

export default function PageDesktop({ state, dispatch }) {

  // User Brought to Info Page Only on 1st Visit
  // localStorage.clear();
  const [infoActive, setInfoActive] = useState(
    ((localStorage.getItem('saw-info-card')) ? false : true )
  );

  return (
    <>
      <HeaderDesktop
        infoActive={infoActive}
        setInfoActive={setInfoActive}
      />
      {infoActive ? (
        <InfoPopup 
          setInfoActive={setInfoActive}
        /> 
      ) : (
        <div className='page-wrap-desktop'>
          <ToonsCard
            state={state}
            dispatch={dispatch}
          />
          <Combos 
            state={state}
            dispatch={dispatch}
          />
          <CogCard 
            state={state}
            dispatch={dispatch}
          />
        </div>
      )}
      
    </>
    
  );
}