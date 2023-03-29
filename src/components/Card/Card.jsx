import React from 'react'
import { Link } from 'react-router-dom';
import './Card.css'

export default function Card({ property }) {
  return (
    <Link
      className="property__link"
      key={property._id}
      to={`/${property._id}`}
    >
      <div className="property__card">
        <img src={property.images} alt={property.title}/>
        <div className="property__card-content">
          <h2>{property.title}</h2>
          <p>Host: {property.owner && property.owner.username}</p>
        </div>
      </div>
    </Link>
  );
  
}

