export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
