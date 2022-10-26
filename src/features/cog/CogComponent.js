import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, setCog, toggleLured } from './cogSlice';
import './CogComponent.css';
import Cog from './Cog';
import ResetButton from '../../components/ResetButton';


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
  const cogLevel = useSelector((state) => state.cog.level);
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


function LuredToggle() {
  const isLured = useSelector((state) => state.cog.lured);
  const dispatch = useDispatch();

  return (
    <div className='lured-toggle'>
      {
        (isLured) ? (
          <h3 style={{color: 'var(--green-500)'}}>Cog is Lured</h3>
        ) : (
          <h3>Is Cog Lured?</h3>
        )
      }
      <div>
        <img src='./img/gags/lure-10_Bill.png' alt='$10 Bill Lure Gag' />
        <button 
          className={'switch' + (isLured ? ' on' : '')}
          onClick={(e) => {
            dispatch(toggleLured());
          }}
          title={"Toggle Cog Lured"}
          aria-label={"Toggle Cog Lured"}
        >
          <span className='slider'></span>
        </button>
      </div>
    </div>
  );
}


export default function CogComponent() {
  const [active, setActive] = useState(false);

  const cogLevel = useSelector((state) => state.cog.level);
  const cogSuit = useSelector((state) => state.cog.suit);
  const cogName = useSelector((state) => state.cog.name);
  const resetBtnActive = useSelector((state) => state.cog.hasUpdates);
  const dispatch = useDispatch();

  // build cog object
  const cog = cogLevel ? new Cog(cogLevel, cogSuit, cogName) : null;

  return (
    <div id='cog'>
      <div className='heading-btn-wrap'>
        <h2>Cog</h2>
        <ResetButton 
          active={resetBtnActive}
          clickHandler={() => dispatch(reset())}
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
      <LuredToggle />
    </div>
  );
}
