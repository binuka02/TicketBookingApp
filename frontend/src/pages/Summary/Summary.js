import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './summary.module.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import TheaterBack from '../../assets/img/theaterback.png';
import PayButton from '../../components/PayButton';

const Summary = () => {
  const [movieName, setMovieName] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchBookingData(); 

    async function fetchBookingData() {
      try {
        const response = await fetch('');
        if (!response.ok) {
          throw new Error('Failed to fetch booking details');
        }
        const bookingData = await response.json();
        setMovieName(bookingData.movieName);
        setSelectedSeats(bookingData.selectedSeats);
        setSelectedDate(bookingData.selectedDate);
        setSelectedTime(bookingData.selectedTime);
        setTotalAmount(bookingData.totalAmount);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    }
  }, []); 

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
          <PayButton />
        </div>
      </div>
    </div>
  );
};

export default Summary;
