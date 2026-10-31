const STORAGE_KEY = "grabit_store";

export const loadState = () => {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);

    if (!storedState) {
      return undefined;
    }

    return JSON.parse(storedState);
  } catch (error) {
    console.error("Failed to load Redux state:", error);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateToSave = {
      auth: state.auth,
      cart: state.cart,
      wishlist: state.wishlist,
      address: state.address,
      coupon: state.coupon,
      order: state.order,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Failed to save Redux state:", error);
  }
};

export const clearState = () => {
  localStorage.removeItem(STORAGE_KEY);
};
