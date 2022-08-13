import './PageDesktop.css';

import HeaderDesktop from '../Header/HeaderDesktop';
import CogCard from '../CogCard/CogCard';
import ToonsCard from '../ToonsCard/ToonsCard';
import Combos from '../Combos/Combos';

export default function PageDesktop({ state, dispatch }) {
  return (
    <>
      <HeaderDesktop />
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
    </>
    
  );
}