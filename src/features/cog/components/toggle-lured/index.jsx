import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCogLured } from '~/features/recommendations';
import Toggle from '~/features/ui/toggle';
import './index.css';

export default function ToggleLured() {
  const isLured = useSelector((state) => state.recommendations.cog.lured);
  const dispatch = useDispatch();

  return (
    <div className='toggle-lured'>
      {
        (isLured) ? (
          <h3 style={{color: 'var(--green-500)'}}>Cog is Lured</h3>
        ) : (
          <h3>Is Cog Lured?</h3>
        )
      }
      <Toggle 
        icon={<img src='./img/gags/lure-10bill.png' alt='$10 Bill Lure Gag' />}
        active={isLured}
        clickHandler={() => dispatch(toggleCogLured())}
        infoText="Toggle Cog Lured"
      />
    </div>
  );
}