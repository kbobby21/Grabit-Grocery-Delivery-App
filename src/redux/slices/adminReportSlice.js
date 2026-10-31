import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import adminReportApi from "../../api/adminReportApi";

// =====================================================
// SALES REPORT
// =====================================================

export const fetchSalesReport = createAsyncThunk(
  "adminReports/fetchSalesReport",
  async (range = "30days", { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getSalesReport(range);

      if (!data?.success) {
        return rejectWithValue(data?.message || "Failed to load sales report");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load sales report",
      );
    }
  },
);

// =====================================================
// SALES TREND
// =====================================================

export const fetchSalesTrend = createAsyncThunk(
  "adminReports/fetchSalesTrend",
  async (range = "30days", { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getSalesTrend(range);

      if (!data?.success) {
        return rejectWithValue(data?.message || "Failed to load sales trend");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load sales trend",
      );
    }
  },
);

// =====================================================
// TOP PRODUCTS
// =====================================================

export const fetchTopProducts = createAsyncThunk(
  "adminReports/fetchTopProducts",
  async ({ range = "30days", limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getTopProducts(range, limit);

      if (!data?.success) {
        return rejectWithValue(data?.message || "Failed to load top products");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load top products",
      );
    }
  },
);

// =====================================================
// CATEGORY REPORT
// =====================================================

export const fetchCategoryReport = createAsyncThunk(
  "adminReports/fetchCategoryReport",
  async (range = "30days", { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getCategoryReport(range);

      if (!data?.success) {
        return rejectWithValue(
          data?.message || "Failed to load category report",
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load category report",
      );
    }
  },
);

// =====================================================
// CUSTOMER REPORT
// =====================================================

export const fetchCustomerReport = createAsyncThunk(
  "adminReports/fetchCustomerReport",
  async (range = "30days", { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getCustomerReport(range);

      if (!data?.success) {
        return rejectWithValue(
          data?.message || "Failed to load customer report",
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load customer report",
      );
    }
  },
);

// =====================================================
// PAYMENT REPORT
// =====================================================

export const fetchPaymentReport = createAsyncThunk(
  "adminReports/fetchPaymentReport",
  async (range = "30days", { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getPaymentReport(range);

      if (!data?.success) {
        return rejectWithValue(
          data?.message || "Failed to load payment report",
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load payment report",
      );
    }
  },
);

// =====================================================
// INVENTORY REPORT
// =====================================================

export const fetchInventoryReport = createAsyncThunk(
  "adminReports/fetchInventoryReport",
  async (status = "low_stock", { rejectWithValue }) => {
    try {
      const data = await adminReportApi.getInventoryReport(status);

      if (!data?.success) {
        return rejectWithValue(
          data?.message || "Failed to load inventory report",
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to load inventory report",
      );
    }
  },
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // Sales
  sales: null,
  salesRange: "30days",
  salesLoading: false,
  salesError: null,

  // Sales trend
  salesTrend: [],
  salesTrendRange: "30days",
  salesTrendLoading: false,
  salesTrendError: null,

  // Top products
  topProducts: [],
  topProductsRange: "30days",
  topProductsLoading: false,
  topProductsError: null,

  // Categories
  categories: [],
  categoryRange: "30days",
  categoryLoading: false,
  categoryError: null,

  // Customers
  customerOverview: null,
  customers: [],
  customerRange: "30days",
  customerLoading: false,
  customerError: null,

  // Payments
  paymentOverview: null,
  paymentMethods: [],
  paymentRange: "30days",
  paymentLoading: false,
  paymentError: null,

  // Inventory
  inventoryOverview: null,
  lowStockProducts: [],
  inventoryCategories: [],
  inventoryStatus: "low_stock",
  inventoryLoading: false,
  inventoryError: null,
};

// =====================================================
// SLICE
// =====================================================

const adminReportSlice = createSlice({
  name: "adminReports",

  initialState,

  reducers: {
    clearReportErrors: (state) => {
      state.salesError = null;
      state.salesTrendError = null;
      state.topProductsError = null;
      state.categoryError = null;
      state.customerError = null;
      state.paymentError = null;
      state.inventoryError = null;
    },

    clearReports: () => initialState,
  },

  extraReducers: (builder) => {
    // =================================================
    // SALES
    // =================================================

    builder
      .addCase(fetchSalesReport.pending, (state) => {
        state.salesLoading = true;
        state.salesError = null;
      })

      .addCase(fetchSalesReport.fulfilled, (state, action) => {
        state.salesLoading = false;

        state.sales = action.payload?.overview || null;

        state.salesRange = action.payload?.range || "30days";
      })

      .addCase(fetchSalesReport.rejected, (state, action) => {
        state.salesLoading = false;

        state.salesError = action.payload || "Failed to load sales report";
      });

    // =================================================
    // SALES TREND
    // =================================================

    builder
      .addCase(fetchSalesTrend.pending, (state) => {
        state.salesTrendLoading = true;
        state.salesTrendError = null;
      })

      .addCase(fetchSalesTrend.fulfilled, (state, action) => {
        state.salesTrendLoading = false;

        state.salesTrend = Array.isArray(action.payload?.trend)
          ? action.payload.trend
          : [];

        state.salesTrendRange = action.payload?.range || "30days";
      })

      .addCase(fetchSalesTrend.rejected, (state, action) => {
        state.salesTrendLoading = false;

        state.salesTrendError = action.payload || "Failed to load sales trend";
      });
    // =================================================
    // TOP PRODUCTS
    // =================================================

    builder
      .addCase(fetchTopProducts.pending, (state) => {
        state.topProductsLoading = true;
        state.topProductsError = null;
      })

      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProductsLoading = false;

        state.topProducts = Array.isArray(action.payload?.products)
          ? action.payload.products
          : [];

        state.topProductsRange = action.payload?.range || "30days";
      })

      .addCase(fetchTopProducts.rejected, (state, action) => {
        state.topProductsLoading = false;

        state.topProductsError =
          action.payload || "Failed to load top products";
      });

    // =================================================
    // CATEGORIES
    // =================================================

    builder
      .addCase(fetchCategoryReport.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })

      .addCase(fetchCategoryReport.fulfilled, (state, action) => {
        state.categoryLoading = false;

        state.categories = Array.isArray(action.payload?.categories)
          ? action.payload.categories
          : [];

        state.categoryRange = action.payload?.range || "30days";
      })

      .addCase(fetchCategoryReport.rejected, (state, action) => {
        state.categoryLoading = false;

        state.categoryError =
          action.payload || "Failed to load category report";
      });

    // =================================================
    // CUSTOMERS
    // =================================================

    builder
      .addCase(fetchCustomerReport.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })

      .addCase(fetchCustomerReport.fulfilled, (state, action) => {
        state.customerLoading = false;

        state.customerOverview = action.payload?.overview || null;

        state.customers = Array.isArray(action.payload?.customers)
          ? action.payload.customers
          : [];

        state.customerRange = action.payload?.range || "30days";
      })

      .addCase(fetchCustomerReport.rejected, (state, action) => {
        state.customerLoading = false;

        state.customerError =
          action.payload || "Failed to load customer report";
      });

    // =================================================
    // PAYMENTS
    // =================================================

    builder
      .addCase(fetchPaymentReport.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
      })

      .addCase(fetchPaymentReport.fulfilled, (state, action) => {
        state.paymentLoading = false;

        state.paymentOverview = action.payload?.overview || null;

        state.paymentMethods = Array.isArray(action.payload?.methods)
          ? action.payload.methods
          : [];

        state.paymentRange = action.payload?.range || "30days";
      })

      .addCase(fetchPaymentReport.rejected, (state, action) => {
        state.paymentLoading = false;

        state.paymentError = action.payload || "Failed to load payment report";
      });

    // =================================================
    // INVENTORY
    // =================================================

    builder
      .addCase(fetchInventoryReport.pending, (state) => {
        state.inventoryLoading = true;
        state.inventoryError = null;
      })

      .addCase(fetchInventoryReport.fulfilled, (state, action) => {
        state.inventoryLoading = false;

        state.inventoryOverview = action.payload?.overview || null;
        state.lowStockProducts = Array.isArray(
          action.payload?.low_stock_products,
        )
          ? action.payload.low_stock_products
          : [];

        state.inventoryCategories = Array.isArray(
          action.payload?.category_breakdown,
        )
          ? action.payload.category_breakdown
          : [];

        state.inventoryStatus = action.meta.arg || "low_stock";
      })

      .addCase(fetchInventoryReport.rejected, (state, action) => {
        state.inventoryLoading = false;

        state.inventoryError =
          action.payload || "Failed to load inventory report";
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const { clearReportErrors, clearReports } = adminReportSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default adminReportSlice.reducer;
