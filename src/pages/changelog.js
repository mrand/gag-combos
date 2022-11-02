import Header from 'features/ui/header';
import Footer from 'features/ui/footer';


export default function Changelog() {
  return (
    <div id='page' className='changelog custom-scrollbar'>
      <Header />
      
      <article className='with-grid-bg'>
        <div className='wrapper'>
          <h2 className='standard-heading'>Changelog</h2>
          <div className='formatted-article'>

            <section>
              <h3>2022-11-01</h3>
              <h4>Website Redesign!</h4>
              <div className='block'>
                <b>New Homepage</b>
                <p>
                  Introduced a new, flashier homepage!
                </p>
              </div>
              <div className='block'>
                <b>Revamped Dashboard Page</b>
                <ul>
                  <li>Combo gags are now colored to match their gag track.</li>
                  <li>Combo gags can now each be clicked to get detailed information about that gag.</li>
                  <li>Fixed a bug with resetting toons which caused toons to disappear!</li>
                </ul>
              </div>
              <div className='block'>
                <b>Other New Pages</b>
                <ul>
                  <li>FAQ Page</li>
                  <li>Changelog Page (You're Here!)</li>
                  <li>Privacy Policy Page</li>
                </ul>
              </div>
              <div className='block'>
                <b>A Better Header (and Footer)</b>
                <ul>
                  <li>Header and its links have been restyled.</li>
                  <li>Footer includes links to ALL website pages.</li>
                </ul>
              </div>
              <div className='block'>
                <b>Site Structure</b>
                <p>
                  Various under-the-hood changes to support multiple website pages and upcoming features!
                </p>
              </div>
            </section>

            <section>
              <h3>2022-10-22</h3>
              <h4>Saving & Deleting</h4>
              <p>
                Dashboard now saves your setup by default, with buttons to reset toons, combos, and cog to their initial states if desired.
              </p>
            </section>
            
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
