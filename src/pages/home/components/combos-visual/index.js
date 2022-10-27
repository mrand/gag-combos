import './index.css';


export default function CombosVisual() {
  return (
    <div id="combos-visual">
      
      <div className='txt-wrap'>
        <b>Level 9 Cog <span>(110 HP)</span></b>
        <i>Best 4-Toon Combos</i>
      </div>
      
      <div className='video-wrap folded-corner'>
        <video
          width="394" height="168" autoPlay muted loop
        >
          <source src="/videos/combos-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
