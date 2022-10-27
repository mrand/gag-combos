import { Link } from "react-router-dom";
import './index.css';


export default function SplashScreen() {
  return (
    <section id="splash-screen">
      <div className='gag-images'>
        <img src='/img/splash.png' alt='Splash Screen' />
      </div>
      <div id='splash-text' className='wrapper'>
        <h2>Gag Combos Info</h2>
        <Link to="/dashboard">Take Me to the Dashboard!</Link>
      </div>
    </section>
  );
}
