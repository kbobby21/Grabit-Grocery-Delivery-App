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
  LinearProgress,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import { fetchCategoryReport } from "../../../redux/slices/adminReportSlice";

/* =========================================================
   GRABIT THEME
========================================================= */

const PINK = "#FF4FA3";
const PINK_DARK = "#E6328B";

const BG = "#F8F8FA";
const TEXT = "#18181B";
const SECONDARY = "#71717A";
const BORDER = "#EEEEF2";

/* =========================================================
   COMMON CARD
========================================================= */

const cardStyle = {
  borderRadius: 3,
  border: `1px solid ${BORDER}`,
  boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
};

/* =========================================================
   FORMATTERS
========================================================= */

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

/* =========================================================
   CATEGORY REPORT
========================================================= */

const CategoryReport = () => {
  const dispatch = useDispatch();

  const { categories, categoryLoading, categoryError } = useSelector(
    (state) => state.adminReports,
  );

  const [range, setRange] = useState("30days");

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  /* =====================================================
     FETCH DATA
  ===================================================== */

  useEffect(() => {
    dispatch(fetchCategoryReport(range));
  }, [dispatch, range]);

  /* =====================================================
     KEEP ORIGINAL DATA STRUCTURE
  ===================================================== */

  const data = Array.isArray(categories) ? categories : [];

  /* =====================================================
     ERROR SNACKBAR
  ===================================================== */

  useEffect(() => {
    if (categoryError) {
      setSnackbarOpen(true);
    }
  }, [categoryError]);

  /* =====================================================
     CALCULATE SUMMARY FROM EXISTING DATA
     NO API DATA IS CHANGED
  ===================================================== */

  const summary = useMemo(() => {
    return data.reduce(
      (acc, category) => {
        const revenue = Number(category.revenue ?? category.total_revenue ?? 0);

        const orders = Number(category.orders ?? category.total_orders ?? 0);

        const units = Number(category.units_sold ?? category.quantity ?? 0);

        acc.revenue += revenue;
        acc.orders += orders;
        acc.units += units;

        return acc;
      },
      {
        revenue: 0,
        orders: 0,
        units: 0,
      },
    );
  }, [data]);

  /* =====================================================
     FIND TOP CATEGORY
  ===================================================== */

  const topCategory = useMemo(() => {
    if (!data.length) return null;

    return data.reduce((best, category) => {
      const currentRevenue = Number(
        category.revenue ?? category.total_revenue ?? 0,
      );

      const bestRevenue = Number(best?.revenue ?? best?.total_revenue ?? 0);

      return currentRevenue > bestRevenue ? category : best;
    }, data[0]);
  }, [data]);

  const topCategoryName = topCategory
    ? topCategory.category_name || topCategory.name || "Top Category"
    : "—";

  const topCategoryRevenue = topCategory
    ? Number(topCategory.revenue ?? topCategory.total_revenue ?? 0)
    : 0;

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

  /* =====================================================
     MAX REVENUE FOR BARS
  ===================================================== */

  const maxRevenue = useMemo(() => {
    if (!data.length) return 0;

    return Math.max(
      ...data.map((category) =>
        Number(category.revenue ?? category.total_revenue ?? 0),
      ),
    );
  }, [data]);

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
              <CategoryRoundedIcon />
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
              Category Report
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
            Category-wise sales performance
          </Typography>
        </Box>

        {/* DATE SELECTOR */}

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
          OVERVIEW BANNER
      ================================================= */}

      <Card
        sx={{
          ...cardStyle,
          mb: 3,
          background: "linear-gradient(135deg, #18181B 0%, #27272A 100%)",
          color: "#fff",
          overflow: "hidden",
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
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  Category Sales Overview
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
                Sales performance for the selected reporting period.
              </Typography>
            </Box>

            <Chip
              label={rangeLabel}
              sx={{
                bgcolor: "rgba(255,79,163,0.15)",
                color: "#FF7DBB",
                fontWeight: 700,
                border: "1px solid rgba(255,79,163,0.2)",
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* =================================================
          ERROR
      ================================================= */}

      {categoryError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
          }}
        >
          {categoryError}
        </Alert>
      )}

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Categories"
            value={number(data.length)}
            subtitle="Categories with sales data"
            icon={<CategoryRoundedIcon />}
            color="pink"
            loading={categoryLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Revenue"
            value={currency(summary.revenue)}
            subtitle="Category sales revenue"
            icon={<CurrencyRupeeRoundedIcon />}
            color="pink"
            loading={categoryLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Orders"
            value={number(summary.orders)}
            subtitle="Orders across categories"
            icon={<ShoppingBagRoundedIcon />}
            color="green"
            loading={categoryLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Units Sold"
            value={number(summary.units)}
            subtitle="Total units sold"
            icon={<Inventory2RoundedIcon />}
            color="purple"
            loading={categoryLoading}
          />
        </Grid>
      </Grid>

      {/* =================================================
          TOP CATEGORY
      ================================================= */}

      {!categoryLoading && data.length > 0 && (
        <Card
          sx={{
            ...cardStyle,
            mb: 3,
            background:
              "linear-gradient(135deg, rgba(255,79,163,0.08), rgba(255,255,255,1))",
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
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    bgcolor: "rgba(255,79,163,0.12)",
                    color: PINK,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WorkspacePremiumRoundedIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: SECONDARY,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 0.6,
                    }}
                  >
                    Top Performing Category
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: 800,
                      color: TEXT,
                      mt: 0.3,
                    }}
                  >
                    {topCategoryName}
                  </Typography>
                </Box>
              </Stack>

              <Box
                sx={{
                  textAlign: {
                    xs: "left",
                    sm: "right",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,
                    color: SECONDARY,
                    fontWeight: 600,
                  }}
                >
                  Revenue
                </Typography>

                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: PINK_DARK,
                  }}
                >
                  {currency(topCategoryRevenue)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* =================================================
          CATEGORY SALES
      ================================================= */}

      <Card sx={cardStyle}>
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
            spacing={1}
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: TEXT,
                }}
              >
                Category Sales
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: SECONDARY,
                  mt: 0.4,
                }}
              >
                Revenue, orders and units by category
              </Typography>
            </Box>

            {!categoryLoading && data.length > 0 && (
              <Chip
                size="small"
                label={`${data.length} categories`}
                sx={{
                  bgcolor: "rgba(255,79,163,0.08)",
                  color: PINK_DARK,
                  fontWeight: 700,
                }}
              />
            )}
          </Stack>

          <Divider sx={{ mb: 2.5 }} />

          {/* LOADING */}

          {categoryLoading ? (
            <Loading />
          ) : data.length === 0 ? (
            <Empty />
          ) : (
            <Stack spacing={1.5}>
              {data.map((category, index) => {
                const name =
                  category.category_name ||
                  category.name ||
                  `Category ${index + 1}`;

                const revenue = category.revenue ?? category.total_revenue ?? 0;

                const orders = category.orders ?? category.total_orders ?? 0;

                const units = category.units_sold ?? category.quantity ?? 0;

                const revenueNumber = Number(revenue);

                const progress =
                  maxRevenue > 0 ? (revenueNumber / maxRevenue) * 100 : 0;

                return (
                  <Box
                    key={`${category.category_id ?? name}-${index}`}
                    sx={{
                      p: {
                        xs: 2,
                        sm: 2.5,
                      },
                      borderRadius: 2.5,
                      bgcolor: "#FAFAFA",
                      border: "1px solid #F0F0F2",
                      transition: "all 0.2s ease",

                      "&:hover": {
                        bgcolor: "#fff",
                        borderColor: "rgba(255,79,163,0.2)",
                        transform: "translateY(-1px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    {/* TOP ROW */}

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
                      spacing={1.5}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        {/* RANK */}

                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: index === 0 ? PINK : "#F1F1F4",
                            color: index === 0 ? "#fff" : "#71717A",
                            fontSize: 12,
                            fontWeight: 800,
                            flexShrink: 0,
                          }}
                        >
                          #{index + 1}
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 800,
                              color: TEXT,
                            }}
                          >
                            {name}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 11.5,
                              color: SECONDARY,
                              mt: 0.3,
                            }}
                          >
                            {number(orders)} orders · {number(units)} units
                          </Typography>
                        </Box>
                      </Stack>

                      {/* REVENUE */}

                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: PINK_DARK,
                        }}
                      >
                        {currency(revenue)}
                      </Typography>
                    </Stack>

                    {/* REVENUE BAR */}

                    <Box sx={{ mt: 2 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 0.7 }}
                      >
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: SECONDARY,
                            fontWeight: 600,
                          }}
                        >
                          Revenue performance
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: SECONDARY,
                            fontWeight: 700,
                          }}
                        >
                          {Math.round(progress)}%
                        </Typography>
                      </Stack>

                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                          height: 7,
                          borderRadius: 10,
                          bgcolor: "#EEEEF2",

                          "& .MuiLinearProgress-bar": {
                            borderRadius: 10,
                            background:
                              "linear-gradient(90deg, #FF4FA3, #E6328B)",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          )}
        </CardContent>
      </Card>

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
          {categoryError || "Unable to load category report"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

const MetricCard = ({
  title,
  value,
  subtitle,
  icon,
  color = "pink",
  loading,
}) => {
  const styles = {
    pink: {
      bg: "rgba(255,79,163,0.1)",
      color: PINK,
    },

    green: {
      bg: "rgba(34,197,94,0.1)",
      color: "#16A34A",
    },

    purple: {
      bg: "rgba(139,92,246,0.1)",
      color: "#7C3AED",
    },
  };

  const style = styles[color] || styles.pink;

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
                fontSize: 24,
                fontWeight: 800,
                color: TEXT,
                mt: 0.7,
                letterSpacing: "-0.5px",
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
   LOADING
========================================================= */

const Loading = () => (
  <Box
    sx={{
      py: 8,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        border: "3px solid #F1F1F4",
        borderTopColor: PINK,
        mx: "auto",
        mb: 2,
        animation: "spin 0.8s linear infinite",

        "@keyframes spin": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      }}
    />

    <Typography
      sx={{
        color: SECONDARY,
        fontSize: 13,
      }}
    >
      Loading category report...
    </Typography>
  </Box>
);

/* =========================================================
   EMPTY
========================================================= */

const Empty = () => (
  <Box
    sx={{
      py: 8,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: 3,
        bgcolor: "rgba(255,79,163,0.08)",
        color: PINK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mb: 2,
      }}
    >
      <CategoryRoundedIcon />
    </Box>

    <Typography
      sx={{
        fontWeight: 800,
        color: TEXT,
        fontSize: 15,
      }}
    >
      No category data found
    </Typography>

    <Typography
      sx={{
        color: SECONDARY,
        fontSize: 12,
        mt: 0.5,
      }}
    >
      There are no sales records for the selected period.
    </Typography>
  </Box>
);

export default CategoryReport;
