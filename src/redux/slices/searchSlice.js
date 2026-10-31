import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as searchService from "../../services/search.service";

export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, thunkAPI) => {
    try {
      return await searchService.searchProducts(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Search failed",
      );
    }
  },
);

const searchSlice = createSlice({
  name: "search",

  initialState: {
    query: "",
    products: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearSearch(state) {
      state.query = "";
      state.products = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
