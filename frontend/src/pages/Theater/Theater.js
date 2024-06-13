import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import classes from './theater.module.css';
import TheaterBack from '../../assets/img/theaterback.png';
import { useBooking } from '../../hooks/useBooking';
import { getById } from '../../services/BookingService';

const Theater = () => {
  const [ticketCount, setTicketCount] = useState(() => {
    return JSON.parse(localStorage.getItem('ticketCount')) || 0;
  });
  const [totalAmount, setTotalAmount] = useState(() => {
    return JSON.parse(localStorage.getItem('totalAmount')) || 0;
  });
  const [selectedSeats, setSelectedSeats] = useState(() => {
    return JSON.parse(localStorage.getItem('selectedSeats')) || [];
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem('selectedDate') || '';
  });
  const [selectedTime, setSelectedTime] = useState(() => {
    return localStorage.getItem('selectedTime') || '';
  });
  const [availableTimes, setAvailableTimes] = useState([]);

  const location = useLocation();
  const movieName = location.state?.movieName || 'Movie Name';

  useEffect(() => {
    localStorage.setItem('ticketCount', JSON.stringify(ticketCount));
  }, [ticketCount]);

  useEffect(() => {
    localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
  }, [totalAmount]);

  useEffect(() => {
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    localStorage.setItem('selectedDate', selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('selectedTime', selectedTime);
  }, [selectedTime]);

  const handleSeatChange = (event) => {
    const isChecked = event.target.checked;
    const pricePerTicket = 80;
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
    const seatsToRemove = ['P1', 'P18', 'Q1', 'Q18'];
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
              <input type="checkbox" name="tickets" id={seatNumber} onChange={handleSeatChange} checked={selectedSeats.includes(seatNumber)} />
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
    const date = event.target.value;
    setSelectedDate(date);
    if (date === '2024-06-29') {
      setAvailableTimes(['13:00']);
    } else if (date === '2024-06-30') {
      setAvailableTimes(['10:30', '13:30']);
    }
    setSelectedTime('');
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBook = async () => {
    if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
      alert('Please select date, time, and at least one seat.');
      return;
    }

    try {
      await addBook({
        movieName,
        selectedDate,
        selectedTime,
        selectedSeats,
        totalAmount,
      });
    } catch (error) {
      console.error('Booking failed', error);
    }
  };

  const { addBooking } = useBooking();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnUrl = params.get('returnUrl');

  useEffect(() => {
    if (addBooking !== undefined) {
      // returnUrl ? navigate(returnUrl) : navigate('/summary');
    }
  }, [addBooking, navigate, returnUrl]);

  const addBook = async ({ movieName, selectedDate, selectedTime, selectedSeats, totalAmount }) => {
    if (addBooking) {
      await addBooking(movieName, selectedDate, selectedTime, selectedSeats, totalAmount);
    } else {
      console.error('addBooking is not a function');
    }
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
              <input type="radio" name="date" id="d1" value="2024-06-29" onChange={handleDateChange} checked={selectedDate === '2024-06-29'} />
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Sat</div>
                <div className={classes.date}>29</div>
              </label>
              <input type="radio" name="date" id="d2" value="2024-06-30" onChange={handleDateChange} checked={selectedDate === '2024-06-30'} />
              <label htmlFor="d2" className={classes.datesItem}>
                <div className={classes.day}>Sun</div>
                <div className={classes.date}>30</div>
              </label>
              {/* Additional dates can be added here */}
            </div>
            {selectedDate && (
              <div className={classes.times}>
                {availableTimes.map((time) => (
                  <React.Fragment key={time}>
                    <input type="radio" name="time" id={time} value={time} onChange={handleTimeChange} checked={selectedTime === time} />
                    <label htmlFor={time} className={`${classes.time} ${selectedTime === time ? classes.selected : ''}`}>{time}</label>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={classes.price}>
          <div className={classes.total}>
            <span>
              <span className={classes.count}>{ticketCount}</span> Ticket/s
            </span>
            <div className={classes.amount}>{totalAmount} RON</div>
          </div>
          <button type="button" onClick={handleBook} className={classes.booktheater}>Check out</button>
        </div>
      </div>
    </div>
  );
};

export default Theater;
