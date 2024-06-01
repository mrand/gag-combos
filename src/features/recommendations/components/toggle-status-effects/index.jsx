import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleCogV2, toggleCogTrapped, toggleCogLured } from "~/features/recommendations";
import styles from "./index.module.css";

export default function ToggleStatusEffects() {
  const cogV2 = useSelector((state) => state.recommendations.cog.isV2);
  const cogTrapped = useSelector((state) => state.recommendations.cog.trapped);
  const cogLured = useSelector((state) => state.recommendations.cog.lured);
  const dispatch = useDispatch();

  return (
    <div className={styles.toggleStatusEffects}>
      <h3>Status Effects</h3>

      <button 
        className={`${styles.statusBtn} ${cogV2 ? styles.statusBtnActive : ""}`}
        onClick={() => dispatch(toggleCogV2())}
        title="Toggle Reinforced Plating Status Effect"
        aria-label="Toggle Reinforced Plating Status Effect"
      >
        <img
          alt="Reinforced Plating"
          className={`${styles.statusIndicator} ${cogV2 ? styles.indicateActive : ""}`}
          src="/img/statuseffects/reinforcedplating.webp"
        />
        <b>v2.0</b>
      </button>

      {/*
      Trapped Status effect requires that a Trap gag is placed in front of the cog.
      Thus, we must also have the player set which specific trap gag it is,
      otherwise the damage of that gag won't be accounted for in combo calculations.
      */}
      {/* <button 
        className={`${styles.statusBtn} ${cogTrapped ? styles.statusBtnActive : ""}`}
        onClick={() => dispatch(toggleCogTrapped())}
        title={cogLured ? "Disable Lured Status Effect to activate Trapped Status Effect" : "Toggle Trapped Status Effect"}
        aria-label="Toggle Trapped Status Effect"
        disabled={cogLured}
      >
        <img
          alt="Trapped"
          className={`${styles.statusIndicator} ${cogTrapped ? styles.indicateActive : ""}`}
          src="/img/statuseffects/trapped.webp"
        />
        <b>Trapped</b>
      </button> */}

      <button 
        className={`${styles.statusBtn} ${cogLured ? styles.statusBtnActive : ""}`}
        onClick={() => dispatch(toggleCogLured())}
        title={cogTrapped ? "Disable Trapped Status Effect to activate Lured Status Effect" : "Toggle Lured Status Effect"}
        aria-label="Toggle Lured Status Effect"
        disabled={cogTrapped}
      >
        <img
          alt="Lured"
          className={`${styles.statusIndicator} ${cogLured ? styles.indicateActive : ""}`}
          src="/img/statuseffects/lured.webp"
        />
        <b>Lured</b>
      </button>

    </div>
  );
}
