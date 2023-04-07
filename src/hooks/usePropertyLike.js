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
    console.log('handleAddFavorite details', property, user)
    try {
      if (liked) {
        const favorite = favorites.find(
          (favorite) => favorite.property === property._id && favorite.user === user._id
        );

        if (favorite) {
          await favoriteService.deleteFavorite(favorite._id);
          setLiked(false);
        }
      } else {
        await favoriteService.addPropertyToFavorites(property._id);
        setLiked(true);
      }
      getFavorites();
    } catch (error) {
      console.error(error);
    }
  };

  return { liked, handleAddFavorite };
};
