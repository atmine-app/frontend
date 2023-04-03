import axios from 'axios';

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/user`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getUser() {
    return this.api.get('/me').then(({ data }) => data);
  }

  updateUser(user) {
    return this.api.put('/edit', user).then(({ data }) => data);
  }

  deactivateUser() {
    return this.api.put('/deactivate').then(({ data }) => data);
  }
}

const userService = new UserService();

export default userService;