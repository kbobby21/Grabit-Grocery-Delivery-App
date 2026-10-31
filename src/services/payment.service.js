import api from "../api/axios";

export const createRazorpayOrder = async (data) => {
  const response = await api.post("/payments/create-order", data);
  return response.data;
};

export const verifyPayment = async (data) => {
  const response = await api.post("/payments/verify", data);
  return response.data;
};

export const cashOnDelivery = async (data) => {
  const response = await api.post("/payments/cod", data);
  return response.data;
};

export const paymentHistory = async () => {
  const response = await api.get("/payments/history");
  return response.data;
};

export const paymentDetails = async (id) => {
  const response = await api.get(`/payments/${id}`);
  return response.data;
};
