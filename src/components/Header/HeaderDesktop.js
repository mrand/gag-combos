import React from 'react';
import './Header.css';

export default function HeaderDesktop({ infoActive, setInfoActive }) {
  return (
    <>
      <header>
        <div className='wrapper'>
          <h1>Gag Combos</h1>
          <nav>
            <button 
              className={'info-btn' + (infoActive ? ' active' : '')}
              onClick={() => setInfoActive(true)}
            >
              Info
            </button>
            <button 
              className={'home-btn' + (!infoActive ? ' active': '')}
              onClick={() => {
                localStorage.setItem('saw-info-card', true);
                setInfoActive(false);
              }}
            >
              Dashboard
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}