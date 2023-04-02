import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ReviewForm from '../ReviewForm/ReviewForm';

export default function Reviews({ reviews, handleDelete, handleUpdate }) {
  const { user } = useAuth();

  // Handle the review deletion
  const handleDeleteReview = (reviewId) => {
    handleDelete(reviewId);
  };

  // State for tracking which review is being edited
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Set the editing review ID when the Edit button is clicked
  const handleEditClick = (reviewId) => {
    setEditingReviewId(reviewId);
  };

  // Cancel the editing process and hide the ReviewForm component
  const handleCancelEdit = () => {
    setEditingReviewId(null);
  };

  // Handle the review update submission
  const handleUpdateSubmit = (reviewId, updatedReviewText) => {
    handleUpdate(reviewId, updatedReviewText);
    setEditingReviewId(null);
  };

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review, i) => {
        const isReviewCreator = user && user._id === review.user._id;
        const isEditing = review._id === editingReviewId;

        return (
          <div key={i} className="reviewCard">
            {isEditing ? (
              <div>
                <ReviewForm
                  initialReviewText={review.review}
                  handleReviewSubmit={(updatedReviewText) =>
                    handleUpdateSubmit(review._id, updatedReviewText)
                  }
                />
                {/* Cancel Edit button */}
                <button onClick={handleCancelEdit}>Cancel Edit</button>
              </div>
            ) : (
              <>
                <h4>{review.user.username}</h4>
                <p>{review.review}</p>
                {isReviewCreator && (
                  <div>
                    <button onClick={() => handleEditClick(review._id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteReview(review._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
