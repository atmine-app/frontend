import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CardDetail from '../../components/Card/CardDetail';
import Map from '../../components/Map/Map';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import propertyService from '../../services/propertyService';
import Reviews from '../../components/Reviews/Reviews';
import reviewService from '../../services/reviewService';
import Calendar from '../../components/Calendar/Calendar';
import GoogleMapsProvider from '../../components/GoogleMapsProvider/GoogleMapsProvider';

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState([]);

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
      const updatedReview = await reviewService.updateReview(reviewId, { review: updatedReviewText });
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

  return (
    <div>
      <CardDetail property={property} />
      <GoogleMapsProvider>
      <Map formData={property} />
      </GoogleMapsProvider>
      <br />
      <ReviewForm propertyId={propertyId} handleReviewSubmit={handleReviewSubmit} />
      <Reviews reviews={reviews} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      <Calendar propertyId={propertyId} />
    </div>
  );
}
