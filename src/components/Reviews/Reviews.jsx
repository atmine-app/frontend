import React from "react";

export default function Reviews({
  reviews,
  user,
  handleEditClick,
  handleDeleteReview,
}) {
  return (
    <div>
      {reviews.map((review, i) => {
        const isReviewCreator = user && user._id === review.user._id;

        return (
          <div key={i} className="reviewCard">
            <h4>{review.user.username}</h4>
            <p>{review.review}</p>
            {isReviewCreator && (
              <div>
                <button onClick={() => handleEditClick(review._id)}>Edit</button>
                <button onClick={() => handleDeleteReview(review._id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
