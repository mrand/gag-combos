import './homepage.component.css';
import About from './components/about';
import Help from './components/help';
import Intro from './components/intro';
import SplashScreen from './components/splash-screen';


export default function HomepageComponent() {
  return (
    <>
      <SplashScreen /> 
      <Intro />
      <About />
      <Help />
    </>
  );
}
