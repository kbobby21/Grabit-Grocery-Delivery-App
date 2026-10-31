import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminCustomers,
  getAdminCustomerById,
  getAdminCustomerOrders,
  updateAdminCustomerStatus,
} from "../../api/adminCustomerApi";

/*
|--------------------------------------------------------------------------
| GET ALL CUSTOMERS
|--------------------------------------------------------------------------
*/
export const fetchAdminCustomers = createAsyncThunk(
  "adminCustomers/fetchAdminCustomers",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminCustomers();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch customers",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET SINGLE CUSTOMER
|--------------------------------------------------------------------------
*/
export const fetchAdminCustomerById = createAsyncThunk(
  "adminCustomers/fetchAdminCustomerById",
  async (customerId, { rejectWithValue }) => {
    try {
      return await getAdminCustomerById(customerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch customer",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET CUSTOMER ORDER HISTORY
|--------------------------------------------------------------------------
*/
export const fetchAdminCustomerOrders = createAsyncThunk(
  "adminCustomers/fetchAdminCustomerOrders",
  async (customerId, { rejectWithValue }) => {
    try {
      return await getAdminCustomerOrders(customerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch customer orders",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE CUSTOMER STATUS
|--------------------------------------------------------------------------
*/
export const editAdminCustomerStatus = createAsyncThunk(
  "adminCustomers/editAdminCustomerStatus",
  async ({ customerId, isVerified }, { rejectWithValue }) => {
    try {
      return await updateAdminCustomerStatus(customerId, isVerified);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update customer status",
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
  customers: [],
  selectedCustomer: null,
  customerOrders: [],

  loading: false,
  customerLoading: false,
  ordersLoading: false,
  updating: false,

  error: null,
  customerError: null,
  ordersError: null,
  updateError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/
const adminCustomerSlice = createSlice({
  name: "adminCustomers",

  initialState,

  reducers: {
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
      state.customerOrders = [];
      state.customerError = null;
      state.ordersError = null;
    },

    clearAdminCustomerErrors: (state) => {
      state.error = null;
      state.customerError = null;
      state.ordersError = null;
      state.updateError = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | GET ALL CUSTOMERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminCustomers.fulfilled, (state, action) => {
        state.loading = false;

        state.customers = action.payload?.customers || [];
      })

      .addCase(fetchAdminCustomers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch customers";
      });

    /*
    |--------------------------------------------------------------------------
    | GET SINGLE CUSTOMER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminCustomerById.pending, (state) => {
        state.customerLoading = true;
        state.customerError = null;
      })

      .addCase(fetchAdminCustomerById.fulfilled, (state, action) => {
        state.customerLoading = false;

        state.selectedCustomer = action.payload?.customer || null;
      })

      .addCase(fetchAdminCustomerById.rejected, (state, action) => {
        state.customerLoading = false;

        state.customerError = action.payload || "Failed to fetch customer";
      });

    /*
    |--------------------------------------------------------------------------
    | CUSTOMER ORDERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminCustomerOrders.pending, (state) => {
        state.ordersLoading = true;
        state.ordersError = null;
      })

      .addCase(fetchAdminCustomerOrders.fulfilled, (state, action) => {
        state.ordersLoading = false;

        state.customerOrders = action.payload?.orders || [];
      })

      .addCase(fetchAdminCustomerOrders.rejected, (state, action) => {
        state.ordersLoading = false;

        state.ordersError = action.payload || "Failed to fetch customer orders";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE CUSTOMER STATUS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(editAdminCustomerStatus.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })

      .addCase(editAdminCustomerStatus.fulfilled, (state, action) => {
        state.updating = false;

        const updatedCustomer = action.payload?.customer;

        if (!updatedCustomer) {
          return;
        }

        /*
        | Update selected customer
        */
        if (state.selectedCustomer?.id === updatedCustomer.id) {
          state.selectedCustomer = {
            ...state.selectedCustomer,
            ...updatedCustomer,
          };
        }

        /*
        | Update customer in list
        */
        const index = state.customers.findIndex(
          (customer) => customer.id === updatedCustomer.id,
        );

        if (index !== -1) {
          state.customers[index] = {
            ...state.customers[index],
            ...updatedCustomer,
          };
        }
      })

      .addCase(editAdminCustomerStatus.rejected, (state, action) => {
        state.updating = false;

        state.updateError =
          action.payload || "Failed to update customer status";
      });
  },
});

export const { clearSelectedCustomer, clearAdminCustomerErrors } =
  adminCustomerSlice.actions;

export default adminCustomerSlice.reducer;
