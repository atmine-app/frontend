import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import "./Card.css";
import propertyService from "../../services/propertyService";

export default function Card({property}) {
  const { propertyId } = useParams();
  const [ , setProperty] = useState({});

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
    <NavLink className="property__link" key={property._id} to={`/properties/${property._id}`}>
      <div className="property__card">
        <img src={property.images} alt={property.title} />
        <div className="property__card-content">
          <h2>{property.title}</h2>
          <p>Host: {property.owner && property.owner.username}</p>
        </div>
      </div>
    </NavLink>
  );
}