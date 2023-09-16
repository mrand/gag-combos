import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { useSelector, useDispatch } from 'react-redux';
import { toggleV2 } from '~/features/calculator';
import { Cog, Combo, Gag } from '~/features/core';
import { ToggleV2 } from '~/features/ui';
import styles from './index.module.css';


function CogsListEntry({ level, isV2, baseHP, remainingHP }) {
  const hue = Math.round(remainingHP / baseHP * 100);
  return (
      remainingHP > 0 &&
      <li
        style={{background: `hsl(${hue},100%,45%)`}} 
        className={styles.cogsListEntry + (isV2 ? ' '+styles.v2 : '')}
      >
        <b>Level {level}</b>
        <span>{remainingHP} / {baseHP} HP</span>
      </li>
  );
}


export default function CogsList() {
  const device = useContext(DeviceContext);

  const gagsList = useSelector((state) => state.calculator.gag.gagsList);
  const isV2 = useSelector((state) => state.calculator.cog.isV2);
  const dispatch = useDispatch();

  let gagObjs = gagsList.map((gag, i) => {
    return new Gag(gag.track, gag.level, gag.org);
  });

  let levels = Array.from(Array(20), (e,i)=>i+1);
  const combos = levels.map((lvl) => {
    return new Combo(new Cog(lvl, isV2), gagObjs);
  });

  const maxSuccessfulCombo = [...combos].reverse().find(combo => combo.defeatsCog);
  const minDefeatedCog = maxSuccessfulCombo ? maxSuccessfulCombo.cog.level : false;
  const minDefeatedCogOverkill = maxSuccessfulCombo && maxSuccessfulCombo.damage['Total'] - maxSuccessfulCombo.cog.hp;

  return (
    <div className={`${styles.cogsListContainer} ${device==="desktop" ? styles.desktop : styles.mobile}`}>
      <span className={styles.bolt}></span>
      <span className={styles.bolt}></span>
      <span className={styles.bolt}></span>
      <span className={styles.bolt}></span>

      <div className={styles.wrapper}>
        
        <div className={styles.headingsArea}>
          <ToggleV2 
            active={isV2}
            clickHandler={() => dispatch(toggleV2())}
            hasText={false}
          />
          <hr />
          <h3 className={styles.defeatedIndicator}>
            {
              minDefeatedCog ? (
                <>
                  <span style={{color:"var(--green-500)"}}>Level {minDefeatedCog} Defeated</span>
                  {
                    minDefeatedCogOverkill ? (
                      <span>Overkill: +{minDefeatedCogOverkill} HP</span>
                    ) : null
                  }
                </>
              ) : (
                <span>No Cog Defeated</span>
              )
            }
          </h3>
        </div>

        {
          minDefeatedCog < 20 &&
          <>
            <hr />
            <ul className={styles.cogsList+" custom-scrollbar"}>
              {
                combos.map((combo, i) => {
                  return (
                    <CogsListEntry 
                      key={i}
                      level={combo.cog.level}
                      isV2={isV2}
                      baseHP={combo.cog.hp}
                      remainingHP={Math.max(combo.cog.hp - combo.damage['Total'], 0)}
                    />
                  );
                })
              }
            </ul>
          </>
        }
        
      </div>
    </div>
  );
}
