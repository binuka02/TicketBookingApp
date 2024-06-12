import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const stripePromise = loadStripe('pk_test_51PQRzzGbNYoqvhhb0a4DlAp6bsQXhwF1k6rhtvUAFGCgHXElVep8eMyOZvr84TwVs9hOHuJ5O3CBBchkjV2DWn2w00GWAMw1UT');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
