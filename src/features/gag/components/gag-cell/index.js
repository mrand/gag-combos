import { useDispatch } from 'react-redux';
import { setGagModal } from 'features/recommendations/recommendations.slice';
import './index.css';
import { trackColors } from '../../gag.data';


export function OrganicIcon() {
  return (
    <img 
      className='organic-icon'
      src="/img/gags/icon-organic-mini.png"
      alt={'Organic Icon'} 
    />
  );
}


function GagImageAndName({ gag }) {
  return (
    <div>
      {(gag.track === 'Lure') ? (
        <>
          <img 
            className='gag-icon'
            src={'./img/gags/lure-10_bill.png'} 
            alt={'Organic $10 Bill'} 
          />
          <b className='gag-name'>Lure (Any)</b>
        </>  
      ) : (
        <>
          <img 
            className='gag-icon'
            src={gag.image} 
            alt={gag.name} 
          />
          <b className='gag-name'>{gag.name}</b>
        </>
        
      )}
    </div>
  );
}


function GagStats({ gag, isDropOnly=false }) {
  return (
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
                style={isDropOnly ? {color: 'var(--red-500)'} : {}}
              >
                <b>Acc:</b> {gag.accuracy*100}%
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
}


export default function GagCell({ gag, isDropOnly=false }) {
  const dispatch = useDispatch();

  return (
    <button 
      className={'gag-cell' + (gag.organic==='Organic' ? ' org' : '')}
      style={{background: (trackColors[gag.track] || "")}}
      onClick={() => {
        dispatch(setGagModal(
          { 
            track: gag.track, 
            level: gag.level, 
            org: (gag.organic==="Organic")
          }
        ));
      }}
    >
      {(gag.organic==="Organic") ? <OrganicIcon /> : null}
      <GagImageAndName gag={gag} />
      <GagStats gag={gag} isDropOnly={isDropOnly} />
    </button>
  );
}
