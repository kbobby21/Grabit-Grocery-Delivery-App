import * as orderApi from "../api/order.api";

export const createOrder = async (payload) => {
  const { data } = await orderApi.addOrder(payload);
  return data;
};

export const getOrders = async () => {
  const { data } = await orderApi.getOrders();
  return data;
};

export const getOrder = async (id) => {
  const { data } = await orderApi.getOrder(id);
  return data;
};

export const cancelOrder = async (id) => {
  const { data } = await orderApi.cancelOrder(id);
  return data;
};
