import React from 'react';
import './Combos.css';
import { RecommendCombos } from '../../core/Combo';


function ComboCell({ cog, combo, toonsOrg, isLured }) {
  let solutionTracks = Object.keys(combo.counts);

  return (
    <div className='combo-cell'>
      <div className='left'>
        {/* heading */}
        <h3>
          {solutionTracks.map((track, j) => {
              if (solutionTracks.length === 1) {
              return track;
            } else {
              return (j===solutionTracks.length-1) ? track : track + ' / ';
            }
          })}
        </h3>
        {/* gags */}
        <div className='combo-gags'>
          {combo.gags.map((gag, j) => (
            <div 
              className='gag-cell'
              key={j}
            >
              <div>
                {(gag.track === 'Lure') ? (
                  <>
                    <img src={'./img/gags/lure-10_bill.png'} alt={'$10 Bill'} />
                    <b>Lure (Any)</b>
                  </>  
                ) : (
                  <>
                    <img src={gag.image} alt={gag.name} />
                    <b>{gag.name}</b>
                  </>
                  
                )}
              </div>
              <div className='gag-stats'>
                {(gag.name === 'Pass') ? (null) : (
                  <>
                    {(gag.track === 'Lure') ? (
                      <>
                        <span><b>Dmg:</b> 0</span>
                        <span><b>Acc:</b> *</span>
                      </>
                    ) : (
                      <>
                        <span><b>Dmg:</b> {gag.damage}</span>
                        <span><b>Acc:</b> {gag.accuracy*100}%</span>
                      </>
                    )}
                  
                    
                  </>
                )}
                
              </div>
              
            </div>
          ))}
        </div>
      </div>
      <div className='right'>
        {/* <h4>{(combo.isLured) ? 'Cog is Lured' : ''}</h4> */}
        {/* <h4>Cog HP: {combo.cogHP}</h4> */}
        <h4>Damage: {combo.totalDamage} / {combo.cogHP}</h4>
      </div>
    </div>
  );
}


export default function Combos({ cog, isLured, numToons, toonsOrg }) {

  let recCombos = new RecommendCombos(
    cog, isLured,        // cog params
    numToons, toonsOrg,  // toons params 
    false                // filter out OP combos
  ).recCombos;           // just grab the combos object
  // console.log(recCombos);

  return (
    <div className='combos'>
      <h2>Combos</h2>
      <div className='combos-grid'>
        {recCombos.map((combo, i) => (
          <ComboCell 
            key={i}
            cog={cog}
            combo={combo} 
            toonsOrg={toonsOrg}
            isLured={isLured}
          />          
        ))}
      </div>
      <h4>* Lure Accuracy Varies from 50% to 95%</h4>
    </div>
  );
} 
