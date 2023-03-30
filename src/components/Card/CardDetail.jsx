import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import "./Card.css";
import propertyService from "../../services/propertyService";
import Map from '../Map/Map';

export default function Card({property, currentUser}) {
  const isOwner = property.owner && currentUser && property.owner._id === currentUser._id;
  const { propertyId } = useParams();
  const [ , setProperty] = useState({});

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

  const handleDelete = async (propertyId) => {
    try {
      await propertyService.deleteProperty(propertyId)
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <NavLink className="property__link" key={property._id} to={`/properties/${property._id}`}>
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
            <Map center={property.coordinates} selectedLocation={property.coordinates} />
          </div>
        <div className="card-buttons">
          {isOwner && (
            <>
              <button type="submit">
                <NavLink to={`/properties/${property._id}/edit`} className="nav-link">
                  Edit
                </NavLink>
              </button>
              <button type="submit" onClick={() => handleDelete(propertyId)}>
                Delete
              </button>
              <button type="submit">
                <NavLink to={`/properties/${property._id}/book`} className="nav-link">
                  Book
                </NavLink>
              </button>  
            </>
          )}
        </div>
      </div>
    </NavLink>
  );
}