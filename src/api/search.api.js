import api from "./axios";

export const searchProductsApi = async (query) => {
  const response = await api.get(
    `/products/search?q=${encodeURIComponent(query)}`,
  );

  return response.data;
};
