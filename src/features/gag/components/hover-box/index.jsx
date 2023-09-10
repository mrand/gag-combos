import React from "react";
import { useSelector } from "react-redux";
import { Gag } from "~/features/Gag";
import styles from "./index.module.css";


/**
 * @param {String} pageSize Whether the screen size is categorized as desktop or mobile.
 * @returns HoverBox component for displaying info about the hovered gag. 
 */
export default function HoverBox() {
  const hoveredGag = useSelector((state) => state.calculator.gag.hoveredGag);

  const gag = hoveredGag ? new Gag(
    hoveredGag.track,
    hoveredGag.level,
    hoveredGag.org
  ) : null;

  let statTitle;
  let statVal;
  let affectsText;
  if (gag) {
    if (gag.track === "Toon-Up") { 
      statTitle = "Heal" ;
      statVal = gag.heal;
    } else if (gag.track === "Lure") { 
      statTitle = "Lure";
      statVal = gag.stun;
    } else { 
      statTitle = "Damage";
      statVal = gag.damage['Base']; 
    }
    if (gag.track === "Toon-Up") {
      affectsText = gag.targetsMulti ? "All Toons" : "Single Toon";
    } else {
      affectsText = gag.targetsMulti ? "All Cogs" : "Single Cog";
    }
  }

  return (
    <div className={styles.hoverBox}>
      {
        gag ? (
          <>
            <div className={styles.hoverBoxOverview}>
              <h4>{gag.name}</h4>
              <img src={gag.image} alt={gag.name} />
            </div>
            <div className={styles.hoverBoxStats}>
              <span><b>Accuracy:</b> {(gag.accuracy['Base']*100)+"%"}</span>
              <span><b>{statTitle}:</b> {statVal}</span>
              <span><b>Affects:</b> {affectsText}</span>
            </div>
          </>
        ) : null
      }
    </div>
  );

}