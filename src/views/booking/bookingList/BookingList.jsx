import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import bookingService from '../../../services/bookingsServices';
import './BookingList.css';

export default function BookingList() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        const filteredBookings = allBookings.filter(booking => booking.renter === user._id);
        console.log(filteredBookings)
        setBookings(filteredBookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [user._id]);

  return (
    <div className="booking-list">
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-list__item">
              <div className="booking-list__item-property">
                <img
                  src={booking.property?.images?.[0]}
                  alt={booking.property?.title}
                />
                <div className="booking-list__item-property-details">
                  <h3>{booking.property?.title}</h3>
                  <p>
                    <span className="bold">Booking ID:</span> {booking._id}
                  </p>
                  <p>
                    <span className="bold">Renter:</span> {booking.renter}
                  </p>
                  <p>
                    <span className="bold">Start Date:</span>{' '}
                    {booking.startDate}
                  </p>
                  <p>
                    <span className="bold">End Date:</span> {booking.endDate}
                  </p>
                  <p>
                    <span className="bold">Total Price:</span>{' '}
                    {booking.totalPrice}€
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}