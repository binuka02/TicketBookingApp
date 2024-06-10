import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './theater.module.css';

const Theater = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const movieName = location.state?.movieName || 'Movie Name';

  const handleSeatChange = (event) => {
    const isChecked = event.target.checked;
    const pricePerTicket = 200;
    const seat = event.target.id;

    if (isChecked) {
      setTicketCount(prevCount => prevCount + 1);
      setTotalAmount(prevAmount => prevAmount + pricePerTicket);
      setSelectedSeats(prevSeats => [...prevSeats, seat]);
    } else {
      setTicketCount(prevCount => prevCount - 1);
      setTotalAmount(prevAmount => prevAmount - pricePerTicket);
      setSelectedSeats(prevSeats => prevSeats.filter(s => s !== seat));
    }
  };

  const generateSeats = () => {
    const rows = 6;
    const cols = 10;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let seats = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let seatNumber = `${alphabet[col]}${row + 1}`;
        seats.push(
          <React.Fragment key={`seat-${seatNumber}`}>
            <input type="checkbox" name="tickets" id={seatNumber} onChange={handleSeatChange} />
            <label htmlFor={seatNumber} className={`${classes.seat}`}></label>
          </React.Fragment>
        );
      }
    }
    return seats;
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBook = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    navigate('/summary', {
      state: {
        selectedSeats,
        totalAmount,
        movieName,
        selectedDate,
        selectedTime
      }
    });
  };

  return (
    <div className={classes.center}>
      <div className={classes.tickets}>
        <div className={classes.ticketSelector}>
          <div className={classes.head}>
            <div className={classes.title}>{movieName}</div>
          </div>
          <div className={classes.seats}>
            <div className={classes.status}>
              <div className={classes.item}>Available</div>
              <div className={classes.item}>Booked</div>
              <div className={classes.item}>Selected</div>
            </div>
            <div className={classes.allSeats}>
              {generateSeats()}
            </div>
          </div>
          <div className={classes.timings}>
            <div className={classes.dates}>
              <input type="radio" name="date" id="d1" value="11" onChange={handleDateChange} />
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Sun</div>
                <div className={classes.date}>11</div>
              </label>
              <input type="radio" name="date" id="d2" value="12" onChange={handleDateChange} />
              <label htmlFor="d2" className={classes.datesItem}>
                <div className={classes.day}>Mon</div>
                <div className={classes.date}>12</div>
              </label>
              <input type="radio" name="date" id="d3" value="13" onChange={handleDateChange} />
              <label htmlFor="d3" className={classes.datesItem}>
                <div className={classes.day}>Tue</div>
                <div className={classes.date}>13</div>
              </label>
              <input type="radio" name="date" id="d4" value="14" onChange={handleDateChange} />
              <label htmlFor="d4" className={classes.datesItem}>
                <div className={classes.day}>Wed</div>
                <div className={classes.date}>14</div>
              </label>
              <input type="radio" name="date" id="d5" value="15" onChange={handleDateChange} />
              <label htmlFor="d5" className={classes.datesItem}>
                <div className={classes.day}>Thu</div>
                <div className={classes.date}>15</div>
              </label>
              <input type="radio" name="date" id="d6" value="16" onChange={handleDateChange} />
              <label htmlFor="d6" className={classes.datesItem}>
                <div className={classes.day}>Fri</div>
                <div className={classes.date}>16</div>
              </label>
              <input type="radio" name="date" id="d7" value="17" onChange={handleDateChange} />
              <label htmlFor="d7" className={classes.datesItem}>
                <div className={classes.day}>Sat</div>
                <div className={classes.date}>17</div>
              </label>
            </div>
            <div className={classes.times}>
              <input type="radio" name="time" id="t1" value="11:00" onChange={handleTimeChange} />
              <label htmlFor="t1" className={classes.time}>11:00</label>
              <input type="radio" name="time" id="t2" value="15:00" onChange={handleTimeChange} />
              <label htmlFor="t2" className={classes.time}>15:00</label>
              <input type="radio" name="time" id="t3" value="18:00" onChange={handleTimeChange} />
              <label htmlFor="t3" className={classes.time}>18:00</label>
              <input type="radio" name="time" id="t4" value="21:00" onChange={handleTimeChange} />
              <label htmlFor="t4" className={classes.time}>21:00</label>
            </div>
          </div>
        </div>
        <div className={classes.price}>
          <div className={classes.total}>
            <span>
              <span className={classes.count}>{ticketCount}</span> Tickets
            </span>
            <div className={classes.amount}>{totalAmount}</div>
          </div>
          <button type="button" onClick={handleBook}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default Theater;
