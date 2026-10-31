import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;

      if (!state.selectedAddress && state.addresses.length > 0) {
        state.selectedAddress = state.addresses[0].id;
      }
    },

    addAddress: (state, action) => {
      state.addresses.unshift(action.payload);

      if (!state.selectedAddress) {
        state.selectedAddress = action.payload.id;
      }
    },

    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload,
      );

      if (state.selectedAddress === action.payload) {
        state.selectedAddress = state.addresses[0]?.id || null;
      }
    },

    clearAddresses: (state) => {
      state.addresses = [];
      state.selectedAddress = null;
    },
  },
});

export const {
  setAddresses,
  addAddress,
  selectAddress,
  removeAddress,
  clearAddresses,
} = addressSlice.actions;

export default addressSlice.reducer;
