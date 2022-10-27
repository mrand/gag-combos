import CombosVisual from '../combos-visual';
import './index.css';


export default function Intro() {
  return (
    <section id='intro'>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>Welcome!</h2>
          <p>
            Welcome to GagCombos.Info, your new go-to dashboard
            for finding the perfect combinations of gags to defeat the cogs! 
          </p>
          <br />
          <p>
            Use the Combo Picker Dashboard to find gag combos for...
          </p>
          <ul>
            <li>Any Cog Level 1 through 20</li>
            <li>Any Number of Toons</li>
            <li>Any Set of Organic Gags</li>
            <li>Any Combination of Gag Tracks</li>
          </ul>
        </div>
        <div className='right'>
          <CombosVisual />
        </div>
      </div>
    </section>
  );
}
