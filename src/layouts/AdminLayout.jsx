import React, { useEffect, useRef, useState } from "react";

import { Box, Drawer } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import PATHS from "../routes/paths";

import { getAdminOrders } from "../api/adminOrderApi";

import AdminNotification from "../components/admin/AdminNotification";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

const SIDEBAR_WIDTH = 260;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  /*
  |--------------------------------------------------------------------------
  | ORDER SNAPSHOT
  |--------------------------------------------------------------------------
  */

  const previousOrders = useRef(new Map());

  const firstOrderLoad = useRef(true);

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATIONS
  |--------------------------------------------------------------------------
  */

  const [notifications, setNotifications] = useState([]);

  const [mobileOpen, setMobileOpen] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | ADD NOTIFICATION
  |--------------------------------------------------------------------------
  */

  const addNotification = (notification) => {
    const notificationId = `${notification.orderId}-${notification.type}-${Date.now()}`;

    const newNotification = {
      ...notification,
      id: notificationId,
    };

    setNotifications((previous) => [...previous, newNotification]);

    /*
    |--------------------------------------------------------------------------
    | AUTO REMOVE AFTER 8 SECONDS
    |--------------------------------------------------------------------------
    */

    setTimeout(() => {
      setNotifications((previous) =>
        previous.filter((item) => item.id !== notificationId),
      );
    }, 8000);
  };

  /*
  |--------------------------------------------------------------------------
  | NOTIFICATION CLICK
  |--------------------------------------------------------------------------
  */

  const handleNotificationClick = (notification) => {
    if (!notification?.orderId) {
      return;
    }

    const path = PATHS.ADMIN_ORDER_DETAILS.replace(":id", notification.orderId);

    /*
    | Remove clicked notification
    */

    setNotifications((previous) =>
      previous.filter((item) => item.id !== notification.id),
    );

    /*
    | Open order details
    */

    navigate(path);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE NOTIFICATION
  |--------------------------------------------------------------------------
  */

  const handleNotificationClose = (notificationId) => {
    setNotifications((previous) =>
      previous.filter((item) => item.id !== notificationId),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | SIDEBAR NAVIGATION
  |--------------------------------------------------------------------------
  */

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminUser");

    navigate(PATHS.ADMIN_LOGIN);
  };

  /*
  |--------------------------------------------------------------------------
  | BACKGROUND ORDER MONITOR
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | This does NOT dispatch Redux.
  | This does NOT refresh the dashboard.
  | This only checks the API and changes notifications.
  |
  */

  useEffect(() => {
    let mounted = true;

    const checkOrders = async () => {
      try {
        const response = await getAdminOrders();

        if (!mounted) {
          return;
        }

        const orders = response?.orders || [];

        const currentOrders = new Map();

        /*
        |--------------------------------------------------------------------------
        | CREATE CURRENT SNAPSHOT
        |--------------------------------------------------------------------------
        */

        orders.forEach((order) => {
          currentOrders.set(String(order.id), order);
        });

        /*
        |--------------------------------------------------------------------------
        | FIRST LOAD
        |--------------------------------------------------------------------------
        |
        | Existing orders are silently stored.
        | No notification.
        |
        */

        if (firstOrderLoad.current) {
          previousOrders.current = currentOrders;

          firstOrderLoad.current = false;

          return;
        }

        /*
        |--------------------------------------------------------------------------
        | COMPARE ORDERS
        |--------------------------------------------------------------------------
        */

        for (const order of orders) {
          const orderId = String(order.id);

          const previous = previousOrders.current.get(orderId);

          /*
          |--------------------------------------------------------------------------
          | NEW ORDER
          |--------------------------------------------------------------------------
          */

          if (!previous) {
            addNotification({
              type: "new",

              orderId,

              title: "New Order Received",

              message: `Order #${orderId.slice(0, 8)} has been placed.`,
            });

            /*
            | Continue checking other orders.
            | DO NOT break.
            */

            continue;
          }

          /*
          |--------------------------------------------------------------------------
          | ORDER STATUS
          |--------------------------------------------------------------------------
          */

          const oldStatus = String(previous.status || "").toLowerCase();

          const newStatus = String(order.status || "").toLowerCase();

          /*
          |--------------------------------------------------------------------------
          | DELIVERED
          |--------------------------------------------------------------------------
          */

          if (oldStatus !== "delivered" && newStatus === "delivered") {
            addNotification({
              type: "delivered",

              orderId,

              title: "Order Delivered",

              message: `Order #${orderId.slice(
                0,
                8,
              )} has been delivered successfully.`,
            });
          }
        }

        /*
        |--------------------------------------------------------------------------
        | SAVE CURRENT SNAPSHOT
        |--------------------------------------------------------------------------
        */

        previousOrders.current = currentOrders;
      } catch (error) {
        console.error("Admin order monitor error:", error);
      }
    };

    /*
    |--------------------------------------------------------------------------
    | INITIAL CHECK
    |--------------------------------------------------------------------------
    */

    checkOrders();

    /*
    |--------------------------------------------------------------------------
    | EVERY 10 SECONDS
    |--------------------------------------------------------------------------
    */

    const interval = setInterval(checkOrders, 10000);

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | SIDEBAR
  |--------------------------------------------------------------------------
  */

  const sidebar = (
    <AdminSidebar
      currentPath={location.pathname}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
    />
  );

  /*
  |--------------------------------------------------------------------------
  | LAYOUT
  |--------------------------------------------------------------------------
  */

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F9FC",
      }}
    >
      {/* Desktop Sidebar */}

      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {sidebar}
      </Box>

      {/* Mobile Sidebar */}

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            border: 0,
          },
        }}
      >
        {sidebar}
      </Drawer>

      {/* Header */}

      <AdminHeader onMenuClick={() => setMobileOpen(true)} />

      {/* Page Content */}

      <Box
        component="main"
        sx={{
          ml: {
            xs: 0,
            md: `${SIDEBAR_WIDTH}px`,
          },

          pt: "76px",

          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Global Floating Notifications */}

      <AdminNotification
        notifications={notifications}
        onClick={handleNotificationClick}
        onClose={handleNotificationClose}
      />
    </Box>
  );
};

export default AdminLayout;
