import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { resetGagModal } from "~/features/recommendations";
import './index.css';
import { OrganicIcon } from "../gag-cell";
import { trackColors, Gag } from "~/features/gag";


export default function GagModal() {
  const gagData = useSelector((state) => state.recommendations.gag.modal.data);
  const dispatch = useDispatch();
  let gag = new Gag(
    gagData.track,
    gagData.level,
    gagData.org
  );

  return (
    <div id="gag-modal">
      <div className="wrapper">
        <div className="modal-wrap custom-scrollbar">

          <section className="main-details">
            <div 
              className={"img-wrap" + (gag.organic==="Organic" ? " org" : "")}
              style={{background: (trackColors[gag.track] || "")}}
            >
              <img 
                className="gag-icon"
                src={gag.image} 
                alt={gag.name + " gag"} 
              />
              {(gag.organic === "Organic") ? <OrganicIcon /> : null}
            </div>
            <div className="overview">
              <h3>
                {gag.name}
                {
                  (gag.organic === "Organic") ? (
                    <>
                      <br />
                      <span>(Organic)</span>
                    </>
                  ) : null
                  
                }
              </h3>
            </div>
          </section>

          {
            gag.name!=='Pass' ? (
              <section className="gags-panel">
                <div className="grid-wrap">
                  {Object.keys(trackColors).map((track, i) => {
                    return (
                      <React.Fragment key={i}>
                        <b style={{background: trackColors[track]}}>{track}</b>
                        {[0,1,2,3,4,5,6].map((j) => {
                          return (
                            <span 
                              key={j} 
                              style={{
                                background: (track===gag.track) ? trackColors[track] : "", 
                                boxShadow: (j+1===gag.level && track===gag.track) ? "0 0 0 5px #000000" : "",
                                zIndex: (j+1===gag.level && track===gag.track) ? "1" : ""
                              }}
                            >
                              {j+1}
                            </span>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="track-lvl-txt">
                  {gag.track ? (<span><b>Track</b>: {gag.track}</span>) : null}
                  {gag.level > 0 ? (<span><b>Level</b>: {gag.level}</span>) : null}
                </div>
              </section>
            ) : null
          }

          {
            gag.name!=='Pass' ? (
              <section className="stats">
                <h4>Stats</h4>
                <span><b>Accuracy</b>: {gag.accuracy*100+"%"}</span>
                {gag.damage!==0 ? (<span><b>Damage</b>: {gag.damage}</span>) : null}
                {gag.heal!==0 ? (<span><b>Heal</b>: {gag.heal}</span>) : null}
                {gag.stun!==0 ? (<span><b>Lured Rounds</b>: {gag.stun}</span>) : null}
              </section>
            ) : null
          }
          
        </div>

        <div className="modal-btn">
          <button onClick={() => dispatch(resetGagModal())}>
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
}
