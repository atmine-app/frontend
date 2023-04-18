import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bookingService from "../../services/bookingsServices";
import propertyService from "../../services/propertyService";
import "../booking/bookingList/BookingList.css";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import BookingItem from "../booking/bookingItem/BookingItem";
import NotFound from "../../components/NotFound/NotFound";

const MyReservations = () => {
  const { propertyId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [propertyTitle, setPropertyTitle] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        const filteredBookings = allBookings.filter(
          (booking) => booking.property?._id === propertyId
        );
        setBookings(filteredBookings);

        const property = await propertyService.getProperty(propertyId);
        setPropertyTitle(property.title);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [propertyId]);

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list">
        <h2>Reservations for {propertyTitle}</h2>
        {bookings.length > 0 ? (
          <ul>
            {bookings.map((booking) => (
              <li className="booking-list__item" key={booking._id}>
                <BookingItem booking={booking} />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p>No reservations found.</p>
            <NotFound />
          </>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
