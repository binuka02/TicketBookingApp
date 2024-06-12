import React, { createContext, useContext, useEffect, useState } from 'react'
import * as BookingService from "../services/BookingService";
import { toast } from 'react-toastify';



const BookingContext = createContext(null);


export default function BookingProvider({children}) {

    const [booking, setBooking] = useState();

    const addBooking = async data => {
        try {
          const booking = await BookingService.addBooking(data);
          setBooking(booking);
          toast.success('Booking Created!');
        } catch (err) {
          toast.error(err.response.data);
        }
      };

      return (
        <BookingContext.Provider value={{ booking, addBooking }}>
          {children}
        </BookingContext.Provider>
      );
    };
    
    export const useBooking = () => useContext(BookingContext);
