import React, { useState, useEffect } from 'react';
import Toon from '../../core/Toon';
import './ToonsCard.css';


function ToonStats({ toon }) {
  return (
    <div className='toon-stats'>
      <div 
        className={
          'laff-meter' + 
          // ' ' + toon.species.toLowerCase() +
          (toon.gender === 'Girl' ? ' girl' : '')
        }
        style={{'--toon-color': toon.color[1]}}
      >
        <div className='head'></div>
        <span className='ear left'></span>
        <span className='ear right'></span>
        <span className='eye left'></span>
        <span className='eye right'></span>
        <span className='mouth'></span>
      </div>
      {/* <img src={'./img/toons/Toon_'+toon.species.toLowerCase()+'.webp'} /> */}
      <b 
        className='toon-name'
        style={{'--toon-color': toon.color[1]}}
      >
        {toon.name}
      </b>
      <p className='org-gag-container'>
        <img src='./img/gags/icon-organic-mini.png' />
        <span>{toon.organic}</span>
      </p>
    </div>
  );
}

let gagTracks = {
  'None': './img/gags/Pass.png',
  'Toon-Up': './img/gags/toonup-Feather.png',
  'Trap': './img/gags/trap-Banana_Peel.png',
  'Lure': './img/gags/lure-1_Bill.png',
  'Sound': './img/gags/sound-Bike_Horn.png',
  'Throw': './img/gags/throw-Cupcake.png',
  'Squirt': './img/gags/squirt-Squirting_Flower.png',
  'Drop': './img/gags/drop-Flower_Pot.png'
};
function OrganicPicker({ i, dispatch }) {
  const [activeBtn, setActiveBtn] = useState();
  const [active, setActive] = useState(false);

  return (
    <div className='organic-picker'>
      {(active) ? (
        <>
          <b>Set Organic Gag</b>
          {Object.keys(gagTracks).map((track, j) => (
            <React.Fragment key={j}>
              <button
                className='gag-btn'
                onClick={() => {
                  dispatch({
                    type: 'toon'+(i+1), 
                    'value': track
                  });
                  setActiveBtn(i);
                  setActive(false);
                }}
              >
                <img src={gagTracks[track]} />
                {track}
              </button>
            </React.Fragment>
          ))}
        </>
        
      ) : (
        <button onClick={() => setActive(true)}>Set Organic</button>
      )}
    </div>
  );
}


function ToonPanel({ i, toon, dispatch }) {
  const [active, setActive] = useState(
    toon ? true : false
  );

  return (
    <div 
      className='toon-panel'
    >
      <div className='toon-toggle'>
        <h4>Toon {i+1}</h4>
        <label className='switch'>
          <input 
            type='checkbox' 
            onChange={() => {
              dispatch({
                type: 'toon'+(i+1), 
                'value': active ? '' : 'None'
              });
              setActive(!active);
            }}
            defaultChecked={
              active ? 'checked' : null
            }
          />
          <span className='slider'></span>
        </label>
      </div>
      {(active) ? (
        <>
          <ToonStats toon={toon} />
          <OrganicPicker 
            i={i} 
            dispatch={dispatch}
          />
        </>
      ) : (
        null
      )}
    </div>
  );
}


export default function ToonsCard({ toons, dispatch }) {
  return (
    <div>
      <h2>Toons</h2>
      <div className='toons-card'>
        {toons.map((toon, i) => (
          <ToonPanel 
            key={i}
            i={i}
            toon={toon} 
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}