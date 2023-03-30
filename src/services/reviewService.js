import axios from 'axios';

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/reviews`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getReview(reviewId) {
    return this.api.get(`/${reviewId}`).then(({ data }) => data);
  }

  createReview(propertyId, review) {
    console.log(`propertyId: ${propertyId}`);
  console.log(`review: ${review}`);
    const data = { propertyId, review };
  return this.api.post("/", data).then(({ data }) => data);
  }

  updateReview(reviewId, review) {
    return this.api.put(`/${reviewId}`, review).then(({ data }) => data);
  }

  deleteReview(reviewId) {
    return this.api.delete(`/${reviewId}`).then(({ data }) => data);
  }

  getReviews() {
    return this.api.get('/').then(({ data }) => data);
  }
}

const reviewService = new ReviewService();

export default reviewService;
