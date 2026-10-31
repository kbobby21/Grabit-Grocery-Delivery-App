import api from "./axios";

export const fetchProductsApi = async () => {
  const response = await api.get("/products");

  return response.data;
};

export const fetchProductByIdApi = async (id) => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};
