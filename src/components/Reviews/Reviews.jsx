import React,{useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "./Reviews.css";
import { RxAvatar } from "react-icons/rx";
import { formatTimestamp } from "../../utils/index.js";
import { HiStar } from "react-icons/hi";

export default function Reviews({ reviews,rating }) {
  const [showRatings, setShowRatings] = useState(false)

  const toggleRatings = () => {
    setShowRatings(!showRatings);
  };
  const renderRatingsBar = (label, value) => {
    const numericValue = Number(value);
    const fillWidth = (numericValue / 5) * 100;
  
    return (
      <div className="rating-bar-container">
        <span>{label} <span className="rating-value">
          {numericValue.toFixed(1)} <HiStar className="rating-star-icon" />
        </span></span>
        <div className="rating-bar">
          <div className="rating-bar-fill" style={{ width: `${fillWidth}%` }} />
        </div>
       
      </div>
    );
  };
  

  return (
    <div className="user-reviews-section">
      {reviews.length > 0 && (
        <Swiper
          className="reviews-swiper mySwiper"
          spaceBetween={20}
          slidesPerView={"auto"}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="review-swiper">
                <div className="review-slide-infocontainer">
                  <div className="review-slide-header">
                    <div className="review-slide-avatar">
                      <RxAvatar className="review-slide-avatar"/>
                    </div>
                    <div className="review-slide-user-container">
                      <h4>{review.user.username}</h4>
                      <p>{formatTimestamp(review.createdAt)}</p>
                    </div>
                  </div>
                  <p>"{review.review}"</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <div className="ratingsContainer">
      <div id="see-ratings-btn-container">
        <button onClick={toggleRatings} className="cta-button">
          {showRatings ? "Hide Ratings" : "See Ratings"}
        </button>
      </div>
      {showRatings && rating && (
        <div className="ratingsBarContainer expand">
          {renderRatingsBar("Location", rating.location)}
          {renderRatingsBar("Cleanliness", rating.cleanliness)}
          {renderRatingsBar("Communication", rating.communication)}
          {renderRatingsBar("Value", rating.valueForMoney)}
          {renderRatingsBar("Amenities", rating.amenities)}
        </div>
      )}
      </div>
      <div className="section"></div>
    </div>
  );
  
}

