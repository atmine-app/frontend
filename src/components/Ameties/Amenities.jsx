import React from 'react';
import amenitiesOptions from '../../data/amenities';
import './Amenities.css';

function Amenities({ property }) {
  const propertyAmenities = property.amenities || [];

  return (
    <div className="amenities-section section">
        <h2>What's included</h2>
        <div className="amenities-container">
      {amenitiesOptions.map((option) => {
        if (propertyAmenities.includes(option.value)) {
          const Icon = option.icon;
          return (
            <div key={option.value} className="amenity">
              <Icon className="amenity-icon" />
              <span>{option.label}</span>
            </div>
          );
        }
        return null;
      })}
      </div>
    </div>
  );
}

export default Amenities;
