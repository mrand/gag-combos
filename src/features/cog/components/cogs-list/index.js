import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleV2 } from 'features/calculator';
import { Cog } from 'features/cog';
import { Gag } from 'features/gag';
import { Combo } from 'features/combo';
import { ToggleV2 } from 'features/cog/components';
import './index.css';


function CogsListEntry({ level, isV2, remainingHP }) {
  return (
    <li className={'cogs-list-entry' + (remainingHP===0 ? ' defeated' : '') + (isV2 ? ' v2' : '')}>
      <b>{level}</b>
      <span>{remainingHP}</span>
    </li>
  );
}


export default function CogsList() {
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

  return (
    <div className="cogs-list-container">
      <div className='heading-btn-wrap'>
        <h3>
          <b>Cog Level</b>
          <span>Remaining HP</span>
        </h3>
        <ToggleV2 
          active={isV2}
          clickHandler={() => dispatch(toggleV2())}
        />
      </div>
      <ul className="cogs-list custom-scrollbar">
        {
          combos.map((combo, i) => {
            return (
              <CogsListEntry 
                key={i}
                level={combo.cogLevel}
                isV2={isV2}
                remainingHP={Math.max(combo.cogHP - combo.totalDamage, 0)}
              />
            );
          })
        }
      </ul>
    </div>
  );
}
