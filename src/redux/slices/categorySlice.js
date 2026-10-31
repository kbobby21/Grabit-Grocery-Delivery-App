import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryService from "../../services/category.service";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load categories",
      );
    }
  },
);

export const fetchCategoryProducts = createAsyncThunk(
  "category/fetchCategoryProducts",
  async (id, thunkAPI) => {
    try {
      return await categoryService.getCategoryProducts(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load products",
      );
    }
  },
);

const categorySlice = createSlice({
  name: "category",

  initialState: {
    categories: [],
    loading: false,
    error: null,

    selectedCategoryProducts: [],
    loadingProducts: false,
    productError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Category Products
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loadingProducts = true;
        state.productError = null;
      })

      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.selectedCategoryProducts = action.payload;
      })

      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.productError = action.payload;
      });
  },
});

export default categorySlice.reducer;
