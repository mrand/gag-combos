import { Link } from "react-router-dom";
import CombosVisual from '../combos-visual';
import './index.css';


export default function Intro() {
  return (
    <section id='intro' className='with-grid-bg'>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>Welcome!</h2>
          <p>
            Welcome to Gag Combos Info, your new go-to resource
            for finding the perfect combinations of gags to defeat the cogs!
          </p>
          <p>
            Get recommended combos for any situation on the "Recommendations" page or 
            build your own combos on the "Calculator" page!
          </p>
          <Link to="/recommendations">Combos Recommendations</Link>
          <Link to="/calculator">Gag Calculator</Link>
        </div>
        <div className='right'>
          <CombosVisual />
        </div>
      </div>
    </section>
  );
}
