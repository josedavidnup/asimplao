import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/app/store';
import { Provider } from 'react-redux';
import axios from 'axios';
import './index.css';
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
