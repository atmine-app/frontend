import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyService from "../../../services/propertyService";
import bookingService from "../../../services/bookingsServices";
import { useAuth } from "../../../hooks/useAuth";
import { differenceInDays, parse } from "date-fns";
import Payment from "../../../components/Payment/Payment";
import BackNavigationFloat from "../../../components/BackNavigation/BackNavigationFloat";
import "./NewBooking.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { toast } from "react-toastify";

export default function NewBooking() {
  const [property, setProperty] = useState({});
  const { propertyId, range } = useParams();
  const [startDate, endDate] = range.split("&");
  const { user } = useAuth();
  const [daysBooked, setDaysBooked] = useState(0);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formattedDateRange, setFormattedDateRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (property.price) {
      const parsedStartDate = parse(startDate, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(endDate, "yyyy-MM-dd", new Date());
      const days = differenceInDays(parsedEndDate, parsedStartDate) + 1; // Add 1 to the result
      setDaysBooked(days);
      setBookingPrice(days * property.price);
      setServiceFee(Math.round(0.1 * days * property.price));
      setTotalPrice(bookingPrice + serviceFee);
      setFormattedDateRange(
        `${formatDate(parsedStartDate)} - ${formatDate(parsedEndDate)}`
      );
    }
  }, [property.price, startDate, endDate, bookingPrice, serviceFee]);

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId]);

  const handlePaymentSuccess = async (transactionId) => {
    try {
      const booking = {
        property: propertyId,
        renter: user._id,
        owner: property.owner._id,
        startDate: startDate,
        endDate: endDate,
        bookingPrice: bookingPrice,
        serviceFee: serviceFee,
        totalPrice: totalPrice,
        status: "confirmed",
        transactionId: transactionId,
      };

      const response = await bookingService.createBooking(booking);

      navigate(`/bookings/${response._id}`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleSkipPayment = async () => {
    try {
      const booking = {
        property: propertyId,
        renter: user._id,
        owner: property.owner._id,
        startDate: startDate,
        endDate: endDate,
        bookingPrice: bookingPrice,
        serviceFee: serviceFee,
        totalPrice: totalPrice,
        status: "confirmed",
        transactionId: "ATMINEFRIENDS23", // no transaction ID since payment is skipped
      };

      const response = await bookingService.createBooking(booking);
      navigate(`/bookings/${response._id}`);
      toast.success("It's not free! You'll pay later 😈");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  const formatDate = (date) => {
    const options = {
      day: "numeric",
      month: "short",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="property__card-detail">
        <Swiper
          className="ImageContainer mySwiper"
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {property?.images?.length > 0 &&
            property.images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`${property.title} - ${index + 1}`} />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className="property__card-content section">
          <h2>
            Booking Request at<br></br>
            {property.title}
          </h2>
          <table className="booking-table">
            <tbody>
              <tr>
                <td>
                  {property.price}€ x {daysBooked} days ({formattedDateRange})
                </td>
                <td>{bookingPrice}€</td>
              </tr>
              <tr>
                <td>atmine Service Fee (10%)</td>
                <td>{serviceFee}€</td>
              </tr>
              <tr>
                <td>Total (EUR)</td>
                <td>{totalPrice}€</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Payment
          onPaymentSuccess={handlePaymentSuccess}
          totalPrice={totalPrice}
          property={property}
          renter={user}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="section">
          <button className="cta-button full100" onClick={handleSkipPayment}>
            Skip Payment
          </button>
        </div>
      </div>
    </div>
  );
}
