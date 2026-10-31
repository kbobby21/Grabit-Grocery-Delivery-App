import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    darkMode: false,
    drawerOpen: false,
    loading: false,
    snackbar: {
      open: false,
      message: "",
      severity: "success",
      duration: 6000,
      // "success", "error", "warning", "info"
    },
  },

  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },

    openDrawer(state) {
      state.drawerOpen = true;
    },

    closeDrawer(state) {
      state.drawerOpen = false;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
    showSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity || "success";
      state.snackbar.duration = action.payload.duration || 3000;
    },

    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const {
  toggleDarkMode,
  openDrawer,
  closeDrawer,
  setLoading,
  showSnackbar,
  hideSnackbar,
} = uiSlice.actions;

export default uiSlice.reducer;
