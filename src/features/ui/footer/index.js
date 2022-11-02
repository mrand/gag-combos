import { Link } from 'react-router-dom';
import './index.css';


export default function Footer() {
  return (
    <footer>
      <div className='wrapper'>
        <h2>Gag Combos Info</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/changelog">Changelog</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
