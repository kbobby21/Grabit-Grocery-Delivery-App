import api from "./axios";
import API from "../constants/api";

export const createAddress = (payload) => api.post(API.ADDRESSES, payload);

export const getAddresses = () => api.get(API.ADDRESSES);

export const getAddress = (id) => api.get(`${API.ADDRESSES}/${id}`);

export const updateAddress = (id, payload) =>
  api.put(`${API.ADDRESSES}/${id}`, payload);

export const deleteAddress = (id) => api.delete(`${API.ADDRESSES}/${id}`);
