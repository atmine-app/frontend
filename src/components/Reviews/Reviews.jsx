import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import "./Reviews.css";
import { RxAvatar } from "react-icons/rx";
import { formatTimestamp } from "../../utils/index.js";

export default function Reviews({ reviews }) {
  return (
    <div>
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
    </div>
  );
}

// const isReviewCreator = user && user._id === review.user._id;
// {isReviewCreator && (
//   <div>
//     <button onClick={() => handleEditClick(review._id)}>Edit</button>
//     <button onClick={() => handleDeleteReview(review._id)}>
//       Delete
//     </button>
//   </div>
// )}
