import React, { useState } from 'react';
import classes from './theater.module.css';

const Theater = () => {
  const [ticketCount, setTicketCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleSeatChange = (event) => {
    const isChecked = event.target.checked;
    const pricePerTicket = 200;

    if (isChecked) {
      setTicketCount(prevCount => prevCount + 1);
      setTotalAmount(prevAmount => prevAmount + pricePerTicket);
    } else {
      setTicketCount(prevCount => prevCount - 1);
      setTotalAmount(prevAmount => prevAmount - pricePerTicket);
    }
  };

  const generateSeats = () => {
    let seats = [];
    for (let i = 0; i < 59; i++) {
      let randint = Math.floor(Math.random() * 2);
      let booked = randint === 1 ? classes.booked : '';
      seats.push(
        <React.Fragment key={`seat-${i}`}>
          <input type="checkbox" name="tickets" id={`s${i + 2}`} onChange={handleSeatChange} />
          <label htmlFor={`s${i + 2}`} className={`${classes.seat} ${booked}`}></label>
        </React.Fragment>
      );
    }
    console.log(seats); // Debug log to ensure seats are generated
    return seats;
  };

  return (
    <div className={classes.center}>
      <div className={classes.tickets}>
        <div className={classes.ticketSelector}>
          <div className={classes.head}>
            <div className={classes.title}>Movie Name</div>
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
              <input type="radio" name="date" id="d1" defaultChecked />
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Sun</div>
                <div className={classes.date}>11</div>
              </label>
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Mon</div>
                <div className={classes.date}>12</div>
              </label>
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Tue</div>
                <div className={classes.date}>13</div>
              </label>
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Wed</div>
                <div className={classes.date}>14</div>
              </label>
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Thu</div>
                <div className={classes.date}>15</div>
              </label>
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Fri</div>
                <div className={classes.date}>16</div>
              </label>
              <label htmlFor="d1" className={classes.datesItem}>
                <div className={classes.day}>Sat</div>
                <div className={classes.date}>17</div>
              </label>
            </div>
            <div className={classes.times}>
              <input type="radio" name="time" id="t1" defaultChecked />
              <label htmlFor="t1" className={classes.time}>11:00</label>
              <label htmlFor="t1" className={classes.time}>15:00</label>
              <label htmlFor="t1" className={classes.time}>18:00</label>
              <label htmlFor="t1" className={classes.time}>21:00</label>
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
          <button type="button">Book</button>
        </div>
      </div>
    </div>
  );
};

export default Theater;
