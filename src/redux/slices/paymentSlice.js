import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as paymentService from "../../services/payment.service";

export const createRazorpayOrder = createAsyncThunk(
  "payment/createOrder",
  async (data, thunkAPI) => {
    try {
      return await paymentService.createRazorpayOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to create payment order",
      );
    }
  },
);

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (data, thunkAPI) => {
    try {
      return await paymentService.verifyPayment(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Payment verification failed",
      );
    }
  },
);

export const cashOnDelivery = createAsyncThunk(
  "payment/cod",
  async (data, thunkAPI) => {
    try {
      return await paymentService.cashOnDelivery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to select COD",
      );
    }
  },
);

export const fetchPaymentHistory = createAsyncThunk(
  "payment/history",
  async (_, thunkAPI) => {
    try {
      return await paymentService.paymentHistory();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch history",
      );
    }
  },
);

export const fetchPaymentDetails = createAsyncThunk(
  "payment/details",
  async (id, thunkAPI) => {
    try {
      return await paymentService.paymentDetails(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch payment",
      );
    }
  },
);

const initialState = {
  currentOrder: null,

  currentPayment: null,

  payments: [],

  loading: false,

  success: false,

  error: null,
};

const paymentSlice = createSlice({
  name: "payment",

  initialState,

  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.currentOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentOrder = action.payload.order;
      })

      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cashOnDelivery.pending, (state) => {
        state.loading = true;
      })

      .addCase(cashOnDelivery.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(cashOnDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.payments;
      })

      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPaymentDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload.payment;
      })

      .addCase(fetchPaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;

export default paymentSlice.reducer;
