import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './index.css';
import App from './App';
import store from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          {/* root directory */}
          <Route path="/" element={<App />} />
          {/* 404 - Redirect to Homepage */}
          <Route 
            path="*" 
            element={<Navigate replace to="/" />} 
          />
        </Routes>
      </BrowserRouter>
      
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
