import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { PageSizeContext } from '~/App';
import { Gag } from '~/features/gag';
import './index.css';


export default function HoverBox() {
  const pageSize = useContext(PageSizeContext);
  const hoveredGag = useSelector((state) => state.calculator.gag.hoveredGag);

  if (pageSize === 'desktop') {

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
        statVal = gag.damage.base; 
      }
      if (gag.track === "Toon-Up") {
        affectsText = gag.targetsMulti ? "All Toons" : "Single Toon";
      } else {
        affectsText = gag.targetsMulti ? "All Cogs" : "Single Cog";
      }
    }

    return (
      <div className="hover-box">
        {
          gag ? (
            <>
              <div className="overview">
                <h4>{gag.name}</h4>
                <img src={gag.image} alt={gag.name} />
              </div>
              <div className="stats">
                <span><b>Accuracy:</b> {(gag.accuracy.base*100)+"%"}</span>
                <span><b>{statTitle}:</b> {statVal}</span>
                <span><b>Affects:</b> {affectsText}</span>
              </div>
            </>
          ) : null
        }
      </div>
    );

  } else {
    return null;
  }
}
