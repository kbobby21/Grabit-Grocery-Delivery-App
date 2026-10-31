import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminCouponApi from "../../api/adminCouponApi";

/* GET ALL COUPONS */
export const fetchAdminCoupons = createAsyncThunk(
  "adminCoupon/fetchCoupons",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await AdminCouponApi.getCoupons(params);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to fetch coupons");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch coupons",
      );
    }
  },
);

/* GET COUPON BY ID */
export const fetchAdminCouponById = createAsyncThunk(
  "adminCoupon/fetchCouponById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await AdminCouponApi.getCouponById(id);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to fetch coupon");
      }

      return data.coupon;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch coupon",
      );
    }
  },
);

/* CREATE COUPON */
export const createAdminCoupon = createAsyncThunk(
  "adminCoupon/createCoupon",
  async (couponData, { rejectWithValue }) => {
    try {
      const data = await AdminCouponApi.createCoupon(couponData);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to create coupon");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create coupon",
      );
    }
  },
);

/* UPDATE COUPON */
export const updateAdminCoupon = createAsyncThunk(
  "adminCoupon/updateCoupon",
  async ({ id, data: couponData }, { rejectWithValue }) => {
    try {
      const data = await AdminCouponApi.updateCoupon(id, couponData);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to update coupon");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update coupon",
      );
    }
  },
);

/* UPDATE STATUS */
export const updateAdminCouponStatus = createAsyncThunk(
  "adminCoupon/updateStatus",
  async ({ id, active }, { rejectWithValue }) => {
    try {
      const data = await AdminCouponApi.updateCouponStatus(id, active);

      if (!data.success) {
        return rejectWithValue(
          data.message || "Failed to update coupon status",
        );
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update coupon status",
      );
    }
  },
);

/* DELETE COUPON */
export const deleteAdminCoupon = createAsyncThunk(
  "adminCoupon/deleteCoupon",
  async (id, { rejectWithValue }) => {
    try {
      const data = await AdminCouponApi.deleteCoupon(id);

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to delete coupon");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete coupon",
      );
    }
  },
);

const initialState = {
  coupons: [],
  coupon: null,

  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },

  loading: false,
  detailLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,

  statusUpdatingId: null,
  deletingId: null,

  error: null,
  successMessage: null,
};

const adminCouponSlice = createSlice({
  name: "adminCoupon",

  initialState,

  reducers: {
    clearCouponError: (state) => {
      state.error = null;
    },

    clearCouponMessage: (state) => {
      state.successMessage = null;
    },

    clearSelectedCoupon: (state) => {
      state.coupon = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* GET ALL */
      .addCase(fetchAdminCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminCoupons.fulfilled, (state, action) => {
        state.loading = false;

        state.coupons = action.payload.coupons || [];

        state.pagination = {
          page: action.payload.page || 1,
          limit: action.payload.limit || 20,
          total: action.payload.total || 0,
          totalPages: action.payload.totalPages || 0,
        };
      })

      .addCase(fetchAdminCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons";
      })

      /* GET BY ID */
      .addCase(fetchAdminCouponById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })

      .addCase(fetchAdminCouponById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.coupon = action.payload;
      })

      .addCase(fetchAdminCouponById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload || "Failed to fetch coupon";
      })

      /* CREATE */
      .addCase(createAdminCoupon.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(createAdminCoupon.fulfilled, (state, action) => {
        state.createLoading = false;

        state.successMessage =
          action.payload.message || "Coupon created successfully";

        if (action.payload.coupon) {
          state.coupons.unshift(action.payload.coupon);
          state.pagination.total += 1;
        }
      })

      .addCase(createAdminCoupon.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload || "Failed to create coupon";
      })

      /* UPDATE */
      .addCase(updateAdminCoupon.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(updateAdminCoupon.fulfilled, (state, action) => {
        state.updateLoading = false;

        state.successMessage =
          action.payload.message || "Coupon updated successfully";

        const updatedCoupon = action.payload.coupon;

        if (updatedCoupon) {
          const index = state.coupons.findIndex(
            (coupon) => coupon.id === updatedCoupon.id,
          );

          if (index !== -1) {
            state.coupons[index] = updatedCoupon;
          }

          if (state.coupon?.id === updatedCoupon.id) {
            state.coupon = updatedCoupon;
          }
        }
      })

      .addCase(updateAdminCoupon.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload || "Failed to update coupon";
      })

      /* STATUS */
      .addCase(updateAdminCouponStatus.pending, (state, action) => {
        state.updateLoading = true;
        state.statusUpdatingId = action.meta.arg.id;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(updateAdminCouponStatus.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.statusUpdatingId = null;

        state.successMessage =
          action.payload.message || "Coupon status updated successfully";

        const updatedCoupon = action.payload.coupon;

        if (updatedCoupon) {
          const index = state.coupons.findIndex(
            (coupon) => coupon.id === updatedCoupon.id,
          );

          if (index !== -1) {
            state.coupons[index] = updatedCoupon;
          }

          if (state.coupon?.id === updatedCoupon.id) {
            state.coupon = updatedCoupon;
          }
        }
      })

      .addCase(updateAdminCouponStatus.rejected, (state, action) => {
        state.updateLoading = false;
        state.statusUpdatingId = null;
        state.error = action.payload || "Failed to update coupon";
      })

      /* DELETE */
      .addCase(deleteAdminCoupon.pending, (state, action) => {
        state.deleteLoading = true;
        state.deletingId = action.meta.arg;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(deleteAdminCoupon.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deletingId = null;

        state.successMessage =
          action.payload.message || "Coupon deleted successfully";

        const deletedId = action.payload.coupon?.id;

        if (deletedId) {
          state.coupons = state.coupons.filter(
            (coupon) => coupon.id !== deletedId,
          );

          state.pagination.total = Math.max(0, state.pagination.total - 1);
        }
      })

      .addCase(deleteAdminCoupon.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deletingId = null;

        state.error = action.payload || "Failed to delete coupon";
      });
  },
});

export const { clearCouponError, clearCouponMessage, clearSelectedCoupon } =
  adminCouponSlice.actions;

export default adminCouponSlice.reducer;
