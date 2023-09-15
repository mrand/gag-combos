import React, { useContext } from "react";
import { DeviceContext } from "~/App";
import { CogsList } from '~/features/calculator';
import { GagsPicker } from '~/features/calculator';
import styles from "./index.module.css";


export default function CalculatorDashboard() {
  const device = useContext(DeviceContext);

  return (
    <div className={`wrapper ${styles.dashboard} ${device==="desktop" ? styles.desktop : styles.mobile}`}>
      <div className={styles.gagsPickerWrap}>
        <GagsPicker />
      </div>
      <div className={styles.cogsListWrap}>
        <CogsList />
      </div>
    </div>
  );
}