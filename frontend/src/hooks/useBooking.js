import React, { createContext, useContext, useEffect, useState } from 'react';
import * as BookingService from "../services/BookingService";
import { toast } from 'react-toastify';

const BookingContext = createContext(null);

export default function BookingProvider({ children }) {
    const [booking, setBooking] = useState();
   

    const addBooking = async (movieName, selectedDate, selectedTime, selectedSeats, totalAmount) => {
        try {
            const booking = await BookingService.addBooking(movieName, selectedDate, selectedTime, selectedSeats, totalAmount);
            setBooking(booking);
            toast.success('Booking Confirmed & Make the Payment!');
        } catch (err) {
            toast.error(err.response.data);
        }
    };

    return (
        <BookingContext.Provider value={{ booking, addBooking }}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => useContext(BookingContext);
