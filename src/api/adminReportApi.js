import api from "./axios";

const adminReportApi = {
  // =========================
  // SALES REPORT
  // =========================

  getSalesReport: async (range = "30days") => {
    const response = await api.get("/admin/reports/sales", {
      params: {
        range,
      },
    });

    return response.data;
  },

  // =========================
  // SALES TREND
  // =========================

  getSalesTrend: async (range = "30days") => {
    const response = await api.get("/admin/reports/sales/trend", {
      params: {
        range,
      },
    });

    return response.data;
  },

  // =========================
  // TOP PRODUCTS
  // =========================

  getTopProducts: async (range = "30days", limit = 10) => {
    const response = await api.get("/admin/reports/products/top", {
      params: {
        range,
        limit,
      },
    });

    return response.data;
  },

  // =========================
  // CATEGORY REPORT
  // =========================

  getCategoryReport: async (range = "30days") => {
    const response = await api.get("/admin/reports/categories", {
      params: {
        range,
      },
    });

    return response.data;
  },

  // =========================
  // CUSTOMER REPORT
  // =========================

  getCustomerReport: async (range = "30days") => {
    const response = await api.get("/admin/reports/customers", {
      params: {
        range,
      },
    });

    return response.data;
  },

  // =========================
  // PAYMENT REPORT
  // =========================

  getPaymentReport: async (range = "30days") => {
    const response = await api.get("/admin/reports/payments", {
      params: {
        range,
      },
    });

    return response.data;
  },

  // =========================
  // INVENTORY REPORT
  // =========================

  getInventoryReport: async (status = "low_stock") => {
    const response = await api.get("/admin/reports/inventory", {
      params: {
        status,
      },
    });

    return response.data;
  },
};

export default adminReportApi;
