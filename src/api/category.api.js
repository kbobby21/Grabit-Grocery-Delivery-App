import api from "./axios";

export const fetchCategoriesApi = async () => {
  const response = await api.get("/categories");

  return response.data;
};

export const fetchCategoryProductsApi = async (id) => {
  const response = await api.get(`/categories/${id}/products`);

  return response.data;
};
