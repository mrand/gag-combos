import React, { useState } from 'react';
import './PageMobile.css';

import HeaderMobile from '../Header/HeaderMobile';
import InfoCard from '../InfoCard/InfoCard';
import CogCard from '../CogCard/CogCard';
import ToonsCard from '../ToonsCard/ToonsCard';
import Combos from '../Combos/Combos';


function ShowPage({ page, state, dispatch, recommendations }) {
  if (page === 'toons') {
    return (
      <ToonsCard
        state={state}
        dispatch={dispatch}
      />
    );
  } else if (page === 'cog') {
    return (
      <CogCard
        state={state}
        dispatch={dispatch}
      />
    );
    
  } else if (page === 'combos') {
    return (
      <Combos 
        state={state}
        dispatch={dispatch}
        recommendations={recommendations}
      />
    );
  } else {
    return (
      <InfoCard />
    );
  }
}


export default function PageMobile({ state, dispatch, recommendations }) {
  const [page, setPage] = useState('home');

  return (
    <>
      <HeaderMobile 
        page={page}
        setPage={setPage}
      />
      <div className='page-wrap-mobile'>
        <ShowPage 
          page={page}
          state={state}
          dispatch={dispatch}
          recommendations={recommendations}
        />
      </div>
    </>
    
  );
}