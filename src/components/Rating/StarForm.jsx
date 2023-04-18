import React, { useState } from "react";
import {
  Bs1CircleFill,
  Bs2CircleFill,
  Bs3CircleFill,
  Bs4CircleFill,
  Bs5CircleFill,
} from "react-icons/bs";
import { toast } from "react-toastify";
import "./Rating.css";
import "../../App.css";

const RatingForm = ({ propertyId, onSubmit, initialRating, userBooking }) => {
  const categories = [
    { label: "Location", key: "location" },
    { label: "Cleanliness", key: "cleanliness" },
    { label: "Communication", key: "communication" },
    { label: "Value for Money", key: "valueForMoney" },
    { label: "Amenities", key: "amenities" },
  ];
  const icons = [
    <Bs1CircleFill />,
    <Bs2CircleFill />,
    <Bs3CircleFill />,
    <Bs4CircleFill />,
    <Bs5CircleFill />,
  ];

  const [ratings, setRatings] = useState({
    location: initialRating?.location || 0,
    cleanliness: initialRating?.cleanliness || 0,
    communication: initialRating?.communication || 0,
    valueForMoney: initialRating?.valueForMoney || 0,
    amenities: initialRating?.amenities || 0,
  });

  const handleRatingChange = async (categoryKey, value) => {
    const updatedRatings = { ...ratings, [categoryKey]: value };
    setRatings(updatedRatings);
    await onSubmit(propertyId, updatedRatings);

    // Find the category label
    const categoryLabel = categories.find(
      (cat) => cat.key === categoryKey
    ).label;

    toast.success(`${categoryLabel} rated with ${value} saved!`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Hide the component if the user has not completed a booking for the property or is not logged in
  if (!userBooking || userBooking.status !== "completed") {
    return null;
  }

  const styles = {
    display: "none",
  };

  return (
    <div className="section rating-section">
      {categories.map((category) => (
        <div key={category.key} style={{ textAlign: "center" }}>
          <div>{category.label}</div>
          <div
            className="rating-bs-container"
            style={{ display: "inline-flex" }}
          >
            {icons.map((icon, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i} style={{ margin: "0 2px" }}>
                  <input
                    type="radio"
                    name={`rating-${category.key}`}
                    style={styles}
                    value={ratingValue}
                    onClick={() =>
                      handleRatingChange(category.key, ratingValue)
                    }
                  />
                  {React.cloneElement(icon, {
                    className: "star",
                    color:
                      ratingValue <= (ratings[category.key] || 0)
                        ? "#06b782"
                        : "#e4e5e9",
                    size: 20,
                  })}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingForm;
