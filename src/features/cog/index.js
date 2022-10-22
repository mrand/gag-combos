import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLevel, toggleLured } from './cogSlice';
import './index.css';
import Cog from './Cog';


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
              dispatch(setLevel(lvl));
              setActive(false);
            }}
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
        <label className='switch'>
          <input 
            type='checkbox' 
            onChange={() => {
              dispatch(toggleLured());
            }}
            defaultChecked={
              useSelector((state) => state.cog.lured) ? 'checked' : null
            }
          />
          <span className='slider'></span>
        </label>
      </div>
    </div>
  );
}


export default function CogCard() {
  const [active, setActive] = useState(false);

  const cogLevel = useSelector((state) => state.cog.level);

  // build cog object
  const cog = cogLevel ? new Cog(cogLevel) : null;

  return (
    <div id='cog'>
      <h2>Cog</h2>
      <div className='cog-card'>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        <span className='bolt'></span>
        {
          (active) ? (
            <CogLevelPicker 
              setActive={setActive} 
            />

          ) : (
            <>
              <CogStats cog={cog} />
              <div className='lvl-picker'>
                <button onClick={() => setActive(true)}>Choose Cog Level</button>
              </div>
            </>            
          )
        }
      </div>
      <LuredToggle />
    </div>
  );
}
