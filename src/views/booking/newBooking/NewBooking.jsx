import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyService from "../../../services/propertyService";
import bookingService from "../../../services/bookingsServices";
import { useAuth } from "../../../hooks/useAuth";
import { differenceInDays, parse } from "date-fns";
import Payment from "../../../components/Payment/Payment";
import BackNavigationFloat from "../../../components/BackNavigation/BackNavigationFloat";

export default function NewBooking() {
  const [property, setProperty] = useState({});
  const { propertyId, range } = useParams();
  const [startDate, endDate] = range.split("&");
  const { user } = useAuth();
  const [daysBooked, setDaysBooked] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formattedDateRange, setFormattedDateRange] = useState("");

  useEffect(() => {
    if (property.price) {
      const parsedStartDate = parse(startDate, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(endDate, "yyyy-MM-dd", new Date());
      const days = differenceInDays(parsedEndDate, parsedStartDate) + 1; // Add 1 to the result
      setDaysBooked(days);
      setTotalPrice(days * property.price);
      setFormattedDateRange(
        `${startDate.replace(/-/g, "/")} - ${endDate.replace(/-/g, "/")}`
      );
      console.log("days", days);
    }
  }, [property.price, startDate, endDate]);

  const navigate = useNavigate();

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      console.log(response);
      setProperty(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId]);

  const handlePaymentSuccess = async () => {
    try {
      const booking = {
        property: propertyId,
        renter: user._id,
        owner: property.owner._id,
        startDate: startDate,
        endDate: endDate,
        totalPrice: totalPrice,
      };

      const response = await bookingService.createBooking(booking);

      navigate(`/bookings/${response._id}/confirmation`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <BackNavigationFloat />
      <div className="property__card-detail">
        {property.images && property.images.length > 0 && (
          <img src={property.images[0]} alt={property.title} />
        )}
        <div className="property__card-content section">
          <h2>{property.title}</h2>
          <p>Host: {property.owner && property.owner.username}</p>
          <p>Price per day: {property.price}€</p>
          <p> Days booked: {daysBooked}</p>
          <p>Total price: {totalPrice}€</p>
          <p>Days booked: {formattedDateRange}</p>
        </div>
        <Payment
          onPaymentSuccess={handlePaymentSuccess}
          totalPrice={totalPrice}
          property={property}
          renter={user}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}
