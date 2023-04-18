import React, { useState, useEffect, useRef, useContext } from "react";
import { DateRange } from "react-date-range";
import { addDays, format, isBefore, parse, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import bookingService from "../../services/bookingService";
import "./Calendar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CalendarComp({
  propertyId,
  onRangeChange,
  profileSectionStyle,
  alwaysVisible,
  isOwner,
}) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [ownerBlockedRanges, setOwnerBlockedRanges] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(
    alwaysVisible || false
  );
  const [bookedDates, setBookedDates] = useState([]);
  const refOne = useRef(null);
  const { isLoggedIn } = useContext(AuthContext);
  const [blockedBookings, setBlockedBookings] = useState([]);

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
      let bookedDatesArray = [];
      let ownerBlockedDatesArray = [];

      propertyBookings.forEach((booking) => {
        // Ensure consistent date format
        let startDate = booking.startDate;
        let endDate = booking.endDate;

        // Parse dates to handle different formats
        const parsedStartDate = parse(startDate, "yyyy-MM-dd", new Date());
        const parsedEndDate = parse(endDate, "yyyy-MM-dd", new Date());
        let currentDate = parsedStartDate;

        while (isBefore(currentDate, addDays(parsedEndDate, 1))) {
          if (booking.status === "blocked" && isOwner) {
            ownerBlockedDatesArray.push(new Date(currentDate));
          } else if (booking.status === "confirmed" || !isOwner) {
            bookedDatesArray.push(new Date(currentDate));
          }
          currentDate = addDays(currentDate, 1);
        }
      });

      setBlockedBookings(blockedBookings);
      setBookedDates(bookedDatesArray);
      setOwnerBlockedRanges(ownerBlockedDatesArray);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideOnOutsideClick, true);
    fetchBookings();
    //eslint-disable-next-line
  }, [propertyId]);

  const toggleBlockedDate = async (date) => {
    // Check if the date is already blocked
    const formattedDate = format(date, "yyyy-MM-dd");
    const blockedBooking = blockedBookings.find(
      (booking) => booking.startDate === formattedDate
    );

    if (blockedBooking) {
      // Unblock the date
      try {
        await bookingService.deleteBooking(blockedBooking._id);
        setBlockedBookings(
          blockedBookings.filter(
            (booking) => booking._id !== blockedBooking._id
          )
        );
      } catch (error) {
        console.error("Error unblocking date:", error);
      }
    } else {
      // Block the date
      try {
        const newBooking = await bookingService.createBooking({
          property: propertyId,
          startDate: formattedDate,
          endDate: formattedDate,
          status: "blocked",
        });
        setBlockedBookings([...blockedBookings, newBooking]);
      } catch (error) {
        console.error("Error blocking date:", error);
      }
    }
  };

  const handleDateClick = (date) => {
    if (!alwaysVisible || !isOwner) return;
    toggleBlockedDate(date);
    fetchBookings();
  };

  const dayContentRenderer = ({ date, view }) => {
    if (view !== "month") return;

    const formattedDate = format(date, "yyyy-MM-dd");

    const isBlocked = ownerBlockedRanges.some((blockedDate) =>
      isSameDay(blockedDate, date)
    );

    return (
      <div
        style={{
          backgroundColor: isBlocked ? "rgba(96, 92, 184, 0.5)" : "transparent",
        }}
      >
        {formattedDate}
      </div>
    );
  };

  return (
    <div
      className={`calendarWrap section${profileSectionStyle ? " calendarProfile" : ""}`}
    >
      {isLoggedIn && !isOwner ? (
        <button
          className="cta-button full100"
          onClick={() => setCalendarVisible(!calendarVisible)}
        >
          Check availability
        </button>
      ) : null}
  
      {isOwner && (
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
            onDateChange={(date) => handleDateClick(date)}
            dayContentRenderer={dayContentRenderer}
          />
        </div>
      )}
  
      {!isLoggedIn && (
        // Redirect the user to the login page if they are not logged in
        <Link to="/login" className="nav-link">
          <button className="cta-button full100">Log in to book</button>
        </Link>
      )}
  
      {calendarVisible && isLoggedIn && !isOwner && (
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
            onDateChange={(date) => handleDateClick(date)}
            dayContentRenderer={dayContentRenderer}
          />
        </div>
      )}
    </div>
  );
}
  