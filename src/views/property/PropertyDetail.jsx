import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { usePropertyLike } from "../../hooks/usePropertyLike";
import PropertyInfo from "../../components/PropertyInfo/PropertyInfo";
import { HiStar } from "react-icons/hi";
import UserInfo from "../../components/UserInfo/UserInfo";
import Description from "../../components/Description/Description";
import Amenities from "../../components/Ameties/Amenities";

export default function PropertyDetail() {
  const { propertyId } = useParams();
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [property, setProperty] = useState({});
  const { liked, handleAddFavorite } = usePropertyLike(property, user);
  const [reviews, setReviews] = useState([]);
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
    if (user) {
      getUserVote();
    }
    // eslint-disable-next-line
  }, [propertyId, user]);

  const getProperty = async () => {
    try {
      const response = await propertyService.getProperty(propertyId);
      setProperty(response);
      console.log("property", response);
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
      const userReview = response.find(
        (review) => review.user._id === user._id
      );
      setUserReview(userReview);
      setReviews(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getReviews();
    }
    //eslint-disable-next-line
  }, [propertyId, user]);

  const handleReviewSubmit = async (reviewText) => {
    try {
      if (userReview) {
        await reviewService.updateReview(userReview._id, {
          review: reviewText,
        });
      } else {
        await reviewService.createReview(propertyId, reviewText);
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

  const heartIconRef = useRef(); 

  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.pageYOffset;
      if (yOffset > 0) {
        heartIconRef.current.style.display = "none";
      } else {
        heartIconRef.current.style.display = "block";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="page">
      <BackNavigationFloat />
      <div className="propertyCardDetail">
      <div
          ref={heartIconRef} // Add this line to assign the reference to the heart icon
          className="heart-container heart-container-detail"
          style={{ pointerEvents: "auto" }}
        >
          {liked ? (
            <AiFillHeart onClick={handleAddFavorite} />
          ) : (
            <AiOutlineHeart onClick={handleAddFavorite} />
          )}
        </div>
        <div className="DetailImageSection">
         
          <Swiper
            className=" ImageContainer mySwiper"
            spaceBetween={0}
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
        <PropertyInfo property={property} rating={rating} />
        {property.owner && <UserInfo property={property} />}
        <Description property={property} />
       
        <Amenities property={property} />
      </div>
      <div>
        <h2 className="section-title">Where is the {property.category}?</h2>
      <GoogleMapsProvider>
        <Map formData={property} className="section" />
      </GoogleMapsProvider>
      </div>
      <br />
      <h2 className="section-title">Users Reviews -  <HiStar color="var(--color-secondary-green)" fontSize="1.7rem" />{rating.averageRating}</h2>
      <Reviews
        reviews={reviews.filter(
          (review) => !user || review.user._id !== user.id
        )}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        rating={rating}
      />
      <h2 className="section-title">Check availability</h2>
      <Calendar propertyId={propertyId} className="section" property={property} />
      <ReviewForm
        propertyId={propertyId}
        initialReviewText={userReview && userReview.review}
        handleReviewSubmit={handleReviewSubmit}
      />
      <StarForm
        propertyId={propertyId}
        onSubmit={handleRatingSubmit}
        rating={rating}
        initialRating={userVote}
      />
      <button onClick={() => navigate(`/chat/${property.owner._id}`)}>
        Chat with owner
      </button>
    </div>
  );
}


// {/* <div className="card-buttons">
//           <>
//             <Link to={`/properties/${property._id}/edit`} className="nav-link">
//               <button type="submit" className="cta-button">
//                 Edit
//               </button>
//             </Link>

//             <button
//               type="submit"
//               onClick={() => handlePropertyDelete(propertyId)}
//             >
//               Delete
//             </button>
//           </>
//         </div> */}

          // const handlePropertyDelete = async (propertyId) => {
  //   try {
  //     await propertyService.deleteProperty(propertyId);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     navigate("/");
  //   }
  // };