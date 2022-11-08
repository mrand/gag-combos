import React from 'react';
import { useDispatch } from 'react-redux';
import { setHoveredGag } from 'features/calculator/calculator.slice';
import './index.css';
import { OrganicIcon } from 'features/gag/components/gag-cell';


export default function GagButton({ gag, clickHandler=null }) {
  const dispatch = useDispatch();

  return (
    <button 
      className="gag-btn"
      onMouseEnter={() => dispatch(setHoveredGag({ 
        track: gag.track, 
        level: gag.level, 
        org: (gag.organic==="Organic") 
      }))}
      onMouseLeave={() => dispatch(setHoveredGag(null))}
      onClick={clickHandler}
    >
      {(gag.organic==="Organic") ? <OrganicIcon /> : null}
      <div>
        <img 
          className='gag-icon'
          src={gag.image} 
          alt={gag.name} 
        />
      </div>
    </button>
  );
}
