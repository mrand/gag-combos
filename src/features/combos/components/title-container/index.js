import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCombos, setType, toggleTrack, toggleExpanded } from 'features/combos/combos.slice';
import './index.css';
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


export default function TitleContainer({ cellStates, setCellStates }) {
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
            clickHandler={() => dispatch(resetCombos())}
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