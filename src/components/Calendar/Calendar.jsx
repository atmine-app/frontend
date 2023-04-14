import React, { useState, useEffect, useRef, useContext } from "react";
import { DateRange } from "react-date-range";
import { addDays, parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import bookingService from "../../services/bookingsServices";
import "./Calendar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CalendarComp({ propertyId, property, onRangeChange }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [bookedDates, setBookedDates] = useState([]);
  const refOne = useRef(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const hideOnOutsideClick = (event) => {
    if (refOne.current && !refOne.current.contains(event.target)) {
      setCalendarVisible(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookings = await bookingService.getAllBookings();
      const propertyBookings = bookings.filter(
        (booking) => booking.property && booking.property._id === propertyId
      );
      console.log("propertyBookings", propertyBookings);
      let bookedDatesArray = [];
      propertyBookings.forEach((booking) => {
        let currentDate = parseISO(booking.startDate);
        const endDate = parseISO(booking.endDate);
        while (currentDate <= endDate) {
          bookedDatesArray.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
      });
      setBookedDates(bookedDatesArray);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnOutsideClick, true);
    fetchBookings();
    //eslint-disable-next-line
  }, [propertyId]);

  
  return (
    <div className="calendarWrap section">
      {isLoggedIn ? (
        <>
          <button
            className="cta-button"
            onClick={() => setCalendarVisible(!calendarVisible)}
          >
            Check availability
          </button>
          {calendarVisible && (
            <>
              <div ref={refOne}>
                <DateRange
                  direction="horizontal"
                  editableDateInputs={true}
                  onChange={(item) => {
                    setRange([item.selection]);
                    onRangeChange(item.selection); // Pass the new range to the parent component
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  className="calendarElement expand"
                  disabledDates={bookedDates}
                  rangeColors={["#605cb8"]}
                  minDate={new Date()}
                />
              </div>
            </>
          )}
        </>
      ) : (
        // Redirect the user to the login page if they are not logged in
        <Link to="/login" className="nav-link">
          <button className="cta-button">Log in to book</button>
        </Link>
      )}
    </div>
  );
}