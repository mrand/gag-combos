import React from 'react';
import SliderButton from '../slider-button';
import './index.css';


export default function Toggle({ 
  icon=null, 
  active=false, 
  clickHandler=null, 
  infoText="Toggle" 
}) {
  return (
    <div className="toggle">
      {icon}
      <SliderButton
        active={active}
        clickHandler={clickHandler}
        infoText={infoText}
      />
    </div>
  );
}
