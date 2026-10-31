import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminProducts,
  getAdminProductById,
  createAdminProduct,
  uploadAdminProductImage,
  updateAdminProduct,
  deleteAdminProduct,
} from "../../api/adminProductApi";

/*
|--------------------------------------------------------------------------
| GET ALL PRODUCTS
|--------------------------------------------------------------------------
*/

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAdminProducts();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| GET SINGLE PRODUCT
|--------------------------------------------------------------------------
*/

export const fetchAdminProductById = createAsyncThunk(
  "adminProducts/fetchAdminProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getAdminProductById(productId);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch product",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| CREATE PRODUCT
|--------------------------------------------------------------------------
*/

export const addAdminProduct = createAsyncThunk(
  "adminProducts/addAdminProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await createAdminProduct(productData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create product",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPLOAD PRODUCT IMAGE
|--------------------------------------------------------------------------
*/

export const uploadProductImage = createAsyncThunk(
  "adminProducts/uploadProductImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadAdminProductImage(formData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload product image",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| UPDATE PRODUCT
|--------------------------------------------------------------------------
*/

export const editAdminProduct = createAsyncThunk(
  "adminProducts/editAdminProduct",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await updateAdminProduct(productId, productData);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update product",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| DELETE PRODUCT
|--------------------------------------------------------------------------
*/

export const removeAdminProduct = createAsyncThunk(
  "adminProducts/removeAdminProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await deleteAdminProduct(productId);

      return {
        productId,
        response,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete product",
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
  products: [],
  selectedProduct: null,

  loading: false,
  productLoading: false,
  creating: false,
  uploading: false,
  updating: false,
  deleting: false,

  error: null,
  productError: null,
  createError: null,
  uploadError: null,
  updateError: null,
  deleteError: null,
};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState,

  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.productError = null;
    },

    clearAdminProductErrors: (state) => {
      state.error = null;
      state.productError = null;
      state.createError = null;
      state.uploadError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    /*
    |--------------------------------------------------------------------------
    | GET ALL PRODUCTS
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload?.products || [];
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch products";
      });

    /*
    |--------------------------------------------------------------------------
    | GET SINGLE PRODUCT
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchAdminProductById.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })

      .addCase(fetchAdminProductById.fulfilled, (state, action) => {
        state.productLoading = false;

        state.selectedProduct =
          action.payload?.product || action.payload?.data || null;
      })

      .addCase(fetchAdminProductById.rejected, (state, action) => {
        state.productLoading = false;

        state.productError = action.payload || "Failed to fetch product";
      });

    /*
    |--------------------------------------------------------------------------
    | CREATE PRODUCT
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(addAdminProduct.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })

      .addCase(addAdminProduct.fulfilled, (state, action) => {
        state.creating = false;

        const product = action.payload?.product;

        if (product) {
          state.products.unshift(product);
        }
      })

      .addCase(addAdminProduct.rejected, (state, action) => {
        state.creating = false;

        state.createError = action.payload || "Failed to create product";
      });

    /*
    |--------------------------------------------------------------------------
    | UPLOAD IMAGE
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(uploadProductImage.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })

      .addCase(uploadProductImage.fulfilled, (state) => {
        state.uploading = false;
      })

      .addCase(uploadProductImage.rejected, (state, action) => {
        state.uploading = false;

        state.uploadError = action.payload || "Failed to upload product image";
      });

    /*
    |--------------------------------------------------------------------------
    | UPDATE PRODUCT
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(editAdminProduct.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })

      .addCase(editAdminProduct.fulfilled, (state, action) => {
        state.updating = false;

        const updatedProduct = action.payload?.product;

        if (!updatedProduct) {
          return;
        }

        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id,
        );

        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...updatedProduct,
          };
        }

        if (state.selectedProduct?.id === updatedProduct.id) {
          state.selectedProduct = {
            ...state.selectedProduct,
            ...updatedProduct,
          };
        }
      })

      .addCase(editAdminProduct.rejected, (state, action) => {
        state.updating = false;

        state.updateError = action.payload || "Failed to update product";
      });

    /*
    |--------------------------------------------------------------------------
    | DELETE PRODUCT
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(removeAdminProduct.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })

      .addCase(removeAdminProduct.fulfilled, (state, action) => {
        state.deleting = false;

        state.products = state.products.filter(
          (product) => product.id !== action.payload.productId,
        );

        if (state.selectedProduct?.id === action.payload.productId) {
          state.selectedProduct = null;
        }
      })

      .addCase(removeAdminProduct.rejected, (state, action) => {
        state.deleting = false;

        state.deleteError = action.payload || "Failed to delete product";
      });
  },
});

export const { clearSelectedProduct, clearAdminProductErrors } =
  adminProductSlice.actions;

export default adminProductSlice.reducer;
