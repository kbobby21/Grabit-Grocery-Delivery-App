import * as cartApi from "../api/cart.api";

export const getCart = async () => {
  const { data } = await cartApi.getCart();
  return data;
};

export const addToCart = async (productId, quantity = 1) => {
  const { data } = await cartApi.addToCart(productId, quantity);
  return data;
};

export const updateCart = async (productId, quantity) => {
  const { data } = await cartApi.updateCart(productId, quantity);
  return data;
};

export const removeFromCart = async (productId) => {
  const { data } = await cartApi.removeFromCart(productId);
  return data;
};

export const clearCart = async () => {
  const { data } = await cartApi.clearCart();
  return data;
};
