import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAvailableDeliveryPartners,
  getAllDeliveryPartners,
  getDeliveryPartner,
  getDeliveryPartnerOrders,
  createDeliveryPartner,
  updateDeliveryPartner,
  updateDeliveryPartnerStatus,
  assignDeliveryPartner,
  getOrderDelivery,
  updateDeliveryStatus,
  getDeliveryHistory,
  addDeliveryPartnerBankDetails,
  getDeliveryPartnerBankDetails,
  updateDeliveryPartnerBankDetails,
} from "../../api/adminDeliveryApi";

/*
|--------------------------------------------------------------------------
| GET AVAILABLE DELIVERY PARTNERS
|--------------------------------------------------------------------------
*/

export const fetchAvailableDeliveryPartners = createAsyncThunk(
  "adminDelivery/fetchAvailableDeliveryPartners",
  async (_, { rejectWithValue }) => {
    try {
      return await getAvailableDeliveryPartners();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch available delivery partners",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET ALL DELIVERY PARTNERS
|--------------------------------------------------------------------------
*/

export const fetchAllDeliveryPartners = createAsyncThunk(
  "adminDelivery/fetchAllDeliveryPartners",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllDeliveryPartners();
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
| GET DELIVERY PARTNER BY ID
|--------------------------------------------------------------------------
*/

export const fetchDeliveryPartner = createAsyncThunk(
  "adminDelivery/fetchDeliveryPartner",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await getDeliveryPartner(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery partner",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET PARTNER ORDERS
|--------------------------------------------------------------------------
*/

export const fetchDeliveryPartnerOrders = createAsyncThunk(
  "adminDelivery/fetchDeliveryPartnerOrders",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await getDeliveryPartnerOrders(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch partner orders",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| CREATE DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const createAdminDeliveryPartner = createAsyncThunk(
  "adminDelivery/createDeliveryPartner",
  async (data, { rejectWithValue }) => {
    try {
      return await createDeliveryPartner(data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create delivery partner",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const updateAdminDeliveryPartner = createAsyncThunk(
  "adminDelivery/updateDeliveryPartner",
  async ({ partnerId, data }, { rejectWithValue }) => {
    try {
      return await updateDeliveryPartner(partnerId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update delivery partner",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY PARTNER STATUS
|--------------------------------------------------------------------------
*/

export const updateAdminDeliveryPartnerStatus = createAsyncThunk(
  "adminDelivery/updateDeliveryPartnerStatus",
  async ({ partnerId, data }, { rejectWithValue }) => {
    try {
      return await updateDeliveryPartnerStatus(partnerId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update delivery partner status",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| ASSIGN DELIVERY PARTNER
|--------------------------------------------------------------------------
*/

export const assignAdminDeliveryPartner = createAsyncThunk(
  "adminDelivery/assignDeliveryPartner",
  async (data, { rejectWithValue }) => {
    try {
      return await assignDeliveryPartner(data);
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
  "adminDelivery/fetchOrderDelivery",
  async (orderId, { rejectWithValue }) => {
    try {
      return await getOrderDelivery(orderId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch order delivery",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE DELIVERY STATUS
|--------------------------------------------------------------------------
*/

export const updateAdminDeliveryStatus = createAsyncThunk(
  "adminDelivery/updateDeliveryStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      return await updateDeliveryStatus(orderId, status);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update delivery status",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET DELIVERY HISTORY
|--------------------------------------------------------------------------
*/

export const fetchAdminDeliveryHistory = createAsyncThunk(
  "adminDelivery/fetchDeliveryHistory",
  async (_, { rejectWithValue }) => {
    try {
      return await getDeliveryHistory();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery history",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| ADD BANK DETAILS
|--------------------------------------------------------------------------
*/

export const addAdminDeliveryPartnerBankDetails = createAsyncThunk(
  "adminDelivery/addBankDetails",
  async ({ partnerId, data }, { rejectWithValue }) => {
    try {
      return await addDeliveryPartnerBankDetails(partnerId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to add bank details",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET BANK DETAILS
|--------------------------------------------------------------------------
*/

export const fetchAdminDeliveryPartnerBankDetails = createAsyncThunk(
  "adminDelivery/fetchBankDetails",
  async (partnerId, { rejectWithValue }) => {
    try {
      return await getDeliveryPartnerBankDetails(partnerId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch bank details",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE BANK DETAILS
|--------------------------------------------------------------------------
*/

export const updateAdminDeliveryPartnerBankDetails = createAsyncThunk(
  "adminDelivery/updateBankDetails",
  async ({ partnerId, data }, { rejectWithValue }) => {
    try {
      return await updateDeliveryPartnerBankDetails(partnerId, data);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update bank details",
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
  /*
  |--------------------------------------------------------------------------
  | PARTNERS
  |--------------------------------------------------------------------------
  */

  partners: [],
  availablePartners: [],
  selectedPartner: null,

  /*
  |--------------------------------------------------------------------------
  | PARTNER ORDERS
  |--------------------------------------------------------------------------
  */

  partnerOrders: [],

  /*
  |--------------------------------------------------------------------------
  | ORDER DELIVERY
  |--------------------------------------------------------------------------
  */

  selectedOrderDelivery: null,

  /*
  |--------------------------------------------------------------------------
  | DELIVERY HISTORY
  |--------------------------------------------------------------------------
  */

  deliveryHistory: [],

  /*
  |--------------------------------------------------------------------------
  | BANK DETAILS
  |--------------------------------------------------------------------------
  */

  bankDetails: null,

  /*
  |--------------------------------------------------------------------------
  | LOADING STATES
  |--------------------------------------------------------------------------
  */

  loading: false,
  availableLoading: false,
  partnerLoading: false,
  partnerOrdersLoading: false,
  createLoading: false,
  updateLoading: false,
  statusLoading: false,
  assignLoading: false,
  orderDeliveryLoading: false,
  deliveryStatusLoading: false,
  historyLoading: false,
  bankLoading: false,
  bankSaving: false,

  /*
  |--------------------------------------------------------------------------
  | ERRORS
  |--------------------------------------------------------------------------
  */

  error: null,
  availableError: null,
  partnerError: null,
  partnerOrdersError: null,
  createError: null,
  updateError: null,
  statusError: null,
  assignError: null,
  orderDeliveryError: null,
  deliveryStatusError: null,
  historyError: null,
  bankError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const adminDeliverySlice = createSlice({
  name: "adminDelivery",

  initialState,

  reducers: {
    /*
    |--------------------------------------------------------------------------
    | CLEAR SELECTED PARTNER
    |--------------------------------------------------------------------------
    */

    clearSelectedPartner: (state) => {
      state.selectedPartner = null;
      state.partnerOrders = [];
      state.partnerOrdersError = null;
      state.partnerError = null;
    },

    /*
    |--------------------------------------------------------------------------
    | CLEAR ORDER DELIVERY
    |--------------------------------------------------------------------------
    */

    clearOrderDelivery: (state) => {
      state.selectedOrderDelivery = null;
      state.orderDeliveryError = null;
    },

    /*
    |--------------------------------------------------------------------------
    | CLEAR BANK DETAILS
    |--------------------------------------------------------------------------
    */

    clearBankDetails: (state) => {
      state.bankDetails = null;
      state.bankError = null;
    },

    /*
    |--------------------------------------------------------------------------
    | CLEAR ALL ERRORS
    |--------------------------------------------------------------------------
    */

    clearAdminDeliveryErrors: (state) => {
      state.error = null;
      state.availableError = null;
      state.partnerError = null;
      state.partnerOrdersError = null;
      state.createError = null;
      state.updateError = null;
      state.statusError = null;
      state.assignError = null;
      state.orderDeliveryError = null;
      state.deliveryStatusError = null;
      state.historyError = null;
      state.bankError = null;
    },
  },

  /*
  |--------------------------------------------------------------------------
  | EXTRA REDUCERS
  |--------------------------------------------------------------------------
  */

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | GET AVAILABLE PARTNERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAvailableDeliveryPartners.pending, (state) => {
        state.availableLoading = true;
        state.availableError = null;
      })

      .addCase(fetchAvailableDeliveryPartners.fulfilled, (state, action) => {
        state.availableLoading = false;

        state.availablePartners = action.payload?.delivery_partners || [];
      })

      .addCase(fetchAvailableDeliveryPartners.rejected, (state, action) => {
        state.availableLoading = false;

        state.availableError =
          action.payload || "Failed to fetch available delivery partners";
      });

    /*
    |--------------------------------------------------------------------------
    | GET ALL PARTNERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAllDeliveryPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAllDeliveryPartners.fulfilled, (state, action) => {
        state.loading = false;

        state.partners = action.payload?.delivery_partners || [];
      })

      .addCase(fetchAllDeliveryPartners.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch delivery partners";
      });

    /*
    |--------------------------------------------------------------------------
    | GET SINGLE DELIVERY PARTNER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchDeliveryPartner.pending, (state) => {
        state.partnerLoading = true;
        state.partnerError = null;
        state.selectedPartner = null;
      })

      .addCase(fetchDeliveryPartner.fulfilled, (state, action) => {
        state.partnerLoading = false;

        state.selectedPartner = action.payload?.delivery_partner || null;
      })

      .addCase(fetchDeliveryPartner.rejected, (state, action) => {
        state.partnerLoading = false;

        state.partnerError =
          action.payload || "Failed to fetch delivery partner";

        state.selectedPartner = null;
      });

    /*
    |--------------------------------------------------------------------------
    | GET PARTNER ORDERS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchDeliveryPartnerOrders.pending, (state) => {
        state.partnerOrdersLoading = true;
        state.partnerOrdersError = null;
      })

      .addCase(fetchDeliveryPartnerOrders.fulfilled, (state, action) => {
        state.partnerOrdersLoading = false;

        state.partnerOrders = action.payload?.orders || [];
      })

      .addCase(fetchDeliveryPartnerOrders.rejected, (state, action) => {
        state.partnerOrdersLoading = false;

        state.partnerOrdersError =
          action.payload || "Failed to fetch partner orders";
      });

    /*
    |--------------------------------------------------------------------------
    | CREATE PARTNER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createAdminDeliveryPartner.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })

      .addCase(createAdminDeliveryPartner.fulfilled, (state, action) => {
        state.createLoading = false;

        const partner = action.payload?.delivery_partner;

        if (partner) {
          state.partners.unshift(partner);
        }
      })

      .addCase(createAdminDeliveryPartner.rejected, (state, action) => {
        state.createLoading = false;

        state.createError =
          action.payload || "Failed to create delivery partner";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE PARTNER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateAdminDeliveryPartner.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })

      .addCase(updateAdminDeliveryPartner.fulfilled, (state, action) => {
        state.updateLoading = false;

        const updatedPartner = action.payload?.delivery_partner;

        if (!updatedPartner) {
          return;
        }

        /*
          |--------------------------------------------------------------------------
          | Update partners list
          |--------------------------------------------------------------------------
          */

        const index = state.partners.findIndex(
          (partner) => partner.id === updatedPartner.id,
        );

        if (index !== -1) {
          state.partners[index] = {
            ...state.partners[index],
            ...updatedPartner,
          };
        }

        /*
          |--------------------------------------------------------------------------
          | Update selected partner
          |--------------------------------------------------------------------------
          */

        state.selectedPartner = {
          ...state.selectedPartner,
          ...updatedPartner,
        };
      })

      .addCase(updateAdminDeliveryPartner.rejected, (state, action) => {
        state.updateLoading = false;

        state.updateError =
          action.payload || "Failed to update delivery partner";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE PARTNER STATUS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateAdminDeliveryPartnerStatus.pending, (state) => {
        state.statusLoading = true;
        state.statusError = null;
      })

      .addCase(updateAdminDeliveryPartnerStatus.fulfilled, (state, action) => {
        state.statusLoading = false;

        const updatedPartner = action.payload?.delivery_partner;

        if (!updatedPartner) {
          return;
        }

        /*
          |--------------------------------------------------------------------------
          | Update partner list
          |--------------------------------------------------------------------------
          */

        const index = state.partners.findIndex(
          (partner) => partner.id === updatedPartner.id,
        );

        if (index !== -1) {
          state.partners[index] = {
            ...state.partners[index],
            ...updatedPartner,
          };
        }

        /*
          |--------------------------------------------------------------------------
          | Update selected partner
          |--------------------------------------------------------------------------
          */

        if (state.selectedPartner) {
          state.selectedPartner = {
            ...state.selectedPartner,
            ...updatedPartner,
          };
        }

        /*
          |--------------------------------------------------------------------------
          | Update available partners
          |--------------------------------------------------------------------------
          */

        state.availablePartners = state.partners.filter(
          (partner) =>
            partner.is_active === true && partner.status === "available",
        );
      })

      .addCase(updateAdminDeliveryPartnerStatus.rejected, (state, action) => {
        state.statusLoading = false;

        state.statusError =
          action.payload || "Failed to update delivery partner status";
      });

    /*
    |--------------------------------------------------------------------------
    | ASSIGN PARTNER
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(assignAdminDeliveryPartner.pending, (state) => {
        state.assignLoading = true;
        state.assignError = null;
      })

      .addCase(assignAdminDeliveryPartner.fulfilled, (state, action) => {
        state.assignLoading = false;

        const delivery = action.payload?.delivery;

        if (delivery) {
          state.selectedOrderDelivery = delivery;
        }
      })

      .addCase(assignAdminDeliveryPartner.rejected, (state, action) => {
        state.assignLoading = false;

        state.assignError =
          action.payload || "Failed to assign delivery partner";
      });

    /*
    |--------------------------------------------------------------------------
    | GET ORDER DELIVERY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchOrderDelivery.pending, (state) => {
        state.orderDeliveryLoading = true;
        state.orderDeliveryError = null;
      })

      .addCase(fetchOrderDelivery.fulfilled, (state, action) => {
        state.orderDeliveryLoading = false;

        state.selectedOrderDelivery = action.payload?.delivery || null;
      })

      .addCase(fetchOrderDelivery.rejected, (state, action) => {
        state.orderDeliveryLoading = false;

        state.orderDeliveryError =
          action.payload || "Failed to fetch order delivery";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE DELIVERY STATUS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateAdminDeliveryStatus.pending, (state) => {
        state.deliveryStatusLoading = true;
        state.deliveryStatusError = null;
      })

      .addCase(updateAdminDeliveryStatus.fulfilled, (state, action) => {
        state.deliveryStatusLoading = false;

        const delivery = action.payload?.delivery;

        if (delivery) {
          state.selectedOrderDelivery = {
            ...state.selectedOrderDelivery,
            ...delivery,
          };
        }
      })

      .addCase(updateAdminDeliveryStatus.rejected, (state, action) => {
        state.deliveryStatusLoading = false;

        state.deliveryStatusError =
          action.payload || "Failed to update delivery status";
      });

    /*
    |--------------------------------------------------------------------------
    | DELIVERY HISTORY
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminDeliveryHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })

      .addCase(fetchAdminDeliveryHistory.fulfilled, (state, action) => {
        state.historyLoading = false;

        state.deliveryHistory = action.payload?.deliveries || [];
      })

      .addCase(fetchAdminDeliveryHistory.rejected, (state, action) => {
        state.historyLoading = false;

        state.historyError =
          action.payload || "Failed to fetch delivery history";
      });

    /*
    |--------------------------------------------------------------------------
    | ADD BANK DETAILS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(addAdminDeliveryPartnerBankDetails.pending, (state) => {
        state.bankSaving = true;
        state.bankError = null;
      })

      .addCase(
        addAdminDeliveryPartnerBankDetails.fulfilled,
        (state, action) => {
          state.bankSaving = false;

          state.bankDetails = action.payload?.bank_details || null;
        },
      )

      .addCase(addAdminDeliveryPartnerBankDetails.rejected, (state, action) => {
        state.bankSaving = false;

        state.bankError = action.payload || "Failed to add bank details";
      });

    /*
    |--------------------------------------------------------------------------
    | GET BANK DETAILS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminDeliveryPartnerBankDetails.pending, (state) => {
        state.bankLoading = true;
        state.bankError = null;
      })

      .addCase(
        fetchAdminDeliveryPartnerBankDetails.fulfilled,
        (state, action) => {
          state.bankLoading = false;

          state.bankDetails = action.payload?.bank_details || null;
        },
      )

      .addCase(
        fetchAdminDeliveryPartnerBankDetails.rejected,
        (state, action) => {
          state.bankLoading = false;

          state.bankError = action.payload || "Failed to fetch bank details";
        },
      );

    /*
    |--------------------------------------------------------------------------
    | UPDATE BANK DETAILS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateAdminDeliveryPartnerBankDetails.pending, (state) => {
        state.bankSaving = true;
        state.bankError = null;
      })

      .addCase(
        updateAdminDeliveryPartnerBankDetails.fulfilled,
        (state, action) => {
          state.bankSaving = false;

          state.bankDetails = action.payload?.bank_details || null;
        },
      )

      .addCase(
        updateAdminDeliveryPartnerBankDetails.rejected,
        (state, action) => {
          state.bankSaving = false;

          state.bankError = action.payload || "Failed to update bank details";
        },
      );
  },
});

/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

export const {
  clearSelectedPartner,
  clearOrderDelivery,
  clearBankDetails,
  clearAdminDeliveryErrors,
} = adminDeliverySlice.actions;

/*
|--------------------------------------------------------------------------
| REDUCER
|--------------------------------------------------------------------------
*/

export default adminDeliverySlice.reducer;
