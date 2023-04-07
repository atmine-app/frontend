import React, { useEffect, useState } from "react";
import "./Card.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { HiStar } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import favoriteService from "../../services/favoriteService";

export default function Card({ property }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkLikedProperty = async () => {
      const hasUserLiked = await favoriteService.hasUserLikedProperty(
        property._id
      );
      setLiked(hasUserLiked);
      console.log("hasUserLiked", hasUserLiked)
    };
    checkLikedProperty();
  }, [property]);

  const handleAddFavorite = async () => {
    try {
      if (liked) {
        const favoriteId = await favoriteService.getFavoriteId(property._id);
        await favoriteService.deleteFavorite(favoriteId);
      } else {
        await favoriteService.addPropertyToFavorites(property._id);
      }
      setLiked(!liked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = (event) => {
    if (event.target.closest(".heart-container")) {
      return;
    }
    window.location.href = `/properties/${property._id}`;
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
            <AiFillHeart onClick={handleAddFavorite} />
          ) : (
            <AiOutlineHeart onClick={handleAddFavorite} />
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
            <HiStar color="var(--color-secondary-green)" fontSize="1.3rem" />
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
