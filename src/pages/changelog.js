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
              <h3>2023-03-02</h3>
              <h4>Fixed Broken Links</h4>
              <p>
                Fixed two broken links on the homepage.
              </p>
            </section>

            <section>
              <h3>2022-11-13</h3>
              <h4>404 Page</h4>
              <p>
                Added a new 404 page to let you know if the page you are trying to visit doesn't exist.
                (Previously, a 404 error would simply redirect you to the homepage.) 
              </p>
            </section>

            <section>
              <h3>2022-11-09</h3>
              <h4>New Gag Calculator Page!</h4>
              <p>
                Sometimes it's easier to build your own combination of gags than it is to scroll through a list of recommendations.
                That's why we've added a new calculator page to Gag Combos Info!
                Choose any combination of gags for yourself on this page,
                and the calculator will show you which cogs your combo will defeat.
              </p>
              <p>
                Renamed "Dashboard" page to "Recommendations" to better reflect its purpose.
              </p>
            </section>

            <section>
              <h3>2022-11-07</h3>
              <h4>v2.0 Cog Support</h4>
              <p>
                You can now toggle whether your cog is a v2.0 to account for reinforced plating in the combo calculations!
              </p>
            </section>

            <section>
              <h3>2022-11-03</h3>
              <h4>Social Media Card</h4>
              <p>
                Added a flashy card design for when the Gag Combos Info link is shared on social media.
              </p>
            </section>

            <section>
              <h3>2022-11-02</h3>
              <h4>Instant Updates</h4>
              <ul>
                <li>Under-the-hood changes that allow instant updates instead of requiring one website visit to detect updates and another website visit to implement them.</li>
                <li>Added a popup notification message that displays any time there is an update to Gag Combos Info.</li>
                <li>(Button that closes the popup notification reloads the page to implement the updates.)</li>
              </ul>
            </section>

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
