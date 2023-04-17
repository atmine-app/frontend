import React from "react";
import "./Card.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { HiStar } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import { usePropertyLike } from "../../hooks/usePropertyLike";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {CiLocationOn} from "react-icons/ci";


export default function Card({ property }) {
  const { user } = useAuth();
  const { liked, handleAddFavorite } = usePropertyLike(property, user);

  const handleCardClick = (event) => {
    if (event.target.closest(".heart-container")) {
      return;
    }
    window.location.href = `/properties/${property._id}`;
  };

  const handleAddRemoveFavorite = () => {
    if (liked) {
      toast.info(`${property.title} removed from wishlist`, {
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
      toast.info(`${property.title} added to wishlist`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleAddFavorite();
  };

  return (
    <div
      className="property__link"
      key={property._id}
      onClick={handleCardClick}
    >
      <div className="card-box">
        {user && (
          <div className="heart-container">
            {liked ? (
              <AiFillHeart onClick={handleAddRemoveFavorite} />
            ) : (
              <AiOutlineHeart onClick={handleAddRemoveFavorite} />
            )}
          </div>
        )}
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          loop={true}
          mousewheel={true}
          cssMode={true}
          pagination
          modules={[Pagination, Navigation]}
          className="swiper-container"
        >
          {property.images.map((src, i) => (
            <SwiperSlide key={i} className="imageSwiper">
              <img src={src} className="card-img" alt="propertyimg" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="card-info-flex new-card-info-flex">
          <div className="card-title-avatar">
          <img className="card-avatar" src={property.owner?.avatar} alt="property owner avatar" />

            <h3 className="card-title">{property.title}</h3>
          </div>
          <div className="card-rating new-card-rating">
            <HiStar
              className="new-card-star"
              color="var(--color-secondary-green)"
              fontSize="1.3rem"
            />
            <p className="new-card-rating-value">{property.averageRating}</p>
          </div>
        </div>
        <div className="new-card-info-details">
          <p className="new-card-info">
           <CiLocationOn className="location-icon-card"/> {property.address}, {property.city}, {property.country}
          </p>
          <p className="new-card-summary">{property.summary}</p>
          <p className="new-card-price">
            <span className="new-card-price-value">€<span className="new-card-price-number">{property.price}</span></span> day
          </p>
      </div>
    </div>
    </div>
  );
}