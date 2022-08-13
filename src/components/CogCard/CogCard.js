import React, { useState } from 'react';
import './CogCard.css';


// list of possible cog levels (1 through 20)
const lvlNums = [];
for (let i=1; i<=20; i++) lvlNums.push(i);


function CogStats({ cog }) {
  return (
    <div className='cog-stats'>
      <img 
        src={cog.cogImage}
        alt={`${cog.cog} Cog`}
      />
      <b>{cog.cog}</b>
      <b>{cog.suit}</b>
      <span className='cog-level'>
        Level {cog.level} 
        <br />
        ({cog.hp} HP)
      </span>
    </div>
  );
}


function CogLevelPicker({ dispatch, setActive, activeBtn, setActiveBtn }) {

  return (
    <div className='lvl-picker'>
      <b>Choose Cog Level</b>
      <div className='lvl-btns'>
        {lvlNums.map((lvl, i) => (
          <button
            className={(activeBtn === i) ? 'active' : ''}
            key={i}
            onClick={() => {
              dispatch({
                type: 'cog',
                'change': 'level',
                'value': lvl
              });
              setActiveBtn(i);
              setActive(false);
            }}
          >{lvl}</button>
        ))}
      </div>
    </div>
  );
}


function LuredToggle({ state, dispatch }) {
  return (
    <div className='lured-toggle'>
      {
        (state.isLured) ? (
          <h3 style={{color: 'var(--green)'}}>Cog is Lured</h3>
        ) : (
          <h3>Is Cog Lured?</h3> 
        )
      }
      <div>
        <img src='./img/gags/lure-10_Bill.png' alt='$10 Bill Lure Gag' />
        <label className='switch'>
          <input 
            type='checkbox' 
            onChange={() => {
              dispatch({
                type: 'cog',
                'change': 'lured',
                'value': !state.cogState.isLured
              });
            }}
            checked={state.isLured}
            defaultChecked={
              state.cogState.isLured ? 'checked' : null
            }
          />
          <span className='slider'></span>
        </label>
      </div>
    </div>
  );
}


export default function CogCard({ state, dispatch }) {
  const [active, setActive] = useState(false);
  const [activeBtn, setActiveBtn] = useState(0);

  const cog = state.cogState.cog;

  return (
    <div id='cog'>
      <h2>Cog</h2>
      <div className='cog-card'>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        {
          (active) ? (
            <CogLevelPicker 
              dispatch={dispatch}
              setActive={setActive} 
              activeBtn={activeBtn}
              setActiveBtn={setActiveBtn}
            />

          ) : (
            <>
              <CogStats cog={cog} />
              <div className='lvl-picker'>
                <button onClick={() => setActive(true)}>Choose Cog Level</button>
              </div>
            </>            
          )
        }
      </div>
      <LuredToggle
        state={state}
        dispatch={dispatch}
      />
    </div>
  );
}