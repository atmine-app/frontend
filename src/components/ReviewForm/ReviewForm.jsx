// import React, { useState } from "react";
// import * as tf from '@tensorflow/tfjs';
// import { load } from '@tensorflow-models/toxicity';
// import reviewService from "../../services/reviewService";

// export default function ReviewForm({ propertyId }) {
//   console.log(`propertyId: ${propertyId}`)
//   const [review, setReview] = useState("");
//   tf.setBackend('cpu');

//   const handleReviewChange = (event) => {
//     setReview(event.target.value);
//     console.log(review);
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     const threshold = 0.9;
//     const model = await load(threshold);
//     const predictions = await model.classify([review]);

//     // Check if the comment is toxic
//     const isToxic = predictions.some(prediction => prediction.results[0].match);
//     console.log("Is toxic:", isToxic);

//     // If the comment is not toxic, create a new review
//     if (!isToxic) {
//       try {
//         console.log(`propertyId function: ${propertyId}`)
//         console.log(`review function: ${review}`)
//         const createdReview = await reviewService.createReview(propertyId,  review );
//         console.log("Review created function:", createdReview);
//       } catch (error) {
//         console.error("Error creating review:", error);
//       }
//     } else {
//       console.warn("Comment is toxic and was not submitted");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="comment">Review</label>
//         <input type="text" id="comment" name="comment" value={review} onChange={handleReviewChange} />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
