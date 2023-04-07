import axios from 'axios';

class FavoriteService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/favorites`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllFavorites() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }  

  addPropertyToFavorites(propertyId) {
    return this.api.post(`/${propertyId}`).then(({ data }) => data).catch(err => console.error(err));
  }

  deleteFavorite(favoriteId) {
    return this.api.delete(`/${favoriteId}`).then(({ data }) => data).catch(err => console.error(err));
  }


  getFavoriteId(propertyId) {
    return this.api
      .get('/')
      .then(({ data }) => {
        const favorite = data.find((fav) => fav.property._id === propertyId);
        return favorite ? favorite._id : null;
      })
      .catch((err) => console.error(err));
  }

}

const favoriteService = new FavoriteService();

export default favoriteService;
