import React, { useState } from "react";

export default function ReviewForm({ propertyId, handleReviewSubmit }) {
  const [review, setReview] = useState("");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      handleReviewSubmit(review);
      setReview("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="comment">Review</label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={review}
          onChange={handleReviewChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
