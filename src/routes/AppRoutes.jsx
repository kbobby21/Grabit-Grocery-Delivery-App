// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import PATHS from "./paths";

// import MainLayout from "../layouts/MainLayout";

// import Splash from "../pages/Splash/Splash";
// import Onboarding from "../pages/Onboarding/Onboarding";
// import Login from "../pages/Auth/Login";
// import Otp from "../pages/Auth/Otp";
// import Home from "../pages/Home/Home";
// import Cart from "../pages/Cart/Cart";
// import Categories from "../pages/Categories/Categories";
// import Orders from "../pages/Orders/Orders";
// import Profile from "../pages/Profile/Profile";
// import ProductList from "../pages/Product/ProductList";
// import ProductDetails from "../pages/Product/ProductDetails";
// import Checkout from "../pages/Checkout/Checkout";
// import AddressList from "../pages/Profile/AddressList";
// import AddAddress from "../pages/Profile/AddAddress";
// import OrderSuccess from "../pages/Orders/OrderSuccess";
// import OrderDetails from "../pages/Orders/OrderDetails";
// import Search from "../pages/Search/Search";
// import Wishlist from "../pages/Wishlist/Wishlist";
// import CategoryProducts from "../pages/Categories/CategoryProducts";
// import EditProfile from "../pages/Profile/EditProfile";
// import AdminOrders from "../pages/Admin/AdminOrders";
// import AdminLogin from "../pages/Admin/AdminLogin";
// import AdminOrderDetails from "../pages/Admin/AdminOrderDetails";
// import AdminDashboard from "../pages/Admin/AdminDashboard";
// import AdminLayout from "../layouts/AdminLayout";
// import AdminProducts from "../pages/Admin/AdminProducts";
// import AdminProductDetails from "../pages/Admin/AdminProductDetails";
// import AdminProductCreate from "../pages/Admin/AdminProductCreate";
// import AdminProductEdit from "../pages/Admin/AdminProductEdit";
// import AdminCategories from "../pages/Admin/AdminCategories";
// import AdminCategoryCreate from "../pages/Admin/AdminCategoryCreate";
// import AdminCategoryDetails from "../pages/Admin/AdminCategoryDetails";
// import AdminCategoryEdit from "../pages/Admin/AdminCategoryEdit";
// import AdminCustomers from "../pages/Admin/AdminCustomers";
// import AdminCustomerDetails from "../pages/Admin/AdminCustomerDetails";
// import AdminInventoryOverview from "../pages/Admin/AdminInventoryOverview";
// import AdminInventory from "../pages/Admin/AdminInventory";
// import AdminInventoryAdjustments from "../pages/Admin/AdminInventoryAdjustments";
// import AdminInventoryHistory from "../pages/Admin/AdminInventoryHistory";
// import AdminInventoryLowStock from "../pages/Admin/AdminInventoryLowStock";
// import AdminInventoryOutOfStock from "../pages/Admin/AdminInventoryOutOfStock";
// import AdminCouponCreate from "../pages/Admin/Admin_Coupon/AdminCouponCreate";
// import AdminCoupons from "../pages/Admin/Admin_Coupon/AdminCoupon";
// import AdminCouponEdit from "../pages/Admin/Admin_Coupon/AdminCouponEdit";
// import AdminCouponDetails from "../pages/Admin/Admin_Coupon/AdminCouponDetails";
// import AdminDeliveryPartners from "../pages/Admin/AdminDelivery/AdminDeliveryPartners";
// import AdminDeliveryPartnerDetails from "../pages/Admin/AdminDelivery/AdminDeliveryPartnerDetails";
// import AdminDeliveryHistory from "../pages/Admin/AdminDelivery/AdminDeliveryHistory";
// import AdminCreateDeliveryPartner from "../pages/Admin/AdminDelivery/AdminCreateDeliveryPartner";
// import AdminPayments from "../pages/Admin/AdminPayments/AdminPayments";
// import AdminReports from "../pages/Admin/AdminReports/AdminReports";
// import SalesReport from "../pages/Admin/AdminReports/SalesReport";
// import SalesTrendReport from "../pages/Admin/AdminReports/SalesTrendReport";
// import CategoryReport from "../pages/Admin/AdminReports/CategoryReport";
// import PaymentReport from "../pages/Admin/AdminReports/PaymentReport";
// import InventoryReport from "../pages/Admin/AdminReports/InventoryReport";
// import CustomerReport from "../pages/Admin/AdminReports/CustomerReport";
// import TopProductsReport from "../pages/Admin/AdminReports/TopProductsReport";
// import AdminSettings from "../pages/Admin/AdminSettings/AdminSettings";
// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path={PATHS.SPLASH}
//           element={
//             <MainLayout>
//               <Splash />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ONBOARDING}
//           element={
//             <MainLayout>
//               <Onboarding />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.LOGIN}
//           element={
//             <MainLayout>
//               <Login />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.OTP}
//           element={
//             <MainLayout>
//               <Otp />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.HOME}
//           element={
//             <MainLayout>
//               <Home />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.SEARCH}
//           element={
//             <MainLayout>
//               <Search />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.CART}
//           element={
//             <MainLayout>
//               <Cart />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.CATEGORIES}
//           element={
//             <MainLayout>
//               <Categories />
//             </MainLayout>
//           }
//         />
//         <Route
//           path="/categories/:id/products"
//           element={
//             <MainLayout>
//               <CategoryProducts />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ORDERS}
//           element={
//             <MainLayout>
//               <Orders />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.PROFILE}
//           element={
//             <MainLayout>
//               <Profile />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.EDIT_PROFILE}
//           element={
//             <MainLayout>
//               <EditProfile />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.PRODUCTS}
//           element={
//             <MainLayout>
//               <ProductList />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.PRODUCT_DETAILS}
//           element={
//             <MainLayout>
//               <ProductDetails />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.CHECKOUT}
//           element={
//             <MainLayout>
//               <Checkout />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADDRESSES}
//           element={
//             <MainLayout>
//               <AddressList />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.NEW_ADDRESS}
//           element={
//             <MainLayout>
//               <AddAddress />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ORDER_SUCCESS}
//           element={
//             <MainLayout>
//               <OrderSuccess />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ORDER_DETAILS}
//           element={
//             <MainLayout>
//               <OrderDetails />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.WISHLIST}
//           element={
//             <MainLayout>
//               <Wishlist />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_PRODUCTS}
//           element={
//             <AdminLayout>
//               <AdminProducts />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_ORDERS}
//           element={
//             <AdminLayout>
//               {" "}
//               <AdminOrders />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_DASHBOARD}
//           element={
//             <AdminLayout>
//               <AdminDashboard />
//             </AdminLayout>
//           }
//         />
//         <Route path={PATHS.ADMIN_LOGIN} element={<AdminLogin />} />
//         <Route
//           path={PATHS.ADMIN_ORDER_DETAILS}
//           element={
//             <MainLayout>
//               <AdminOrderDetails />
//             </MainLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_PRODUCT_DETAILS}
//           element={
//             <AdminLayout>
//               <AdminProductDetails />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_PRODUCT_CREATE}
//           element={
//             <AdminLayout>
//               <AdminProductCreate />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_PRODUCT_EDIT}
//           element={
//             <AdminLayout>
//               <AdminProductEdit />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_CATEGORIES}
//           element={
//             <AdminLayout>
//               <AdminCategories />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_CATEGORY_CREATE}
//           element={
//             <AdminLayout>
//               <AdminCategoryCreate />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_CATEGORY_DETAILS}
//           element={
//             <AdminLayout>
//               <AdminCategoryDetails />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_CATEGORY_EDIT}
//           element={
//             <AdminLayout>
//               <AdminCategoryEdit />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_CUSTOMERS}
//           element={
//             <AdminLayout>
//               <AdminCustomers />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_CUSTOMER_DETAILS}
//           element={
//             <AdminLayout>
//               <AdminCustomerDetails />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_INVENTORY_OVERVIEW}
//           element={
//             <AdminLayout>
//               <AdminInventoryOverview />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_INVENTORY}
//           element={
//             <AdminLayout>
//               <AdminInventory />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_INVENTORY_ADJUSTMENTS}
//           element={
//             <AdminLayout>
//               <AdminInventoryAdjustments />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_INVENTORY_HISTORY}
//           element={
//             <AdminLayout>
//               <AdminInventoryHistory />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_INVENTORY_LOW_STOCK}
//           element={
//             <AdminLayout>
//               <AdminInventoryLowStock />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_INVENTORY_OUT_OF_STOCK}
//           element={
//             <AdminLayout>
//               <AdminInventoryOutOfStock />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_COUPON}
//           element={
//             <AdminLayout>
//               <AdminCoupons />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_COUPON_CREATE}
//           element={
//             <AdminLayout>
//               <AdminCouponCreate />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_COUPON_EDIT}
//           element={
//             <AdminLayout>
//               <AdminCouponEdit />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_COUPON_DETAILS}
//           element={
//             <AdminLayout>
//               <AdminCouponDetails />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_DELIVERY_PARTNERS}
//           element={
//             <AdminLayout>
//               <AdminDeliveryPartners />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_DELIVERY_PARTNERS_DETAILS}
//           element={
//             <AdminLayout>
//               <AdminDeliveryPartnerDetails />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_DELIVERY_HISTORY}
//           element={
//             <AdminLayout>
//               <AdminDeliveryHistory />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_DELIVERY_PARTNER_CREATE}
//           element={
//             <AdminLayout>
//               <AdminCreateDeliveryPartner />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_PAYMENTS}
//           element={
//             <AdminLayout>
//               <AdminPayments />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_REPORTS}
//           element={
//             <AdminLayout>
//               <AdminReports />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_REPORTS_SALES}
//           element={
//             <AdminLayout>
//               <SalesReport />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path={PATHS.ADMIN_REPORTS_SALES_TREND}
//           element={
//             <AdminLayout>
//               <SalesTrendReport />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_REPORTS_PRODUCTS}
//           element={
//             <AdminLayout>
//               <TopProductsReport />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path={PATHS.ADMIN_REPORTS_CATEGORIES}
//           element={
//             <AdminLayout>
//               <CategoryReport />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path={PATHS.ADMIN_REPORTS_CUSTOMERS}
//           element={
//             <AdminLayout>
//               <CustomerReport />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_REPORTS_PAYMENTS}
//           element={
//             <AdminLayout>
//               <PaymentReport />
//             </AdminLayout>
//           }
//         />

//         <Route
//           path={PATHS.ADMIN_REPORTS_INVENTORY}
//           element={
//             <AdminLayout>
//               <InventoryReport />
//             </AdminLayout>
//           }
//         />
//         <Route
//           path={PATHS.ADMIN_SETTINGS}
//           element={
//             <AdminLayout>
//               <AdminSettings />
//             </AdminLayout>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PATHS from "./paths";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";

// ==============================
// PUBLIC PAGES
// ==============================

import Splash from "../pages/Splash/Splash";
import Onboarding from "../pages/Onboarding/Onboarding";
import Login from "../pages/Auth/Login";
import Otp from "../pages/Auth/Otp";
import Home from "../pages/Home/Home";

import Search from "../pages/Search/Search";
import Categories from "../pages/Categories/Categories";
import CategoryProducts from "../pages/Categories/CategoryProducts";

import ProductList from "../pages/Product/ProductList";
import ProductDetails from "../pages/Product/ProductDetails";

// ==============================
// USER PAGES
// ==============================

import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Orders from "../pages/Orders/Orders";
import OrderSuccess from "../pages/Orders/OrderSuccess";
import OrderDetails from "../pages/Orders/OrderDetails";

import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";

import Checkout from "../pages/Checkout/Checkout";

import AddressList from "../pages/Profile/AddressList";
import AddAddress from "../pages/Profile/AddAddress";

// ==============================
// ADMIN
// ==============================

import AdminLogin from "../pages/Admin/AdminLogin";
import AdminOrders from "../pages/Admin/AdminOrders";
import AdminOrderDetails from "../pages/Admin/AdminOrderDetails";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import AdminProducts from "../pages/Admin/AdminProducts";
import AdminProductDetails from "../pages/Admin/AdminProductDetails";
import AdminProductCreate from "../pages/Admin/AdminProductCreate";
import AdminProductEdit from "../pages/Admin/AdminProductEdit";

import AdminCategories from "../pages/Admin/AdminCategories";
import AdminCategoryCreate from "../pages/Admin/AdminCategoryCreate";
import AdminCategoryDetails from "../pages/Admin/AdminCategoryDetails";
import AdminCategoryEdit from "../pages/Admin/AdminCategoryEdit";

import AdminCustomers from "../pages/Admin/AdminCustomers";
import AdminCustomerDetails from "../pages/Admin/AdminCustomerDetails";

import AdminInventoryOverview from "../pages/Admin/AdminInventoryOverview";
import AdminInventory from "../pages/Admin/AdminInventory";
import AdminInventoryAdjustments from "../pages/Admin/AdminInventoryAdjustments";
import AdminInventoryHistory from "../pages/Admin/AdminInventoryHistory";
import AdminInventoryLowStock from "../pages/Admin/AdminInventoryLowStock";
import AdminInventoryOutOfStock from "../pages/Admin/AdminInventoryOutOfStock";

import AdminCouponCreate from "../pages/Admin/Admin_Coupon/AdminCouponCreate";
import AdminCoupons from "../pages/Admin/Admin_Coupon/AdminCoupon";
import AdminCouponEdit from "../pages/Admin/Admin_Coupon/AdminCouponEdit";
import AdminCouponDetails from "../pages/Admin/Admin_Coupon/AdminCouponDetails";

import AdminDeliveryPartners from "../pages/Admin/AdminDelivery/AdminDeliveryPartners";
import AdminDeliveryPartnerDetails from "../pages/Admin/AdminDelivery/AdminDeliveryPartnerDetails";
import AdminDeliveryHistory from "../pages/Admin/AdminDelivery/AdminDeliveryHistory";
import AdminCreateDeliveryPartner from "../pages/Admin/AdminDelivery/AdminCreateDeliveryPartner";

import AdminPayments from "../pages/Admin/AdminPayments/AdminPayments";

import AdminReports from "../pages/Admin/AdminReports/AdminReports";
import SalesReport from "../pages/Admin/AdminReports/SalesReport";
import SalesTrendReport from "../pages/Admin/AdminReports/SalesTrendReport";
import CategoryReport from "../pages/Admin/AdminReports/CategoryReport";
import PaymentReport from "../pages/Admin/AdminReports/PaymentReport";
import InventoryReport from "../pages/Admin/AdminReports/InventoryReport";
import CustomerReport from "../pages/Admin/AdminReports/CustomerReport";
import TopProductsReport from "../pages/Admin/AdminReports/TopProductsReport";

import AdminSettings from "../pages/Admin/AdminSettings/AdminSettings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================================
            PUBLIC ROUTES
            ===================================================== */}

        {/* Website root → HOME */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Home */}
        <Route
          path={PATHS.HOME}
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Future splash */}
        <Route
          path={PATHS.SPLASH}
          element={
            <MainLayout>
              <Splash />
            </MainLayout>
          }
        />

        {/* Future onboarding */}
        <Route
          path={PATHS.ONBOARDING}
          element={
            <MainLayout>
              <Onboarding />
            </MainLayout>
          }
        />

        {/* Login */}
        <Route
          path={PATHS.LOGIN}
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        {/* OTP */}
        <Route
          path={PATHS.OTP}
          element={
            <MainLayout>
              <Otp />
            </MainLayout>
          }
        />

        {/* =====================================================
            PUBLIC BROWSING ROUTES
            ===================================================== */}

        <Route
          path={PATHS.SEARCH}
          element={
            <MainLayout>
              <Search />
            </MainLayout>
          }
        />

        <Route
          path={PATHS.CATEGORIES}
          element={
            <MainLayout>
              <Categories />
            </MainLayout>
          }
        />

        <Route
          path="/categories/:id/products"
          element={
            <MainLayout>
              <CategoryProducts />
            </MainLayout>
          }
        />

        <Route
          path={PATHS.PRODUCTS}
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />

        <Route
          path={PATHS.PRODUCT_DETAILS}
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />

        {/* =====================================================
            PROTECTED USER ROUTES
            ===================================================== */}

        {/* CART */}
        <Route
          path={PATHS.CART}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cart />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* WISHLIST */}
        <Route
          path={PATHS.WISHLIST}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Wishlist />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}
        <Route
          path={PATHS.CHECKOUT}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Checkout />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ORDERS */}
        <Route
          path={PATHS.ORDERS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Orders />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ORDER DETAILS */}
        <Route
          path={PATHS.ORDER_DETAILS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ORDER SUCCESS */}
        <Route
          path={PATHS.ORDER_SUCCESS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderSuccess />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}
        <Route
          path={PATHS.PROFILE}
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* EDIT PROFILE */}
        <Route
          path={PATHS.EDIT_PROFILE}
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditProfile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* ADDRESSES */}
        <Route
          path={PATHS.ADDRESSES}
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddressList />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* NEW ADDRESS */}
        <Route
          path={PATHS.NEW_ADDRESS}
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddAddress />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            ADMIN LOGIN
            ===================================================== */}

        <Route path={PATHS.ADMIN_LOGIN} element={<AdminLogin />} />

        {/* =====================================================
            ADMIN ROUTES
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_DASHBOARD}
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_ORDERS}
          element={
            <AdminLayout>
              <AdminOrders />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_ORDER_DETAILS}
          element={
            <AdminLayout>
              <AdminOrderDetails />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_PRODUCTS}
          element={
            <AdminLayout>
              <AdminProducts />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_PRODUCT_CREATE}
          element={
            <AdminLayout>
              <AdminProductCreate />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_PRODUCT_DETAILS}
          element={
            <AdminLayout>
              <AdminProductDetails />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_PRODUCT_EDIT}
          element={
            <AdminLayout>
              <AdminProductEdit />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_CATEGORIES}
          element={
            <AdminLayout>
              <AdminCategories />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_CATEGORY_CREATE}
          element={
            <AdminLayout>
              <AdminCategoryCreate />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_CATEGORY_DETAILS}
          element={
            <AdminLayout>
              <AdminCategoryDetails />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_CATEGORY_EDIT}
          element={
            <AdminLayout>
              <AdminCategoryEdit />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_CUSTOMERS}
          element={
            <AdminLayout>
              <AdminCustomers />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_CUSTOMER_DETAILS}
          element={
            <AdminLayout>
              <AdminCustomerDetails />
            </AdminLayout>
          }
        />

        {/* =====================================================
            ADMIN INVENTORY
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_INVENTORY_OVERVIEW}
          element={
            <AdminLayout>
              <AdminInventoryOverview />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_INVENTORY}
          element={
            <AdminLayout>
              <AdminInventory />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_INVENTORY_ADJUSTMENTS}
          element={
            <AdminLayout>
              <AdminInventoryAdjustments />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_INVENTORY_HISTORY}
          element={
            <AdminLayout>
              <AdminInventoryHistory />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_INVENTORY_LOW_STOCK}
          element={
            <AdminLayout>
              <AdminInventoryLowStock />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_INVENTORY_OUT_OF_STOCK}
          element={
            <AdminLayout>
              <AdminInventoryOutOfStock />
            </AdminLayout>
          }
        />

        {/* =====================================================
            ADMIN COUPONS
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_COUPON}
          element={
            <AdminLayout>
              <AdminCoupons />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_COUPON_CREATE}
          element={
            <AdminLayout>
              <AdminCouponCreate />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_COUPON_EDIT}
          element={
            <AdminLayout>
              <AdminCouponEdit />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_COUPON_DETAILS}
          element={
            <AdminLayout>
              <AdminCouponDetails />
            </AdminLayout>
          }
        />

        {/* =====================================================
            ADMIN DELIVERY
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_DELIVERY_PARTNERS}
          element={
            <AdminLayout>
              <AdminDeliveryPartners />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_DELIVERY_PARTNERS_DETAILS}
          element={
            <AdminLayout>
              <AdminDeliveryPartnerDetails />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_DELIVERY_HISTORY}
          element={
            <AdminLayout>
              <AdminDeliveryHistory />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_DELIVERY_PARTNER_CREATE}
          element={
            <AdminLayout>
              <AdminCreateDeliveryPartner />
            </AdminLayout>
          }
        />

        {/* =====================================================
            ADMIN PAYMENTS
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_PAYMENTS}
          element={
            <AdminLayout>
              <AdminPayments />
            </AdminLayout>
          }
        />

        {/* =====================================================
            ADMIN REPORTS
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_REPORTS}
          element={
            <AdminLayout>
              <AdminReports />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_SALES}
          element={
            <AdminLayout>
              <SalesReport />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_SALES_TREND}
          element={
            <AdminLayout>
              <SalesTrendReport />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_PRODUCTS}
          element={
            <AdminLayout>
              <TopProductsReport />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_CATEGORIES}
          element={
            <AdminLayout>
              <CategoryReport />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_CUSTOMERS}
          element={
            <AdminLayout>
              <CustomerReport />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_PAYMENTS}
          element={
            <AdminLayout>
              <PaymentReport />
            </AdminLayout>
          }
        />

        <Route
          path={PATHS.ADMIN_REPORTS_INVENTORY}
          element={
            <AdminLayout>
              <InventoryReport />
            </AdminLayout>
          }
        />

        {/* =====================================================
            ADMIN SETTINGS
            ===================================================== */}

        <Route
          path={PATHS.ADMIN_SETTINGS}
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
