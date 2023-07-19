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

          {/* Gag Heading */}
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

          {/* Gag Overview */}
          <section className="gags-panel">
            <h4>Overview</h4>
            {/* gags grid */}
            <div 
              className="grid-wrap"
              style={gag.level===0 ? {filter: "grayscale(1)", opacity: "0.25"} : {}}
            >
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
            {/* track/level text */}
            <div>
              <div><b>Track</b>: {gag.track || "None"}</div>
              <div><b>Level</b>: {gag.level || "None"}</div>
            </div>
          </section>

          {/* Gag Stats */}
          {
            Object.entries(gagData.comboStats).map(([stat, val], i) => (
              <section className='stat' key={i}>
                <h4>{stat}</h4>
                <ul>
                  {
                    Object.entries(val).map(([subStat, subVal], j) => (
                      <li key={j}>
                        <b>{subStat}: </b>{stat==='accuracy' ? subVal*100+"%" : subVal}
                      </li>
                    ))
                  }
                </ul>
              </section>
            ))
          }
          
        </div>

        <div className="modal-btn">
          <button
            onClick={() => dispatch(resetGagModal())}
            title="Close Gag Details"
          >
            Close
          </button>
        </div>
        
      </div>
    </div>
  );
}
