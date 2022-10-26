import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';


function ChangelogEntries() {
  return (
    <div className='formatted-article'>
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
  );
}


export default function Changelog() {
  return (
    <>
      <Header />
      <div id='page' className='changelog custom-scrollbar'>
        <article id='changelog-entries'>
          <div className='wrapper'>
            <h2>Changelog</h2>
            <ChangelogEntries />
          </div>
        </article>
        <Footer />
      </div>
    </>
  );
}