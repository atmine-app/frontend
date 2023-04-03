import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Rating.css";
import "../../App.css";

const RatingForm = ({ propertyId, onSubmit}) => {
  const categories = [
    { label: "Location", key: "location" },
    { label: "Cleanliness", key: "cleanliness" },
    { label: "Communication", key: "communication" },
    { label: "Value for Money", key: "valueForMoney" },
    { label: "Amenities", key: "amenities" },
  ];

  const [ratings, setRatings] = useState({
    location: 0,
    cleanliness: 0,
    communication: 0,
    valueForMoney: 0,
    amenities: 0,
  });

  const handleRatingChange = async (category, value) => {
    const updatedRatings = { ...ratings, [category]: value };
    setRatings(updatedRatings);
    await onSubmit(propertyId, updatedRatings);
  };

  const styles = {
    display: "none",
  };

  return (
    <div>
      {categories.map((category) => (
        <div key={category.key}>
          <span>{category.label}: </span>
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name={`rating-${category.key}`}
                  style={styles}
                  value={ratingValue}
                  onClick={() => handleRatingChange(category.key, ratingValue)}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (ratings[category.key] || 0)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  size={20}
                />
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default RatingForm;
