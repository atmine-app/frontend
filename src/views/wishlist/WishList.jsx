import React, { useState, useEffect } from "react";
import CardMin from "../../components/Card/CardMin";
import { Link } from "react-router-dom";
import favoriteService from "../../services/favoriteService";
import propertyService from "../../services/propertyService";
import { useAuth } from "../../hooks/useAuth";
import BackNavigationFloat from "../../components/BackNavigation/BackNavigationFloat";
import NotFound from "../../components/NotFound/NotFound";
import "./WishList.css";
import { PuffLoader } from "react-spinners";

export default function WishList() {
  const { user } = useAuth();
  const [likedProperties, setLikedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedProperties = async () => {
      try {
        const favorites = await favoriteService.getAllFavorites();
        if (!Array.isArray(favorites)) {
          console.error("Favorites is not an array:", favorites);
          return;
        }
        const propertyIds = new Set(
          favorites
            .filter((favorite) => favorite.user === user._id)
            .map((favorite) => favorite.property)
        );

        const properties = await Promise.all(
          [...propertyIds].map(async (propertyId) => {
            return await propertyService.getProperty(propertyId);
          })
        );
        setLikedProperties(properties);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikedProperties();
  }, [user._id]);

  if (loading) {
    return (
      <>
        <div className="loading-container">
          <PuffLoader color="#605cb8" size={60} />
        </div>
      </>
    );
  }

  return (
    <div className="booking-list">
      <h2>Wishlist</h2>
      <BackNavigationFloat />
      <div className="cards-flex">
        {likedProperties.length === 0 ? (
          <div className="cards-flex-content">
            <p className="cards-flex-p">No properties added to wishlist</p>
            <NotFound />
            <Link to="/">
              <button className="cta-button full100 top160">
                Start Exploring
              </button>
            </Link>
          </div>
        ) : (
          likedProperties
            .filter((property) => property !== null && property !== undefined)
            .map((property) => (
              <CardMin
                className="wish"
                key={property._id}
                property={property}
              />
            ))
        )}
      </div>
    </div>
  );
}
