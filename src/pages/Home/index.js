import React from 'react';
import './index.css';
import Header from 'features/ui/header';
import SplashScreen from './components/splash-screen';
import Intro from './components/intro';
import About from './components/about';
import Help from './components/help';
import Footer from 'features/ui/footer';


export default function Homepage() {
  return (
    <div id='page' className='home custom-scrollbar'>
      <Header />
      <SplashScreen /> 
      <Intro />
      <About />
      <Help />
      <Footer />
    </div>
  );
}