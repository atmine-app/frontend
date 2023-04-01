import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import propertyService from "../../services/propertyService";

export default function NewBooking(prop) { // add props of the propertyId selected
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});

  const navigate = useNavigate();

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProperty()
    // eslint-disable-next-line
  }, [propertyId])

  return (
    <div className="property__card-detail">
      <img src={property.images} alt={property.title} />
      <div className="property__card-content">
        <h2>{property.title}</h2>
        <p>Host: {property.owner && property.owner.username}</p>
        <p>Price: {property.price}</p>
      </div>
      <div className="card-buttons">
        <>
        </>
        <button type="submit">
          <Link to={`/properties/${property._id}/book`} 
          //here we do the stripe integration 
          className="nav-link">
            Book
          </Link>
        </button>
      </div>
    </div>
);
}

//here we process stripe payment
//after confirmation we send the booking to the backend and redirect the user to the booking confirmation page