import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from './paymentsuccess.module.css';

const PaymentSuccess = () => {
  const [bookingIds, setBookingIds] = useState([]);
  const [bookingEventNames, setBookingEventNames] = useState([]);
  const [bookingtotalAmounts, setBookingTotalAmounts] = useState([]);
  const [bookingdates, setBookingDates] = useState([]);
  const [bookingtimes, setBookingTimes] = useState([]);
  const [bookingseatCount, setBookingSeatCount] = useState([]);
  const [bookingseatNumbers, setBookingSeatNumbers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingIds = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData ? userData.id : null;
        const response = await axios.get(
          `http://localhost:8081/api/v1/booking/${userId}/booking-details`
        ); 

        if (response.data && Array.isArray(response.data)) {
          
          const ids = response.data.map((booking) => booking.id);
          const eventNames = response.data.map((booking) => booking.eventName);
          const totalAmounts = response.data.map((booking) => booking.totalAmounts);
          const dates = response.data.map((booking) => booking.dates);
          const times = response.data.map((booking) => booking.times);
          const seatCount = response.data.map((booking) => booking.seatCount);
          const seatNumbers = response.data.map((booking) => booking.seatNumbers);

          setBookingIds(ids);
          setBookingEventNames(eventNames);
          setBookingTotalAmounts(totalAmounts);
          setBookingDates(dates);
          setBookingTimes(times);
          setBookingSeatCount(seatCount);
          setBookingSeatNumbers(seatNumbers);

          setLoading(false);
        } else {
          setError("No booking details found");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch booking details");
        setLoading(false);
      }
    };

    fetchBookingIds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (bookingIds.length === 0) {
    return <div>No booking IDs available.</div>;
  }

  return (
    <div className={classes.payment_success}>
    <h1>Payment Successful!</h1>
    <div className={classes.booking_details}>
      <h2>Booking Details</h2>
      <div className={classes.table_container}>
        <table className={classes.bookings_table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Event Name</th>
              <th>Total Amount</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seat Count</th>
              <th>Seat Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>

              <td>
                {bookingIds.map((id) => (
                <li key={id}>{id}</li>
                ))}
              </td>
              <td>
                {bookingEventNames.map((eventName) => (
                <li key={eventName}>{eventName}</li>
                ))}
              </td>
             <td>
                {bookingtotalAmounts.map((totalAmount) => (
                <li key={totalAmount}>{totalAmount}</li>
                ))}
              </td>
              <td>
                {bookingdates.map((date) => (
                <li key={date}>{date}</li>
                ))}
              </td>
              <td>
                {bookingtimes.map((time) => (
                <li key={time}>{time}</li>
                ))}
              </td>
              <td>
                {bookingseatCount.map((seatCount) => (
                <li key={seatCount}>{seatCount}</li>
                ))}
              </td>
              <td>
                {bookingseatNumbers.map((seatNumbers) => (
                <li key={seatNumbers}>{seatNumbers}</li>
                ))}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default PaymentSuccess;
