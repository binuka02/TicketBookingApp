import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const userId = userData ? userData.id : null;

    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/booking/${userId}/booking-details`);
        if (response.data) {
          setBookingDetails(response.data);
          setLoading(false);
        } else {
          setError('No booking details found for this user');
          setLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch booking details');
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookingDetails();
    } else {
      setError('User ID not found in localStorage');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details available.</div>;
  }

  return (
    <div>
      <h1>Payment Successful!</h1>
      <div>
        <h2>Booking Details</h2>
        <p><strong>Reference Number/s:</strong> {bookingDetails.id}</p>
        <p><strong>Event Name:</strong> {bookingDetails.eventName}</p>
        <p><strong>Total Amount:</strong> {bookingDetails.totalAmount} RON</p>
        <p><strong>Date:</strong> {bookingDetails.date}</p>
        <p><strong>Time:</strong> {bookingDetails.time}</p>
        <p><strong>Seat Count:</strong> {bookingDetails.seatCount}</p>
        <p><strong>Event Type:</strong> {bookingDetails.eventType}</p>
        <p><strong>Status:</strong> {bookingDetails.status}</p>
        <p><strong>Seat Number:</strong> {bookingDetails.seatNumber}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
