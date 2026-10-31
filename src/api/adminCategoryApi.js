import api from "./axios";

/*
|--------------------------------------------------------------------------
| GET ALL CATEGORIES
|--------------------------------------------------------------------------
*/
export const getAdminCategories = async () => {
  const response = await api.get("/admin/categories");

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET SINGLE CATEGORY
|--------------------------------------------------------------------------
*/
export const getAdminCategoryById = async (categoryId) => {
  const response = await api.get(`/admin/categories/${categoryId}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| CREATE CATEGORY
|--------------------------------------------------------------------------
*/
export const createAdminCategory = async (categoryData) => {
  const response = await api.post("/admin/categories", categoryData);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPLOAD CATEGORY IMAGE
|--------------------------------------------------------------------------
*/
export const uploadAdminCategoryImage = async (formData) => {
  const response = await api.post("/admin/categories/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE CATEGORY
|--------------------------------------------------------------------------
*/
export const updateAdminCategory = async (categoryId, categoryData) => {
  const response = await api.patch(
    `/admin/categories/${categoryId}`,
    categoryData,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| DELETE CATEGORY
|--------------------------------------------------------------------------
*/
export const deleteAdminCategory = async (categoryId) => {
  const response = await api.delete(`/admin/categories/${categoryId}`);

  return response.data;
};
