import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card({ property, currentUser }) {
  const isOwner = property.owner && currentUser && property.owner._id === currentUser._id;

  return (
    <NavLink className="property__link" key={property._id} to={`/${property._id}`}>
      <div className="property__card">
        <img src={property.images} alt={property.title} />
        <div className="property__card-content">
          <h2>{property.title}</h2>
          <p>Host: {property.owner && property.owner.username}</p>
        </div>
        <div className="card-buttons">
          {isOwner && (
            <button type="submit">
              <NavLink to={`/edit/${property._id}`} className="nav-link">
                Edit
              </NavLink>
            </button>
          )}
          {/* <button type="submit" onClick={() => handleDelete(property._id)}>
            Delete
          </button> */}
        </div>
      </div>
    </NavLink>
  );
}