
import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const Calendar = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  console.log(startDate, endDate)

  return (
    <div className='calendarContainer'>
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onDatesChange={({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
      }}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
    />
    </div>
  );
};

export default Calendar;
