import React from 'react';
import ReactDOM from 'react-dom/client';
import '~/index.css';
import App from '~/App';
import store from '~/store';
import { Provider } from 'react-redux';
import { registerSW } from 'virtual:pwa-register'
import UpdateToast from '~/features/ui/update-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const toast = ReactDOM.createRoot(document.getElementById('toast'));
registerSW({
  onNeedRefresh() { toast.render(<UpdateToast />) }
});

// test
