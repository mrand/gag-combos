import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, toggleToonActive, updateToonOrg } from './toons.slice';
import './toons.component.css';
import ResetButton from 'features/ui/reset-button';


function ToonToggle({ i }) {
  const active = useSelector((state) => state.toons.toonlist[i].active);
  const dispatch = useDispatch();

  return (
    <div className='toon-toggle'>
      <h3>Toon {i+1}</h3>
      <div className='controls'>
        {
          <button 
            className={'switch' + (active ? ' on' : '')}
            onClick={(e) => {
              dispatch(toggleToonActive(i));
            }}
            title={"Toggle Toon "+(i+1)+" Active"}
            aria-label={"Toggle Toon "+(i+1)}
          >
            <span className='slider'></span>
          </button>
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
                title={"Set "+track+" Organic"}
                aria-label={"Set "+track+" Organic"}
              >
                <img src={gagTracks[track]} alt={track + ' Gag'} />
                {track}
              </button>
            </React.Fragment>
          ))}
        </>
        
      ) : (
        <button 
          onClick={() => setOrgPickerActive(true)}
          title={"Set Toon "+(i+1)+" Organic Gag"}
          aria-label={"Set Toon "+(i+1)+" Organic Gag"}
        >
          Set Organic
        </button>
      )}
    </div>
  );
}


function ToonPanel({ i, toon, dispatch }) {
  const [orgPickerActive, setOrgPickerActive] = useState(false);
  const active = useSelector((state) => state.toons.toonlist[i].active);

  return (
    <div className='toon-panel'>
      {/* Toon Toggle Container */}
      {
        (!orgPickerActive) ? (
          <ToonToggle 
            i={i}
            dispatch={dispatch}
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


export default function ToonsComponent() {
  const toons = useSelector((state) => state.toons.toonlist);
  const resetBtnActive = useSelector((state) => state.toons.hasUpdates);
  const dispatch = useDispatch();

  return (
    <div id="toons" className="custom-scrollbar">
      <div className='heading-btn-wrap'>
        <h2>Toons</h2>
        <ResetButton 
          active={resetBtnActive}
          clickHandler={() => dispatch(reset())}
          infoText="Reset All Toons"
        />
      </div>
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