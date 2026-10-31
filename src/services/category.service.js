import * as categoryApi from "../api/category.api";

export const getCategories = async () => {
  const data = await categoryApi.fetchCategoriesApi();
  return data.categories;
};

export const getCategoryProducts = async (id) => {
  const data = await categoryApi.fetchCategoryProductsApi(id);
  return data.products;
};
