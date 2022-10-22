import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleToonActive, updateToonOrg } from './toonSlice';
import './index.css';
import Toon from './Toon';


function ToonToggle({ i, dispatch, active, setActive, toonOrg }) {
  return (
    <div className='toon-toggle'>
      <h3>Toon {i+1}</h3>
      <div className='controls'>
        {
          <label className='switch'>
            <input 
              type='checkbox' 
              onChange={() => {
                dispatch(toggleToonActive(i));
                setActive(!active);
              }}
              defaultChecked={
                active ? 'checked' : null
              }
            />
            <span 
              className='slider' 
            ></span>
          </label>
        }
      </div>
    </div>
  );
}

function OrgGagContainer({ toon }) {
  return (
    <p className='org-gag-container'>
      <span>Organic</span>
      <img src={gagTracks[toon.organic]} alt={toon.organic + ' Gag'} />
    </p>
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
function OrganicPicker({ i, dispatch, orgPickerActive, setOrgPickerActive, toonOrg }) {
  const [activeBtn, setActiveBtn] = useState(
    Object.keys(gagTracks).indexOf(toonOrg) || 0
  );

  return (
    <div className='organic-picker'>
      {(orgPickerActive) ? (
        <>
          <h4>Set Organic Gag</h4>
          {Object.keys(gagTracks).map((track, j) => (
            <React.Fragment key={j}>
              <button
                className={
                  'gag-btn' + ((activeBtn === j) ? ' active' : '')
                }
                onClick={() => {
                  dispatch(updateToonOrg({ i: i, track: track }));
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
    <div className='toon-panel'>
      {/* Toon Toggle Container */}
      {
        (!orgPickerActive) ? (
          <ToonToggle 
            i={i}
            dispatch={dispatch}
            active={active}
            setActive={setActive}
            toonOrg={toon.organic}
          />
        ) : null
      }
      {/* Org Gag Display Container */}
      {
        (active && !orgPickerActive) ? (
          <OrgGagContainer toon={toon} />
        ) : null
      }
      {/* Org Gag Picker */}
      {
        (active) ? (
          <OrganicPicker 
            i={i} 
            dispatch={dispatch}
            orgPickerActive={orgPickerActive}
            setOrgPickerActive={setOrgPickerActive}
            toonOrg={toon.organic}
          />
        ) : null
      }
    </div>
  );
}


export default function ToonsCard() {
  const toons = useSelector((state) => state.toons);
  const dispatch = useDispatch();

  const toonObjects = toons.map((toon, i) => {
    return (toon.active) ? new Toon(toon.active, toon.organic) : ''
  });

  return (
    <div id="toons" className="custom-scrollbar">
      <h2>Toons</h2>
      <div className='toons-card'>
        {toonObjects.map((toon, i) => (
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