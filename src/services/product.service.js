import * as productApi from "../api/product.api";

export const getProducts = async () => {
  const data = await productApi.fetchProductsApi();
  return data.products;
};

export const getProduct = async (id) => {
  const data = await productApi.fetchProductByIdApi(id);
  return data.product;
};
