import api from "./axios";
import API from "../constants/api";

export const getCart = () => api.get(API.CART);

export const addToCart = (productId, quantity = 1) =>
  api.post(API.CART, {
    productId,
    quantity,
  });

export const updateCart = (productId, quantity) =>
  api.put(`${API.CART}/${productId}`, {
    quantity,
  });

export const removeFromCart = (productId) =>
  api.delete(`${API.CART}/${productId}`);

export const clearCart = () => api.delete(API.CART);
