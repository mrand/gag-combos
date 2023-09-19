import React from "react";
import { CogsList } from "~/features/calculator";
import { GagsPicker } from "~/features/calculator";
import styles from "./index.module.css";


export default function CalculatorDashboard() {
  return (
    <div className={`wrapper ${styles.dashboard}`}>
      <div>
        <GagsPicker />
      </div>
      <div className={styles.cogsListWrap}>
        <CogsList />
      </div>
    </div>
  );
}