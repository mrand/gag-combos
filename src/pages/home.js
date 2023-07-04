import React from 'react';
import 'features/homepage/index.css';
import Header from 'features/ui/header';
import { About, Help, Intro, SplashScreen } from 'features/homepage';
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
