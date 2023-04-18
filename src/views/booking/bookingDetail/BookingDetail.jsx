import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import bookingService from "../../../services/bookingsServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "./BookingDetail.css";
import BackNavigationFloat from "../../../components/BackNavigation/BackNavigationFloat";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PuffLoader } from "react-spinners";

export default function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const navigate = useNavigate();

  const getBooking = async () => {
    try {
      const response = await bookingService.getBooking(bookingId);
      setBooking(response);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const cancelBooking = async () => {
    try {
      const updatedBooking = { ...booking, status: "cancelled" };
      await bookingService.editBooking(bookingId, updatedBooking);
      setBooking(updatedBooking);
      toast.error(
        `Your booking at ${booking.property.title} has been cancelled.`,
        {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBooking();
    // eslint-disable-next-line
  }, [bookingId]);

  if (!booking) {
    return (
      <>
        <div className="loading-container">
          <PuffLoader color="#605cb8" size={60} />
        </div>
      </>
    );
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
          <div
            className={`booking-detail__status ${
              booking.status === "cancelled" ? "cancelled" : ""
            } ${booking.status === "completed" ? "completed" : ""}`}
          >
            {booking.status === "completed" ? "completed" : booking.status}
          </div>
          <h2 className="booking-detail__title">
          <Link to={`/properties/${booking.property?._id}`} className="link-no-decoration">
  {booking.property?.title}
</Link>
          </h2>
          <p className="booking-detail__paragraph">
            {booking.status === "cancelled"
              ? `We've sent your cancellation email to: `
              : booking.status === "completed"
              ? "We hope you've enjoyed your booking."
              : `You're all set. We've sent your confirmation email to: `}
            {booking.status !== "completed" && (
              <strong>{booking.renter?.email}</strong>
            )}
          </p>
          <div className="booking-detail__confirmation-number">
            <strong>Booking Confirmation Number</strong>
            <br></br>
            {booking._id}
            <br></br>
            <br></br>
            <strong>Payment Transaction Id</strong>
            <br></br>
            {booking.transactionId}
          </div>
        </div>
        <div className="booking-confirmation">
          <div className="booking-confirmation__details">
            <div className="booking-confirmation__property-details section">
              <h3>Booking Details</h3>
              <div className="booking-confirmation__property-info">
                <p>
                  <IoCalendarNumberOutline className="booking-confirmation__property-icon far" />
                  {formatDate(booking.startDate)} -{" "}
                  {formatDate(booking.endDate)}
                </p>
                <p>
                  <IoLocationOutline className="booking-confirmation__property-icon far" />
                  {booking.property?.address}, {booking.property?.city},{" "}
                  {booking.property?.country}
                </p>
                <p>
                  <BsCashCoin className="booking-confirmation__property-icon" />
                  Total Price: {booking.totalPrice} €
                </p>
              </div>
              <div className="booking-confirmation__buttons buttons-container">
                {booking.status !== "cancelled" &&
                booking.status !== "completed" ? (
                  <button
                    className="cta-button danger button-half-width"
                    onClick={cancelBooking}
                  >
                    Cancel Booking
                  </button>
                ) : null}
                <button
                  className={`cta-button ${
                    booking.status === "cancelled" ||
                    booking.status === "completed"
                      ? "full100"
                      : "button-half-width"
                  }`}
                  onClick={() => navigate(`/chat/${booking.property.owner}`)}
                >
                  Chat with the owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
