import api from "./axios";

const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getAdminToken()}`,
  },
});

/*
|--------------------------------------------------------------------------
| GET ALL INVENTORY
|--------------------------------------------------------------------------
*/

export const getAdminInventory = async (params = {}) => {
  const response = await api.get("/admin/inventory", {
    ...getConfig(),
    params,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET INVENTORY OVERVIEW
|--------------------------------------------------------------------------
*/

export const getAdminInventoryOverview = async () => {
  const response = await api.get("/admin/inventory/overview", getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET LOW STOCK
|--------------------------------------------------------------------------
*/

export const getAdminLowStockInventory = async () => {
  const response = await api.get("/admin/inventory/low-stock", getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET OUT OF STOCK
|--------------------------------------------------------------------------
*/

export const getAdminOutOfStockInventory = async () => {
  const response = await api.get("/admin/inventory/out-of-stock", getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT INVENTORY
|--------------------------------------------------------------------------
*/

export const getAdminInventoryByProductId = async (productId) => {
  const response = await api.get(`/admin/inventory/${productId}`, getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET INVENTORY HISTORY
|--------------------------------------------------------------------------
*/

export const getAdminInventoryHistory = async (productId, params = {}) => {
  const response = await api.get(`/admin/inventory/${productId}/history`, {
    ...getConfig(),
    params,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ADJUST STOCK
|--------------------------------------------------------------------------
*/

export const adjustAdminStock = async (data) => {
  const response = await api.post("/admin/inventory/adjust", data, {
    ...getConfig(),
    headers: {
      ...getConfig().headers,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET ALL INVENTORY HISTORY
|--------------------------------------------------------------------------
*/

export const getAdminAllInventoryHistory = async (params = {}) => {
  const response = await api.get("/admin/inventory/history", {
    ...getConfig(),
    params,
  });

  return response.data;
};
