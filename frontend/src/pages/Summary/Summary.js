import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './summary.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51PQRzzGbNYoqvhhb0a4DlAp6bsQXhwF1k6rhtvUAFGCgHXElVep8eMyOZvr84TwVs9hOHuJ5O3CBBchkjV2DWn2w00GWAMw1UT");

const CheckoutForm = ({ clientSecret, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent.status === 'succeeded') {
      navigate('/success');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ${amount / 100}
      </button>
    </form>
  );
};

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
    <div className={classes.center}>
      <div className={classes.summary}>
        <h1 className={classes.summaryh1}>Booking Summary</h1>
        <div className={classes.summaryDetails}>
          <div className={classes.detailLabels}>
            <strong className={classes.summaryStrong}>Movie Name:</strong>
            <strong className={classes.summaryStrong}>Seats:</strong>
            <strong className={classes.summaryStrong}>Date:</strong>
            <strong className={classes.summaryStrong}>Time:</strong>
            <strong className={classes.summaryStrong}>Total Amount:</strong>
          </div>
          <div className={classes.detailValues}>
            <div>{movieName}</div>
            <div>{selectedSeats.join(', ')}</div>
            <div>{selectedDate}</div>
            <div>{selectedTime}</div>
            <div>${totalAmount}</div>
          </div>
        </div>
        <div className={classes.centerButton}>
          <button className={classes.summaryConfirmButton} type="button" onClick={makePayment}>Confirm</button>
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
