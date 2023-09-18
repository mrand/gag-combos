import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCogLured } from "~/features/recommendations";
import { Toggle } from "~/features/ui";
import styles from "./index.module.css";


export default function ToggleLured() {
  const cogLured = useSelector((state) => state.recommendations.cog.lured);
  const dispatch = useDispatch();

  return (
    <div className={styles.toggleLured}>
      {
        (cogLured) ? (
          <h3 className="toggle-title" style={{color: "var(--green-500)"}}>Cog is Lured</h3>
        ) : (
          <h3 className="toggle-title">Is Cog Lured?</h3>
        )
      }
      <Toggle 
        icon={<img src="./img/gags/lure-10bill.png" alt="$10 Bill Lure Gag" />}
        active={cogLured}
        clickHandler={() => dispatch(toggleCogLured())}
        infoText="Toggle Cog Lured"
        accentColor="var(--green-500)"
      />
    </div>
  );
}