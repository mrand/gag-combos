import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetToons, toggleToonActive, updateToonOrg } from './toons.slice';
import './toons.component.css';
import ResetButton from 'features/ui/reset-button';
import SliderButton from 'features/ui/slider-button';


function ToonToggle({ i }) {
  const active = useSelector((state) => state.toons.toonlist[i].active);
  const dispatch = useDispatch();

  return (
    <div className='toon-toggle'>
      <h3>Toon {i+1}</h3>
      <div className='controls'>
        <SliderButton 
          active={active}
          clickHandler={() => dispatch(toggleToonActive(i))}
          infoText={"Toggle Toon "+(i+1)+" Active"}
        />
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
function OrganicPicker({ i, dispatch, pickerActive, setPickerActive, toonOrg }) {
  const [activeBtn, setActiveBtn] = useState(
    Object.keys(gagTracks).indexOf(toonOrg) || 0
  );

  return (
    <div className='organic-picker'>
      {(pickerActive) ? (
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
                  setPickerActive();
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
          onClick={() => setPickerActive()}
          title={"Set Toon "+(i+1)+" Organic Gag"}
          aria-label={"Set Toon "+(i+1)+" Organic Gag"}
        >
          Set Organic
        </button>
      )}
    </div>
  );
}


function ToonPanel({ i, toon, pickerActive, setPickerActive, dispatch }) {
  const active = useSelector((state) => state.toons.toonlist[i].active);

  return (
    <div className='toon-panel'>
      {/* Toon Toggle Container */}
      {
        (!pickerActive) ? (
          <ToonToggle 
            i={i}
            dispatch={dispatch}
            toonOrg={toon.organic}
          />
        ) : null
      }
      {/* Org Gag Display Container */}
      {
        (active && !pickerActive) ? (
          <OrgGagContainer toon={toon} />
        ) : null
      }
      {/* Org Gag Picker */}
      {
        (active) ? (
          <OrganicPicker 
            i={i} 
            dispatch={dispatch}
            pickerActive={pickerActive}
            setPickerActive={setPickerActive}
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

  const initialOrgPickers = [false, false, false, false];
  const orgPickersReducer = (orgPickersActive, action) => {
    switch (action.type) {
      case "reset":
        return initialOrgPickers;
      case "update":
        return [
          ...orgPickersActive, 
          orgPickersActive[action.idx] = !orgPickersActive[action.idx]
        ];
      default:
        return initialOrgPickers;
    }
  };
  const [orgPickersActive, setOrgPickersActive] = useReducer(orgPickersReducer, initialOrgPickers);

  return (
    <div id="toons" className="custom-scrollbar">
      <div className='heading-btn-wrap'>
        <h2>Toons</h2>
        <ResetButton 
          active={resetBtnActive}
          clickHandler={() => {
            setOrgPickersActive({ type: "reset" });
            dispatch(resetToons());
          }}
          infoText="Reset All Toons"
        />
      </div>
      <div className='toons-card'>
        {toons.map((toon, i) => (
          <ToonPanel 
            key={i}
            i={i}
            toon={toon} 
            pickerActive={orgPickersActive[i]}
            setPickerActive={() => {
              console.log(orgPickersActive, i);
              setOrgPickersActive({ type: "update", idx: i });
            }}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}