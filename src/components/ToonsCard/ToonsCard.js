import React, { useState } from 'react';
import './ToonsCard.css';
import './LaffMeter.css';


function ToonToggle({ i, dispatch, active, setActive}) {
  return (
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
          // disabled={i===0}
          defaultChecked={
            active ? 'checked' : null
          }
        />
        <span 
          className='slider' 
          // style={{ cursor: (i===0) ? 'not-allowed' : 'pointer' }}
        ></span>
      </label>
    </div>
  );
}


function ToonStats({ toon }) {
  return (
    <div className='toon-stats'>
      <div 
        className={
          'laff-meter' + 
          ' ' + toon.species.toLowerCase() +
          (toon.gender === 'Girl' ? ' girl' : '')
        }
        style={{'--toon-color': toon.color[1]}}
      >
        <div className='head'></div>
        <span className='antler left'></span>
        <span className='antler right'></span>
        <span className='ear left'></span>
        <span className='ear right'></span>
        <span className='eye left'></span>
        <span className='eye right'></span>
        <svg 
          className='mouth' 
          viewBox="0 0 90 25" 
          height="25" 
          width="90"
        >
          <path d="M10,3 C15,35 75,35 80,3" />
          <path d="M6,3 L14,1.5" />
          <path d="M84,3 L76,1.5" />
        </svg>
      </div>
      <b 
        className='toon-name'
        style={{'--toon-color': toon.color[1]}}
      >
        {toon.name}
      </b>
      <p className='org-gag-container'>
        <span>Organic</span>
      </p>
      <p className='org-gag-container'>
        <img src={gagTracks[toon.organic]} alt={toon.organic + ' Gag'} />
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
function OrganicPicker({ i, dispatch, orgPickerActive, setOrgPickerActive }) {
  const [activeBtn, setActiveBtn] = useState(0);

  return (
    <div className='organic-picker'>
      {(orgPickerActive) ? (
        <>
          <b>Set Organic Gag</b>
          {Object.keys(gagTracks).map((track, j) => (
            <React.Fragment key={j}>
              <button
                className={
                  'gag-btn' + ((activeBtn === j) ? ' active' : '')
                }
                onClick={() => {
                  dispatch({
                    type: 'toon'+(i+1), 
                    'value': track
                  });
                  setActiveBtn(j);
                  setOrgPickerActive(false);
                }}
              >
                <img src={gagTracks[track]} alt={track + ' Gag'} />
                {track}
              </button>
            </React.Fragment>
          ))}
        </>
        
      ) : (
        <button onClick={() => setOrgPickerActive(true)}>Set Organic</button>
      )}
    </div>
  );
}


function ToonPanel({ i, toon, dispatch }) {
  const [active, setActive] = useState(
    toon ? true : false
  );
  const [orgPickerActive, setOrgPickerActive] = useState(false);

  return (
    <div 
      className='toon-panel'
    >
      {
        (orgPickerActive) ? (
          null
        ) : (
          <ToonToggle 
            i={i}
            dispatch={dispatch}
            active={active}
            setActive={setActive}
          />
        )
      }
      
      {(active) ? (
        <>
          {
            (orgPickerActive) ? (
              null
            ) : (
              <ToonStats toon={toon} />
            )
          }
          <OrganicPicker 
            i={i} 
            dispatch={dispatch}
            orgPickerActive={orgPickerActive}
            setOrgPickerActive={setOrgPickerActive}
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