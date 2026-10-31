import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import adminPaymentApi from "../../api/adminPaymentApi";

// =====================================================
// FETCH PAYMENT OVERVIEW
// =====================================================

export const fetchPaymentOverview = createAsyncThunk(
  "adminPayment/fetchPaymentOverview",

  async (_, { rejectWithValue }) => {
    try {
      const data = await adminPaymentApi.getPaymentOverview();

      if (!data?.success) {
        return rejectWithValue(
          data?.message || "Failed to load payment overview",
        );
      }

      return data.overview;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load payment overview",
      );
    }
  },
);

// =====================================================
// FETCH PAYMENTS
// =====================================================

export const fetchAdminPayments = createAsyncThunk(
  "adminPayment/fetchAdminPayments",

  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await adminPaymentApi.getPayments(params);

      if (!data?.success) {
        return rejectWithValue(data?.message || "Failed to load payments");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load payments",
      );
    }
  },
);

// =====================================================
// FETCH PAYMENT DETAILS
// =====================================================

export const fetchPaymentDetails = createAsyncThunk(
  "adminPayment/fetchPaymentDetails",

  async (paymentId, { rejectWithValue }) => {
    try {
      if (!paymentId) {
        return rejectWithValue("Payment ID is required");
      }

      const data = await adminPaymentApi.getPaymentDetails(paymentId);

      if (!data?.success) {
        return rejectWithValue(
          data?.message || "Failed to load payment details",
        );
      }

      return data.payment;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load payment details",
      );
    }
  },
);

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // ---------------------------------------------------
  // OVERVIEW
  // ---------------------------------------------------

  overview: {
    total_transactions: 0,
    total_amount: "0.00",

    successful_transactions: 0,
    successful_amount: "0.00",

    pending_transactions: 0,
    pending_amount: "0.00",

    failed_transactions: 0,
    failed_amount: "0.00",

    cod_transactions: 0,
    cod_amount: "0.00",

    razorpay_transactions: 0,
    razorpay_amount: "0.00",
  },

  // ---------------------------------------------------
  // PAYMENT LIST
  // ---------------------------------------------------

  payments: [],

  // ---------------------------------------------------
  // PAYMENT DETAILS
  // ---------------------------------------------------

  paymentDetails: null,

  // ---------------------------------------------------
  // PAGINATION
  // ---------------------------------------------------

  pagination: {
    count: 0,
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  },

  // ---------------------------------------------------
  // LOADING
  // ---------------------------------------------------

  overviewLoading: false,

  loading: false,

  detailsLoading: false,

  // ---------------------------------------------------
  // ERRORS
  // ---------------------------------------------------

  overviewError: null,

  error: null,

  detailsError: null,
};

// =====================================================
// SLICE
// =====================================================

const adminPaymentSlice = createSlice({
  name: "adminPayment",

  initialState,

  reducers: {
    // -------------------------------------------------
    // CLEAR LIST ERROR
    // -------------------------------------------------

    clearPaymentError: (state) => {
      state.error = null;
    },

    // -------------------------------------------------
    // CLEAR OVERVIEW ERROR
    // -------------------------------------------------

    clearPaymentOverviewError: (state) => {
      state.overviewError = null;
    },

    // -------------------------------------------------
    // CLEAR DETAILS ERROR
    // -------------------------------------------------

    clearPaymentDetailsError: (state) => {
      state.detailsError = null;
    },

    // -------------------------------------------------
    // CLEAR PAYMENT DETAILS
    // -------------------------------------------------

    clearPaymentDetails: (state) => {
      state.paymentDetails = null;
      state.detailsError = null;
    },

    // -------------------------------------------------
    // RESET PAYMENT LIST
    // -------------------------------------------------

    resetPayments: (state) => {
      state.payments = [];

      state.pagination = {
        count: 0,
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 1,
      };
    },
  },

  extraReducers: (builder) => {
    // =================================================
    // PAYMENT OVERVIEW
    // =================================================

    builder

      .addCase(fetchPaymentOverview.pending, (state) => {
        state.overviewLoading = true;
        state.overviewError = null;
      })

      .addCase(fetchPaymentOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;

        state.overview = action.payload || state.overview;
      })

      .addCase(fetchPaymentOverview.rejected, (state, action) => {
        state.overviewLoading = false;

        state.overviewError =
          action.payload || "Failed to load payment overview";
      });

    // =================================================
    // PAYMENTS LIST
    // =================================================

    builder

      .addCase(fetchAdminPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload;

        state.payments = data?.payments || [];

        state.pagination = {
          count: data?.count || 0,

          total: data?.total || 0,

          page: data?.page || 1,

          limit: data?.limit || 20,

          totalPages: data?.totalPages || 1,
        };
      })

      .addCase(fetchAdminPayments.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to load payments";
      });

    // =================================================
    // PAYMENT DETAILS
    // =================================================

    builder

      .addCase(fetchPaymentDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })

      .addCase(fetchPaymentDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;

        state.paymentDetails = action.payload || null;
      })

      .addCase(fetchPaymentDetails.rejected, (state, action) => {
        state.detailsLoading = false;

        state.detailsError = action.payload || "Failed to load payment details";
      });
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  clearPaymentError,
  clearPaymentOverviewError,
  clearPaymentDetailsError,
  clearPaymentDetails,
  resetPayments,
} = adminPaymentSlice.actions;

// =====================================================
// SELECTORS
// =====================================================

export const selectPaymentOverview = (state) => state.adminPayment.overview;

export const selectAdminPayments = (state) => state.adminPayment.payments;

export const selectPaymentPagination = (state) => state.adminPayment.pagination;

export const selectPaymentDetails = (state) =>
  state.adminPayment.paymentDetails;

export const selectPaymentLoading = (state) => state.adminPayment.loading;

export const selectPaymentOverviewLoading = (state) =>
  state.adminPayment.overviewLoading;

export const selectPaymentDetailsLoading = (state) =>
  state.adminPayment.detailsLoading;

export const selectPaymentError = (state) => state.adminPayment.error;

export const selectPaymentOverviewError = (state) =>
  state.adminPayment.overviewError;

export const selectPaymentDetailsError = (state) =>
  state.adminPayment.detailsError;

// =====================================================
// REDUCER
// =====================================================

export default adminPaymentSlice.reducer;
