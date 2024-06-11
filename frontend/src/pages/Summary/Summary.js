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
            <div>{totalAmount}</div>
          </div>
        </div>
        <div className={classes.centerButton}>
          <button className={classes.summaryConfirmButton} type="button" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
