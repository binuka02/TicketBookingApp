import axios from 'axios';

  export const getById = async bookingId => {
    const { data } = await axios.get('/api/bookings/'+bookingId);
    return data;
};


export const addBooking = (movieName,selectedDate,selectedTime,selectedSeats,totalAmount) => {
    return axios
      .post(process.env.API_URL + "/addbooking", {
        movieName,selectedDate,selectedTime,selectedSeats,totalAmount
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("booking", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };