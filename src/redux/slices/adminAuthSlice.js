import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { adminLogin as adminLoginApi } from "../../api/adminAuthApi";

export const adminLogin = createAsyncThunk(
  "adminAuth/login",
  async ({ identifier, password }, { rejectWithValue }) => {
    try {
      const response = await adminLoginApi(identifier, password);

      if (response.token) {
        localStorage.setItem("adminToken", response.token);
      }

      if (response.admin) {
        localStorage.setItem("adminUser", JSON.stringify(response.admin));
      }

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Admin login failed",
      );
    }
  },
);

const initialState = {
  admin: JSON.parse(localStorage.getItem("adminUser") || "null"),

  token: localStorage.getItem("adminToken"),

  loading: false,

  error: null,

  isAuthenticated: Boolean(localStorage.getItem("adminToken")),
};

const adminAuthSlice = createSlice({
  name: "adminAuth",

  initialState,

  reducers: {
    adminLogout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    },

    clearAdminAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;

        state.admin = action.payload.admin;
        state.token = action.payload.token;

        state.isAuthenticated = true;
      })

      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Admin login failed";
      });
  },
});

export const { adminLogout, clearAdminAuthError } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
