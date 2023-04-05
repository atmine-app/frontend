import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Card.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import {HiStar} from "react-icons/hi";

export default function Card({property}) {

  useEffect(() => {
    console.log(property)
  }, [property])
  return (
    <Link className="property__link" key={property._id} to={`/properties/${property._id}`}>
    <div className="card-box">
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
            <img src={src} className="card-img" alt='propertyimg' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-info-flex">
        <h3 className="card-title">{property.title}</h3>
        <div className="card-rating">
          <HiStar />
          <p>{property.averageRating}</p>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{property.description}</p>
      {/* <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.date}</p> */}
      <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black" }}>
        <span style={{ fontWeight: "600" }}>€{property.price}</span> day
      </p>
    </div>
    </Link>
  );
}