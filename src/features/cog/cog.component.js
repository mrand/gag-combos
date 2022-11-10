import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetCog, setCog, toggleCogV2 } from 'features/recommendations';
import './cog.component.css';
import Cog from './cog.module';
import ResetButton from 'features/ui/reset-button';
import { ToggleLured, ToggleV2 } from './components';


// list of possible cog levels (1 through 20)
const lvlNums = [];
for (let i=1; i<=20; i++) lvlNums.push(i);


function CogStats({ cog }) {
  return (
    <div className='cog-stats'>
      <img
        src={cog.image}
        alt={`${cog.cog} Cog`}
      />
      <b>{cog.cog}</b>
      <b>{cog.suit}</b>
      <span className='cog-level'>
        Level {cog.level}
        <br />
        ({cog.hp} HP)
      </span>
    </div>
  );
}


function CogLevelPicker({ setActive }) {
  const cogLevel = useSelector((state) => state.recommendations.cog.level);
  const dispatch = useDispatch();

  return (
    <div className='lvl-picker'>
      <b>Choose Cog Level</b>
      <div className='lvl-btns'>
        {lvlNums.map((lvl, i) => (
          <button
            className={
              (cogLevel-1 === i) ? 'active' : ''
            }
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
    </div>
  );
}


export default function CogComponent() {
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
    <div id='cog'>
      <div className='heading-btn-wrap'>
        <h2>Cog</h2>
        <ResetButton
          active={resetBtnActive}
          clickHandler={() => dispatch(resetCog())}
          infoText="Reset Cog"
        />
      </div>
      <div className='cog-card'>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        {
          (active || !cog) ? (
            <CogLevelPicker
              setActive={setActive}
            />

          ) : (
            <>
              <CogStats cog={cog} />
              <div className='lvl-picker'>
                <button
                  onClick={() => setActive(true)}
                  title={"Choose New Cog Level"}
                  aria-label={"Choose New Cog Level"}
                >
                  Choose Cog Level
                </button>
              </div>
            </>
          )
        }
      </div>
      <ToggleLured />
      <ToggleV2 
        active={cogV2}
        clickHandler={() => dispatch(toggleCogV2())} 
      />
    </div>
  );
}
