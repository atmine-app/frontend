import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bookingService from "../../../services/bookingsServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "./BookingDetail.css";
import BackNavigationFloat from "../../../components/BackNavigation/BackNavigationFloat";
import {IoCalendarNumberOutline} from "react-icons/io5";
import {BsCashCoin} from "react-icons/bs";
import {IoLocationOutline} from "react-icons/io5";

export default function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});

  const getBooking = async () => {
    try {
      const response = await bookingService.getBooking(bookingId);
      setBooking(response);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    getBooking();
    // eslint-disable-next-line
  }, [bookingId]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BackNavigationFloat />
      <div className="booking-list__item-property">
        <Swiper
          className=" ImageContainer mySwiper"
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {booking.property?.images?.length > 0 &&
            booking.property.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${booking.property.title} - ${index + 1}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="booking-detail__header">
          <div className="booking-detail__status">{booking.status}</div>
          <h1 className="booking-detail__title">Your Booking</h1>
          <p className="booking-detail__paragraph">
            You're all set. We've sent your confirmation email to {booking.renter?.email}.
          </p>
          <div className="booking-detail__confirmation-number">
            Confirmation Number: {booking._id}
          </div>
        </div>
        <div className="booking-confirmation">
          <div className="booking-confirmation__details">
            <div className="booking-confirmation__property-details section">
              <h3>{booking.property?.title}</h3>
              <div className="booking-confirmation__property-info">
                <p>
                  <IoCalendarNumberOutline className="booking-confirmation__property-icon far" />
                  
                    {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                  
                </p>
                <p>
                  <IoLocationOutline className="booking-confirmation__property-icon far" />
                  {booking.property?.address}, {booking.property?.city}, {booking.property?.country}
                </p>
                <p>
                  <BsCashCoin className="booking-confirmation__property-icon" />
                  Total Price: {booking.totalPrice} €
                </p>
              </div>
              <div className="booking-confirmation__cancel-button section">
                <button 
                  className="cta-button danger"
                  >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
