import React, { useState } from 'react';
import './ToonsCard.css';


function saveToon(i, setIsSaved, orgGag) {
  setIsSaved(true);
  localStorage.setItem('ToonOrg'+i, orgGag);
}

function deleteToon(i, setIsSaved) {
  setIsSaved(false);
  localStorage.removeItem('ToonOrg'+i);
}


function SaveSVG({ i, isActive=false, isSaved=false, setIsSaved, toonOrg }) {
  if (!isActive) {
    // Toon Inactive - No Icon
    return null;
  } else if (isSaved) {
    // Toon is Saved - Delete Icon
    return (
      <button 
        onClick={() => deleteToon(i, setIsSaved)}
        className='warn'
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
        </svg>
        Un-Save
      </button>
    );
  } else {
    // Toon not Saved - Save Icon
    return (
      <button onClick={
        () => saveToon(i, setIsSaved, toonOrg)
      }>
        Save
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
        </svg>
      </button>
    );
  }
}


function ToonToggle({ i, dispatch, active, setActive, isSaved, setIsSaved, toonOrg }) {
  return (
    <div className='toon-toggle'>
      <h3>Toon {i+1}</h3>
      <div className='controls'>
        <SaveSVG 
          i={i}
          isActive={active}
          isSaved={isSaved}
          setIsSaved={setIsSaved}
          toonOrg={toonOrg}
        />
        {
          isSaved ? null : (
            <label className='switch'>
              <input 
                type='checkbox' 
                onChange={() => {
                  dispatch({
                    type: 'toon',
                    'i': i,
                    'value': active ? 'remove' : 'add'
                  });
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
          )
        }
      </div>
    </div>
  );
}


function ToonStats({ toon }) {
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
function OrganicPicker({ i, dispatch, orgPickerActive, setOrgPickerActive }) {
  const [activeBtn, setActiveBtn] = useState(0);

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
                  dispatch({
                    type: 'toon',
                    'i': i,
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
  const [isSaved, setIsSaved] = useState(localStorage.getItem('ToonOrg'+i) !== null);
  const [orgPickerActive, setOrgPickerActive] = useState(false);

  return (
    <div className='toon-panel'>
      {
        orgPickerActive ? null : (
          <ToonToggle 
            i={i}
            dispatch={dispatch}
            active={active}
            setActive={setActive}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
            toonOrg={toon.organic}
          />
        )
      }
      
      {
        (active) ? (
          <>
            {
              orgPickerActive ? null : (
                <ToonStats 
                  toon={toon} 
                  isSaved={isSaved}
                />
              )
            }
            {
              isSaved ? null : (
                <OrganicPicker 
                  i={i} 
                  dispatch={dispatch}
                  orgPickerActive={orgPickerActive}
                  setOrgPickerActive={setOrgPickerActive}
                />
              )
            }
          </>
        ) : (
          null
        )
      }
    </div>
  );
}


export default function ToonsCard({ state, dispatch }) {
  let toons = state.toonState;
  
  return (
    <div id="toons" className="custom-scrollbar">
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