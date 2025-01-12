import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import bookingService from "../../../services/bookingsServices";
import "./BookingList.css";
import BackNavigationFloat from "../../../components/BackNavigation/BackNavigationFloat";
import BookingItem from "../bookingItem/BookingItem";
import NotFound from "../../../components/NotFound/NotFound";

const BookingList = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const allBookings = await bookingService.getAllBookings();
        const filteredBookings = allBookings.filter(
          (booking) => booking.renter && booking.renter._id === user._id
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

        const hasConfirmedBooking = sortedBookings.some(
          (booking) => booking.status === "confirmed"
        );
        if (hasConfirmedBooking) {
          setStatus("Confirmed");
        } else {
          setStatus("Cancelled");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
    //eslint-disable-next-line
  }, [user._id]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const filteredBookings = bookings.filter((booking) => {
    switch (status) {
      case "Confirmed":
        return booking.status === "confirmed";
      case "Past":
        return booking.status === "completed";
      case "Cancelled":
        return booking.status === "cancelled";
      default:
        return true;
    }
  });

  const mapStatusToBookingStatus = (status) => {
    switch (status) {
      case "Confirmed":
        return "confirmed";
      case "Past":
        return "completed";
      case "Cancelled":
        return "cancelled";
      default:
        return "";
    }
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list">
        <h2>Bookings</h2>
        {bookings.length > 0 ? (
          <>
            <div className="booking-list__filters">
              <button
                className={`cta-button ${
                  status === "Confirmed" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("Confirmed")}
              >
                Confirmed
              </button>
              <button
                className={`cta-button ${status === "Past" ? "active" : ""}`}
                onClick={() => handleStatusChange("Past")}
              >
                Past
              </button>
              <button
                className={`cta-button ${
                  status === "Cancelled" ? "active" : ""
                }`}
                onClick={() => handleStatusChange("Cancelled")}
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
              <>
                <p>No bookings {mapStatusToBookingStatus(status)} found.</p>
                <NotFound />
                <Link to="/">
                  <button className="cta-button full100 top90">
                    Start Exploring
                  </button>
                </Link>
              </>
            )}
          </>
        ) : (
          <>
            <p>No bookings found.</p>
            <NotFound />
            <Link to="/">
              <button className="cta-button full100 top160">
                Start Exploring
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingList;
