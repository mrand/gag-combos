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
          <Link to="https://toontownrewritten.com/">Toontown Rewritten Homepage</Link>
          <Link to="https://toontownrewritten.fandom.com/wiki/Gags">TTR Gags Wiki</Link>
        </div>
      </div>
    </section>
  );
}
