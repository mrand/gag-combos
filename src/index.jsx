import React from 'react';
import ReactDOM from 'react-dom/client';
import '~/index.css';
import App from '~/App';
import store from '~/store';
import { Provider } from 'react-redux';
import { registerSW } from 'virtual:pwa-register'
import UpdateToast from '~/features/ui/update-toast';


// App Container
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


// Display Notifications for Major Updates
const toast = ReactDOM.createRoot(document.getElementById('toast'));
// check last major update against local last update notification
const lastMajorUpdate = "202307172150";
let localLastUpdateNotification = localStorage.getItem('lun');
// if local doesn't exist, set it
if (!localLastUpdateNotification) {
  localStorage.setItem('lun', lastMajorUpdate); 
  localLastUpdateNotification = localStorage.getItem('lun');
}
// if last major update differs from local last update notification...
if (lastMajorUpdate !== localLastUpdateNotification) {
  // update local and give user a notification
  localStorage.setItem('lun', lastMajorUpdate);
  toast.render(<UpdateToast />)
}


// Register PWA Service Worker
registerSW({ immediate: true });
