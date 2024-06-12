import axios from 'axios';

export const addBooking= async addBooking => {
    const { data } = await axios.post('api/bookings', addBooking);
    localStorage.setItem('booking', JSON.stringify(data));
    return data;
  };