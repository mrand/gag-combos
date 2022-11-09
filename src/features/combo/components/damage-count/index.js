import React from 'react';
import { useSelector } from 'react-redux';
import { Cog } from 'features/cog';
import { Gag } from 'features/gag';
import { Combo } from 'features/combo';
import './index.css';


export default function DamageCount() {
  const gagsList = useSelector((state) => state.calculator.gag.gagsList);

  let gagObjs = gagsList.map((gag) => {
    return new Gag(gag.track, gag.level, gag.org);
  });
  let combo = new Combo(new Cog(1), gagObjs, false);
  
  return (
    <div className="damage-count">
      <h3>Total Damage = {combo.totalDamage}</h3>
    </div>
  );
}