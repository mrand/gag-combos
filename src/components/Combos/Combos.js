import React from 'react';
import './Combos.css';
import { FindCombo } from '../../core/Combo';





export default function Combos({ cog, isLured, numToons, toonsOrg }) {
  let gagComboTracks =  Array(numToons).fill('Throw');
  // let gagComboTracks = ['Drop', 'Drop', 'Drop', 'Sound'];

  let testCombo = new FindCombo(
    cog,
    gagComboTracks,  // gag combo tracks
    toonsOrg,     // toon organic gags
    isLured                                 // is Lured
  );
  console.log(`${testCombo.solution}`);
  return (
    <span></span>
  );
} 
