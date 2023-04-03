import axios from "axios";

class PropertyService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/properties`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllProperties() {
    return this.api
      .get(`/`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  getProperty(propertyId) {
    return this.api
      .get(`/${propertyId}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  addProperty(property) {
    return this.api
      .post("/", property)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  editProperty(propertyId, body) {
    return this.api
      .put(`/${propertyId}`, body)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  deleteProperty(propertyId) {
    return this.api
      .delete(`/${propertyId}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  getPropertyVotes(propertyId) {
    return this.api
      .get(`/${propertyId}/votes`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  addPropertyVote(propertyId, rating) {
    return this.api
      .post(`/${propertyId}/vote`, rating)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
}

const propertyService = new PropertyService();

export default propertyService;
