import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/auth.service";

// =========================================================
// SEND OTP
// =========================================================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (phone, thunkAPI) => {
    try {
      return await authService.sendOtp(phone);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// =========================================================
// VERIFY OTP
// =========================================================

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ phone, otp }, thunkAPI) => {
    try {
      return await authService.verifyOtp(phone, otp);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

// =========================================================
// LOAD CURRENT USER
// =========================================================

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      return await authService.getProfile();
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Session expired",
      );
    }
  },
);

// =========================================================
// INITIAL STATE
// =========================================================

const initialState = {
  loading: false,

  user: null,

  token: localStorage.getItem("token") || null,

  isAuthenticated: !!localStorage.getItem("token"),

  error: null,
};

// =========================================================
// AUTH SLICE
// =========================================================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    // =======================================================
    // LOGOUT
    // =======================================================

    logout: (state) => {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear Redux auth state
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // =======================================================
    // LOAD USER
    // =======================================================

    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;

      state.user = action.payload.user;

      state.isAuthenticated = true;

      state.error = null;
    });

    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;

      state.user = null;

      state.token = null;

      state.isAuthenticated = false;

      state.error = action.payload;
    });

    // =======================================================
    // LOGIN / SEND OTP
    // =======================================================

    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // =======================================================
    // VERIFY OTP
    // =======================================================

    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;

      state.user = action.payload.user;

      state.token = action.payload.token;

      state.isAuthenticated = true;

      state.error = null;

      // Save token
      localStorage.setItem("token", action.payload.token);

      // Save user as well
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    });

    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });
  },
});

// =========================================================
// ACTIONS
// =========================================================

export const { logout } = authSlice.actions;

// =========================================================
// REDUCER
// =========================================================

export default authSlice.reducer;
