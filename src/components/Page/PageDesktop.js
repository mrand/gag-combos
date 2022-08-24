import React, { useState } from 'react';
import './PageDesktop.css';

import HeaderDesktop from '../Header/HeaderDesktop';
import InfoCard from '../InfoCard/InfoCard';
import CogCard from '../CogCard/CogCard';
import ToonsCard from '../ToonsCard/ToonsCard';
import Combos from '../Combos/Combos';


export default function PageDesktop({ state, dispatch, recommendations }) {

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
        <div className='popup'>
          <InfoCard 
            includeLink={true} 
            setInfoActive={setInfoActive} 
            />
        </div>
      ) : (
        <div className='page-wrap-desktop'>
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
      
    </>
    
  );
}