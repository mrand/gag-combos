import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { resetGag } from 'features/combos/gag/gag.slice';
import './index.css';
import { trackColors } from '../../gag.data';
import { OrganicIcon } from "../gag-cell";


function formatData(data) {
  let formatted = JSON.parse(JSON.stringify(data));

  // Accuracy
  formatted.accuracy = (
    (typeof data.accuracy === 'object') &&
    (data.accuracy !== null)
  ) ? (
    "50% - 90%"  // lure
  ) : (
    (data.accuracy * 100) + "%"  // all else
  );
  // Organic
  if (formatted.organic !== "Organic") delete formatted.organic;

  // Lure or Pass
  if (
    (data.name==="Pass") ||
    (data.track==="Lure")
  ) {
    delete formatted.track;
    delete formatted.level;
    delete formatted.luredMultiplierDamage;
    delete formatted.comboMultiplierDamage;
  }
  // Lure
  if (data.track==="Lure") {
    formatted.name = "Lure (Any)";
    formatted.accuracy = "50% - 90%"
  }
  // Pass
  if (data.name==="Pass") {
    delete formatted.accuracy;
  }

  return formatted;
}


export default function GagModal() {
  const data = useSelector((state) => state.gag.data);
  const dispatch = useDispatch();

  let gag = formatData(data);

  return (
    <div id="gag-modal">
      <div className="wrapper">

        <section>
          {/* Image */}
          <div 
            className={"img-wrap" + ((gag.organic) ? " org" : "")}
            style={{background: (trackColors[gag.track] || "")}}
          >
            {(gag.organic) ? <OrganicIcon /> : null}
            <img 
              className="gag-icon"
              src={gag.image} 
              alt={gag.name + " Gag"} 
            />
          </div>
          {/* Name */}
          <h3>
            <span>{gag.name}</span>
            <span>{(gag.organic) ? "(Organic)" : ""}</span>
          </h3>
        </section>
        
        {/* Track and Level */}
        {
          (gag.track && gag.level) ? (
            <p>
              {gag.track ? (<b>{gag.track}</b>) : null}
              {gag.level ? (<span> - Level {gag.level}</span>) : null}
            </p>
          ) : null
        }

        {/* Accuracy */}
        {
          (gag.accuracy || gag.damage) ? (
            <section>
              {gag.accuracy ? (<span><b>Accuracy</b>: {gag.accuracy}</span>) : null}
              {gag.damage ? (<span><b>Damage</b>: {gag.damage}</span>) : null}
            </section>
          ) : null
        }
        

        {
          (gag.comboMultiplierDamage || gag.luredMultiplierDamage) ? (
            <section>
              {
                (gag.luredMultiplierDamage) ? (
                  <span><b>Lured Multiplier</b>: {"+"+gag.luredMultiplierDamage}</span>
                ) : null
              }
              {
                (gag.comboMultiplierDamage) ? (
                  <span><b>Combo Multiplier</b>: {"+"+gag.comboMultiplierDamage}</span>
                ) : null
              }
              <span><b>Total Damage</b>: {
                gag.damage + gag.luredMultiplierDamage + gag.comboMultiplierDamage
              }</span>
            </section>
          ) : null
        }
        
        
        <button
          onClick={() => dispatch(resetGag())}
        >
          Close
        </button>
      </div>
    </div>
  );
}