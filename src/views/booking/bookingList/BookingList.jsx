import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import bookingService from '../../../services/bookingsServices';
import './BookingList.css';
import BackNavigationFloat from '../../../components/BackNavigation/BackNavigationFloat';

export default function BookingList() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        const filteredBookings = allBookings.filter(booking => booking.renter === user._id);
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
          <li key={booking._id} className="booking-list__item">
            <Link to={`/bookings/${booking._id}`}>
              <div>
                <h3>{booking.property?.title}</h3>
              </div>
              <div>
                <p>
                  <span className="bold">Start Date:</span>{' '}
                  {booking.startDate}
                </p>
                <p>
                  <span className="bold">End Date:</span> {booking.endDate}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
    </div>    
  );
}