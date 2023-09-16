import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCog, setCog, toggleCogV2 } from "~/features/recommendations";
import styles from "./index.module.css";
import { Cog } from "~/features/core";
import { ResetButton } from "~/features/ui";
import { ToggleV2 } from "~/features/ui";
import { ToggleLured } from "~/features/recommendations";


// list of possible cog levels (1 through 20)
const lvlNums = [];
for (let i=1; i<=20; i++) lvlNums.push(i);


function CogStats({ active, cog }) {
  return (
    (!active && cog) && (
      <div className={styles.cogStats}>
        <img
          src={cog.image}
          alt={`${cog.cog} Cog`}
        />
        <b>{cog.cog}</b>
        <b>{cog.suit}</b>
        <span className={styles.cogLevel}>
          Level {cog.level}
          <br />
          ({cog.hp} HP)
        </span>
      </div>
    )
  );
}


function CogLevelPicker({ cog, active, setActive }) {
  const cogLevel = useSelector((state) => state.recommendations.cog.level);
  const dispatch = useDispatch();

  return (
    <div className={styles.lvlPicker}>
      {
        (active || !cog) ? (

          <>
            <b>Choose Cog Level</b>
            <div className={styles.lvlBtns}>
              {lvlNums.map((lvl, i) => (
                <button
                  className={`btn ${styles.lvlBtn} ${(cogLevel-1 === i) ? "active" : ""}`}
                  key={i}
                  value={lvl}
                  onClick={() => {
                    let cog = new Cog(lvl);
                    dispatch(setCog({ level: cog.level, suit: cog.suit, name: cog.cog }));
                    setActive(false);
                  }}
                  title={"Level "+lvl+" Cog"}
                  aria-label={"Level "+lvl+" Cog"}
                >{lvl}</button>
              ))}
            </div>
          </>

        ) : (

          <button
            aria-label={"Choose New Cog Level"}
            className={`btn ${styles.chooseBtn}`}
            onClick={() => setActive(true)}
            title={"Choose New Cog Level"}
          >
            Choose Cog Level
          </button>

        )
      }
    </div>
  );
}


export default function CogCard() {
  const [active, setActive] = useState(false);

  const cogLevel = useSelector((state) => state.recommendations.cog.level);
  const cogV2 = useSelector((state) => state.recommendations.cog.isV2);
  const cogSuit = useSelector((state) => state.recommendations.cog.suit);
  const cogName = useSelector((state) => state.recommendations.cog.name);
  const resetBtnActive = useSelector((state) => state.recommendations.cog.hasUpdates);
  const dispatch = useDispatch();

  // build cog object
  const cog = cogLevel ? new Cog(cogLevel, cogV2, cogSuit, cogName) : null;

  return (
    <div className={styles.cog}>
      <div className="heading-btn-wrap">
        <h2>Cog</h2>
        <ResetButton
          active={resetBtnActive}
          clickHandler={() => dispatch(resetCog())}
          infoText="Reset Cog"
        />
      </div>
      <div className={styles.cogCard}>
        <span className={styles.bolt}></span>
        <span className={styles.bolt}></span>
        <span className={styles.bolt}></span>
        <span className={styles.bolt}></span>
        { (!active && cog) && <CogStats cog={cog} /> }
        <CogLevelPicker 
          cog={cog}
          active={active}
          setActive={setActive}
        />
      </div>
      <ToggleLured />
      <ToggleV2 
        active={cogV2}
        clickHandler={() => dispatch(toggleCogV2())} 
      />
    </div>
  );
}
