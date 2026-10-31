import api from "./axios";

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/
export const getAdminProducts = async () => {
  const response = await api.get("/admin/products");

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT
|--------------------------------------------------------------------------
*/
export const getAdminProductById = async (productId) => {
  const response = await api.get(`/admin/products/${productId}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/
export const createAdminProduct = async (productData) => {
  const response = await api.post("/admin/products", productData);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPLOAD PRODUCT IMAGE
|--------------------------------------------------------------------------
*/
export const uploadAdminProductImage = async (formData) => {
  const response = await api.post("/admin/products/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
*/
export const updateAdminProduct = async (productId, productData) => {
  const response = await api.patch(`/admin/products/${productId}`, productData);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/
export const deleteAdminProduct = async (productId) => {
  const response = await api.delete(`/admin/products/${productId}`);

  return response.data;
};
