import axios from "axios";
import storage from "redux-persist/lib/storage";
import { store } from "../store";
import { removeUser } from "../reducers/authSlice";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

api.interceptors.request.use(
  async (config) => {
    let token = null;

    const rootPersist = await storage.getItem("persist:smartlives-webapp");

    if (rootPersist) {
      const { userData } = JSON.parse(rootPersist);

      if (userData) {
        token = JSON.parse(userData)?.token;
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!error.config.url.includes('/donations/')) {
        store.dispatch(removeUser());
      }
    }
    return Promise.reject(error);
  }
);

export default api;
