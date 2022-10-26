import { Link } from 'react-router-dom';
import './index.css';

export default function Footer() {
  return (
    <footer>
      <div className='wrapper flex'>
        <div className='left'>
          <h2>Gag Combos Info</h2>
          <p>The go-to Toontown Rewritten dashboard for defeating the cogs.</p>
        </div>
        <div className='right'>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/changelog">Changelog</Link>
        </div>
      </div>
    </footer>
  );
}