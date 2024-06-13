import axios from "axios";

export const getById = async (bookingId) => {
  const { data } = await axios.get("/api/v1/booking" + bookingId);
  return data;
};

// export const addBooking = async (
//   movieName,
//   selectedDate,
//   selectedTime,
//   selectedSeats,
//   totalAmount
// ) => {
//   const { data } = await axios.post(
//     "http://localhost:8081/api/v1" + "/booking/save",
//     {
//       eventName: movieName,
//       date: selectedDate,
//       time: selectedTime,
//       seatDetails: selectedSeats,
//       totalAmount,
//     }
//   );
//   console.log(data);
//   return "Test";
// };

export const addBooking = async (
  movieName,
  selectedDate,
  selectedTime,
  selectedSeats,
  totalAmount
) => {
  console.log("Test 3");
  try {
    const { data } = await axios.post(
      "http://localhost:8081/api/v1/booking/save",
      {
        eventName: movieName,
        date: selectedDate,
        time: selectedTime,
        seatDetails: selectedSeats,
        totalAmount,
      }
    );
    console.log("Test 4");
    console.log(data); // Log the response data
    return data;
  } catch (error) {
    console.error("Error during booking:", error); // Log any errors
    throw error; // Re-throw the error so the caller knows something went wrong
  }
};
