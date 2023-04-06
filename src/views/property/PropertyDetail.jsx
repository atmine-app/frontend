import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Map from "../../components/Map/Map";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import Reviews from "../../components/Reviews/Reviews";
import propertyService from "../../services/propertyService";
import reviewService from "../../services/reviewService";
import Calendar from "../../components/Calendar/Calendar";
import GoogleMapsProvider from "../../components/GoogleMapsProvider/GoogleMapsProvider";
import StarForm from "../../components/Rating/StarForm";
import { useAuth } from "../../hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "./PropertyDetail.css";

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [userVote, setUserVote] = useState({});
  const [userReview, setUserReview] = useState(null);
  const navigate = useNavigate();

  const getUserVote = async () => {
    try {
      const response = await propertyService.getUserPropertyVote(
        propertyId,
        user._id
      );
      setUserVote(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserVote();
    // eslint-disable-next-line
  }, [propertyId,user]);

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
      const userReview = response.find((review) => review.user._id === user._id);
      setUserReview(userReview);
      setReviews(response);
      console.log('all reviews',response)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
    
    // eslint-disable-next-line
  }, [propertyId,user]);
  const handleReviewSubmit = async (reviewText) => {
    try {
      if (userReview) {
        await reviewService.updateReview(userReview._id, { review: reviewText });
      } else {
        await reviewService.createReview(propertyId, reviewText );
      }
      getReviews();
    } catch (error) {
      console.log(error);
    }
  };

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
        averageRating: 0,
      };

      const ratingSums = response.reduce((acc, vote) => {
        acc.location += vote.location;
        acc.cleanliness += vote.cleanliness;
        acc.communication += vote.communication;
        acc.valueForMoney += vote.valueForMoney;
        acc.amenities += vote.amenities;
        acc.averageRating += vote.averageRating;
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
        averageRating: formatRating(ratingSums.averageRating / totalRatings),
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
  const handlePropertyDelete = async (propertyId) => {
    try {
      await propertyService.deleteProperty(propertyId);
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/");
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
      <div className="propertyCardDetail">
        <div className="DetailImageSection">
          <Swiper
            className=" ImageContainer mySwiper"
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
          >
            {property.images &&
              property.images.length > 0 &&
              property.images.map((image, index) => (
                <SwiperSlide key={index} className="imageSwiper">
                  <img src={image} alt={`${property.title} - ${index + 1}`} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <div className="property__card-content">
          <h2>{property.title}</h2>
          <p>Host: {property.owner && property.owner.username}</p>
          <p>Catergory: {property.category}</p>
          <p>Description: {property.description}</p>
          <p>Price: {property.price}</p>
          <p>Size: {property.size}</p>
          <p>Address: {property.address}</p>
          <p>City: {property.city}</p>
          <p>Rating: {rating && rating && rating.averageRating} </p>
        </div>
        {rating && (
          <div className="ratingsContainer">
            <p>Location: {rating && rating && rating.location}</p>
            <p>Cleanliness: {rating && rating && rating.cleanliness}</p>
            <p>Communication: {rating && rating && rating.communication}</p>
            <p>Value: {rating && rating && rating.valueForMoney}</p>
            <p>Amenities: {rating && rating && rating.amenities}</p>
          </div>
        )}
        <div className="card-buttons">
          <>
            <button type="submit">
              <Link
                to={`/properties/${property._id}/edit`}
                className="nav-link"
              >
                Edit
              </Link>
            </button>
            <button
              type="submit"
              onClick={() => handlePropertyDelete(propertyId)}
            >
              Delete
            </button>
          </>
        </div>
      </div>
      <GoogleMapsProvider>
        <Map formData={property} />
      </GoogleMapsProvider>
      <br />
      <ReviewForm
  propertyId={propertyId}
  initialReviewText={userReview && userReview.review}
  handleReviewSubmit={handleReviewSubmit}
/>
      <Reviews
        reviews={reviews.filter(
          (review) => !user || review.user._id !== user.id
        )}
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
