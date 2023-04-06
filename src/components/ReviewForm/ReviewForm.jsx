import React, { useState } from "react";

export default function ReviewForm({ initialReviewText, handleReviewSubmit }) {
  const [review, setReview] = useState(initialReviewText || "");

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    handleReviewSubmit(review);
    setReview("");
  };

  return (
    <div className="section">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="comment">Review</label>
        <input
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
