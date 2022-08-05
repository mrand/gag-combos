import React from 'react';
import './Combos.css';
import { RecommendCombos } from '../../core/Combo';


function ComboCell({ combo }) {
  let solutionTracks = Object.keys(combo.counts);

  return (
    <div className='combo-cell'>
      <div className='left'>
        {/* heading */}
        <h3>
          {solutionTracks.map((track, j) => {
            if (solutionTracks.length === 1) {
              return track;
            } else {
              return (j===solutionTracks.length-1) ? track : track + ' / ';
            }
          })}
        </h3>
        {/* gags */}
        <div className='combo-gags'>
          {combo.gags.map((gag, j) => (
            <div 
              className='gag-cell'
              key={j}
            >
              <div>
                {(gag.track === 'Lure') ? (
                  <>
                    <img src={'./img/gags/lure-10_bill.png'} alt={'$10 Bill'} />
                    <b>Lure (Any)</b>
                  </>  
                ) : (
                  <>
                    <img src={gag.image} alt={gag.name} />
                    <b className='gag-name'>{gag.name}</b>
                  </>
                  
                )}
              </div>
              <div className='gag-stats'>
                {(gag.name === 'Pass') ? (null) : (
                  <>
                    {(gag.track === 'Lure') ? (
                      <>
                        <span><b>Dmg:</b> 0</span>
                        <span><b>Acc:</b> *</span>
                      </>
                    ) : (
                      <>
                        <span><b>Dmg:</b> {gag.damage}</span>
                        <span
                          style={
                            JSON.stringify(solutionTracks)===JSON.stringify(['Drop']) ? 
                            {color: 'var(--red)'} : {}
                          }
                        ><b>Acc:</b> {gag.accuracy*100}%</span>
                      </>
                    )}
                  
                    
                  </>
                )}
                
              </div>
              
            </div>
          ))}
        </div>
      </div>
      <div className='right'>
        {/* <h4>{(combo.isLured) ? 'Cog is Lured' : ''}</h4> */}
        {/* <h4>Cog HP: {combo.cogHP}</h4> */}
        <h4>
          Damage: 
          <span
            style={combo.totalDamage === combo.cogHP ? {color: 'var(--green)'} : {}}
          > {combo.totalDamage} / {combo.cogHP}</span>
        </h4>
      </div>
    </div>
  );
}


function CombosGrid({ cog, toonOrgs, isLured, recommendCombos }) {
  return (
    <div className='combos-grid'>
      <>
        {(recommendCombos.errorMsg) ? (
          <div className='combo-cell error-msg'>
            <h3>
              {recommendCombos.errorMsg}
            </h3>
          </div>
        ) : (
          <>
            {recommendCombos.recCombos.map((combo, i) => (
              <ComboCell 
                key={i}
                cog={cog}
                combo={combo} 
                toonOrgs={toonOrgs}
                isLured={isLured}
              />          
            ))}
          </>  
        )}
      </>
    </div>
  );
}


function MainFilters({ state, dispatch }) {
  let comboType = state.comboState.comboType;
  return (
    <div className='btns'>
      <button 
        className={comboType==='All' ? 'active' : ''}
        onClick={() => {
          dispatch({
            type: 'combo', 
            'change': 'comboType',
            'value': 'All'
          })
        }}
      >All</button>
      <button
        className={comboType==='Basic' ? 'active' : ''}
        onClick={() => {
          dispatch({
            type: 'combo', 
            'change': 'comboType',
            'value': 'Basic'
          })
        }}
      >Basic</button>
      <button
        className={comboType==='Best' ? 'active' : ''}
        onClick={() => {
          dispatch({
            type: 'combo', 
            'change': 'comboType',
            'value': 'Best'
          })
        }}
      >Best</button>
    </div>
  );
}


function TitleContainer({ state, dispatch }) {
  return (
    <div className='title-container'>
      <div>
        <h2>Combos</h2>
        <MainFilters 
          state={state}
          dispatch={dispatch}
        />
      </div>
      {/* <div>
        <h3>Toggle Gag Tracks</h3>
        <div className='btns gag-toggles'>
          <button className='active'>
            <img src='./img/gags/toonup-Feather.png' alt='Toon-Up Gag' />
          </button>
          <button className='active'>
            <img src='./img/gags/trap-Banana_Peel.png' alt='Trap Gag' />
          </button>
          <button className='active'>
            <img src='./img/gags/lure-1_Bill.png' alt='Lure Gag' />
          </button>
          <button className='active'>
            <img src='./img/gags/sound-Bike_Horn.png' alt='Sound Gag' />
          </button>
          <button className='active'>
            <img src='./img/gags/throw-Cupcake.png' alt='Throw Gag' />
          </button>
          <button className='active'>
            <img src='./img/gags/squirt-Squirting_Flower.png' alt='Squirt Gag' />
          </button>
          <button className='active'>
            <img src='./img/gags/drop-Flower_Pot.png' alt='Drop Gag' />
          </button>
        </div>
      </div> */}
    </div>
  );
}
 

export default function Combos({ state, dispatch }) {

  let cog = state.cogState.cog;
  let isLured = state.cogState.isLured;
  let numToons = state.toonState.numToons;
  let toonOrgs = state.toonState.toonOrgs;

  let recommendCombos = new RecommendCombos(
    cog, isLured,               // cog params
    numToons, toonOrgs,         // toons params 
    state.comboState.comboType  // recommended combos only?
  )
  // console.log(recCombos);

  return (
    <div className='combos'>
      <TitleContainer 
        state={state}
        dispatch={dispatch}
      />
      <CombosGrid 
        cog={cog}
        toonOrgs={toonOrgs}
        isLured={isLured}
        recommendCombos={recommendCombos}
      />
      {(!isLured && numToons > 1) ? (
        <h4>* Lure Accuracy Varies from 50% to 95%</h4>
      ) : ( null )}
      
    </div>
  );
} 
