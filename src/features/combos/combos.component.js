import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, setType, toggleTrack, toggleExpanded } from 'features/combos/combos.slice';
import { Cog } from 'features/cog';
import { RecommendCombos } from './recommendations/modules';
import './combos.component.css';
import { RecommendationsComponent } from './recommendations'; 
import ResetButton from 'features/ui/reset-button';
import SliderButton from 'features/ui/slider-button';


function MainFilters({ cellStates, setCellStates }) {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.combos.expanded);
  const comboType = useSelector((state) => state.combos.type);

  return (
    <div className='btns main-filters'>
      <button 
        className={comboType==='All' ? 'active' : ''}
        onClick={() => {
          dispatch(setType('All'));
          setCellStates(new Array(cellStates.length).fill(expanded));
        }}
        aria-label={"Show All Combos"}
        title={"Show All Combos"}
      >All</button>
      <button
        className={comboType==='Basic' ? 'active' : ''}
        onClick={() => {
          dispatch(setType('Basic'));
          setCellStates(new Array(cellStates.length).fill(expanded));
        }}
        aria-label={"Show Basic Combos"}
        title={"Show Basic Combos"}
      >Basic</button>
      <button
        className={comboType==='Best' ? 'active' : ''}
        onClick={() => {
          dispatch(setType('Best'));
          setCellStates(new Array(cellStates.length).fill(expanded));
        }}
        aria-label={"Show Best Combos"}
        title={"Show Best Combos"}
      >Best</button>
    </div>
  );
}


function GagToggles() {
  const dispatch = useDispatch();
  const gagFilters = useSelector((state) => state.combos.filters);

  let trackImgs = {
    'Toon-Up': './img/gags/toonup-Feather.png',
    'Trap':    './img/gags/trap-Banana_Peel.png',
    'Lure':    './img/gags/lure-1_Bill.png',
    'Sound':   './img/gags/sound-Bike_Horn.png',
    'Throw':   './img/gags/throw-Cupcake.png',
    'Squirt':  './img/gags/squirt-Squirting_Flower.png',
    'Drop':    './img/gags/drop-Flower_Pot.png'
  };
  return (
    <div className='btns gag-toggles'>
      {Object.keys(trackImgs).map((track, i) => (
        <button 
          key={i}
          className={gagFilters[track] ? 'active' : ''}
          onClick={() => {
            dispatch(toggleTrack(track));
          }}
          aria-label={"Toggle "+track+" Track"}
          title={"Toggle "+track+" Track"}
        >
          <img src={trackImgs[track]} alt={track + ' Gag'} />
        </button>
      ))}
    </div>
  );
}


function TitleContainer({ cellStates, setCellStates }) {
  const resetBtnActive = useSelector((state) => state.combos.hasUpdates);
  const expanded = useSelector((state) => state.combos.expanded);
  const dispatch = useDispatch();

  return (
    <div className='title-container'>
      <div>
        <div className='heading-btn-wrap'>
          <h2>Combos</h2>
          <ResetButton 
            active={resetBtnActive}
            clickHandler={() => dispatch(reset())}
            infoText="Reset Combos Options"
          />
        </div>
        <MainFilters 
          cellStates={cellStates}
          setCellStates={setCellStates}
        />
      </div>
      <div>
        <h3>Toggle Gag Tracks</h3>
        <GagToggles />
      </div>
      <div>
        <h3>Expand All Info</h3>
        <SliderButton 
          active={expanded}
          clickHandler={() => {
            setCellStates(new Array(cellStates.length).fill(!expanded));
            dispatch(toggleExpanded());
          }}
          infoText="Toggle All Info"
        />
      </div>
    </div>
  );
}


export default function CombosComponent() {
  
  // build new recommend combos object
  const cogLevel = useSelector((state) => state.cog.level);
  const cog = cogLevel ? new Cog(cogLevel) : null;
  const isLured = useSelector((state) => state.cog.lured);
  const numToons = useSelector((state) => state.toons.toonlist.filter(toon => toon.active).length);
  const toonOrgs = useSelector((state) => state.toons.toonlist.map((toon) => toon.active ? toon.organic : ''));
  const comboType = useSelector((state) => state.combos.type);
  const gagFilters = useSelector((state) => state.combos.filters);

  const recommendations = new RecommendCombos(
    cog, isLured,          // cog params
    numToons, toonOrgs,    // toons params 
    comboType, gagFilters  // combo params
  );

  const numCells = recommendations.recCombos.length;
  const expanded = useSelector((state) => state.combos.expanded);

  const [cellStates, setCellStates] = useState(new Array(numCells).fill(expanded));
  useEffect(() => {
    setCellStates(new Array(numCells).fill(expanded))
  }, [numCells, expanded]);

  return (
    <div id='combos'>
      <TitleContainer 
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
      <RecommendationsComponent 
        recommendCombos={recommendations}
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
      {(!recommendations.isLured && recommendations.recCombos.length > 0) ? (
        <h4 style={{marginTop: "16px", textAlign: "center"}}>* Lure Accuracy Varies from 50% to 95%</h4>
      ) : ( null )}
      
    </div>
  );
} 
