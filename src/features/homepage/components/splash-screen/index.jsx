import React from "react";
import styles from "./index.module.css";


export default function SplashScreen() {
  return (
    <section className={styles.splashScreen}>
      <div className={styles.gagImages}></div>
      <div className={`wrapper ${styles.splashText}`}>
        <h2>Gag Combos Info</h2>
      </div>
    </section>
  );
}
