import { useState, useEffect } from "react";
import reviewService from "../../services/reviewService";

export default function Reviews({propertyId}) {
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    try {
      console.log('im inside getReviews')
      const response = await reviewService.getReviews(propertyId);
      console.log('response',response)
      setReviews(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('Reviews component', propertyId)
    getReviews();
    // eslint-disable-next-line
  }, [propertyId]);

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map((review) => {
        return (
          <div>
            <h2>{review.review}</h2>
          </div>
        );
      })}
    </div>
  );
}
