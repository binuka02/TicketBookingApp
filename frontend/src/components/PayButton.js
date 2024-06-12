import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const PayButton = () => {
  const user = useSelector((state) => state.auth);
  const location = useLocation();
  const { selectedSeats, totalAmount, movieName, selectedDate, selectedTime } = location.state;

  const handleCheckout = () => {
    axios
      .post(`http://localhost:8080/api/stripe/create-checkout-session`, {
        userId: user._id,
        movieDetails: { selectedSeats, totalAmount, movieName, selectedDate, selectedTime }
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={handleCheckout}>Check out</button>
    </>
  );
};

export default PayButton;
