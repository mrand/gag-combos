import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, setType, toggleExpanded, toggleTrack } from './comboSlice';
import './CombosComponent.css';
import Cog from 'features/cog/Cog';
import { RecommendCombos } from './RecommendCombos';
import ResetButton from 'components/ResetButton';


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


function ExpandAllToggle({ cellStates, setCellStates }) {
  const dispatch = useDispatch();
  const expanded = useSelector((state) => state.combos.expanded);

  return (
    <button 
      className={'switch' + (expanded ? ' on' : '')}
      onClick={(e) => {
        setCellStates(new Array(cellStates.length).fill(!expanded));
        dispatch(toggleExpanded());
      }}
      aria-label="Toggle All Info"
      title="Toggle All Info"
    >
    </button>
  );
}

function TitleContainer({ cellStates, setCellStates }) {
  const resetBtnActive = useSelector((state) => state.combos.hasUpdates);
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
      <CombosGrid 
        recommendCombos={recommendations}
        cellStates={cellStates}
        setCellStates={setCellStates}
      />
      {(!recommendations.isLured && recommendations.recCombos.length > 0) ? (
        <h4 style={{marginTop: "16px"}}>* Lure Accuracy Varies from 50% to 95%</h4>
      ) : ( null )}
      
    </div>
  );
} 
