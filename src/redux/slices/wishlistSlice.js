import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    toggleWishlist(state, action) {
      const product = action.payload;

      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id);
      } else {
        state.items.push(product);
      }
    },

    removeWishlist(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const { toggleWishlist, removeWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
