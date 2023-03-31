import React from 'react'
import Calendar from '../../components/Calendar/Calendar'

export default function NewBooking() { // add props of the propertyId selected
  return (
    <div>
    <h1>NewBooking</h1>
    <Calendar/>
    </div>
  )
}

//here we process stripe payment
//after confirmation we send the booking to the backend and redirect the user to the booking confirmation page