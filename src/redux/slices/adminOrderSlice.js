import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminOrders,
  getAdminOrderById,
  updateOrderStatus,
  getDeliveryPartners,
  assignDeliveryPartner,
  getOrderDelivery,
} from "../../api/adminOrderApi";

/*
|--------------------------------------------------------------------------
| GET ALL ADMIN ORDERS
|--------------------------------------------------------------------------
*/

export const fetchAdminOrders = createAsyncThunk(
  "adminOrders/fetchAdminOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminOrders();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch orders",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET SINGLE ADMIN ORDER
|--------------------------------------------------------------------------
*/

export const fetchAdminOrderById = createAsyncThunk(
  "adminOrders/fetchAdminOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getAdminOrderById(orderId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch order",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE ORDER STATUS
|--------------------------------------------------------------------------
*/

export const changeOrderStatus = createAsyncThunk(
  "adminOrders/changeOrderStatus",
  async ({ orderId, status, note }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatus(orderId, status, note);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update order status",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET DELIVERY PARTNERS
|--------------------------------------------------------------------------
*/

export const fetchDeliveryPartners = createAsyncThunk(
  "adminOrders/fetchDeliveryPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDeliveryPartners();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery partners",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| ASSIGN DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const assignPartner = createAsyncThunk(
  "adminOrders/assignPartner",
  async ({ orderId, deliveryPartnerId }, { rejectWithValue }) => {
    try {
      const response = await assignDeliveryPartner(orderId, deliveryPartnerId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to assign delivery partner",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET ORDER DELIVERY
|--------------------------------------------------------------------------
*/

export const fetchOrderDelivery = createAsyncThunk(
  "adminOrders/fetchOrderDelivery",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getOrderDelivery(orderId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery details",
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
  orders: [],
  selectedOrder: null,
  deliveryPartners: [],
  selectedDelivery: null,

  loading: false,
  orderLoading: false,
  deliveryLoading: false,
  assigning: false,
  updatingStatus: false,

  error: null,
  orderError: null,
  deliveryError: null,
  assignError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const adminOrderSlice = createSlice({
  name: "adminOrders",

  initialState,

  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
      state.selectedDelivery = null;
      state.orderError = null;
    },

    clearAdminOrderError: (state) => {
      state.error = null;
      state.orderError = null;
      state.deliveryError = null;
      state.assignError = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | FETCH ALL ORDERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload?.orders || [];
      })

      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch orders";
      });

    /*
    |--------------------------------------------------------------------------
    | FETCH SINGLE ORDER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminOrderById.pending, (state) => {
        state.orderLoading = true;
        state.orderError = null;
      })

      .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
        state.orderLoading = false;

        state.selectedOrder = action.payload?.order || null;
      })

      .addCase(fetchAdminOrderById.rejected, (state, action) => {
        state.orderLoading = false;

        state.orderError = action.payload || "Failed to fetch order";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE STATUS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(changeOrderStatus.pending, (state) => {
        state.updatingStatus = true;
      })

      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.updatingStatus = false;

        const updatedOrder = action.payload?.order;

        if (updatedOrder) {
          const index = state.orders.findIndex(
            (order) => order.id === updatedOrder.id,
          );

          if (index !== -1) {
            state.orders[index] = {
              ...state.orders[index],
              ...updatedOrder,
            };
          }

          if (state.selectedOrder?.id === updatedOrder.id) {
            state.selectedOrder = {
              ...state.selectedOrder,
              ...updatedOrder,
            };
          }
        }
      })

      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.updatingStatus = false;

        state.error = action.payload || "Failed to update status";
      });

    /*
    |--------------------------------------------------------------------------
    | DELIVERY PARTNERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchDeliveryPartners.pending, (state) => {
        state.deliveryLoading = true;
        state.deliveryError = null;
      })

      .addCase(fetchDeliveryPartners.fulfilled, (state, action) => {
        state.deliveryLoading = false;

        state.deliveryPartners = action.payload?.delivery_partners || [];
      })

      .addCase(fetchDeliveryPartners.rejected, (state, action) => {
        state.deliveryLoading = false;

        state.deliveryError =
          action.payload || "Failed to fetch delivery partners";
      });

    /*
    |--------------------------------------------------------------------------
    | ASSIGN PARTNER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(assignPartner.pending, (state) => {
        state.assigning = true;
        state.assignError = null;
      })

      .addCase(assignPartner.fulfilled, (state, action) => {
        state.assigning = false;

        const delivery = action.payload?.delivery;

        if (delivery) {
          state.selectedDelivery = delivery;
        }
      })

      .addCase(assignPartner.rejected, (state, action) => {
        state.assigning = false;

        state.assignError =
          action.payload || "Failed to assign delivery partner";
      });

    /*
    |--------------------------------------------------------------------------
    | ORDER DELIVERY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchOrderDelivery.pending, (state) => {
        state.deliveryLoading = true;
        state.deliveryError = null;
      })

      .addCase(fetchOrderDelivery.fulfilled, (state, action) => {
        state.deliveryLoading = false;

        state.selectedDelivery = action.payload?.delivery || null;
      })

      .addCase(fetchOrderDelivery.rejected, (state, action) => {
        state.deliveryLoading = false;

        state.deliveryError =
          action.payload || "Failed to fetch delivery details";
      });
  },
});

export const { clearSelectedOrder, clearAdminOrderError } =
  adminOrderSlice.actions;

export default adminOrderSlice.reducer;
