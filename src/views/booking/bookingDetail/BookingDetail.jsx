import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import bookingService from "../../../services/bookingsServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "./BookingDetail.css";
import BackNavigation from '../../../components/BackNavigation/BackNavigation';

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

  useEffect(() => {
    getBooking();
    // eslint-disable-next-line
  }, [bookingId]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BackNavigation />
      <div className="contentWrapper">
    <div>
      <h2>Booking Details</h2>
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
        <div class="booking-confirmation">
          <div class="booking-confirmation__details">
            <div class="booking-confirmation__property-details">
              <h3>{booking.property?.title}</h3>
              <div class="booking-confirmation__property-info">
                <p>
                  <span class="bold">Booking ID:</span> {booking._id}
                </p>
                <p>
                  <span class="bold">Renter:</span> {booking.renter?.username}
                </p>
                <p>
                  <span class="bold">Start Date:</span> {booking.startDate}
                </p>
                <p>
                  <span class="bold">End Date:</span> {booking.endDate}
                </p>
                <p>
                  <span class="bold">Total Price:</span> {booking.totalPrice} €
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
