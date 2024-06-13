import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classes from './theater.module.css';
import TheaterBack from '../../assets/img/theaterback.png';

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
    const pricePerTicket = 10;
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
    const rows = 17;
    const cols = 18;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split(''); 
    const seatsToRemove = ['A1', 'A18', 'B1', 'B18'];
    let seats = [];

    for (let row = 0; row < rows; row++) {
      seats.push(
        <div key={`label-${row}`} className={classes.rowLabel}>
          {alphabet[row % alphabet.length]}
        </div>
      );
      for (let col = 0; col < cols; col++) {
        let seatNumber = `${alphabet[row]}${col + 1}`;
        if (!seatsToRemove.includes(seatNumber)) {
          seats.push(
            <React.Fragment key={`seat-${seatNumber}`}>
              <input type="checkbox" name="tickets" id={seatNumber} onChange={handleSeatChange} />
              <label htmlFor={seatNumber} className={classes.seat}>
                <span className={classes.seatNumber}>{seatNumber}</span>
              </label>
            </React.Fragment>
          );
        } else {
          seats.push(
            <div key={`empty-${seatNumber}`} className={classes.emptySeat}></div>
          );
        }
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
    <div className={classes.center} style={{ backgroundImage: `url(${TheaterBack})` }}>
      <div className={classes.tickets}>
        <div className={classes.ticketSelector}>
          <div className={classes.head}>
            <div className={classes.title}>{movieName}</div>
            <div className={classes.theatername}>National Museum of the Romanian Peasant</div>
          </div>
          <div className={classes.seats}>
            <div className={classes.status}>
              <div className={classes.item}>Available</div>
              <div className={classes.item}>Booked</div>
              <div className={classes.item}>Selected</div>
            </div>
            <div className={classes.allSeatsContainer}>
              <div className={classes.allSeats}>
                {generateSeats()}
              </div>
            </div>
          </div>
          <div className={classes.timings}>
            <div className={classes.dates}>
              <input type="radio" name="date" id="d1" value="11" onChange={handleDateChange} />
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Sat</div>
                <div className={classes.date}>29</div>
              </label>
              <input type="radio" name="date" id="d2" value="12" onChange={handleDateChange} />
              <label htmlFor="d2" className={classes.datesItem}>
                <div className={classes.day}>Sun</div>
                <div className={classes.date}>30</div>
              </label>
              {/* Additional dates can be added here */}
            </div>
            <div className={classes.times}>
              <input type="radio" name="time" id="t1" value="11:00" onChange={handleTimeChange} />
              <label htmlFor="t1" className={classes.time}>10:30</label>
              <input type="radio" name="time" id="t2" value="15:00" onChange={handleTimeChange} />
              <label htmlFor="t2" className={classes.time}>13:00</label>
              <input type="radio" name="time" id="t3" value="18:00" onChange={handleTimeChange} />
              <label htmlFor="t3" className={classes.time}>13:30</label>
              {/* Additional times can be added here */}
            </div>
          </div>
        </div>
        <div className={classes.price}>
          <div className={classes.total}>
            <span>
              <span className={classes.count}>{ticketCount}</span> Ticket/s
            </span>
            <div className={classes.amount}>{totalAmount} RON</div>
          </div>
          <button type="button" onClick={handleBook} className={classes.booktheater}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default Theater;
