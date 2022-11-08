import React from 'react';
import { useDispatch } from 'react-redux';
import { setHoveredGag } from 'features/calculator/calculator.slice';
import './index.css';
import { OrganicIcon } from 'features/gag/components/gag-cell';


export default function GagButton({ gag, clickHandler=null, hasX=false }) {
  const dispatch = useDispatch();

  return (
    <button 
      className="gag-button"
      onMouseEnter={() => dispatch(setHoveredGag({ 
        track: gag.track, 
        level: gag.level, 
        org: (gag.organic==="Organic") 
      }))}
      onMouseLeave={() => dispatch(setHoveredGag(null))}
      onClick={clickHandler}
    >
      {(gag.organic==="Organic") ? <OrganicIcon /> : null}
      {hasX ? (
        <svg className="x-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <span dangerouslySetInnerHTML={{__html: "<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->"}}></span>
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
        </svg>
      ) : null}
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
