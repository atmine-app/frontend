import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import bookingService from '../../../services/bookingsServices';
import './BookingConfirmation.css';
import BackNavigationFloat from '../../../components/BackNavigation/BackNavigationFloat';

export default function BookingConfirmation() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await bookingService.getBooking(bookingId);
        setBooking(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return (
    <div>
      <BackNavigationFloat />
    <div className="booking-confirmation">
      <h2>Booking Confirmation</h2>
      {booking ? (
        <div className="booking-confirmation__content">
        {booking?.property?.images?.length > 0 && (
          <img src={booking.property.images[0]} alt={booking.title} style={{ width: '40%' }} />
        )}
          <p>
            <span className="bold">Booking ID:</span> {booking._id}
          </p>
          <p>
            <span className="bold">Property:</span> {booking.property?.title}
          </p>
          <p>
            <span className="bold">Host:</span> {booking.owner?.username}
          </p>
          <p>
            <span className="bold">Renter:</span> {booking.renter?.username}
          </p>
          <p>
            <span className="bold">Start Date:</span> {booking.startDate}
          </p>
          <p>
            <span className="bold">End Date:</span> {booking.endDate}
          </p>
          <p>
            <span className="bold">Total Price:</span> {booking.totalPrice}€
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}