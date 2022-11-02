import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import App from 'App';
import store from 'store'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from 'serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

console.log('test update 1');
serviceWorkerRegistration.register({
  onUpdate: registration => {
    alert('New version available. Ready to update?');
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  }
});
