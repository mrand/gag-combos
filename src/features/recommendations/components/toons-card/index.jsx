import React, { useContext, useState, useReducer } from "react";
import { DeviceContext } from "~/App";
import { useSelector, useDispatch } from "react-redux";
import { resetToons, toggleToonActive, updateToonOrganic } from "~/features/recommendations";
import { ResetButton } from "~/features/ui";
import { SliderButton } from "~/features/ui";
import styles from "./index.module.css";


function ToonToggle({ i }) {
  const active = useSelector((state) => state.recommendations.toons.toonList[i].active);
  const dispatch = useDispatch();

  return (
    <div className={styles.toonToggle}>
      <h3>Toon {i+1}</h3>
      <div className={styles.controls}>
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
    <p className={styles.orgGagContainer}>
      <span>Organic</span>
      <img src={gagTracks[toon.organic]} alt={toon.organic + " Gag"} />
    </p>
  );
}

let gagTracks = {
  "None": "./img/gags/pass.png",
  "Toon-Up": "./img/gags/toonup-feather.png",
  "Trap": "./img/gags/trap-bananapeel.png",
  "Lure": "./img/gags/lure-1bill.png",
  "Sound": "./img/gags/sound-bikehorn.png",
  "Throw": "./img/gags/throw-cupcake.png",
  "Squirt": "./img/gags/squirt-squirtingflower.png",
  "Drop": "./img/gags/drop-flowerpot.png"
};
function OrganicPicker({ i, dispatch, pickerActive, setPickerActive, toonOrg }) {
  const [activeBtn, setActiveBtn] = useState(
    Object.keys(gagTracks).indexOf(toonOrg) || 0
  );

  return (
    <div className={styles.organicPicker}>
      {(pickerActive) ? (
        <>
          <h4>Set Organic Gag</h4>
          {Object.keys(gagTracks).map((track, j) => (
            <React.Fragment key={j}>
              <button
                className={`btn ${styles.gagBtn} ${activeBtn===j ? "active" : ""}`}
                onClick={() => {
                  dispatch(updateToonOrganic({ i: i, track: track }));
                  setActiveBtn(j);
                  setPickerActive();
                }}
                title={"Set "+track+" Organic"}
                aria-label={"Set "+track+" Organic"}
              >
                <img src={gagTracks[track]} alt={track + " Gag"} />
                {track}
              </button>
            </React.Fragment>
          ))}
        </>
        
      ) : (
        <button 
          aria-label={"Set Toon "+(i+1)+" Organic Gag"}
          className="btn"
          onClick={() => setPickerActive()}
          title={"Set Toon "+(i+1)+" Organic Gag"}
        >
          Set Organic
        </button>
      )}
    </div>
  );
}


function ToonPanel({ i, toon, pickerActive, setPickerActive, dispatch }) {
  const active = useSelector((state) => state.recommendations.toons.toonList[i].active);

  return (
    <div className={styles.toonPanel}>
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


export default function ToonsCard() {
  const device = useContext(DeviceContext);

  const toons = useSelector((state) => state.recommendations.toons.toonList);
  const resetBtnActive = useSelector((state) => state.recommendations.toons.hasUpdates);
  const dispatch = useDispatch();

  const initialOrgPickers = [false, false, false, false];
  const orgPickersReducer = (orgPickersActive, action) => {
    switch (action.type) {
      case "reset":
        return initialOrgPickers;
      case "update":
        let newOrgPickerActive = [...orgPickersActive];
        newOrgPickerActive[action.idx] = !newOrgPickerActive[action.idx];
        return newOrgPickerActive;
      default:
        return initialOrgPickers;
    }
  };
  const [orgPickersActive, setOrgPickersActive] = useReducer(orgPickersReducer, initialOrgPickers);

  return (
    <div className="custom-scrollbar">
      <div className="heading-btn-wrap">
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
      <div className={`${styles.toonsCard} ${device==="desktop" ? "" : styles.mobile}`}>
        {toons.map((toon, i) => (
          <ToonPanel 
            key={i}
            i={i}
            toon={toon} 
            pickerActive={orgPickersActive[i]}
            setPickerActive={() => setOrgPickersActive({ type: "update", idx: i })}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}