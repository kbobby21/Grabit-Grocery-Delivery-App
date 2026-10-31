import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../api/axios";

/*
|--------------------------------------------------------------------------
| FETCH CUSTOMER AVAILABLE COUPONS
|--------------------------------------------------------------------------
*/

export const fetchAvailableCoupons = createAsyncThunk(
  "coupon/fetchAvailableCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/coupons/available");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to load coupons",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {
  coupons: [],

  loading: false,

  error: null,

  appliedCoupon: null,

  discount: 0,

  couponError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const couponSlice = createSlice({
  name: "coupon",

  initialState,

  reducers: {
    /*
    |--------------------------------------------------------------------------
    | APPLY COUPON
    |--------------------------------------------------------------------------
    */

    applyCoupon: (state, action) => {
      const { coupon, subtotal } = action.payload;

      if (!coupon) {
        state.couponError = "Invalid coupon";

        return;
      }

      const minimumOrder = Number(coupon.min_order || 0);

      if (Number(subtotal) < minimumOrder) {
        state.couponError = `Minimum order value is ₹${minimumOrder}`;

        state.appliedCoupon = null;
        state.discount = 0;

        return;
      }

      let discount = 0;

      if (coupon.type === "percentage") {
        discount = Math.round((Number(subtotal) * Number(coupon.value)) / 100);
      }

      if (coupon.type === "flat") {
        discount = Number(coupon.value);
      }

      // Don't allow discount
      // greater than subtotal
      discount = Math.min(discount, Number(subtotal));

      state.appliedCoupon = coupon;

      state.discount = discount;

      state.couponError = null;

      state.error = null;
    },

    /*
    |--------------------------------------------------------------------------
    | REMOVE COUPON
    |--------------------------------------------------------------------------
    */

    removeCoupon: (state) => {
      state.appliedCoupon = null;

      state.discount = 0;

      state.couponError = null;
    },

    /*
    |--------------------------------------------------------------------------
    | CLEAR ERROR
    |--------------------------------------------------------------------------
    */

    clearCouponError: (state) => {
      state.couponError = null;

      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /*
      |--------------------------------------------------------------------------
      | FETCH COUPONS
      |--------------------------------------------------------------------------
      */

      .addCase(fetchAvailableCoupons.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchAvailableCoupons.fulfilled, (state, action) => {
        state.loading = false;

        state.coupons = action.payload?.coupons || [];

        state.error = null;
      })

      .addCase(fetchAvailableCoupons.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Unable to load coupons";

        state.coupons = [];
      });
  },
});

export const { applyCoupon, removeCoupon, clearCouponError } =
  couponSlice.actions;

export default couponSlice.reducer;
