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
      <button onClick={() => deleteToon(i, setIsSaved)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
          <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/>
        </svg>
        Edit
      </button>
    );
  } else {
    // Toon not Saved - Save Icon
    return (
      <button onClick={() => saveToon(i, setIsSaved, toonOrg)}>
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
      <h3>
        {(active && !isSaved) ? 'T' : 'Toon '}
        {i+1}
      </h3>
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
      {/* Toon Toggle Container */}
      {
        (!orgPickerActive) ? (
          <ToonToggle 
            i={i}
            dispatch={dispatch}
            active={active}
            setActive={setActive}
            isSaved={isSaved}
            setIsSaved={setIsSaved}
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
        (active && !isSaved) ? (
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