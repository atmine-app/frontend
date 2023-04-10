import React, { useState, useEffect } from "react";
import CardMin from "../../components/Card/CardMin";
import favoriteService from "../../services/favoriteService";
import propertyService from "../../services/propertyService";
import { useAuth } from "../../hooks/useAuth";

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
        console.log("propertyIds:", propertyIds);
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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Wishlist</h2>
      {likedProperties.length === 0 ? (
        <p>No properties added to wishlist</p>
      ) : (
        likedProperties
          .filter((property) => property !== null && property !== undefined)
          .map((property) => <CardMin key={property._id} property={property} />)
      )}
    </div>
  );
}