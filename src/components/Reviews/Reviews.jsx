import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Reviews({ reviews, handleDelete }) {
  const { user } = useAuth();

  const handleDeleteReview = (reviewId) => {
    handleDelete(reviewId);
  };

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review, i) => {
        const isReviewCreator = user && user._id === review.user._id;

        return (
          <div key={i} className="reviewCard">
            <h4>{review.user.username}</h4>
            <p>{review.review}</p>
            {isReviewCreator && (
              <div>
                <button>Edit</button>
                <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
