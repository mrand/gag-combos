import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGag, setHoveredGag } from 'features/calculator/calculator.slice';
import './index.css';
import { Gag } from 'features/gag';
import { GagButton } from 'features/gag/components';


function GagsListContainer({ gagslist }) {
  const dispatch = useDispatch();
  return (
    <>
      {
        gagslist.map((gag, i) => {
          let thisGag = new Gag(gag.track, gag.level, gag.org);
          return (
            <React.Fragment key={i}>
              <GagButton 
                gag={thisGag} 
                clickHandler={() => {
                  dispatch(deleteGag({index: i}))
                  dispatch(setHoveredGag(null))
                }}
                hasX={true}
              />
              {(i < gagslist.length-1) ? (<span>+</span>) : null}
            </React.Fragment>
          )
        })
      }
    </>
  );
}


export default function GagsList() {
  const gagslist = useSelector((state) => state.calculator.gagslist);

  return (
    <div className="gags-list">
      <div className="gags-list-container custom-scrollbar">
        {
          gagslist.length > 0 ? (
            <GagsListContainer gagslist={gagslist} />
          ) : (
            <h4>Choose Gags to Calculate their Damage!</h4>
          )
        }
      </div>
    </div>
  );
}
