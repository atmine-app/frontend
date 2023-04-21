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
import { AiOutlineWhatsApp, AiOutlineMail } from "react-icons/ai";
import { FaTelegramPlane } from "react-icons/fa";
import { BsCashCoin,BsShare } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PuffLoader } from "react-spinners";
import amenitiesOptions from "../../../data/amenities";

export default function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    startTime: "",
    endTime: "",
    description: "",
  });
  const [showShareContent, setShowShareContent] = useState(false);

  const toggleShareContent = () => {
    setShowShareContent((prev) => !prev);
  };

  const getBooking = async () => {
    try {
      const response = await bookingService.getBooking(bookingId);
      setBooking(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevState) => ({ ...prevState, [name]: value }));
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

  const getAmenitiesLabels = (amenities) => {
    const amenitiesLabels = amenities.map((amenity) => {
      const foundOption = amenitiesOptions.find((option) => option.value === amenity);
      return foundOption ? foundOption.label : '';
    });
  
    return amenitiesLabels.join(', ');
  };

  const generateGoogleCalendarLink = () => {
    const startDate = new Date(booking.startDate);
    if (eventDetails.startTime) {
      const [hours, minutes] = eventDetails.startTime.split(":");
      startDate.setHours(hours, minutes);
    }
    const startDateTime = startDate.toISOString().replace(/-|:|\.\d+/g, "");

    const endDate = new Date(booking.endDate);
    if (eventDetails.endTime) {
      const [hours, minutes] = eventDetails.endTime.split(":");
      endDate.setHours(hours, minutes);
    }
    const endDateTime = endDate.toISOString().replace(/-|:|\.\d+/g, "");

    const eventName = encodeURIComponent(
      `Booking at ${booking.property.title}`
    );
    const location = encodeURIComponent(
      `${booking.property.address}, ${booking.property.city}, ${booking.property.country}`
    );
    const description = encodeURIComponent(eventDetails.description);

    const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&dates=${startDateTime}%2F${endDateTime}&text=${eventName}&location=${location}&details=${description}`;
    return calendarLink;
  };

  const generateMessage = () => {
    const calendarLink = generateGoogleCalendarLink();
    const amenities = getAmenitiesLabels(booking.property.amenities);
    const message = `Hi! I just booked a stay at ${
      booking.property.title
    } from ${formatDate(booking.startDate)} to ${formatDate(
      booking.endDate
    )}. The property is a ${booking.property.category} in ${
      booking.property.address
    }, ${
      booking.property.city
    }. Amenities: ${amenities}. Here's the Google Calendar event link: ${calendarLink}.
    Hope to see you there!`;
    return message;
  };

  const generateGmailShareURL = () => {
    const subject = encodeURIComponent(`Booking at ${booking.property.title}`);
    const body = encodeURIComponent(generateMessage());
    return `mailto:?subject=${subject}&body=${body}`;
  };

  const generateTelegramShareURL = () => {
    const text = encodeURIComponent(generateMessage());
    return `tg://msg_url?url=${text}`;
  };
  const generateWhatsAppMessage = () => {
    const message = encodeURIComponent(generateMessage());
    return `https://wa.me/?text=${message}`;
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

  const scrollUpAndToggleShareContent = () => {
    toggleShareContent();
  
    // Wait for 500ms before scrolling down
    setTimeout(() => {
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maxScrollY, behavior: 'smooth' });
    }, 500);
  };

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
            <Link
              to={`/properties/${booking.property?._id}`}
              className="link-no-decoration"
            >
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
                {booking.status === "confirmed" && (
                  <>
                    <div className="buttons-container">
                      <button
                        className="cta-button danger button-half-width"
                        onClick={cancelBooking}
                      >
                        Cancel Booking
                      </button>
                      <button
                        className="cta-button button-half-width"
                        onClick={() =>
                          navigate(`/chat/${booking.property.owner}`)
                        }
                      >
                        Chat with the owner
                      </button>
                    </div>
                    <button
                      className="cta-button share-button full100"
                        onClick={scrollUpAndToggleShareContent}
                    >
                       Share  <BsShare />
                    </button>
                    {showShareContent && (
                      <>
                        <div className="event-details-form expand">
                          <label>
                            Start Time:
                            <input
                              type="time"
                              name="startTime"
                              value={eventDetails.startTime}
                              onChange={handleInputChange}
                            />
                          </label>
                          <label>
                            End Time:
                            <input
                              type="time"
                              name="endTime"
                              value={eventDetails.endTime}
                              onChange={handleInputChange}
                            />
                          </label>
                          <label>
                            Description:
                            <textarea
                            className="description-input"
                              type="text"
                              name="description"
                              value={eventDetails.description}
                              onChange={handleInputChange}
                            />
                          </label>
                        </div>
                        <div className="share-buttons-container expand">
                          <a
                            href={generateWhatsAppMessage()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="share-cta-button button-third-width">
                              <AiOutlineWhatsApp className="booking-confirmation__property-icon" />
                            </button>
                          </a>
                          <a
                            href={generateGmailShareURL()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="share-cta-button button-third-width">
                              <AiOutlineMail className="booking-confirmation__property-icon" />
                            </button>
                          </a>
                          <a
                            href={generateTelegramShareURL()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="share-cta-button button-third-width">
                              <FaTelegramPlane className="booking-confirmation__property-icon" />
                            </button>
                          </a>
                        </div>
                      </>
                    )}
                  </>
                )}
                {booking.status === "cancelled" && (
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
                )}
                {booking.status === "completed" && (
                  <>
                    <button
                      className={`cta-button ${
                        booking.status === "cancelled" ||
                        booking.status === "completed"
                          ? "full100"
                          : "button-half-width"
                      }`}
                      onClick={() =>
                        navigate(`/chat/${booking.property.owner}`)
                      }
                    >
                      Chat with the owner
                    </button>
                    <button
                      className={`cta-button ${
                        booking.status === "cancelled" ||
                        booking.status === "completed"
                          ? "full100"
                          : "button-half-width"
                      }`}
                      onClick={() =>
                        navigate(
                          `/properties/${booking.property?._id}#reviews-section`
                        )
                      }
                    >
                      Add a Review
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
