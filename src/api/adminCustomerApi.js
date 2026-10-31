import api from "./axios";

const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

/*
|--------------------------------------------------------------------------
| GET ALL CUSTOMERS
|--------------------------------------------------------------------------
*/
export const getAdminCustomers = async () => {
  const adminToken = getAdminToken();

  const response = await api.get("/admin/customers", {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET SINGLE CUSTOMER
|--------------------------------------------------------------------------
*/
export const getAdminCustomerById = async (customerId) => {
  const adminToken = getAdminToken();

  const response = await api.get(`/admin/customers/${customerId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| GET CUSTOMER ORDER HISTORY
|--------------------------------------------------------------------------
*/
export const getAdminCustomerOrders = async (customerId) => {
  const adminToken = getAdminToken();

  const response = await api.get(`/admin/customers/${customerId}/orders`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| UPDATE CUSTOMER STATUS
|--------------------------------------------------------------------------
*/
export const updateAdminCustomerStatus = async (customerId, isVerified) => {
  const adminToken = getAdminToken();

  const response = await api.patch(
    `/admin/customers/${customerId}/status`,
    {
      is_verified: isVerified,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};
