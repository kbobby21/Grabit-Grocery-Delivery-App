import React from "react";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
const menuItems = [
  {
    label: "Dashboard",
    icon: DashboardRoundedIcon,
    path: "/admin/dashboard",
  },
  {
    label: "Orders",
    icon: ShoppingBagRoundedIcon,
    path: "/admin/orders",
  },
  {
    label: "Products",
    icon: Inventory2RoundedIcon,
    path: "/admin/products",
  },
  {
    label: "Categories",
    icon: CategoryRoundedIcon,
    path: "/admin/categories",
  },

  {
    label: "Customers",
    icon: PeopleRoundedIcon,
    path: "/admin/customers",
  },
  {
    label: "Delivery Partners",
    icon: LocalShippingRoundedIcon,
    path: "/admin/delivery/partners",
  },
  {
    label: "Payments",
    icon: AccountBalanceRoundedIcon,
    path: "/admin/payments",
  },
  {
    label: "Coupons",
    icon: LocalOfferRoundedIcon,
    path: "/admin/coupons",
  },
];
const inventoryItems = [
  {
    label: "Overview",
    path: "/admin/inventory",
  },
  {
    label: "Stock Management",
    path: "/admin/inventory/stock",
  },
  {
    label: "Low Stock",
    path: "/admin/inventory/low-stock",
  },
  {
    label: "Out of Stock",
    path: "/admin/inventory/out-of-stock",
  },
  {
    label: "Stock Adjustments",
    path: "/admin/inventory/adjustments",
  },
  {
    label: "Stock History",
    path: "/admin/inventory/history",
  },
];
const reportItems = [
  // {
  //   label: "Overview",
  //   path: "/admin/reports",
  // },
  {
    label: "Sales Report",
    path: "/admin/reports/sales",
  },
  {
    label: "Sales Trend",
    path: "/admin/reports/sales/trend",
  },
  {
    label: "Top Products",
    path: "/admin/reports/products",
  },
  {
    label: "Category Report",
    path: "/admin/reports/categories",
  },
  {
    label: "Customer Report",
    path: "/admin/reports/customers",
  },
  {
    label: "Payment Report",
    path: "/admin/reports/payments",
  },
  {
    label: "Inventory Report",
    path: "/admin/reports/inventory",
  },
];

const sidebarWidth = 260;

const AdminSidebar = ({ activePath, onNavigate, onLogout }) => {
  const [inventoryOpen, setInventoryOpen] = React.useState(
    activePath?.startsWith("/admin/inventory"),
  );
  const [reportOpen, setReportOpen] = React.useState(
    activePath?.startsWith("/admin/reports"),
  );

  return (
    <Box
      sx={{
        width: sidebarWidth,
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bgcolor: "#111111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        zIndex: 1200,
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          height: 76,
          px: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "#FF4FA3",
          }}
        >
          Grabit
        </Typography>

        <Typography
          sx={{
            ml: 1,
            px: 1,
            py: 0.3,
            borderRadius: 1,
            bgcolor: "rgba(255,79,163,0.12)",
            color: "#FF7DBB",
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          ADMIN
        </Typography>
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.5,
          py: 2,
          "&::-webkit-scrollbar": {
            width: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 10,
          },
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            color: "#6B7280",
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Main Menu
        </Typography>

        <List disablePadding>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePath === item.path;

            return (
              <ListItemButton
                key={item.path}
                onClick={() => onNavigate(item.path)}
                sx={{
                  minHeight: 46,
                  mb: 0.5,
                  px: 1.5,
                  borderRadius: 2.5,
                  color: active ? "#fff" : "#A1A1AA",
                  bgcolor: active
                    ? "linear-gradient(90deg, #FF4FA3, #E6328B)"
                    : "transparent",

                  background: active
                    ? "linear-gradient(90deg, #FF4FA3, #E6328B)"
                    : "transparent",

                  "&:hover": {
                    bgcolor: active ? "#E6328B" : "rgba(255,255,255,0.06)",
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: "inherit",
                  }}
                >
                  <Icon fontSize="small" />
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 700 : 500,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        {/* Inventory */}
        <List disablePadding sx={{ mt: 0.5 }}>
          <ListItemButton
            onClick={() => setInventoryOpen((prev) => !prev)}
            sx={{
              minHeight: 46,
              px: 1.5,
              borderRadius: 2.5,
              color: activePath?.startsWith("/admin/inventory")
                ? "#fff"
                : "#A1A1AA",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.06)",
                color: "#fff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: "inherit",
              }}
            >
              <Inventory2RoundedIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText
              primary="Inventory"
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: 500,
              }}
            />

            <ExpandMoreRoundedIcon
              sx={{
                fontSize: 20,
                transform: inventoryOpen ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "0.2s",
              }}
            />
          </ListItemButton>

          {inventoryOpen && (
            <Box sx={{ ml: 3.5, mt: 0.5 }}>
              {inventoryItems.map((item) => {
                const active = activePath === item.path;

                return (
                  <ListItemButton
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    sx={{
                      minHeight: 38,
                      px: 1.5,
                      mb: 0.3,
                      borderRadius: 2,
                      color: active ? "#FF4FA3" : "#8F8F98",
                      "&:hover": {
                        color: "#FF7DBB",
                        bgcolor: "rgba(255,79,163,0.06)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        bgcolor: active ? "#FF4FA3" : "#555",
                        mr: 1.5,
                      }}
                    />

                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 12.5,
                        fontWeight: active ? 700 : 500,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </Box>
          )}
          {/* =====================================================
    REPORTS
===================================================== */}

          <List disablePadding sx={{ mt: 0.5 }}>
            <ListItemButton
              onClick={() => setReportOpen((prev) => !prev)}
              sx={{
                minHeight: 46,
                px: 1.5,
                borderRadius: 2.5,

                color: activePath?.startsWith("/admin/reports")
                  ? "#fff"
                  : "#A1A1AA",

                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.06)",
                  color: "#fff",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 38,
                  color: "inherit",
                }}
              >
                <AssessmentRoundedIcon fontSize="small" />
              </ListItemIcon>

              <ListItemText
                primary="Reports"
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: 500,
                }}
              />

              <ExpandMoreRoundedIcon
                sx={{
                  fontSize: 20,
                  transform: reportOpen ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 0.2s ease",
                }}
              />
            </ListItemButton>

            {reportOpen && (
              <Box
                sx={{
                  ml: 3.5,
                  mt: 0.5,
                }}
              >
                {reportItems.map((item) => {
                  const active = activePath === item.path;

                  return (
                    <ListItemButton
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      sx={{
                        minHeight: 38,
                        px: 1.5,
                        mb: 0.25,
                        borderRadius: 2,

                        color: active ? "#fff" : "#71717A",

                        background: active
                          ? "rgba(255,79,163,0.14)"
                          : "transparent",

                        "&:hover": {
                          background: "rgba(255,255,255,0.06)",
                          color: "#fff",
                        },

                        position: "relative",

                        "&::before": active
                          ? {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 7,
                              bottom: 7,
                              width: 3,
                              borderRadius: 3,
                              backgroundColor: "#FF4FA3",
                            }
                          : {},
                      }}
                    >
                      <Box
                        sx={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          mr: 1.5,
                          ml: 0.5,

                          backgroundColor: active ? "#FF4FA3" : "#52525B",
                        }}
                      />

                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: 13,
                          fontWeight: active ? 700 : 500,
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </Box>
            )}
          </List>
        </List>
      </Box>

      {/* Bottom */}
      <Box sx={{ px: 1.5, pb: 2 }}>
        <Divider
          sx={{
            mb: 1.5,
            borderColor: "rgba(255,255,255,0.08)",
          }}
        />

        <ListItemButton
          onClick={() => onNavigate("/admin/settings")}
          sx={{
            minHeight: 44,
            px: 1.5,
            borderRadius: 2.5,
            color: "#A1A1AA",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.06)",
              color: "#fff",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
            <SettingsRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText
            primary="Settings"
            primaryTypographyProps={{
              fontSize: 14,
            }}
          />
        </ListItemButton>

        <ListItemButton
          onClick={onLogout}
          sx={{
            minHeight: 44,
            px: 1.5,
            borderRadius: 2.5,
            color: "#A1A1AA",
            "&:hover": {
              bgcolor: "rgba(239,68,68,0.1)",
              color: "#EF4444",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 38, color: "inherit" }}>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontSize: 14,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default AdminSidebar;
