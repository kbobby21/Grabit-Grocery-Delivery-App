import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// REQUEST INTERCEPTOR
// Supports both CUSTOMER and ADMIN authentication
// =========================================================

api.interceptors.request.use(
  (config) => {
    // Customer token
    const customerToken = localStorage.getItem("token");

    // Admin token
    const adminToken = localStorage.getItem("adminToken");

    // Prefer customer token when customer is using the app
    const token = customerToken || adminToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// =========================================================
// RESPONSE INTERCEPTOR
// =========================================================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      const customerToken = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");

      if (customerToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      } else if (adminToken) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
