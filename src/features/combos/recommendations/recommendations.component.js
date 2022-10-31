import React from 'react';
import { useSelector } from 'react-redux';
import './recommendations.component.css';
import { ComboCell } from 'features/combos/combo';
import { GagModal } from 'features/combos/gag';


export default function RecommendationsComponent({ recommendCombos, cellStates, setCellStates }) {
  const gagModalActive = useSelector((state) => state.gag.show);

  return (
    <div id='recommendations'>
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
                isOnly={recommendCombos.recCombos.length===1}
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
