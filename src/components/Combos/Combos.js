import React from 'react';
import './Combos.css';
import { RecommendCombos } from '../../core/RecommendCombos';


function ComboCell({ combo, isOnly }) {
  let solutionTracks = Object.keys(combo.counts);

  return (
    <div 
      className={
        'combo-cell'+ (isOnly ? ' span-2-cols' : '')
      }
    >
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
                            JSON.stringify(solutionTracks)===JSON.stringify(['Drop']) ? 
                            {color: 'var(--red)'} : {}
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
      </div>
      <div className='right'>
        {/* <h4>{(combo.isLured) ? 'Cog is Lured' : ''}</h4> */}
        {/* <h4>Cog HP: {combo.cogHP}</h4> */}
        <h4>
          Damage: 
          <span
            style={combo.totalDamage === combo.cogHP ? {color: 'var(--green)'} : {}}
          > {combo.totalDamage} / {combo.cogHP}</span>
        </h4>
      </div>
    </div>
  );
}


function CombosGrid({ cog, toonOrgs, isLured, recommendCombos }) {
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
              />          
            ))}
          </>  
        )}
      </>
    </div>
  );
}


function MainFilters({ state, dispatch }) {
  let comboType = state.comboState.comboType;
  return (
    <div className='btns main-filters'>
      <button 
        className={comboType==='All' ? 'active' : ''}
        onClick={() => {
          dispatch({
            type: 'combo', 
            'change': 'comboType',
            'value': 'All'
          })
        }}
      >All</button>
      <button
        className={comboType==='Basic' ? 'active' : ''}
        onClick={() => {
          dispatch({
            type: 'combo', 
            'change': 'comboType',
            'value': 'Basic'
          })
        }}
      >Basic</button>
      <button
        className={comboType==='Best' ? 'active' : ''}
        onClick={() => {
          dispatch({
            type: 'combo', 
            'change': 'comboType',
            'value': 'Best'
          })
        }}
      >Best</button>
    </div>
  );
}

function GagToggles({ state, dispatch }) {
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
          className={state.comboState.gagFilters[track] ? 'active' : ''}
          onClick={() => {
            dispatch({
              type: 'combo', 
              'change': '',
              'value': track
            });
          }}
        >
          <img src={trackImgs[track]} alt={track + ' Gag'} />
        </button>
      ))}
    </div>
  );
}

function TitleContainer({ state, dispatch }) {
  return (
    <div className='title-container'>
      <div>
        <h2>Combos</h2>
        <MainFilters 
          state={state}
          dispatch={dispatch}
        />
      </div>
      <div>
        <h3>Toggle Gag Tracks</h3>
        <GagToggles
          state={state}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}
 

export default function Combos({ state, dispatch }) {

  let cog =      state.cogState.cog;
  let isLured =  state.cogState.isLured;
  let numToons = state.toonState.filter(toon => toon !== '').length;
  let toonOrgs = state.toonState.map((toon) => toon !== '' ? toon.organic : '');
  let comboType = state.comboState.comboType;
  let gagFilters = state.comboState.gagFilters;

  let recommendCombos = new RecommendCombos(
    cog, isLured,          // cog params
    numToons, toonOrgs,    // toons params 
    comboType, gagFilters  // combo params
  )
  // console.log(recommendCombos);

  return (
    <div id='combos'>
      <TitleContainer 
        state={state}
        dispatch={dispatch}
      />
      <CombosGrid 
        cog={cog}
        toonOrgs={toonOrgs}
        isLured={isLured}
        recommendCombos={recommendCombos}
      />
      {(!isLured && recommendCombos.recCombos.length > 0) ? (
        <h4>* Lure Accuracy Varies from 50% to 95%</h4>
      ) : ( null )}
      
    </div>
  );
} 
