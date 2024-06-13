import axios from "axios";

export const getById = async (bookingId) => {
  const { data } = await axios.get("/api/v1/booking" + bookingId);
  return data;
};



export const addBooking = async (
    movieName,
    selectedDate,
    selectedTime,
    ticketCount,
    totalAmount,
    userId
  ) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/v1/booking/save",
        {
          eventName: movieName,
          date: selectedDate,
          time: selectedTime,
          ticketCount,
          totalAmount,
          userId, // Include userId here
        }
      );
      console.log(data); // Log the response data
      return data;
    } catch (error) {
      console.error("Error during booking:", error); // Log any errors
      throw error; // Re-throw the error so the caller knows something went wrong
    }
  };
  
