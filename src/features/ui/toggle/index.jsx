import React from 'react';
import SliderButton from '../slider-button';
import styles from './index.module.css';


export default function Toggle({ 
  icon=null, 
  active=false, 
  clickHandler=null, 
  infoText="Toggle" 
}) {
  return (
    <div className={styles.toggle}>
      <span className={styles.icon}>{icon}</span>
      <SliderButton
        active={active}
        clickHandler={clickHandler}
        infoText={infoText}
      />
    </div>
  );
}
