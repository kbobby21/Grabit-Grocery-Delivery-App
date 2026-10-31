import api from "./axios";
import API from "../constants/api";

export const sendOtp = (phone) =>
  api.post(`${API.AUTH}/send-otp`, {
    phone,
  });

export const verifyOtp = (phone, otp) =>
  api.post(`${API.AUTH}/verify-otp`, {
    phone,
    otp,
  });

export const getProfile = () => api.get(`${API.AUTH}/profile`);

export const updateProfile = (data) => api.put(`${API.AUTH}/profile`, data);
