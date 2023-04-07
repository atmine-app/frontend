import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import bookingService from '../../../services/bookingsServices';
import './BookingList.css';
import BackNavigationFloat from '../../../components/BackNavigation/BackNavigationFloat';
import BookingItem from '../bookingItem/BookingItem';

const BookingList = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState('Confirmed');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        const filteredBookings = allBookings.filter(
          (booking) => booking.renter === user._id
        );
  
        // Sort bookings by start date, with the nearest date first
        const sortedBookings = filteredBookings.sort((a, b) => {
          const startDateA = new Date(a.startDate);
          const startDateB = new Date(b.startDate);
          const timeDiffA = startDateA.getTime() - Date.now();
          const timeDiffB = startDateB.getTime() - Date.now();
  
          return timeDiffA - timeDiffB;
        });
  
        setBookings(sortedBookings);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchBookings();
  }, [user._id]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const filteredBookings = bookings.filter((booking) => {
    switch (status) {
      case 'Confirmed':
        return new Date(booking.endDate) >= new Date();
      case 'Past':
        return new Date(booking.endDate) < new Date();
      case 'Cancelled':
        return booking.isCancelled;
      default:
        return true;
    }
  });

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list">
        <h2>My Bookings</h2>
        <div className="booking-list__filters">
          <button
            className={`cta-button ${status === 'Confirmed' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`cta-button ${status === 'Past' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Past')}
          >
            Past
          </button>
          <button
            className={`cta-button ${status === 'Cancelled' ? 'active' : ''}`}
            onClick={() => handleStatusChange('Cancelled')}
          >
            Cancelled
          </button>
        </div>
        {filteredBookings.length > 0 ? (
          <ul>
            {filteredBookings.map((booking) => (
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
};

export default BookingList;