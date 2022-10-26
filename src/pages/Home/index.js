import React from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';


function SplashScreen() {
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


function CombosVisual() {
  return (
    <div id="combos-visual">
      
      <div className='txt-wrap'>
        <b>Level 9 Cog <span>(110 HP)</span></b>
        <i>Best 4-Toon Combos</i>
      </div>
      

      <div className='video-wrap'>
        <video
          width="394" height="168" autoPlay muted loop
        >
          <source src="/videos/combos-loop.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

function Intro() {
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


function About() {
  return (
    <section id='about'>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>Who am I?</h2>
          <p>
            I go by McNugget in Toontown.
          </p>
          <p> 
            I have been playing Toontown since its release in 2003 (I even remember watching the Toontown commercials on Disney Channel as a kid!).
            I've also played Toontown Rewritten since its Alpha days, back when you needed a key to wait in line to play!
          </p>
          <p>
            As a web developer, I wanted to provide a useful tool for the TTR community,
            and I believe there is nothing better than helping toons defeat the cogs.
            This tool can help people new to the game get familiar with the basic combos,
            or seasoned toons to find new combos! 
          </p>
        </div>
        <div className='right'>
          <img src='./img/mcnugget.webp' width='1000' height='600' alt='McNugget Portrait' />
        </div>
      </div>
    </section>
  );
}


function Help() {
  return (
    <section id='help'>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>How to Use</h2>
          <ul>
            <li>
              Configure the number of toons and their organic gags using the "Toons" section.
            </li>
            <li>
              Use the "Cog" section to set the cog level and whether or not it is currently lured.
            </li>
            <li>
              The "Combos" section will display the gag combos that will defeat your cog!
            </li>
            <li>
              You can use the combos section filters to display only certain types of combos
              or to filter out gag tracks you don't want to use.
            </li>
          </ul>
          <i>Note: This utility is only for Toontown Rewritten!</i>
        </div>
        <div className='right'>
          <h2>New to Toontown?</h2>
          <a href='https://toontownrewritten.com/'>
            Toontown Rewritten Homepage
          </a>
          <a href='https://toontownrewritten.fandom.com/wiki/Gags'>
            TTR Gags Wiki
          </a>
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  return (
    <>
      <Header />
      <div id='page' className='home custom-scrollbar'>
        <SplashScreen /> 
        <Intro />
        <About />
        <Help />
        <Footer />
      </div>
    </>
  );
}