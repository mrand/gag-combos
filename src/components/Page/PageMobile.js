import React, { useState } from 'react';

import { HeaderMobile } from '../Header/Header';
import InfoCard from '../InfoCard/InfoCard';
import CogCard from '../CogCard/CogCard';
import ToonsCard from '../ToonsCard/ToonsCard';
import Combos from '../Combos/Combos';


export default function PageMobile({ state, dispatch, recommendations }) {
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