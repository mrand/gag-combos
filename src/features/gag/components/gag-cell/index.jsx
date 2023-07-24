import { useDispatch } from 'react-redux';
import { setGagModal } from '~/features/recommendations';
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
    <div className='gag-icon-name-wrap'>
      <img 
        className='gag-icon'
        src={gag.image} 
        alt={gag.name} 
      />
      <b className='gag-name'>{gag.name}</b>
    </div>
  );
}


function GagStats({ gag }) {
  return (
    <>
      <div className='gag-stats'>
        <b className='stat-title'>Base</b>
        <span><b>Dmg:</b> {gag.damage['Base']}</span>
        <span><b>Acc:</b> {Math.round(gag.accuracy['Base']*100)}%</span>
      </div>
      <div className='gag-stats'>
        <b className='stat-title'>Attack</b>
        <span><b>Dmg:</b> {gag.damage['Attack']}</span>
        <span><b>Acc:</b> {Math.round(gag.accuracy['Attack']*100)}%</span>
      </div>
    </>
  );
}


export default function GagCell({ gag }) {
  const dispatch = useDispatch();

  return (
    <button 
      title={'View details about "'+(gag.organic==='Organic' ? gag.organic+' ' : '')+gag.name+'"'}
      className={'gag-cell custom-scrollbar' + (gag.organic==='Organic' ? ' org' : '')}
      style={{background: (trackColors[gag.track] || "")}}
      onClick={() => {
        dispatch(setGagModal(
          { 
            track: gag.track, 
            level: gag.level, 
            org: (gag.organic==="Organic"),
            comboStats: {
              accuracy: gag.accuracy,
              damage: gag.damage
            }
          }
        ));
      }}
    >
      {(gag.organic==="Organic") ? <OrganicIcon /> : null}
      <GagImageAndName gag={gag} />
      <GagStats gag={gag} />
    </button>
  );
}
