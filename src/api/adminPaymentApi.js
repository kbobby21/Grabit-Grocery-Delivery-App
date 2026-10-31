import axiosInstance from "./axios";

const adminPaymentApi = {
  // =====================================================
  // PAYMENT OVERVIEW
  // GET /admin/payments/overview
  // =====================================================
  getPaymentOverview: async () => {
    const response = await axiosInstance.get("/admin/payments/overview");

    return response.data;
  },

  // =====================================================
  // GET PAYMENTS
  // GET /admin/payments
  //
  // Supported:
  // ?status=success
  // ?method=Razorpay
  // ?page=1
  // ?limit=20
  // =====================================================
  getPayments: async ({
    status = "",
    method = "",
    page = 1,
    limit = 20,
  } = {}) => {
    const params = {
      page,
      limit,
    };

    if (status) {
      params.status = status;
    }

    if (method) {
      params.method = method;
    }

    const response = await axiosInstance.get("/admin/payments", {
      params,
    });

    return response.data;
  },

  // =====================================================
  // PAYMENT DETAILS
  // GET /admin/payments/:id
  // =====================================================
  getPaymentDetails: async (paymentId) => {
    const response = await axiosInstance.get(`/admin/payments/${paymentId}`);

    return response.data;
  },
};

export default adminPaymentApi;
