import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import bookingService from '../../../services/bookingsServices'

export default function BookingDetail() {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState({})

  const getBooking = async () => {
    try {
      const response = await bookingService.getBooking(bookingId);
      setBooking(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooking();
    // eslint-disable-next-line
  }, [bookingId]);


  if (!booking) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Booking Details</h2>
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
      </div>
    </div>
  )
}