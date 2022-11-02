import React from 'react';
import './index.css';


export default function SliderButton({ 
  active=false,
  clickHandler=false,
  infoText="Slider Button"
}) {
  return (
    <button 
      className={'slider' + (active ? ' on' : '')}
      onClick={clickHandler}
      title={infoText}
      aria-label={infoText}
    ></button>
  );
}
