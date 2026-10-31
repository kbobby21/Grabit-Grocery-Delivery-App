import React, { useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import { useDispatch, useSelector } from "react-redux";
import { fetchAdminOrders } from "../../redux/slices/adminOrderSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  const stats = useMemo(() => {
    const normalizeStatus = (status) =>
      String(status || "")
        .toLowerCase()
        .trim();

    const pending = orders.filter((order) => {
      const status = normalizeStatus(order.status);

      return ["pending", "placed", "order_placed"].includes(status);
    }).length;

    const processing = orders.filter((order) => {
      const status = normalizeStatus(order.status);

      return [
        "processing",
        "confirmed",
        "packed",
        "out_for_delivery",
        "out for delivery",
      ].includes(status);
    }).length;

    const completed = orders.filter((order) => {
      const status = normalizeStatus(order.status);

      return ["delivered", "completed"].includes(status);
    }).length;

    const cancelled = orders.filter((order) => {
      const status = normalizeStatus(order.status);

      return ["cancelled", "canceled"].includes(status);
    }).length;

    const revenue = orders.reduce((total, order) => {
      const status = normalizeStatus(order.status);

      if (["cancelled", "canceled"].includes(status)) {
        return total;
      }

      const amount =
        Number(order.total_amount) ||
        Number(order.totalAmount) ||
        Number(order.total_price) ||
        Number(order.totalPrice) ||
        Number(order.total) ||
        0;

      return total + amount;
    }, 0);

    return {
      total: orders.length,
      pending,
      processing,
      completed,
      cancelled,
      revenue,
    };
  }, [orders]);

  const statCards = [
    {
      title: "Total Orders",
      value: stats.total,
      icon: ShoppingBagRoundedIcon,
      iconBg: "#FFF0F7",
      iconColor: "#FF4FA3",
    },
    {
      title: "Pending Orders",
      value: stats.pending,
      icon: PendingActionsRoundedIcon,
      iconBg: "#FFF7E6",
      iconColor: "#F59E0B",
    },
    {
      title: "Processing",
      value: stats.processing,
      icon: AutorenewRoundedIcon,
      iconBg: "#EEF2FF",
      iconColor: "#6366F1",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircleRoundedIcon,
      iconBg: "#ECFDF3",
      iconColor: "#22C55E",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: CancelRoundedIcon,
      iconBg: "#FEF2F2",
      iconColor: "#EF4444",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString("en-IN")}`,
      icon: CurrencyRupeeRoundedIcon,
      iconBg: "#F3E8FF",
      iconColor: "#9333EA",
    },
  ];

  const getStatusColor = (status) => {
    const normalized = String(status || "")
      .toLowerCase()
      .trim();

    if (["delivered", "completed"].includes(normalized)) {
      return "success";
    }

    if (["cancelled", "canceled"].includes(normalized)) {
      return "error";
    }

    if (
      ["processing", "confirmed", "packed", "out_for_delivery"].includes(
        normalized,
      )
    ) {
      return "info";
    }

    return "warning";
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: {
              xs: 24,
              md: 30,
            },
            fontWeight: 800,
            color: "#111111",
            letterSpacing: "-0.7px",
          }}
        >
          Dashboard
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#6B7280",
            fontSize: 14,
          }}
        >
          Overview of your Grabit grocery platform
        </Typography>
      </Box>

      {/* Loading */}
      {loading && (
        <Box
          sx={{
            minHeight: 250,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={34}
            sx={{
              color: "#FF4FA3",
            }}
          />
        </Box>
      )}

      {/* Error */}
      {!loading && error && (
        <Card
          sx={{
            mb: 3,
            borderRadius: 3,
            border: "1px solid #FECACA",
            boxShadow: "none",
            bgcolor: "#FEF2F2",
          }}
        >
          <CardContent>
            <Typography
              sx={{
                color: "#DC2626",
                fontWeight: 600,
              }}
            >
              {error}
            </Typography>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <>
          {/* Statistics */}
          <Grid container spacing={2.5}>
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 2 }} key={stat.title}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      border: "1px solid #E5E7EB",
                      boxShadow: "0 4px 20px rgba(17, 24, 39, 0.04)",
                    }}
                  >
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography
                            sx={{
                              color: "#6B7280",
                              fontSize: 12,
                              fontWeight: 600,
                              mb: 1,
                            }}
                          >
                            {stat.title}
                          </Typography>

                          <Typography
                            sx={{
                              color: "#111111",
                              fontSize: 25,
                              fontWeight: 800,
                            }}
                          >
                            {stat.value}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 3,
                            bgcolor: stat.iconBg,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon
                            sx={{
                              color: stat.iconColor,
                              fontSize: 24,
                            }}
                          />
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Recent Orders */}
          <Card
            sx={{
              mt: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 20px rgba(17, 24, 39, 0.04)",
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "flex-start",
                  sm: "center",
                }}
                spacing={1}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 750,
                      color: "#111111",
                    }}
                  >
                    Recent Orders
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.4,
                      fontSize: 12,
                      color: "#6B7280",
                    }}
                  >
                    Latest orders received by Grabit
                  </Typography>
                </Box>

                <Chip
                  label={`${orders.length} total`}
                  size="small"
                  sx={{
                    bgcolor: "#FFF0F7",
                    color: "#E6328B",
                    fontWeight: 700,
                  }}
                />
              </Stack>

              <Box
                sx={{
                  mt: 3,
                  overflowX: "auto",
                }}
              >
                {orders.length === 0 ? (
                  <Box
                    sx={{
                      py: 6,
                      textAlign: "center",
                    }}
                  >
                    <ShoppingBagRoundedIcon
                      sx={{
                        fontSize: 40,
                        color: "#D1D5DB",
                      }}
                    />

                    <Typography
                      sx={{
                        mt: 1,
                        color: "#6B7280",
                        fontSize: 14,
                      }}
                    >
                      No orders found
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    component="table"
                    sx={{
                      width: "100%",
                      minWidth: 650,
                      borderCollapse: "collapse",

                      "& th": {
                        textAlign: "left",
                        color: "#6B7280",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        borderBottom: "1px solid #E5E7EB",
                        padding: "12px 10px",
                      },

                      "& td": {
                        padding: "15px 10px",
                        borderBottom: "1px solid #F1F2F4",
                        fontSize: 13,
                        color: "#374151",
                      },
                    }}
                  >
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Customer</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.slice(0, 8).map((order) => {
                        const amount =
                          Number(order.total_amount) ||
                          Number(order.totalAmount) ||
                          Number(order.total_price) ||
                          Number(order.totalPrice) ||
                          Number(order.total) ||
                          0;

                        const customer =
                          order.customer_name ||
                          order.customerName ||
                          order.user_name ||
                          order.userName ||
                          order.customer?.name ||
                          "Customer";

                        return (
                          <tr key={order.id}>
                            <td>
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  fontWeight: 700,
                                  color: "#111111",
                                }}
                              >
                                #{String(order.id).slice(0, 8)}
                              </Typography>
                            </td>

                            <td>{customer}</td>

                            <td>
                              <Chip
                                label={order.status || "Pending"}
                                color={getStatusColor(order.status)}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  textTransform: "capitalize",
                                }}
                              />
                            </td>

                            <td>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                }}
                              >
                                ₹{amount.toLocaleString("en-IN")}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default AdminDashboard;
