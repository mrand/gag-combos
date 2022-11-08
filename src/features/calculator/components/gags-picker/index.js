import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetGags, addGag, toggleOrg } from 'features/calculator/calculator.slice';
import { PageSizeContext } from 'App';
import { trackColors, Gag } from 'features/gag';
import SliderButton from 'features/ui/slider-button';
import GagButton from '../gag-btn';
import GagsList from '../gags-list';
import './index.css';
import DamageCount from '../damage-count';


function OrganicToggle() {
  const org = useSelector((state) => state.calculator.orgToggle);
  const dispatch = useDispatch();

  return (
    <div className="organic-toggle">
      <div>
        <img src="/img/gags/icon-organic-mini.png" alt="Organic Symbol" />
        {/* <h3>Organic?</h3> */}
        <SliderButton 
          active={org}
          clickHandler={() => dispatch(toggleOrg())}
          infoText="Toggle Organic Gags"
        />
      </div>
    </div>
  );
}


function GagTrackButtons({ track }) {
  const org = useSelector((state) => state.calculator.orgToggle);
  const dispatch = useDispatch();

  return (
    <div 
      className="gag-track"
      style={{backgroundColor: trackColors[track]}}
    >
      <h4>{track}</h4>
      {
        [0, 1, 2, 3, 4, 5, 6].map((level, j) => {
          let thisGag = new Gag(track, level+1, org);
          return (
            <GagButton 
              key={j} 
              gag={thisGag} 
              clickHandler={() => dispatch(addGag({
                track: thisGag.track, 
                level: thisGag.level, 
                org: (thisGag.organic==="Organic") 
              }))}
            />
          )
        })
      }
    </div>
  );
}


function HoverBox() {
  const pageSize = useContext(PageSizeContext);
  const hoveredGag = useSelector((state) => state.calculator.hoveredGag);

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
        statVal = gag.damage; 
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
                <span><b>Accuracy:</b> {(gag.accuracy*100)+"%"}</span>
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


export default function GagsPicker() {
  const gagslist = useSelector((state) => state.calculator.gagslist);
  const dispatch = useDispatch();

  return (
    <div id="gags-picker">
      <div className="wrapper">
        <div className="heading-btn-wrap">
          <h3>
            {
              (gagslist.length > 0) ? (
                <button
                  onClick={() => dispatch(resetGags())}
                  title="Reset Calculator"
                  aria-label="Reset Calculator"
                >
                  Reset Gags
                </button>
              ) : (
                <span>Choose Gags</span>
              )
            }
          </h3>
          <HoverBox />
          <OrganicToggle />
        </div>
        <div className="picker-wrap custom-scrollbar">
          {
            Object.keys(trackColors).map((track, i) => {
              return <GagTrackButtons key={i} track={track} />
            })
          }
        </div>
        <GagsList />
        <DamageCount />
      </div>
    </div>
  );
}
