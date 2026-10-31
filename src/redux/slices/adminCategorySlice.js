import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminCategories,
  getAdminCategoryById,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  uploadAdminCategoryImage,
} from "../../api/adminCategoryApi";

/* GET ALL */

export const fetchAdminCategories = createAsyncThunk(
  "adminCategories/fetchAdminCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminCategories();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch categories",
      );
    }
  },
);

/* GET SINGLE */

export const fetchAdminCategoryById = createAsyncThunk(
  "adminCategories/fetchAdminCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      return await getAdminCategoryById(categoryId);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch category",
      );
    }
  },
);

/* CREATE */

export const addAdminCategory = createAsyncThunk(
  "adminCategories/addAdminCategory",
  async (formData, { rejectWithValue }) => {
    try {
      return await createAdminCategory(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create category",
      );
    }
  },
);

/* UPDATE */

export const editAdminCategory = createAsyncThunk(
  "adminCategories/editAdminCategory",
  async ({ categoryId, formData }, { rejectWithValue }) => {
    try {
      return await updateAdminCategory(categoryId, formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update category",
      );
    }
  },
);

/* DELETE */

export const removeAdminCategory = createAsyncThunk(
  "adminCategories/removeAdminCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await deleteAdminCategory(categoryId);

      return {
        categoryId,
        response,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete category",
      );
    }
  },
);
export const uploadCategoryImage = createAsyncThunk(
  "adminCategories/uploadCategoryImage",
  async (formData, { rejectWithValue }) => {
    try {
      return await uploadAdminCategoryImage(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload category image",
      );
    }
  },
);

const initialState = {
  categories: [],
  selectedCategory: null,

  loading: false,
  categoryLoading: false,
  creating: false,
  updating: false,
  deleting: false,
  uploading: false,

  uploadError: null,
  error: null,
  categoryError: null,
  createError: null,
  updateError: null,
  deleteError: null,
};

const adminCategorySlice = createSlice({
  name: "adminCategories",

  initialState,

  reducers: {
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
      state.categoryError = null;
    },

    clearAdminCategoryErrors: (state) => {
      state.error = null;
      state.categoryError = null;
      state.createError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },

  extraReducers: (builder) => {
    /* GET ALL */

    builder
      .addCase(fetchAdminCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.categories || [];
      })

      .addCase(fetchAdminCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      });

    /* GET SINGLE */

    builder
      .addCase(fetchAdminCategoryById.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })

      .addCase(fetchAdminCategoryById.fulfilled, (state, action) => {
        state.categoryLoading = false;

        state.selectedCategory = action.payload?.category || null;
      })

      .addCase(fetchAdminCategoryById.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload || "Failed to fetch category";
      });

    /* CREATE */

    builder
      .addCase(addAdminCategory.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })

      .addCase(addAdminCategory.fulfilled, (state, action) => {
        state.creating = false;

        const category = action.payload?.category;

        if (category) {
          state.categories.push(category);
        }
      })

      .addCase(addAdminCategory.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload || "Failed to create category";
      });

    /* UPDATE */

    builder
      .addCase(editAdminCategory.pending, (state) => {
        state.updating = true;
        state.updateError = null;
      })

      .addCase(editAdminCategory.fulfilled, (state, action) => {
        state.updating = false;

        const updatedCategory = action.payload?.category;

        if (!updatedCategory) {
          return;
        }

        const index = state.categories.findIndex(
          (category) => category.id === updatedCategory.id,
        );

        if (index !== -1) {
          state.categories[index] = {
            ...state.categories[index],
            ...updatedCategory,
          };
        }

        if (state.selectedCategory?.id === updatedCategory.id) {
          state.selectedCategory = {
            ...state.selectedCategory,
            ...updatedCategory,
          };
        }
      })

      .addCase(editAdminCategory.rejected, (state, action) => {
        state.updating = false;
        state.updateError = action.payload || "Failed to update category";
      });

    //UploadImage
    builder
      .addCase(uploadCategoryImage.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
      })

      .addCase(uploadCategoryImage.fulfilled, (state) => {
        state.uploading = false;
      })

      .addCase(uploadCategoryImage.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload || "Failed to upload category image";
      });
    /* DELETE */

    builder
      .addCase(removeAdminCategory.pending, (state) => {
        state.deleting = true;
        state.deleteError = null;
      })

      .addCase(removeAdminCategory.fulfilled, (state, action) => {
        state.deleting = false;

        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.categoryId,
        );

        if (state.selectedCategory?.id === action.payload.categoryId) {
          state.selectedCategory = null;
        }
      })

      .addCase(removeAdminCategory.rejected, (state, action) => {
        state.deleting = false;
        state.deleteError = action.payload || "Failed to delete category";
      });
  },
});

export const { clearSelectedCategory, clearAdminCategoryErrors } =
  adminCategorySlice.actions;

export default adminCategorySlice.reducer;
