import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchAdminOrders } from "../../redux/slices/adminOrderSlice";
import PATHS from "../../routes/paths";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    orders = [],
    loading,
    error,
  } = useSelector((state) => state.adminOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  /*
  |--------------------------------------------------------------------------
  | LOAD ORDERS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  const getStatus = (order) => {
    return String(order.status || "pending")
      .toLowerCase()
      .trim();
  };

  const getCustomerName = (order) => {
    return (
      order.customer_name ||
      order.customerName ||
      order.user_name ||
      order.userName ||
      order.customer?.name ||
      order.user?.name ||
      "Customer"
    );
  };

  const getAmount = (order) => {
    return (
      Number(order.total_amount) ||
      Number(order.totalAmount) ||
      Number(order.total_price) ||
      Number(order.totalPrice) ||
      Number(order.total) ||
      0
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
      case "completed":
        return "success";

      case "cancelled":
      case "canceled":
        return "error";

      case "processing":
      case "confirmed":
      case "packed":
      case "out_for_delivery":
        return "info";

      default:
        return "warning";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FILTER ORDERS
  |--------------------------------------------------------------------------
  */

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase().trim();

    return orders.filter((order) => {
      const status = getStatus(order);

      const orderId = String(order.id || "").toLowerCase();

      const customer = getCustomerName(order).toLowerCase();

      const matchesSearch =
        !query || orderId.includes(query) || customer.includes(query);

      const matchesStatus = statusFilter === "all" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  /*
  |--------------------------------------------------------------------------
  | SUMMARY
  |--------------------------------------------------------------------------
  */

  const pendingCount = orders.filter(
    (order) => getStatus(order) === "pending",
  ).length;

  const deliveredCount = orders.filter(
    (order) => getStatus(order) === "delivered",
  ).length;

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION
  |--------------------------------------------------------------------------
  */

  const handleViewOrder = (orderId) => {
    navigate(PATHS.ADMIN_ORDER_DETAILS.replace(":id", String(orderId)));
  };

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = () => {
    dispatch(fetchAdminOrders());
  };

  /*
  |--------------------------------------------------------------------------
  | SUMMARY CARD CLICK
  |--------------------------------------------------------------------------
  */

  const handleTotalOrdersClick = () => {
    setStatusFilter("all");
    setSearch("");
  };

  const handlePendingClick = () => {
    setStatusFilter("pending");
    setSearch("");
  };

  return (
    <Box>
      {/* ------------------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------------------ */}

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
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
            Orders
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Manage and monitor customer orders
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<RefreshRoundedIcon />}
          onClick={handleRefresh}
          disabled={loading}
          sx={{
            minHeight: 42,
            borderRadius: 2.5,
            borderColor: "#E5E7EB",
            color: "#374151",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#FF4FA3",
              color: "#FF4FA3",
              bgcolor: "#FFF5F9",
            },
          }}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </Stack>

      {/* ------------------------------------------------------------------ */}
      {/* SUMMARY CARDS */}
      {/* ------------------------------------------------------------------ */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* TOTAL ORDERS */}

        <Card
          onClick={handleTotalOrdersClick}
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#FF4FA3",
              boxShadow: "0 8px 25px rgba(255,79,163,0.10)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ p: 2.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#FFF0F7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagRoundedIcon sx={{ color: "#FF4FA3" }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Total Orders
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                {orders.length}
              </Typography>
            </Box>

            <ArrowForwardRoundedIcon
              sx={{
                color: "#9CA3AF",
                fontSize: 20,
              }}
            />
          </Stack>
        </Card>

        {/* PENDING */}

        <Card
          onClick={handlePendingClick}
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#F59E0B",
              boxShadow: "0 8px 25px rgba(245,158,11,0.10)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ p: 2.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#FFF7E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagRoundedIcon sx={{ color: "#F59E0B" }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Pending Orders
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                {pendingCount}
              </Typography>
            </Box>

            <ArrowForwardRoundedIcon
              sx={{
                color: "#9CA3AF",
                fontSize: 20,
              }}
            />
          </Stack>
        </Card>

        {/* DELIVERED */}

        <Card
          onClick={() => {
            setStatusFilter("delivered");
            setSearch("");
          }}
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#22C55E",
              boxShadow: "0 8px 25px rgba(34,197,94,0.10)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ p: 2.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#DCFCE7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagRoundedIcon sx={{ color: "#16A34A" }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Delivered
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                {deliveredCount}
              </Typography>
            </Box>

            <ArrowForwardRoundedIcon
              sx={{
                color: "#9CA3AF",
                fontSize: 20,
              }}
            />
          </Stack>
        </Card>
      </Stack>

      {/* ------------------------------------------------------------------ */}
      {/* FILTERS */}
      {/* ------------------------------------------------------------------ */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          sx={{ p: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{
                      color: "#9CA3AF",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: {
                md: 420,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />

          <Select
            size="small"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            sx={{
              minWidth: 180,
              borderRadius: 2.5,
            }}
          >
            <MenuItem value="all">All Statuses</MenuItem>

            <MenuItem value="pending">Pending</MenuItem>

            <MenuItem value="processing">Processing</MenuItem>

            <MenuItem value="confirmed">Confirmed</MenuItem>

            <MenuItem value="packed">Packed</MenuItem>

            <MenuItem value="out_for_delivery">Out for Delivery</MenuItem>

            <MenuItem value="delivered">Delivered</MenuItem>

            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </Stack>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* ERROR */}
      {/* ------------------------------------------------------------------ */}

      {error && (
        <Card
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 3,
            border: "1px solid #FECACA",
            bgcolor: "#FEF2F2",
            boxShadow: "none",
          }}
        >
          <Typography
            sx={{
              color: "#DC2626",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {error}
          </Typography>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* ORDERS TABLE */}
      {/* ------------------------------------------------------------------ */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {loading && orders.length === 0 ? (
          <Box
            sx={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#FF4FA3",
              }}
            />
          </Box>
        ) : filteredOrders.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
            }}
          >
            <ShoppingBagRoundedIcon
              sx={{
                fontSize: 48,
                color: "#D1D5DB",
              }}
            />

            <Typography
              sx={{
                mt: 1.5,
                fontSize: 16,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              No orders found
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#9CA3AF",
              }}
            >
              Try changing your search or filter.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 850 }}>
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#FAFAFA",
                  }}
                >
                  <TableCell sx={headerCell}>Order</TableCell>

                  <TableCell sx={headerCell}>Customer</TableCell>

                  <TableCell sx={headerCell}>Date</TableCell>

                  <TableCell sx={headerCell}>Amount</TableCell>

                  <TableCell sx={headerCell}>Status</TableCell>

                  <TableCell align="right" sx={headerCell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredOrders.map((order) => {
                  const status = getStatus(order);

                  const amount = getAmount(order);

                  const customer = getCustomerName(order);

                  const date =
                    order.created_at ||
                    order.createdAt ||
                    order.order_date ||
                    order.orderDate;

                  return (
                    <TableRow
                      key={order.id}
                      hover
                      onClick={() => handleViewOrder(order.id)}
                      sx={{
                        cursor: "pointer",

                        transition: "background-color 0.15s ease",

                        "&:hover": {
                          bgcolor: "#FFF8FB",
                        },

                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#111111",
                          }}
                        >
                          #{String(order.id).slice(0, 8)}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#374151",
                          }}
                        >
                          {customer}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 12,
                            color: "#6B7280",
                          }}
                        >
                          {date
                            ? new Date(date).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "-"}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#111111",
                          }}
                        >
                          ₹{amount.toLocaleString("en-IN")}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={status.replace(/_/g, " ")}
                          color={getStatusColor(status)}
                          size="small"
                          sx={{
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <IconButton
                          onClick={(event) => {
                            event.stopPropagation();

                            handleViewOrder(order.id);
                          }}
                          aria-label="View order"
                          sx={{
                            width: 36,
                            height: 36,
                            color: "#FF4FA3",
                            bgcolor: "#FFF5F9",

                            "&:hover": {
                              bgcolor: "#FFE5F0",
                            },
                          }}
                        >
                          <VisibilityRoundedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
};

/*
|--------------------------------------------------------------------------
| TABLE HEADER STYLE
|--------------------------------------------------------------------------
*/

const headerCell = {
  fontSize: 11,
  fontWeight: 800,
  color: "#6B7280",
  textTransform: "uppercase",
};

export default AdminOrders;
