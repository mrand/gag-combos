import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setType, toggleExpanded, toggleTrack } from './comboSlice';
import './index.css';
import Cog from '../cog/Cog';
import { RecommendCombos } from './RecommendCombos';


function ComboCell({ combo, isOnly, cellNum, cellStates, setCellStates }) {
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
                    <b className='gag-name'>Lure (Any)</b>
                  </>  
                ) : (
                  <>
                    <img src={gag.image} alt={gag.name} />
                    <b className='gag-name'>{gag.name}</b>
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
                        <span
                          style={
                            isDropOnly ? {color: 'var(--red-500)'} : {}
                          }
                        ><b>Acc:</b> {gag.accuracy*100}%</span>
                      </>
                    )}
                  
                    
                  </>
                )}
                
              </div>
              
            </div>
          ))}
        </div>
        <div 
          className='combo-stats'
          style={expanded ? {justifyContent: 'center'} : {}}
        >
          {/* <h4>{(combo.isLured) ? 'Cog is Lured' : ''}</h4> */}
          {/* <h4>Cog HP: {combo.cogHP}</h4> */}
          <h4>
            Damage: 
            <span
              style={combo.totalDamage === combo.cogHP ? {color: 'var(--green-500)'} : {}}
            > {combo.totalDamage} / {combo.cogHP}</span>
          </h4>
          {
            !expanded ? (
              <button
                className='expand-btn'
                onClick={() => {
                  let newCellStates = [...cellStates];
                  newCellStates[cellNum] = !newCellStates[cellNum];
                  setCellStates(newCellStates);
                }}
              >
                {
                  thisExpanded ? (
                    <svg 
                      style={isDropOnly ? {fill: 'var(--red-500)'} : {}}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512"
                    >
                      <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
                      <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"/>
                    </svg>
                  ) : (
                    <svg 
                      style={isDropOnly ? {fill: 'var(--red-500)'} : {}}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 512 512">
                      <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
                      <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/>
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


function CombosGrid({ recommendCombos, cellStates, setCellStates }) {
  return (
    <div className='combos-grid'>
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
      >All</button>
      <button
        className={comboType==='Basic' ? 'active' : ''}
        onClick={() => {
          dispatch(setType('Basic'));
          setCellStates(new Array(cellStates.length).fill(expanded));
        }}
      >Basic</button>
      <button
        className={comboType==='Best' ? 'active' : ''}
        onClick={() => {
          dispatch(setType('Best'));
          setCellStates(new Array(cellStates.length).fill(expanded));
        }}
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
        >
          <img src={trackImgs[track]} alt={track + ' Gag'} />
        </button>
      ))}
    </div>
  );
}


function ExpandAllToggle({ cellStates, setCellStates }) {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.combos.expanded);

  return (
    <label className='switch'>
      <input 
        type='checkbox' 
        onChange={() => {
          setCellStates(new Array(cellStates.length).fill(!expanded));
          dispatch(toggleExpanded());
        }}
        defaultChecked={expanded}
      />
      <span className='slider'></span>
    </label>
  );
}

function TitleContainer({ cellStates, setCellStates }) {
  return (
    <div className='title-container'>
      <div>
        <h2>Combos</h2>
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
        <ExpandAllToggle 
          cellStates={cellStates}
          setCellStates={setCellStates}
        />
      </div>
    </div>
  );
}
 

export default function CombosCard() {
  
  // build new recommend combos object
  const cogLevel = useSelector((state) => state.cog.level);
  const cog = cogLevel ? new Cog(cogLevel) : null;
  const isLured = useSelector((state) => state.cog.lured);
  const numToons = useSelector((state) => state.toons.filter(toon => toon.active).length);
  const toonOrgs = useSelector((state) => state.toons.map((toon) => toon.active ? toon.organic : ''));
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
      <CombosGrid 
        recommendCombos={recommendations}
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
      {(!recommendations.isLured && recommendations.recCombos.length > 0) ? (
        <h4>* Lure Accuracy Varies from 50% to 95%</h4>
      ) : ( null )}
      
    </div>
  );
} 
