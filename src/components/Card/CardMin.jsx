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
        <div className="heart-container">
          {liked ? (
            <AiFillHeart onClick={handleAddRemoveFavorite} />
          ) : (
            <AiOutlineHeart onClick={handleAddRemoveFavorite} />
          )}
        </div>
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
        <div className="card-info-flex">
          <h3 className="card-title">{property.title}</h3>
          <div className="card-rating">
            <HiStar
              color="var(--color-secondary-green)"
              fontSize="1.3rem"
            />
            <p>{property.averageRating}</p>
          </div>
        </div>
        <p style={{ margin: 0, color: "var(--font-grey)" }}>
          {property.address},{property.city}
        </p>
        <p style={{ margin: 0, color: "var(--font-grey)" }}>
          {property.summary}
        </p>
        <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black" }}>
          <span style={{ fontWeight: "600" }}>€{property.price}</span> day
        </p>
      </div>
    </div>
  );
}