import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './index.css';

export default function PrivacyPolicy() {
  return (
    <div id='page' className='privacy custom-scrollbar'>
      <Header />

      <article id='privacy-policy'>
        <div className='wrapper'>

          <div className='privacy-title'>
            <h2>Privacy Policy</h2>
            <i>Last Updated: 2022-10-26</i>
          </div>
          

          <div className='formatted-article'>
            <section>
              <h3>Gag Combos Info does NOT and WILL NEVER sell your data.</h3>
              <p>
                Ensuring your privacy while using this website is extremely important to us, and we are not a fan of Cog-run businesses that sell data.
              </p>
            </section>
            <section>
              <h3>In fact, Gag Combos Info does not save any of your data on our end!</h3>
              <p>
                Gag Combos Info is what is called a static website. 
                This means when you visit the website, all of the information on the page is pre-defined. 
              </p>
              <p>
                The website may seem dynamic, and will get updates over time, but everything in the website is unchanging while you use it.
                There is no logging in and no database storing information about you. 
                We don't store cookies about you, keep your IP address, or save any information that could identify you.
              </p>
              <p>
                In fact, WE don't store anything about you.
              </p>
            </section>
            <section>
              <h3>So why does Gag Combos Info need a Privacy Policy?</h3>
              <p>
                Gag Combos Info uses something called localStorage to save your dashboard choices so when you close your browser and come back, you do not have to re-enter everything. 
              </p>
              <p>
                Unlike using a database or cookies, localStorage is saved and read entirely by your browser on YOUR end.
                Thus, the information saved from the dashboard page exists ONLY in your browser. 
                Neither us nor any 3rd parties see this saved information. It only serves as a convenience for you. 
              </p>
              <p>
                Furthermore, you can always clear this information after each use with the reset buttons above the Toons, Combos, and Cog Sections on the Dashboard Page!
              </p>
            </section>
            <section>
              <h3>You are safe when you come here.</h3>
              <p>
                The Toontown Rewritten community is full of amazing individuals who volunteer their time and efforts.
                Gag Combos Info is no different. It is a fan-made tool which is designed to (hopefully) be a useful addition to the community and help its players!
                You and your data are safe when you visit this website.
              </p>
            </section>
          </div>
          
        </div>
      </article>
      <Footer />

    </div>
  );
}