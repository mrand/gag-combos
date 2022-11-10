import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetGags, addGag } from 'features/calculator';
import { trackColors, Gag } from 'features/gag';
import { HoverBox } from 'features/gag/components';
import { ToggleOrganic } from 'features/gag/components';
import { GagButton } from 'features/gag/components';
import { GagsList } from 'features/gag/components';
import { DamageCount } from 'features/combo/components';
import './index.css';


function GagTrackButtons({ track, org }) {
  const dispatch = useDispatch();

  return (
    <div 
      className="gag-track"
      style={{backgroundColor: trackColors[track]}}
    >
      <h4>{track}</h4>
      {
        [0, 1, 2, 3, 4, 5, 6].map((level, j) => {
          let thisGag = new Gag(track, level+1, org);
          return (
            <GagButton 
              key={j} 
              gag={thisGag} 
              clickHandler={() => dispatch(addGag({
                track: thisGag.track, 
                level: thisGag.level, 
                org: (thisGag.organic==="Organic") 
              }))}
            />
          )
        })
      }
    </div>
  );
}


export default function GagsPicker() {
  const gagsList = useSelector((state) => state.calculator.gag.gagsList);
  const org = useSelector((state) => state.calculator.gag.organic);
  const dispatch = useDispatch();

  return (
    <div id="gags-picker">
      <div className="wrapper">
        <div className="heading-btn-wrap">
          <h3>
            {
              (gagsList.length > 0) ? (
                <button
                  onClick={() => dispatch(resetGags())}
                  title="Reset Calculator"
                  aria-label="Reset Calculator"
                >
                  Reset Gags
                </button>
              ) : (
                <span>Choose Gags</span>
              )
            }
          </h3>
          <HoverBox />
          <ToggleOrganic />
        </div>
        <div className="picker-wrap custom-scrollbar">
          {
            Object.keys(trackColors).map((track, i) => {
              return (
                <GagTrackButtons 
                  key={i} 
                  track={track} 
                  org={org}
                />
              )
            })
          }
        </div>
        <GagsList />
        <DamageCount />
      </div>
    </div>
  );
}
