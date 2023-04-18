import React, { useState, useEffect } from "react";
import "./BookingNav.css";
import { differenceInDays, format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingNav({
  startDate,
  endDate,
  pricePerDay,
  propertyId,
}) {
  const totalDays = differenceInDays(endDate, startDate) + 1;
  const totalPrice = totalDays * pricePerDay;
  const dateFormat = "dd/MM";
  const [rangeString, setRangeString] = useState("");

  const formattedStartDate = format(startDate, dateFormat);
  const formattedEndDate = format(endDate, dateFormat);

  useEffect(() => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    setRangeString(`${formattedStartDate}&${formattedEndDate}`);
  }, [startDate, endDate]);

  const scrollToCalendar = () => {
    const calendarElement = document.getElementById("calendar");
    if (calendarElement) {
      calendarElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="booking-nav">
      <span className="booking-date">
        {formattedStartDate} - {formattedEndDate} ({totalDays} days) <br />
        <a href="#calendar" onClick={scrollToCalendar} id="check-dates-link">
          Check availability
        </a>
      </span>
      <Link to={`/properties/${propertyId}/${rangeString}`}>
        <button className="booking-button">Book now for {totalPrice}€!</button>
      </Link>
    </nav>
  );
}
