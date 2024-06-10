import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './summary.module.css';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, totalAmount, movieName, selectedDate, selectedTime } = location.state;

  const handleConfirm = () => {
    // Handle confirmation logic here
    alert('Booking Confirmed!');
    navigate('/');
  };

  return (
    <div className={classes.center}>
      <div className={classes.summary}>
        <h2>Booking Summary</h2>
        <div className={classes.detail}>
          <strong>Movie Name:</strong> {movieName}
        </div>
        <div className={classes.detail}>
          <strong>Seats:</strong> {selectedSeats.join(', ')}
        </div>
        <div className={classes.detail}>
          <strong>Date:</strong> {selectedDate}
        </div>
        <div className={classes.detail}>
          <strong>Time:</strong> {selectedTime}
        </div>
        <div className={classes.detail}>
          <strong>Total Amount:</strong> {totalAmount}
        </div>
        <button type="button" onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default Summary;
