import React from "react";
import { HiStar } from "react-icons/hi";
import "./PropertyInfo.css";
import { CiLocationOn } from "react-icons/ci";

export default function PropertyInfo({ property, rating }) {
  return (
    <div className="propertyInfo section">
      <div className="propertyInfo-title">
        <h2>{property.title}</h2>
      </div>
      {rating && (
        <div className="propertyInfo-smallinfo ">
          <HiStar color="var(--color-secondary-green)" fontSize="1.3rem" />
          <p>{rating.averageRating}</p>
        </div>
      )}
      <div className="propertyInfo-adress">
        <p>
          <CiLocationOn className="location-icon-card" />
          {property.address}, {property.city}, {property.country}
        </p>
      </div>
    </div>
  );
}
