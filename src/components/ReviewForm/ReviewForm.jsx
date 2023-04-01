import React, { useState } from "react";

export default function ReviewForm({ propertyId, handleReviewSubmit }) {
  console.log(`propertyId: ${propertyId}`);
  const [review, setReview] = useState("");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
    console.log(review);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      handleReviewSubmit(review);
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
