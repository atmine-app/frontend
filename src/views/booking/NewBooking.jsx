import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import propertyService from "../../services/propertyService";
import bookingService from "../../services/bookingsServices";
import { useAuth } from "../../hooks/useAuth";
import { differenceInDays, parse } from "date-fns";

export default function NewBooking() {
  // add props of the propertyId selected
  const [property, setProperty] = useState({});
  const { propertyId, range } = useParams();
  const [startDate, endDate] = range.split("&");
  const { user } = useAuth();
  const [daysBooked, setDaysBooked] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formattedDateRange, setFormattedDateRange] = useState("");

  // Calculate days booked and total price when property and dates are set
  useEffect(() => {
    if (property.price) {
      const parsedStartDate = parse(startDate, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(endDate, "yyyy-MM-dd", new Date());
      const days = differenceInDays(parsedEndDate, parsedStartDate);
      setDaysBooked(days);
      setTotalPrice(days * property.price);
      setFormattedDateRange(
        `${startDate.replace(/-/g, "/")} - ${endDate.replace(/-/g, "/")}`
      );
    }
  }, [property.price, startDate, endDate]);

  const navigate = useNavigate();

  // Fetch the property details from the server
  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Call getProperty when the component mounts
  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId]);

  // Handle creating a new booking
  const handleBooking = async () => {
    try {
      const booking = {
        property: propertyId,
        renter: user._id,
        owner: property.owner._id,
        startDate: startDate,
        endDate: endDate,
      };

      // Send the booking details to the server
      await bookingService.createBooking(booking);

      // Navigate back to the homepage
      navigate(`/`);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  // Render the property details and booking buttons
  return (
    <div className="property__card-detail">
      <img src={property.images} alt={property.title} />
      <div className="property__card-content">
        <h2>{property.title}</h2>
        <p>Host: {property.owner && property.owner.username}</p>
        <p>Price per day: {property.price}€</p>
        <p> Days booked: {daysBooked}</p>
        <p>Total price: {totalPrice}€</p>
        <p>Days booked: {formattedDateRange}</p>
      </div>
      <div className="card-buttons">
        <button onClick={() => navigate(-1)}>cancel</button>
        <button type="submit" onClick={handleBooking}>
          Book
        </button>
      </div>
    </div>
  );
}

// Here we would add code to process Stripe payment
// After confirmation, we would send the booking details to the backend and redirect the user to the booking confirmation page.
