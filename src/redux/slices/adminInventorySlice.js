import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminInventory,
  getAdminInventoryOverview,
  getAdminLowStockInventory,
  getAdminOutOfStockInventory,
  getAdminInventoryByProductId,
  getAdminInventoryHistory,
  getAdminAllInventoryHistory,
  adjustAdminStock as adjustInventoryStockApi,
} from "../../api/adminInventoryApi";

/*
|--------------------------------------------------------------------------
| GET ALL INVENTORY
|--------------------------------------------------------------------------
*/

export const fetchAdminInventory = createAsyncThunk(
  "adminInventory/fetchAdminInventory",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getAdminInventory(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch inventory",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET INVENTORY OVERVIEW
|--------------------------------------------------------------------------
*/

export const fetchAdminInventoryOverview = createAsyncThunk(
  "adminInventory/fetchAdminInventoryOverview",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminInventoryOverview();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch inventory overview",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET LOW STOCK
|--------------------------------------------------------------------------
*/

export const fetchAdminLowStockInventory = createAsyncThunk(
  "adminInventory/fetchAdminLowStockInventory",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminLowStockInventory();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch low stock inventory",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET OUT OF STOCK
|--------------------------------------------------------------------------
*/

export const fetchAdminOutOfStockInventory = createAsyncThunk(
  "adminInventory/fetchAdminOutOfStockInventory",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminOutOfStockInventory();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch out of stock inventory",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT INVENTORY
|--------------------------------------------------------------------------
*/

export const fetchAdminInventoryByProductId = createAsyncThunk(
  "adminInventory/fetchAdminInventoryByProductId",
  async (productId, { rejectWithValue }) => {
    try {
      return await getAdminInventoryByProductId(productId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch product inventory",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET INVENTORY HISTORY
|--------------------------------------------------------------------------
*/

export const fetchAdminInventoryHistory = createAsyncThunk(
  "adminInventory/fetchAdminInventoryHistory",
  async ({ productId, params = {} }, { rejectWithValue }) => {
    try {
      return await getAdminInventoryHistory(productId, params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch inventory history",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| ADJUST STOCK
|--------------------------------------------------------------------------
*/

export const adjustAdminInventoryStock = createAsyncThunk(
  "adminInventory/adjustAdminInventoryStock",
  async (data, { rejectWithValue }) => {
    try {
      return await adjustInventoryStockApi(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to adjust stock",
      );
    }
  },
);

export const fetchAdminAllInventoryHistory = createAsyncThunk(
  "adminInventory/fetchAdminAllInventoryHistory",
  async (params = {}, { rejectWithValue }) => {
    try {
      return await getAdminAllInventoryHistory(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch inventory history",
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
  inventory: [],
  overview: null,
  lowStock: [],
  outOfStock: [],
  selectedInventory: null,
  history: [],

  pagination: null,
  historyPagination: null,

  loading: false,
  overviewLoading: false,
  lowStockLoading: false,
  outOfStockLoading: false,
  productLoading: false,
  historyLoading: false,
  adjusting: false,

  error: null,
  overviewError: null,
  lowStockError: null,
  outOfStockError: null,
  productError: null,
  historyError: null,
  adjustError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const adminInventorySlice = createSlice({
  name: "adminInventory",

  initialState,

  reducers: {
    clearSelectedInventory: (state) => {
      state.selectedInventory = null;
      state.productError = null;
    },

    clearInventoryHistory: (state) => {
      state.history = [];
      state.historyPagination = null;
      state.historyError = null;
    },

    clearAdminInventoryErrors: (state) => {
      state.error = null;
      state.overviewError = null;
      state.lowStockError = null;
      state.outOfStockError = null;
      state.productError = null;
      state.historyError = null;
      state.adjustError = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | GET ALL INVENTORY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminInventory.fulfilled, (state, action) => {
        state.loading = false;

        state.inventory = action.payload?.inventory || [];

        state.pagination = action.payload?.pagination || null;
      })

      .addCase(fetchAdminInventory.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch inventory";
      });

    /*
    |--------------------------------------------------------------------------
    | INVENTORY OVERVIEW
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminInventoryOverview.pending, (state) => {
        state.overviewLoading = true;
        state.overviewError = null;
      })

      .addCase(fetchAdminInventoryOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;

        state.overview = action.payload?.overview || null;
      })

      .addCase(fetchAdminInventoryOverview.rejected, (state, action) => {
        state.overviewLoading = false;

        state.overviewError =
          action.payload || "Failed to fetch inventory overview";
      });

    /*
    |--------------------------------------------------------------------------
    | LOW STOCK
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminLowStockInventory.pending, (state) => {
        state.lowStockLoading = true;
        state.lowStockError = null;
      })

      .addCase(fetchAdminLowStockInventory.fulfilled, (state, action) => {
        state.lowStockLoading = false;

        state.lowStock = action.payload?.inventory || [];
      })

      .addCase(fetchAdminLowStockInventory.rejected, (state, action) => {
        state.lowStockLoading = false;

        state.lowStockError =
          action.payload || "Failed to fetch low stock inventory";
      });

    /*
    |--------------------------------------------------------------------------
    | OUT OF STOCK
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminOutOfStockInventory.pending, (state) => {
        state.outOfStockLoading = true;
        state.outOfStockError = null;
      })

      .addCase(fetchAdminOutOfStockInventory.fulfilled, (state, action) => {
        state.outOfStockLoading = false;

        state.outOfStock = action.payload?.inventory || [];
      })

      .addCase(fetchAdminOutOfStockInventory.rejected, (state, action) => {
        state.outOfStockLoading = false;

        state.outOfStockError =
          action.payload || "Failed to fetch out of stock inventory";
      });

    /*
    |--------------------------------------------------------------------------
    | SINGLE PRODUCT INVENTORY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminInventoryByProductId.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })

      .addCase(fetchAdminInventoryByProductId.fulfilled, (state, action) => {
        state.productLoading = false;

        state.selectedInventory = action.payload?.inventory || null;
      })

      .addCase(fetchAdminInventoryByProductId.rejected, (state, action) => {
        state.productLoading = false;

        state.productError =
          action.payload || "Failed to fetch product inventory";
      });

    /*
    |--------------------------------------------------------------------------
    | INVENTORY HISTORY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminInventoryHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })

      .addCase(fetchAdminInventoryHistory.fulfilled, (state, action) => {
        state.historyLoading = false;

        state.history = action.payload?.history || [];

        state.historyPagination = action.payload?.pagination || null;
      })

      .addCase(fetchAdminInventoryHistory.rejected, (state, action) => {
        state.historyLoading = false;

        state.historyError =
          action.payload || "Failed to fetch inventory history";
      })
      .addCase(fetchAdminAllInventoryHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })

      .addCase(fetchAdminAllInventoryHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.history = action.payload?.history || [];
        state.historyPagination = action.payload?.pagination || null;
      })

      .addCase(fetchAdminAllInventoryHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError =
          action.payload || "Failed to fetch inventory history";
      });

    /*
    |--------------------------------------------------------------------------
    | ADJUST STOCK
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(adjustAdminInventoryStock.pending, (state) => {
        state.adjusting = true;
        state.adjustError = null;
      })

      .addCase(adjustAdminInventoryStock.fulfilled, (state, action) => {
        state.adjusting = false;

        const updatedInventory = action.payload?.inventory;

        if (!updatedInventory) {
          return;
        }

        state.selectedInventory = updatedInventory;

        const index = state.inventory.findIndex(
          (item) => item.product_id === updatedInventory.product_id,
        );

        if (index !== -1) {
          state.inventory[index] = {
            ...state.inventory[index],
            ...updatedInventory,
          };
        }

        const lowStockIndex = state.lowStock.findIndex(
          (item) => item.product_id === updatedInventory.product_id,
        );

        if (updatedInventory.status === "low_stock") {
          if (lowStockIndex !== -1) {
            state.lowStock[lowStockIndex] = {
              ...state.lowStock[lowStockIndex],
              ...updatedInventory,
            };
          } else {
            state.lowStock.push(updatedInventory);
          }
        } else if (lowStockIndex !== -1) {
          state.lowStock.splice(lowStockIndex, 1);
        }

        const outOfStockIndex = state.outOfStock.findIndex(
          (item) => item.product_id === updatedInventory.product_id,
        );

        if (updatedInventory.status === "out_of_stock") {
          if (outOfStockIndex !== -1) {
            state.outOfStock[outOfStockIndex] = {
              ...state.outOfStock[outOfStockIndex],
              ...updatedInventory,
            };
          } else {
            state.outOfStock.push(updatedInventory);
          }
        } else if (outOfStockIndex !== -1) {
          state.outOfStock.splice(outOfStockIndex, 1);
        }
      })

      .addCase(adjustAdminInventoryStock.rejected, (state, action) => {
        state.adjusting = false;

        state.adjustError = action.payload || "Failed to adjust stock";
      });
  },
});

export const {
  clearSelectedInventory,
  clearInventoryHistory,
  clearAdminInventoryErrors,
} = adminInventorySlice.actions;

export default adminInventorySlice.reducer;
