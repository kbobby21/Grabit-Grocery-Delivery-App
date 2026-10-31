import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import uiReducer from "./slices/uiSlice";
import addressReducer from "./slices/addressSlice";
import couponReducer from "./slices/couponSlice";
import orderReducer from "./slices/orderSlice";
import searchReducer from "./slices/searchSlice";
import profileReducer from "./slices/profileSlice";
import paymentReducer from "./slices/paymentSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import adminAuthReducer from "./slices/adminAuthSlice"; // Import the adminAuth slice
import adminProductReducer from "./slices/adminProductSlice";
import adminCategoryReducer from "./slices/adminCategorySlice";
import adminCustomerReducer from "./slices/adminCustomerSlice";
import adminInventoryReducer from "./slices/adminInventorySlice";
import adminCouponReducer from "./slices/adminCouponSlice";
import adminDeliveryReducer from "./slices/adminDeliverySlice";
import adminPaymentReducer from "./slices/adminPaymentSlice";
import adminReportReducer from "./slices/adminReportSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  ui: uiReducer,
  address: addressReducer,
  coupon: couponReducer,
  order: orderReducer,
  search: searchReducer,
  profile: profileReducer,
  payment: paymentReducer,

  //ADMIN
  adminOrders: adminOrderReducer,
  adminAuth: adminAuthReducer, // Add this line to include the adminAuth slice
  adminProducts: adminProductReducer,
  adminCategories: adminCategoryReducer,
  adminCustomers: adminCustomerReducer,
  adminInventory: adminInventoryReducer,
  adminCoupon: adminCouponReducer,
  adminDelivery: adminDeliveryReducer,
  adminPayment: adminPaymentReducer,
  adminReports: adminReportReducer,
});

export default rootReducer;
