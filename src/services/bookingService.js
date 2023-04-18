import axios from "axios";

class BookingService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/bookings`,
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllBookings() {
    return this.api
      .get(`/`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  getBooking(bookingId) {
    return this.api
      .get(`/${bookingId}?populate=property`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  addBooking(booking) {
    return this.api
      .post("/", booking)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  editBooking(bookingId, body) {
    return this.api
      .put(`/${bookingId}`, body)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  deleteBooking(bookingId) {
    return this.api
      .delete(`/${bookingId}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  blockDateRange(property, startDate, endDate) {
    return this.api
      .post("/block", { property, startDate, endDate })
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
}

const bookingService = new BookingService();

export default bookingService;
