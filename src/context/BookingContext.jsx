import React, { createContext, useContext, useState, useCallback } from 'react';

const BookingContext = createContext({
  isOpen: false,
  bookingData: {},
  openBooking: () => {},
  closeBooking: () => {}
});

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState({});

  const openBooking = useCallback((prefill = {}) => {
    setBookingData(prefill || {});
    setIsOpen(true);
    document.body.classList.add('modal-open');
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  }, []);

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        bookingData,
        openBooking,
        closeBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
