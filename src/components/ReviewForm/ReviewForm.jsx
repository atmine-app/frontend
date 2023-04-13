import React, { useState } from "react";
import "./ReviewForm.css";

export default function ReviewForm({ initialReviewText, handleReviewSubmit, userBooking }) {
  const [review, setReview] = useState(initialReviewText || "");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleReviewSubmit(review);
    setReview("");
  };

  // Hide the component if the user has not completed a booking for the property or is not logged in
  if (!userBooking || userBooking.status !== "completed") {
    return null;
  }

  return (
    <div className="section">
      <form onSubmit={handleFormSubmit} className="review-form">
        <label htmlFor="comment">Tell us your experience</label>
        <textarea
          type="text"
          id="content"
          name="comment"
          value={review}
          onChange={handleReviewChange}
        />
        <button className="cta-button" type="submit">Submit</button>
      </form>
    </div>
  );
}