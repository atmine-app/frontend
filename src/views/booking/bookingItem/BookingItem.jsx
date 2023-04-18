import React from "react";
import "./BookingItem.css";
import { HiOutlineChevronRight } from "react-icons/hi";

const BookingItem = ({ booking }) => {
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const month = startDate.toLocaleString("default", { month: "short" });
  const dateString = `${startDate.getDate()} - ${endDate.getDate()} ${month}`;
  const status =
    booking.status.charAt(0).toUpperCase() + booking.status.slice(1);

  return (
    <div className="booking-item">
      <div className="booking-item__image">
        <img src={booking.property?.images[0]} alt="Property" />
      </div>
      <div className="booking-item__details">
        <h3 className="booking-item__title">{booking.property?.title}</h3>
        <p className="booking-item__date-price">
          <span className="bold"></span> {dateString} · {booking.totalPrice} €
        </p>
        <p className={`booking-item__status ${booking.status}`}>{status}</p>
      </div>
      <div className="booking-item__arrow">
        <HiOutlineChevronRight />
      </div>
    </div>
  );
};

export default BookingItem;
