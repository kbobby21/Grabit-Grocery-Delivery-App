import api from "./axios";

const AdminCouponApi = {
  getCoupons: async (params = {}) => {
    const response = await api.get("/admin/coupons", {
      params,
    });

    return response.data;
  },

  getCouponById: async (id) => {
    const response = await api.get(`/admin/coupons/${id}`);

    return response.data;
  },

  createCoupon: async (data) => {
    const response = await api.post("/admin/coupons", data);

    return response.data;
  },

  updateCoupon: async (id, data) => {
    const response = await api.patch(`/admin/coupons/${id}`, data);

    return response.data;
  },

  updateCouponStatus: async (id, active) => {
    const response = await api.patch(`/admin/coupons/${id}/status`, {
      active,
    });

    return response.data;
  },

  deleteCoupon: async (id) => {
    const response = await api.delete(`/admin/coupons/${id}`);

    return response.data;
  },
};

export default AdminCouponApi;
