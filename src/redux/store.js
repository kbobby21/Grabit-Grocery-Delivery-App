import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
