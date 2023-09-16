import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { useSelector, useDispatch } from 'react-redux';
import { resetGags, addGag } from '~/features/calculator';
import { trackColors, Gag } from '~/features/core';
import { ToggleOrganic } from '~/features/calculator';
import { GagButton } from '~/features/calculator';
import { GagsList } from '~/features/calculator';
import { HoverBox } from '~/features/calculator';
import { DamageCount } from '~/features/calculator';
import styles from './index.module.css';


/**
 * 
 * @param {String} track Which gag track to use.
 * @param {String} org Whether or not the gag track is organic.
 * @returns A row of buttons corresponding to the specified in-game gag track.
 */
function GagTrackButtons({ track, org }) {
  const dispatch = useDispatch();

  return (
    <div 
      className={styles.gagTrack}
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


/**
 * @param {String} org Whether or not the gag track is organic.
 * @returns Gag track buttons corresponding to all in-game gags.
 */
function GagButtons({ org }) {
  return (
    <div className={`custom-scrollbar ${styles.pickerWrap}`}>
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
  );
}


export default function GagsPicker() {
  const device = useContext(DeviceContext);

  const gagsList = useSelector((state) => state.calculator.gag.gagsList);
  const org = useSelector((state) => state.calculator.gag.organic);
  const dispatch = useDispatch();

  return (
    <div className={`${styles.gagsPicker} ${device==="desktop" ? styles.desktop : styles.mobile}`}>
      <div className={`wrapper ${styles.gagsPickerWrap}`}>
        <div className={styles.headingBtnWrap}>
          <h3>
            {
              (gagsList.length > 0) ? (
                <button
                  aria-label="Reset Calculator"
                  className="btn danger"
                  onClick={() => dispatch(resetGags())}
                  title="Reset Calculator"
                >
                  Reset Gags
                </button>
              ) : (
                <span>Choose Gags</span>
              )
            }
          </h3>
          { device==="desktop" && <HoverBox /> }
          <ToggleOrganic />
        </div>
        <GagButtons org={org} />
        <GagsList />
        <DamageCount />
      </div>
    </div>
  );
}
