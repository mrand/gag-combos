import React, { useContext } from 'react';
import { PageSizeContext } from '../../App'
import { useLocation, Link } from 'react-router-dom';
import './index.css';


function NavDesktop() {
  const pageSize = useContext(PageSizeContext);
  const location = useLocation().pathname;
  return (
    pageSize === 'desktop' ? (
      <nav>
        <Link 
          to="/" 
          className={location === "/" ? "active" : ""}
        >
          Home
        </Link>
        <Link 
          to="/dashboard"
          className={location === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
      </nav>
    ) : null
  );
}


export default function Header() {
  return (
    <header>
      <div className='wrapper'>
        <h1>
        <Link to="/">Gag Combos</Link>
        </h1>
        <NavDesktop />
      </div>
    </header>
  );
}
