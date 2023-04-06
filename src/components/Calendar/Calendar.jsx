import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays, parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import bookingService from "../../services/bookingsServices"; // import the bookingService you created
import "./Calendar.css";
import { Link } from "react-router-dom";

export default function CalendarComp({ propertyId }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const refOne = useRef(null);
  const [rangeString, setRangeString] = useState("");

  const hideOnOutsideClick = (event) => {
    if (refOne.current && !refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookings = await bookingService.getAllBookings();
      const propertyBookings = bookings.filter(
        (booking) => booking.property && booking.property._id === propertyId
      );
      console.log('propertyBookings',propertyBookings)
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
    <div className="calendarWrap">
      <input
        value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )} `}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />
      <div ref={refOne}>
        {open && (
          <DateRange
            direction="horizontal"
            editableDateInputs={true}
            onChange={(item) => {
              setRange([item.selection]);
              const rangeString = `${format(
                item.selection.startDate,
                "yyyy-MM-dd"
              )}&${format(item.selection.endDate, "yyyy-MM-dd")}`;
              setRangeString(rangeString);
            }}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            className="calendarEle©ment"
            disabledDates={bookedDates}
          />
        )}
      </div>
      <button>
        <Link
          to={`/properties/${propertyId}/${rangeString}`}
          className="nav-link"
        >
          Book
        </Link>
      </button>
    </div>
  );
}
