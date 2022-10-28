import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';
import { GagCell } from 'features/gags';


function ComboHeading({ solutionTracks }) {
  return (
    <h3>
      {solutionTracks.map((track, j) => {
        if (solutionTracks.length === 1) {
          return track;
        } else {
          return (j===solutionTracks.length-1) ? track : track + ' / ';
        }
      })}
    </h3>
  );
}


function ComboGags({ combo, isDropOnly }) {
  return (
  <div className='combo-gags'>
    {combo.gags.map((gag, j) => (
      <GagCell 
        key={j} 
        gag={gag} 
        isDropOnly={isDropOnly} 
      />
    ))}
  </div>
  );
}


export default function ComboCell({ combo, isOnly, cellNum, cellStates, setCellStates }) {
  const expanded = useSelector((state) => state.combos.expanded);
  let thisExpanded = cellStates[cellNum];
  let solutionTracks = Object.keys(combo.counts);

  let isDropOnly = JSON.stringify(solutionTracks)===JSON.stringify(['Drop']);

  return (
    <div 
      className={
        'combo-cell' + (thisExpanded ? ' expanded' : '') + (isOnly ? ' span-2-cols' : '')
      }
    >
        {/* heading */}
        <ComboHeading solutionTracks={solutionTracks} />
        {/* gags */}
        <ComboGags 
          combo={combo} 
          isDropOnly={isDropOnly}
        />
        {/* stats */}
        <div 
          className='combo-stats'
          style={expanded ? {justifyContent: 'center'} : {}}
        >
          <h4>
            Damage: 
            <span
              style={combo.totalDamage === combo.cogHP ? {color: 'var(--green-500)'} : {}}
            > {combo.totalDamage} / {combo.cogHP}</span>
          </h4>
          {
            !expanded ? (
              <button
                className={'expand-btn' + (isDropOnly ? ' warn' : '')}
                onClick={() => {
                  let newCellStates = [...cellStates];
                  newCellStates[cellNum] = !newCellStates[cellNum];
                  setCellStates(newCellStates);
                }}
                aria-label={"Toggle Gag Info"}
                title={"Toggle Gag Info"}
              >
                {
                  thisExpanded ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
                      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">
                      <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
                      <path d="M144 80c0 26.5-21.5 48-48 48s-48-21.5-48-48s21.5-48 48-48s48 21.5 48 48zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z"/>
                    </svg>
                  )
                }
              </button>
            ) : (
              null
            )
          }
        </div>
    </div>
  );
}
