import React from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.css";
import { ComboCell, ErrorCell } from "~/features/combo";
import { GagModal } from "~/features/gag";


export default function CombosGrid({ recommendCombos, cellStates, setCellStates }) {
  const gagModalActive = useSelector((state) => state.recommendations.gag.modal.show);

  return (
    <div className={styles.combosGrid}>
      {gagModalActive ? <GagModal /> : null}
      <>
        {(recommendCombos.errorMsg) ? (
          <ErrorCell message={recommendCombos.errorMsg} />
        ) : (
          <>
            {recommendCombos.recCombos.map((combo, i) => (
              <ComboCell 
                key={i}
                combo={combo} 
                cellNum={i}
                cellStates={cellStates}
                setCellStates={setCellStates}
              />          
            ))}
          </>  
        )}
      </>
    </div>
  );
}
