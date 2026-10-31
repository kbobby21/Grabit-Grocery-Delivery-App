import * as searchApi from "../api/search.api";

export const searchProducts = async (query) => {
  const data = await searchApi.searchProductsApi(query);

  return data.products;
};
