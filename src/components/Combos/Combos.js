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
  console.log(foundCombo)
  let solutionTracks = Object.keys(foundCombo.solution.counts);

  return (
    (!foundCombo) ? (null) : (
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
                <img src={gag.image} alt={gag.name} />
                <span>{gag.name}</span>
                <span>Damage: {gag.damage}</span>
                <span>Accuracy: {gag.accuracy*100}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className='right'>
          <p>{(foundCombo.isLured) ? 'Cog is Lured' : ''}</p>
          <p>Cog HP: {foundCombo.solution.cogHP}</p>
          <p>Damage: {foundCombo.solution.totalDamage}</p>
        </div>
      </div>
    )
  );
}


export default function Combos({ cog, isLured, numToons, toonsOrg }) {
  // let throwComboGags =  Array(numToons).fill('Throw');
  // let gagComboTracks = ['Drop', 'Drop', 'Drop', 'Sound'];

  // let testCombo = new FindCombo(
  //   cog,
  //   gagComboTracks,  // gag combo tracks
  //   toonsOrg,     // toon organic gags
  //   isLured                                 // is Lured
  // );
  // console.log(`${testCombo.solutionco}`);

  let gagComboTracks = [
    Array(numToons).fill('Sound'),
    Array(numToons).fill('Throw'),
    Array(numToons).fill('Squirt'),
    ['Throw', 'Squirt']
  ];
  let combo;

  return (
    <div className='combos'>
      <h2>Combos</h2>
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
  );
} 
