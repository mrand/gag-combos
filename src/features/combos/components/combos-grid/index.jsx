import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import { ComboCell } from '~/features/combo';
import { GagModal } from '~/features/gag';


export default function CombosGrid({ recommendCombos, cellStates, setCellStates }) {
  const gagModalActive = useSelector((state) => state.recommendations.gag.modal.show);

  return (
    <div id='combos-grid'>
      {gagModalActive ? <GagModal /> : null}
      <>
        {(recommendCombos.errorMsg) ? (
          <div className='combo-cell span-2-cols error-msg'>
            <h3>
              {recommendCombos.errorMsg}
            </h3>
          </div>
        ) : (
          <>
            {recommendCombos.recCombos.map((combo, i) => (
              <ComboCell 
                key={i}
                combo={combo} 
                cellNum={i}
                cellStates={cellStates}
                setCellStates={setCellStates}
              />          
            ))}
          </>  
        )}
      </>
    </div>
  );
}
