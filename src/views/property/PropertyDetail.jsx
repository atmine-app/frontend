import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardDetail from "../../components/Card/CardDetail";
import Map from "../../components/Map/Map";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import propertyService from "../../services/propertyService";
import Reviews from "../../components/Reviews/Reviews";
import reviewService from "../../services/reviewService";
import Calendar from "../../components/Calendar/Calendar";
import GoogleMapsProvider from "../../components/GoogleMapsProvider/GoogleMapsProvider";
import StarForm from "../../components/Rating/StarForm";
import { useAuth } from "../../hooks/useAuth";

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [userVote, setUserVote] = useState({});

  const getUserVote = async () => {
    try {
      const response = await propertyService.getUserPropertyVote(
        propertyId,
        user.id
      );
      console.log("response votes", response);
      setUserVote(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserVote();
    console.log(userVote);
    // eslint-disable-next-line
  }, [propertyId]);

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProperty();
    // eslint-disable-next-line
  }, [propertyId]);

  const getReviews = async () => {
    try {
      const response = await reviewService.getReviews(propertyId);
      setReviews(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
    // eslint-disable-next-line
  }, [propertyId]);

  const getRating = async () => {
    try {
      const response = await propertyService.getPropertyVotes(propertyId);

      const totalRatings = response.length;
      const initialCategorySums = {
        location: 0,
        cleanliness: 0,
        communication: 0,
        valueForMoney: 0,
        amenities: 0,
        averageRatings: 0,
      };

      const ratingSums = response.reduce((acc, vote) => {
        acc.location += vote.location;
        acc.cleanliness += vote.cleanliness;
        acc.communication += vote.communication;
        acc.valueForMoney += vote.valueForMoney;
        acc.amenities += vote.amenities;
        acc.averageRatings += vote.averageRatings;
        return acc;
      }, initialCategorySums);

      const formatRating = (value) => {
        if (isNaN(value)) {
          return "N/A";
        }

        const rating = parseFloat(value).toFixed(1);
        return rating.endsWith(".0") ? rating.slice(0, -2) : rating;
      };
      const averageRatings = {
        location: formatRating(ratingSums.location / totalRatings),
        cleanliness: formatRating(ratingSums.cleanliness / totalRatings),
        communication: formatRating(ratingSums.communication / totalRatings),
        valueForMoney: formatRating(ratingSums.valueForMoney / totalRatings),
        amenities: formatRating(ratingSums.amenities / totalRatings),
        averageRatings: formatRating(ratingSums.averageRatings / totalRatings),
      };

      setRating(averageRatings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRating();
    // eslint-disable-next-line
  }, [propertyId]);

  const handleReviewSubmit = async (review) => {
    try {
      await reviewService.createReview(propertyId, review);
      getReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
    } catch (error) {
      console.error(error);
    } finally {
      getReviews();
      setReviews(reviews.filter((review) => review._id !== reviewId));
    }
  };

  const handleUpdate = async (reviewId, updatedReviewText) => {
    try {
      const updatedReview = await reviewService.updateReview(reviewId, {
        review: updatedReviewText,
      });
      getReviews();
      setReviews(
        reviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingSubmit = async (propertyId, rating) => {
    // Calculate the average rating only for rated categories
    const ratedCategories = Object.values(rating).filter((value) => value > 0);
    const totalRating = ratedCategories.reduce((sum, value) => sum + value, 0);
    const averageRating = totalRating / ratedCategories.length;

    // Add the average rating to the rating object
    const ratingWithAverage = { ...rating, averageRating };

    try {
      await propertyService.addPropertyVote(propertyId, ratingWithAverage);
      // handle successful vote submission
    } catch (error) {
      // handle vote submission error
    }
  };

  return (
    <div>
      <CardDetail property={property} rating={rating} />
      <GoogleMapsProvider>
        <Map formData={property} />
      </GoogleMapsProvider>
      <br />
      <ReviewForm
        propertyId={propertyId}
        handleReviewSubmit={handleReviewSubmit}
      />
      <Reviews
        reviews={reviews}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <Calendar propertyId={propertyId} />
      <StarForm
        propertyId={propertyId}
        onSubmit={handleRatingSubmit}
        rating={rating}
        initialRating={userVote}
      />
    </div>
  );
}
