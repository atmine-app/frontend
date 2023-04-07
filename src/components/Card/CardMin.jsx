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
import { useAuth } from "../../hooks/useAuth";

export default function Card({ property }) {
  const [liked, setLiked] = useState(false);
  const {user}  = useAuth();
  const [favorites, setFavorites] = useState([]);



  //Gets all favorites
  const getFavorites = async () => {
    try {
      const response = await favoriteService.getAllFavorites();
      setFavorites(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line
  }, [property]);

  //Checks if the property is in the favorites for the user logged in
  useEffect(() => {
    if (user) {
      const hasLiked = favorites.some((favorite) => favorite.property === property._id && favorite.user === user._id);
      setLiked(hasLiked);
      console.log('hasLiked', hasLiked)
    }
  }, [favorites, property, user]);

  const handleAddFavorite = async () => {
    try {
      if (liked) {
        const favorite = favorites.find(
          (favorite) => favorite.property === property._id && favorite.user=== user._id
        );
          console.log('favorite search', favorite)
        if (favorite) {
          await favoriteService.deleteFavorite(favorite._id);
          setLiked(false);
        }
      } else {
        await favoriteService.addPropertyToFavorites(property._id);
        setLiked(true)
      }
      setLiked(!liked);
      getFavorites(); // Call getFavorites() to refresh the favorites list in the state after adding or removing a favorite
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
