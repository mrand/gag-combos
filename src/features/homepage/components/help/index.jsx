import { Link } from "react-router-dom";
import './index.css';


export default function Help() {
  return (
    <section id='help' className='with-grid-bg'>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>Need Help?</h2>
          <Link to="/faq">Frequently Asked Questions</Link>
          <Link to="/changelog">Changelog</Link>
          <i>Note: This utility is currently only for Toontown Rewritten!</i>
        </div>
        <div className='right'>
          <h2>New to Toontown?</h2>
          <a href="https://toontownrewritten.com/" target="_blank" rel="noopener noreferrer">Toontown Rewritten Homepage</a>
          <a href="https://toontownrewritten.fandom.com/wiki/Gags" target="_blank" rel="noopener noreferrer">TTR Gags Wiki</a>
        </div>
      </div>
    </section>
  );
}
