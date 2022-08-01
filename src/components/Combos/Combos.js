import React from 'react';
import './Combos.css';
import { Combo, FindCombo } from '../../core/Combo';


function ComboCell({ cog, comboTracks, toonsOrg, isLured }) {
  let foundCombo = new FindCombo(
    cog,
    comboTracks,
    toonsOrg,
    isLured
  );
  // console.log(foundCombo)
  
  let solutionTracks;
  if (foundCombo.solution) {
    solutionTracks = Object.keys(foundCombo.solution.counts);
  }

  return (
    (!foundCombo.solution) ? (null) : (
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
            {foundCombo.solution.gags.map((gag, j) => (
              <div 
                className='gag-cell'
                key={j}
              >
                <div>
                  <img src={gag.image} alt={gag.name} />
                  <b>{gag.name}</b>
                </div>
                <div className='gag-stats'>
                  {(gag.name === 'Pass') ? (null) : (
                    <>
                      <span><b>Dmg:</b> {gag.damage}</span>
                      <span><b>Acc:</b> {gag.accuracy*100}%</span>
                    </>
                  )}
                  
                </div>
                
              </div>
            ))}
          </div>
        </div>
        <div className='right'>
          {/* <h4>{(foundCombo.isLured) ? 'Cog is Lured' : ''}</h4> */}
          {/* <h4>Cog HP: </h4> */}
          <h4>Damage: {foundCombo.solution.totalDamage} / {foundCombo.solution.cogHP}</h4>
        </div>
      </div>
    )
  );
}


export default function Combos({ cog, isLured, numToons, toonsOrg }) {

  let gagComboTracks = [
    Array(numToons).fill('Sound'),
    Array(numToons).fill('Throw'),
    Array(numToons).fill('Squirt'),
  ];

  if (!isLured) {
    // Drop Only
    gagComboTracks.push(Array(numToons).fill('Drop'));
  }

  // Lure Trap

  if (numToons > 1) {
    if (!isLured) {
      // Lure Trap Combos
      gagComboTracks.push(['Lure', 'Trap'].concat(Array(numToons-2).fill('Sound')));
      gagComboTracks.push(['Lure', 'Trap'].concat(Array(numToons-2).fill('Throw')));
      gagComboTracks.push(['Lure', 'Trap'].concat(Array(numToons-2).fill('Squirt')));
      gagComboTracks.push(['Lure', 'Trap'].concat(Array(numToons-2).fill('Drop')));
    }

    // Drop Combos
    gagComboTracks.push(['Drop'].concat(Array(numToons-1).fill('Sound')));
    gagComboTracks.push(['Drop'].concat(Array(numToons-1).fill('Throw')));
    gagComboTracks.push(['Drop'].concat(Array(numToons-1).fill('Squirt')));
  }

  // Filter - Remove Non-Unique Combos
  let set  = new Set(gagComboTracks.map(JSON.stringify));
  gagComboTracks = Array.from(set).map(JSON.parse);

  let combo;

  return (
    <div className='combos'>
      <h2>Combos</h2>
      <div className='combos-grid'>
        {gagComboTracks.map((comboTracks, i) => (
          <ComboCell 
            key={i}
            cog={cog}
            comboTracks={comboTracks} 
            toonsOrg={toonsOrg}
            isLured={isLured}
          />          
        ))}
      </div>
      
    </div>
  );
} 
