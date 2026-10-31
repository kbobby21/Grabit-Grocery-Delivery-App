import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";

import { fetchSalesReport } from "../../../redux/slices/adminReportSlice";

/* =========================================================
   GRABIT THEME
========================================================= */

const PINK = "#FF4FA3";
const PINK_DARK = "#E6328B";

const BG = "#F8F8FA";
const TEXT = "#18181B";
const SECONDARY = "#71717A";

/* =========================================================
   FORMATTERS
========================================================= */

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

/* =========================================================
   CARD STYLE
========================================================= */

const cardStyle = {
  borderRadius: 3,
  border: "1px solid #EEEEF2",
  boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
};

/* =========================================================
   SALES REPORT
========================================================= */

const SalesReport = () => {
  const dispatch = useDispatch();

  const { sales, salesLoading, salesError } = useSelector(
    (state) => state.adminReports,
  );

  const [range, setRange] = useState("30days");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  /* =====================================================
     FETCH SALES REPORT
  ===================================================== */

  useEffect(() => {
    dispatch(fetchSalesReport(range));
  }, [dispatch, range]);

  /* =====================================================
     ERROR SNACKBAR
  ===================================================== */

  useEffect(() => {
    if (salesError) {
      setSnackbarOpen(true);
    }
  }, [salesError]);

  /* =====================================================
     API VALUES
  ===================================================== */

  const totalOrders = Number(sales?.total_orders ?? 0);

  const completedOrders = Number(sales?.completed_orders ?? 0);

  const pendingOrders = Number(sales?.pending_orders ?? 0);

  const cancelledOrders = Number(sales?.cancelled_orders ?? 0);

  const totalRevenue = Number(sales?.total_revenue ?? 0);

  const totalDiscount = Number(sales?.total_discount ?? 0);

  const averageOrderValue = Number(sales?.average_order_value ?? 0);

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const completionRate = useMemo(() => {
    if (!totalOrders) return 0;

    return Math.round((completedOrders / totalOrders) * 100);
  }, [completedOrders, totalOrders]);

  const pendingRate = useMemo(() => {
    if (!totalOrders) return 0;

    return Math.round((pendingOrders / totalOrders) * 100);
  }, [pendingOrders, totalOrders]);

  const cancelledRate = useMemo(() => {
    if (!totalOrders) return 0;

    return Math.round((cancelledOrders / totalOrders) * 100);
  }, [cancelledOrders, totalOrders]);

  /* =====================================================
     RANGE LABEL
  ===================================================== */

  const rangeLabel =
    range === "today"
      ? "Today"
      : range === "7days"
        ? "Last 7 Days"
        : range === "90days"
          ? "Last 90 Days"
          : "Last 30 Days";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: BG,
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* =================================================
          HEADER
      ================================================= */}

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
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 0.8 }}
          >
            {/* Header Icon */}

            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FF4FA3, #E6328B)",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(255,79,163,0.25)",
              }}
            >
              <TrendingUpRoundedIcon />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 26,
                  sm: 30,
                  md: 32,
                },
                fontWeight: 800,
                color: TEXT,
                letterSpacing: "-0.8px",
              }}
            >
              Sales Report
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: SECONDARY,
              fontSize: 14,
              ml: {
                xs: 0,
                sm: 7.2,
              },
            }}
          >
            Detailed sales and order performance
          </Typography>
        </Box>

        {/* DATE / RANGE SELECTOR */}

        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          sx={{
            minWidth: 165,
            bgcolor: "#fff",
            borderRadius: 2,
            fontSize: 13,
            fontWeight: 600,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E4E4E7",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: PINK,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: PINK,
            },
          }}
        >
          <MenuItem value="today">Today</MenuItem>

          <MenuItem value="7days">Last 7 Days</MenuItem>

          <MenuItem value="30days">Last 30 Days</MenuItem>

          <MenuItem value="90days">Last 90 Days</MenuItem>
        </Select>
      </Stack>

      {/* =================================================
          SALES REPORT OVERVIEW
          MOVED TO TOP
      ================================================= */}

      <Box sx={{ mb: 3 }}>
        <Card
          sx={{
            ...cardStyle,
            background: "linear-gradient(135deg, #18181B 0%, #27272A 100%)",
            color: "#fff",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2.5,
                sm: 3,
                md: 3.5,
              },

              "&:last-child": {
                pb: {
                  xs: 2.5,
                  sm: 3,
                  md: 3.5,
                },
              },
            }}
          >
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
              spacing={2}
            >
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 16,
                        sm: 18,
                      },
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    Sales report overview
                  </Typography>

                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      bgcolor: PINK,
                      boxShadow: "0 0 0 4px rgba(255,79,163,0.1)",
                    }}
                  />
                </Stack>

                <Typography
                  sx={{
                    fontSize: 12.5,
                    color: "#A1A1AA",
                    mt: 0.6,
                  }}
                >
                  Showing sales data for the selected period.
                </Typography>
              </Box>

              <Chip
                label={rangeLabel}
                sx={{
                  bgcolor: "rgba(255,79,163,0.15)",
                  color: "#FF7DBB",
                  fontWeight: 700,
                  border: "1px solid rgba(255,79,163,0.2)",
                  px: 0.5,
                }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* =================================================
          ERROR
      ================================================= */}

      {salesError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
          }}
        >
          {salesError}
        </Alert>
      )}

      {/* =================================================
          ORDER METRICS
      ================================================= */}

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <Metric
            title="Total Orders"
            value={number(totalOrders)}
            subtitle="Orders received"
            icon={<ShoppingBagRoundedIcon />}
            loading={salesLoading}
            type="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Metric
            title="Completed Orders"
            value={number(completedOrders)}
            subtitle={`${completionRate}% completion rate`}
            icon={<CheckCircleRoundedIcon />}
            loading={salesLoading}
            type="success"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Metric
            title="Pending Orders"
            value={number(pendingOrders)}
            subtitle={`${pendingRate}% of total orders`}
            icon={<PendingActionsRoundedIcon />}
            loading={salesLoading}
            type="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Metric
            title="Cancelled Orders"
            value={number(cancelledOrders)}
            subtitle={`${cancelledRate}% of total orders`}
            icon={<CancelRoundedIcon />}
            loading={salesLoading}
            type="danger"
          />
        </Grid>
      </Grid>

      {/* =================================================
          FINANCIAL METRICS
      ================================================= */}

      <Grid container spacing={2.5} sx={{ mt: 0 }}>
        <Grid item xs={12} md={4}>
          <Metric
            title="Total Revenue"
            value={currency(totalRevenue)}
            subtitle="Gross sales revenue"
            icon={<CurrencyRupeeRoundedIcon />}
            loading={salesLoading}
            type="primary"
            large
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Metric
            title="Total Discount"
            value={currency(totalDiscount)}
            subtitle="Discount given to customers"
            icon={<CurrencyRupeeRoundedIcon />}
            loading={salesLoading}
            type="warning"
            large
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Metric
            title="Average Order Value"
            value={currency(averageOrderValue)}
            subtitle="Average value per order"
            icon={<CurrencyRupeeRoundedIcon />}
            loading={salesLoading}
            type="success"
            large
          />
        </Grid>
      </Grid>

      {/* =================================================
          ANALYTICS
      ================================================= */}

      <Grid container spacing={2.5} sx={{ mt: 0 }}>
        {/* ===============================================
            ORDER PERFORMANCE
        =============================================== */}

        <Grid item xs={12} lg={7}>
          <Card
            sx={{
              ...cardStyle,
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  sm: 3.5,
                  md: 4,
                },

                "&:last-child": {
                  pb: {
                    xs: 3,
                    sm: 3.5,
                    md: 4,
                  },
                },
              }}
            >
              <SectionTitle
                title="Order Performance"
                subtitle="Current order status distribution"
              />

              <Divider
                sx={{
                  mb: 3.5,
                }}
              />

              {/* COMPLETED */}

              <OrderStatusBar
                label="Completed"
                value={completedOrders}
                percentage={completionRate}
                color="#22C55E"
              />

              <Box sx={{ height: 14 }} />

              {/* PENDING */}

              <OrderStatusBar
                label="Pending"
                value={pendingOrders}
                percentage={pendingRate}
                color="#F59E0B"
              />

              <Box sx={{ height: 14 }} />

              {/* CANCELLED */}

              <OrderStatusBar
                label="Cancelled"
                value={cancelledOrders}
                percentage={cancelledRate}
                color="#EF4444"
              />

              {/* TOTAL */}

              <Box
                sx={{
                  mt: 4,
                  p: {
                    xs: 2,
                    sm: 2.5,
                  },
                  borderRadius: 2.5,
                  bgcolor: "#FAFAFA",
                  border: "1px solid #F0F0F2",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: SECONDARY,
                        fontWeight: 600,
                      }}
                    >
                      Total orders in selected period
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: TEXT,
                        mt: 0.5,
                      }}
                    >
                      {number(totalOrders)}
                    </Typography>
                  </Box>

                  {/* COMPLETION CIRCLE */}

                  <Box
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: "50%",
                      border: `6px solid ${PINK}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#fff",
                      boxShadow: "0 5px 15px rgba(255,79,163,0.12)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: PINK_DARK,
                      }}
                    >
                      {completionRate}%
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ===============================================
            REVENUE SUMMARY
        =============================================== */}

        <Grid item xs={12} lg={5}>
          <Card
            sx={{
              ...cardStyle,
              height: "100%",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 3,
                  sm: 3.5,
                  md: 4,
                },

                "&:last-child": {
                  pb: {
                    xs: 3,
                    sm: 3.5,
                    md: 4,
                  },
                },
              }}
            >
              <SectionTitle
                title="Revenue Summary"
                subtitle="Financial performance"
              />

              <Divider sx={{ mb: 2 }} />

              <RevenueRow
                label="Total Revenue"
                value={currency(totalRevenue)}
                primary
              />

              <RevenueRow
                label="Total Discount"
                value={currency(totalDiscount)}
              />

              <RevenueRow
                label="Average Order Value"
                value={currency(averageOrderValue)}
              />

              {/* REVENUE HIGHLIGHT */}

              <Box
                sx={{
                  mt: 3,
                  p: 2.5,
                  borderRadius: 2.5,
                  background:
                    "linear-gradient(135deg, rgba(255,79,163,0.09), rgba(230,50,139,0.04))",
                  border: "1px solid rgba(255,79,163,0.12)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: SECONDARY,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      Revenue per Order
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: PINK_DARK,
                        mt: 0.5,
                      }}
                    >
                      {currency(averageOrderValue)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2,
                      bgcolor: "#fff",
                      color: PINK,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(255,79,163,0.1)",
                    }}
                  >
                    <PercentRoundedIcon />
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =================================================
          SNACKBAR
      ================================================= */}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {salesError || "Unable to load sales report"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

const Metric = ({
  title,
  value,
  subtitle,
  icon,
  loading,
  type = "primary",
  large = false,
}) => {
  const styles = {
    primary: {
      bg: "rgba(255,79,163,0.1)",
      color: PINK,
    },

    success: {
      bg: "rgba(34,197,94,0.1)",
      color: "#16A34A",
    },

    warning: {
      bg: "rgba(245,158,11,0.1)",
      color: "#D97706",
    },

    danger: {
      bg: "rgba(239,68,68,0.1)",
      color: "#DC2626",
    },
  };

  const style = styles[type];

  return (
    <Card
      sx={{
        ...cardStyle,
        height: "100%",
        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
        },
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 2.5,
            sm: 3,
          },

          "&:last-child": {
            pb: {
              xs: 2.5,
              sm: 3,
            },
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 12.5,
                color: SECONDARY,
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: large ? 25 : 26,
                fontWeight: 800,
                color: TEXT,
                mt: 0.7,
                letterSpacing: "-0.5px",
                whiteSpace: "nowrap",
              }}
            >
              {loading ? "..." : value}
            </Typography>

            <Typography
              sx={{
                fontSize: 11.5,
                color: "#A1A1AA",
                mt: 0.4,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 46,
              height: 46,
              borderRadius: 2.5,
              bgcolor: style.bg,
              color: style.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

/* =========================================================
   SECTION TITLE
========================================================= */

const SectionTitle = ({ title, subtitle }) => (
  <Box sx={{ mb: 2 }}>
    <Typography
      sx={{
        fontSize: 17,
        fontWeight: 800,
        color: TEXT,
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        fontSize: 12,
        color: SECONDARY,
        mt: 0.4,
      }}
    >
      {subtitle}
    </Typography>
  </Box>
);

/* =========================================================
   ORDER STATUS BAR
========================================================= */

const OrderStatusBar = ({ label, value, percentage, color }) => (
  <Box>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            bgcolor: color,
            boxShadow: `0 0 0 4px ${color}18`,
          }}
        />

        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: "#27272A",
          }}
        >
          {label}
        </Typography>
      </Stack>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#52525B",
        }}
      >
        {number(value)} ({percentage}%)
      </Typography>
    </Stack>

    {/* PROGRESS BAR */}

    <Box
      sx={{
        height: 10,
        bgcolor: "#F1F1F4",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${percentage}%`,
          height: "100%",
          bgcolor: color,
          borderRadius: 10,
          transition: "width 0.4s ease",
        }}
      />
    </Box>
  </Box>
);

/* =========================================================
   REVENUE ROW
========================================================= */

const RevenueRow = ({ label, value, primary = false }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{
      py: 1.7,
      borderBottom: "1px solid #F1F1F4",
    }}
  >
    <Typography
      sx={{
        fontSize: 13,
        color: SECONDARY,
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        fontSize: primary ? 18 : 14,
        color: primary ? PINK_DARK : "#27272A",
        fontWeight: 800,
      }}
    >
      {value}
    </Typography>
  </Stack>
);

export default SalesReport;
