import React, { useState, useEffect } from 'react';
import './CogCard.css';


// list of possible cog levels (1 through 20)
const lvlNums = [];
for (let i=1; i<=20; i++) lvlNums.push(i);


function CogStats({ cog }) {
  return (
    <div className='cog-stats'>
      <img 
        src={cog.cogImage}
        alt={`${cog.cog} Image`}
      />
      <p>{cog.cog}</p>
      <p>{cog.suit}</p>
      <br />
      <span className='cog-level'>
        Level {cog.level} 
        <br />
        ({cog.hp} HP)
      </span>
    </div>
  );
}


function CogLevelPicker({ dispatch }) {
  const [activeBtn, setActiveBtn] = useState(0);
  const [active, setActive] = useState(false);

  return (
    <div className='lvl-picker'>
      {(active) ? (
        <>
          <b>Choose Cog Level</b>
          <div className='lvl-btns'>
            {lvlNums.map((lvl, i) => (
              <button
                className={(activeBtn === i) ? 'active' : ''}
                key={i}
                onClick={() => {
                  dispatch({type: 'cog', 'value': lvl});
                  setActiveBtn(i);
                  setActive(false);
                }}
              >{lvl}</button>
            ))}
          </div>
        </>
      ) : (
        <button onClick={() => setActive(true)}>Choose Cog Level</button>
      )}
    </div>
  );
}


export default function CogCard({ cog, dispatch }) {

  return (
    <div>
      <h2>Cog</h2>
      <div className='cog-card'>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <CogStats cog={cog} />
        <CogLevelPicker dispatch={dispatch} />
      </div>
    </div>
  );
}