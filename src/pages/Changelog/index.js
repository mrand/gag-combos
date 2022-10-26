import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './index.css';


function ChangelogEntries() {
  return (
    <div className='changelog-entries'>
      <section>
        <h3>2022-10-25</h3>
        <div className='block'>
          <b>New Homepage</b>
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
          <b>Changelog Page</b>
          <p>
            You're here! 
          </p>
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
        <div className='block warn' style={{color: "var(--red-500"}}>
          <b>To-Do: Privacy Policy Page</b>
          <p>
            Privacy Policy page coming soon, since storing the dashboard setup using localStorage is considered "storing user information". 
          </p>
          <p>
            Be assured in the meantime that this information stays on your browser, and it is not read by me or any 3rd parties.
          </p>
          <p>
            Furthermore, you can always clear any stored information after each use with the reset buttons above the Toons, Combos, and Cog Sections on the Dashboard Page!
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
      <div id='page' className='custom-scrollbar'>
        <article id='changelog'>
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