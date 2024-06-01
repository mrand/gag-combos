import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toggle } from "~/features/ui";
import { toggleV2 } from "~/features/calculator";
import styles from "./index.module.css";


export default function ToggleV2() {
  const isV2 = useSelector((state) => state.calculator.cog.isV2);
  const dispatch = useDispatch();

  return (
    <div>
      <Toggle 
        icon={<h3 className={styles.v2Text}>v2.0</h3>}
        active={isV2}
        clickHandler={() => dispatch(toggleV2())}
        infoText="Toggle v2.0 Cog"
        accentColor="var(--red-600)"
      />
    </div>
  )
}
