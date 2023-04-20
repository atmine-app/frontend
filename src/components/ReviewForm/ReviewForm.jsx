import React, { useState, useEffect } from "react";
import "./ReviewForm.css";
import { toast } from "react-toastify";

export default function ReviewForm({
  initialReviewText,
  handleReviewSubmit,
  userBooking,
}) {
  const [review, setReview] = useState(initialReviewText || "");
  const [model, setModel] = useState(null);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  useEffect(() => {
    const loadModel = async () => {
      const threshold = 0.8;
      const loadedModel = await window.toxicity.load(threshold);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (model) {
      const predictions = await model.classify([review]);
      const isToxic = predictions.some(prediction => prediction.results[0].match);

      if (isToxic) {
        toast.error("Your review contains inappropriate language. Please revise your text.", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        try {
    handleReviewSubmit(review);
    setReview("");
    toast.success("Review submitted! Thank you", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
        } catch (error) {
          console.error("Error creating review:", error);
        }
      }
    }
  };

  // Hide the component if the user has not completed a booking for the property or is not logged in
  if (!userBooking || userBooking.status !== "completed") {
    return null;
  }

  return (
    <div className="section">
      <form onSubmit={handleFormSubmit} className="review-form">
        <h2>Tell us your experience</h2>
        <textarea
          type="text"
          id="content"
          name="comment"
          value={review}
          onChange={handleReviewChange}
        />
        <button className="cta-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}






 

  

 