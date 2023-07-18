import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCombos, setComboType, setComboSort, toggleGagTrack, toggleCombosExpanded } from '~/features/recommendations';
import './index.css';
import ResetButton from '~/features/ui/reset-button';
import SliderButton from '~/features/ui/slider-button';


function MainFilters({ cellStates, setCellStates }) {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.recommendations.combos.expanded);

  return (
    <div className='btns main-filters'>

      <div>
        <span>Filter by:</span>
        <select 
          onChange={(e) => {
            dispatch(setComboType(e.target.value));
            setCellStates(new Array(cellStates.length).fill(expanded));
          }}
          title='Filter Combos by Type'
        >
          {
            [
              'All', 
              'Basic', 
              'Best', 
            ].map((filterVal, i) => (
              <option key={i} value={filterVal}>{filterVal}</option>   
            ))
          }
        </select>
      </div>

      <div>
        <span>Sort by:</span>
        <select 
          onChange={(e) => {
            dispatch(setComboSort(e.target.value));
            setCellStates(new Array(cellStates.length).fill(expanded));
          }}
          title='Sort Recommended Combos'
        >
          {
            [
              'Default', 
              'Accuracy', 
              'Damage', 
              'Accuracy+Damage', 
              'Damage+Accuracy'
            ].map((sortVal, i) => (
              <option key={i} value={sortVal}>{sortVal}</option>   
            ))
          }
        </select>
      </div>
      
    </div>
  );
}


function GagToggles() {
  const dispatch = useDispatch();
  const gagFilters = useSelector((state) => state.recommendations.combos.filters);

  let trackImgs = {
    'Toon-Up': './img/gags/toonup-feather.png',
    'Trap':    './img/gags/trap-bananapeel.png',
    'Lure':    './img/gags/lure-1bill.png',
    'Sound':   './img/gags/sound-bikehorn.png',
    'Throw':   './img/gags/throw-cupcake.png',
    'Squirt':  './img/gags/squirt-squirtingflower.png',
    'Drop':    './img/gags/drop-flowerpot.png'
  };
  return (
    <div className='btns gag-toggles'>
      {Object.keys(trackImgs).map((track, i) => (
        <button 
          key={i}
          className={gagFilters[track] ? 'active' : ''}
          onClick={() => {
            dispatch(toggleGagTrack(track));
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
  const resetBtnActive = useSelector((state) => state.recommendations.combos.hasUpdates);
  const expanded = useSelector((state) => state.recommendations.combos.expanded);
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
            dispatch(toggleCombosExpanded());
          }}
          infoText="Toggle All Info"
        />
      </div>
    </div>
  );
}