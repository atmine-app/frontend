import { useState, useEffect } from "react";
import favoriteService from "../services/favoriteService";

export const usePropertyLike = (property, user) => {
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);

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
  }, [property]);

  useEffect(() => {
    if (user) {
      const hasLiked = favorites.some(
        (favorite) => favorite.property === property._id && favorite.user === user._id
      );
      setLiked(hasLiked);
    }
  }, [favorites, property, user]);

  const handleAddFavorite = async () => {
    try {
      if (liked) {
        const favorite = favorites.find(
          (favorite) => favorite.property === property._id && favorite.user === user._id
        );

        if (favorite) {
          await favoriteService.deleteFavorite(favorite._id);
          setLiked(false);
          setFavorites(favorites.filter((fav) => fav._id !== favorite._id));
        }
      } else {
        await favoriteService.addPropertyToFavorites(property._id);
        setLiked(true);
        setFavorites([...favorites, { property: property._id, user: user._id }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { liked, handleAddFavorite };
};