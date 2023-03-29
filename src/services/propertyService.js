import axios from 'axios';

class PropertyService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllProperties() {
    return this.api.get(`/`).then(({ data }) => data);
  }

  getProperty(propertyId) {
    return this.api.get(`/properties/${propertyId}`).then(({ data }) => data);
  }

  addProperty(property) {
    return this.api.post('/', property).then(({ data }) => data);
  }

  editProperty(propertyId, property) {
    return this.api.put(`/properties/${propertyId}`, property).then(({ data }) => data);
  }

  deleteProperty(propertyId) {
    return this.api.delete(`/properties/${propertyId}`).then(({ data }) => data);
  }

  getPropertyVotes(propertyId) {
    return this.api.get(`/properties/${propertyId}/votes`).then(({ data }) => data);
  }

  addPropertyVote(propertyId, rating) {
    return this.api.post(`/properties/${propertyId}/vote`, { rating }).then(({ data }) => data);
  }
}

const propertyService = new PropertyService();

export default propertyService;
