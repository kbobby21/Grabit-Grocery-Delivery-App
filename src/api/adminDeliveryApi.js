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
| GET AVAILABLE DELIVERY PARTNERS
|--------------------------------------------------------------------------
*/

export const getAvailableDeliveryPartners = async () => {
  const response = await api.get("/admin/delivery/partners", getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET ALL DELIVERY PARTNERS
|--------------------------------------------------------------------------
*/

export const getAllDeliveryPartners = async () => {
  const response = await api.get("/admin/delivery/partners/all", getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET DELIVERY PARTNER BY ID
|--------------------------------------------------------------------------
*/

export const getDeliveryPartner = async (partnerId) => {
  const response = await api.get(
    `/admin/delivery/partners/${partnerId}`,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET DELIVERY PARTNER ORDERS
|--------------------------------------------------------------------------
*/

export const getDeliveryPartnerOrders = async (partnerId) => {
  const response = await api.get(
    `/admin/delivery/partners/${partnerId}/orders`,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| CREATE DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const createDeliveryPartner = async (data) => {
  const response = await api.post(
    "/admin/delivery/partners",
    data,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const updateDeliveryPartner = async (partnerId, data) => {
  const response = await api.patch(
    `/admin/delivery/partners/${partnerId}`,
    data,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY PARTNER STATUS
|--------------------------------------------------------------------------
*/

export const updateDeliveryPartnerStatus = async (partnerId, data) => {
  const response = await api.patch(
    `/admin/delivery/partners/${partnerId}/status`,
    data,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ASSIGN DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const assignDeliveryPartner = async (data) => {
  const response = await api.post("/admin/delivery/assign", data, getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET ORDER DELIVERY DETAILS
|--------------------------------------------------------------------------
*/

export const getOrderDelivery = async (orderId) => {
  const response = await api.get(
    `/admin/delivery/orders/${orderId}`,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY STATUS
|--------------------------------------------------------------------------
*/

export const updateDeliveryStatus = async (orderId, status) => {
  const response = await api.patch(
    `/admin/delivery/orders/${orderId}/status`,
    { status },
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET DELIVERY HISTORY
|--------------------------------------------------------------------------
*/

export const getDeliveryHistory = async () => {
  const response = await api.get("/admin/delivery/history", getConfig());

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ADD DELIVERY PARTNER BANK DETAILS
|--------------------------------------------------------------------------
*/

export const addDeliveryPartnerBankDetails = async (partnerId, data) => {
  const response = await api.post(
    `/admin/delivery/partners/${partnerId}/bank-details`,
    data,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET DELIVERY PARTNER BANK DETAILS
|--------------------------------------------------------------------------
*/

export const getDeliveryPartnerBankDetails = async (partnerId) => {
  const response = await api.get(
    `/admin/delivery/partners/${partnerId}/bank-details`,
    getConfig(),
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY PARTNER BANK DETAILS
|--------------------------------------------------------------------------
*/

export const updateDeliveryPartnerBankDetails = async (partnerId, data) => {
  const response = await api.patch(
    `/admin/delivery/partners/${partnerId}/bank-details`,
    data,
    getConfig(),
  );

  return response.data;
};
