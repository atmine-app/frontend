import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import "./Card.css";
import propertyService from "../../services/propertyService";


export default function CardDetail({property,propertyId}) {
 /*  const isOwner = x.owner && currentUser && x.owner._id === currentUser._id; */
  const navigate = useNavigate();
  const handleDelete = async (propertyId) => {
    try {
      await propertyService.deleteProperty(propertyId)
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="property__card-detail">
        <img src={property.images} alt={property.title} />
        <div className="property__card-content">
          <h2>{property.title}</h2>
          <p>Host: {property.owner && property.owner.username}</p>
          <p>Catergory: {property.category}</p>
          <p>Description: {property.description}</p>
          <p>Price: {property.price}</p>
          <p>Size: {property.size}</p>
          <p>Address: {property.address}</p>
          <p>City: {property.city}</p>
        </div>
        <div className="card-buttons">
          <>
            <button type="submit">
              <Link
                to={`/properties/${property._id}/edit`}
                className="nav-link"
              >
                Edit
              </Link>
            </button>
            <button type="submit" onClick={() => handleDelete(propertyId)}>
              Delete
            </button>
          </>
          <button type="submit">
            <Link to={`/properties/${property._id}/book`} className="nav-link">
              Book
            </Link>
          </button>
        </div>
      </div>
  );
}