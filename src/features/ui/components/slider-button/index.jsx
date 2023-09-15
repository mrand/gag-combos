import React from "react";
import styles from "./index.module.css";


export default function SliderButton({ 
  active=false,
  clickHandler=null,
  infoText="Slider Button"
}) {
  return (
    <button 
      className={`btn ${styles.slider} ${active ? styles.active : ""}`}
      onClick={clickHandler}
      title={infoText}
      aria-label={infoText}
    ></button>
  );
}
