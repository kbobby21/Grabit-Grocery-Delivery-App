import api from "./axios";

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN
|--------------------------------------------------------------------------
*/

export const adminLogin = async (identifier, password) => {
  const response = await api.post("/admin/auth/login", {
    identifier,
    password,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET ALL ORDERS
|--------------------------------------------------------------------------
*/

export const getAdminOrders = async () => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await api.get("/orders/admin/all", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET SINGLE ADMIN ORDER
|--------------------------------------------------------------------------
*/

export const getAdminOrderById = async (orderId) => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await api.get(`/orders/admin/${orderId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const updateOrderStatus = async (orderId, status, note = null) => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await api.patch(
    `/orders/${orderId}/status`,
    {
      status,
      note,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    },
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET AVAILABLE DELIVERY PARTNERS
|--------------------------------------------------------------------------
*/

export const getDeliveryPartners = async () => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await api.get("/admin/delivery/partners", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ASSIGN DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const assignDeliveryPartner = async (orderId, deliveryPartnerId) => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await api.post(
    "admin/delivery/assign",
    {
      orderId,
      deliveryPartnerId,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    },
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET ORDER DELIVERY
|--------------------------------------------------------------------------
*/

export const getOrderDelivery = async (orderId) => {
  const adminToken = localStorage.getItem("adminToken");

  const response = await api.get(`admin/delivery/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};
