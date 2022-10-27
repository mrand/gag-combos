import Header from 'components/header';
import Footer from 'components/footer';


export default function Changelog() {
  return (
    <div id='page' className='changelog custom-scrollbar'>
      <Header />
      
      <article className='with-grid-bg'>
        <div className='wrapper'>
          <h2 className='standard-heading'>Changelog</h2>
          <div className='formatted-article'>

            <section>
              <h3>2022-10-26</h3>
              <div className='block'>
                <b>New FAQ Page</b>
                <p>
                  Added a Frequently Asked Questions page describing site details.
                </p>
              </div>
              <div className='block'>
                <b>A Better Header (and Footer!)</b>
                <p>
                  Header now includes more links, and a hamburger menu on mobile.
                </p>
                <p>
                  Footer includes links to ALL website pages.
                </p>
              </div>
            </section>

            <section>
              <h3>2022-10-25</h3>
              <div className='block'>
                <b>New Homepage!</b>
                <p>
                  Introduced a new, flashier homepage!
                </p>
              </div>
              <div className='block'>
                <b>Site Structure</b>
                <p>
                  Various under-the-hood changes to support multiple website pages going forward.
                </p>
              </div>
              <div className='block'>
                <b>Other New Pages</b>
                <ul>
                  <li>Changelog Page (You're Here!)</li>
                  <li>Privacy Policy Page</li>
                </ul>
              </div>
            </section>

            <section>
              <h3>2022-10-22</h3>
              <div className='block'>
                <b>Saving & Deleting</b>
                <p>
                  Dashboard now saves your setup by default, with buttons to reset toons, combos, and cog to their initial states if desired.
                </p>
              </div>
            </section>
            
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
