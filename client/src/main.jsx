import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/app/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import global_en from './translations/en/global.json';
import global_es from './translations/es/global.json';
import './index.css';
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <I18nextProvider i18n={i18next}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </I18nextProvider>
  // </React.StrictMode>
);
