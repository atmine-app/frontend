import React from 'react';
import '../booking/bookingItem/BookingItem.css'
import { HiOutlineChevronRight } from 'react-icons/hi';

const PropertyItem = ({ property }) => {

  return (
    <div className="booking-item">
      <div className="booking-item__image">
        <img src={property?.images[0]} alt="Property" />
      </div>
      <div className="booking-item__details">
        <h3 className="booking-item__title">{property?.title}</h3>
      </div>
      <div className="booking-item__arrow">
        <HiOutlineChevronRight />
      </div>
    </div>
  );
};

export default PropertyItem;