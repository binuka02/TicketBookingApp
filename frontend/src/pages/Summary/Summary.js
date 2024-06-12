import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './summary.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import TheaterBack from '../../assets/img/theaterback.png';

const stripePromise = loadStripe("pk_test_51PQRzzGbNYoqvhhb0a4DlAp6bsQXhwF1k6rhtvUAFGCgHXElVep8eMyOZvr84TwVs9hOHuJ5O3CBBchkjV2DWn2w00GWAMw1UT");

const Summary = () => {
  const location = useLocation();
  const { selectedSeats, totalAmount, movieName, selectedDate, selectedTime } = location.state;
  const [clientSecret, setClientSecret] = useState('');

  const makePayment = async () => {
    const response = await fetch('http://localhost:8080/api/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: totalAmount * 100 }), 
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);
  };

  return (
    <div className={classes.center} style={{ backgroundImage: `url(${TheaterBack})` }}>
      <div className={classes.summary}>
        <h1 className={classes.summaryh1}>Booking Summary</h1>
        <div className={classes.summaryDetails}>
        <table className={classes.summaryTable}>
          <tbody>
            <tr>
              <th className={classes.summaryStrong}>Movie Name:</th>
              <td>{movieName}</td>
            </tr>
            <tr>
              <th className={classes.summaryStrong}>Seats:</th>
              <td>{selectedSeats.join(', ')}</td>
            </tr>
            <tr>
              <th className={classes.summaryStrong}>Date:</th>
              <td>{selectedDate}</td>
            </tr>
            <tr>
              <th className={classes.summaryStrong}>Time:</th>
              <td>{selectedTime}</td>
            </tr>
            <tr>
              <th className={classes.summaryStrong}>Total Amount:</th>
              <td>{totalAmount} RON</td>
            </tr>
          </tbody>
        </table>
      </div>

        <div className={classes.centerButton}>
          {/* <button className={classes.summaryConfirmButton} type="button" onClick={makePayment}>Confirm</button> */}
          <button className={classes.summaryConfirmButton} type="button" >Confirm</button>

        </div>
        {clientSecret && (
          <Elements stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} amount={totalAmount * 100} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Summary;
