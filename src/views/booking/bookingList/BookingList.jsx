import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import bookingService from '../../../services/bookingsServices';
import './BookingList.css';
import BackNavigationFloat from '../../../components/BackNavigation/BackNavigationFloat';
import BookingItem from '../bookingItem/BookingItem';

export default function BookingList() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        const filteredBookings = allBookings.filter(
          (booking) => booking.renter === user._id
        );
        console.log(filteredBookings);
        setBookings(filteredBookings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, [user._id]);

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list">
        <h2>My Bookings</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <Link to={`/bookings/${booking._id}`} key={booking._id}>
                <li className="booking-list__item">
                  <BookingItem booking={booking} />
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}