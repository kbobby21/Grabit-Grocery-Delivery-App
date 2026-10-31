import api from "./axios";
import API from "../constants/api";

export const createOrder = (payload) => api.post(API.ORDERS, payload);

export const getOrders = () => api.get(API.ORDERS);

export const getOrder = (id) => api.get(`${API.ORDERS}/${id}`);

export const cancelOrder = (id) => api.patch(`${API.ORDERS}/${id}/cancel`);
