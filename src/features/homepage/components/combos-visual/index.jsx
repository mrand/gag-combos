import React from "react";
import styles from "./index.module.css";


export default function CombosVisual() {
  return (
    <div className={styles.combosVisual}>
      
      <div className={styles.textWrap}>
        <b>Level 9 Cog <span>(110 HP)</span></b>
        <i>Best 4-Toon Combos</i>
      </div>
      
      <div className={styles.videoWrap}>
        <video width="394" height="168" autoPlay muted loop>
          <source src="/videos/combos-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
