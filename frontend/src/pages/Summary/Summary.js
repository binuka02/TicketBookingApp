import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './summary.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
//import CheckoutForm from '../CheckoutForm/CheckoutForm';
import TheaterBack from '../../assets/img/theaterback.png';
import PayButton from '../../components/PayButton';


const Summary = () => {
  const location = useLocation();
  const { selectedSeats, totalAmount, movieName, selectedDate, selectedTime } = location.state;
  const [clientSecret, setClientSecret] = useState('');


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
          <PayButton/>
        </div>
    
      </div>
    </div>
  );
};

export default Summary;
