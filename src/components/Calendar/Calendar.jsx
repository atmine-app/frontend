import React, { useState, useEffect, useRef } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import { addDays, parseISO } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import bookingService from "../../services/bookingsServices"; // import the bookingService you created
import { eachDayOfInterval } from "date-fns";

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

  const hideOnOutsideClick = (event) => {
    if (refOne.current && !refOne.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const bookings = await bookingService.getAllBookings();
      console.log("bookings", bookings)
      const propertyBookings = bookings.filter(
        (booking) => booking.property === propertyId
      );
      console.log('propertyBookings', propertyBookings)
      let bookedDatesArray = [];
      propertyBookings.forEach((booking) => {
        let currentDate = parseISO(booking.startDate);
        const endDate = parseISO(booking.endDate);
        while (currentDate <= endDate) {
          bookedDatesArray.push(new Date(currentDate));
          currentDate = addDays(currentDate, 1);
        }
      });
      console.log("bookedDatesArray", bookedDatesArray);
      setBookedDates(bookedDatesArray);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  

  useEffect(() => {
    document.addEventListener("click", hideOnOutsideClick, true);
    fetchBookings();
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
                
                setRange([item.selection])
                console.log(range)}}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            className="calendarElement"
            disabledDates={bookedDates}
          />
        )}
      </div>
    </div>
  );
}
