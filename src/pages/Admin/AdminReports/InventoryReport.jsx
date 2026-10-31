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
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";

import { fetchInventoryReport } from "../../../redux/slices/adminReportSlice";

const PINK = "#FF4FA3";
const PINK_DARK = "#E6328B";

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

const InventoryReport = () => {
  const dispatch = useDispatch();

  const {
    inventoryOverview,
    lowStockProducts,
    inventoryCategories,
    inventoryLoading,
    inventoryError,
  } = useSelector((state) => state.adminReports);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchInventoryReport("low_stock"));
  }, [dispatch]);

  useEffect(() => {
    if (inventoryError) {
      setSnackbarOpen(true);
    }
  }, [inventoryError]);

  const products = Array.isArray(lowStockProducts) ? lowStockProducts : [];

  const categories = Array.isArray(inventoryCategories)
    ? inventoryCategories
    : [];

  const totalProducts = Number(inventoryOverview?.total_products ?? 0);

  const lowStock = Number(inventoryOverview?.low_stock ?? 0);

  const outOfStock = Number(inventoryOverview?.out_of_stock ?? 0);

  const healthyStock = Math.max(totalProducts - lowStock - outOfStock, 0);

  const healthyPercentage = useMemo(() => {
    if (!totalProducts) return 0;

    return Math.round((healthyStock / totalProducts) * 100);
  }, [totalProducts, healthyStock]);

  const lowStockPercentage = useMemo(() => {
    if (!totalProducts) return 0;

    return Math.round((lowStock / totalProducts) * 100);
  }, [totalProducts, lowStock]);

  const outOfStockPercentage = useMemo(() => {
    if (!totalProducts) return 0;

    return Math.round((outOfStock / totalProducts) * 100);
  }, [totalProducts, outOfStock]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8F8FA",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "space-between",
          alignItems: {
            xs: "flex-start",
            md: "center",
          },
          gap: 2,
        }}
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
                width: 44,
                height: 44,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FF4FA3, #E6328B)",
                color: "#fff",
                boxShadow: "0 8px 20px rgba(255,79,163,0.25)",
              }}
            >
              <InventoryRoundedIcon />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 26,
                  sm: 30,
                  md: 32,
                },
                fontWeight: 800,
                color: "#18181B",
                letterSpacing: "-0.8px",
              }}
            >
              Inventory Report
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: "#71717A",
              fontSize: 14,
              ml: {
                xs: 0,
                sm: 6.5,
              },
            }}
          >
            Monitor inventory levels and identify products that need attention.
          </Typography>
        </Box>

        <Chip
          icon={<Inventory2RoundedIcon />}
          label="Inventory Overview"
          sx={{
            height: 38,
            px: 1,
            borderRadius: 2,
            bgcolor: "rgba(255,79,163,0.09)",
            color: PINK_DARK,
            fontWeight: 700,
            "& .MuiChip-icon": {
              color: PINK,
            },
          }}
        />
      </Box>

      {/* =====================================================
          ERROR ALERT
      ===================================================== */}

      {inventoryError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
          }}
        >
          {inventoryError}
        </Alert>
      )}

      {/* =====================================================
          METRIC CARDS
      ===================================================== */}

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={4}>
          <MetricCard
            title="Total Products"
            value={number(totalProducts)}
            subtitle="Products in inventory"
            icon={<Inventory2RoundedIcon />}
            loading={inventoryLoading}
            type="total"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <MetricCard
            title="Low Stock"
            value={number(lowStock)}
            subtitle={`${lowStockPercentage}% of inventory`}
            icon={<WarningAmberRoundedIcon />}
            loading={inventoryLoading}
            type="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <MetricCard
            title="Out of Stock"
            value={number(outOfStock)}
            subtitle={`${outOfStockPercentage}% of inventory`}
            icon={<RemoveShoppingCartRoundedIcon />}
            loading={inventoryLoading}
            type="danger"
          />
        </Grid>
      </Grid>

      {/* =====================================================
          INVENTORY HEALTH
      ===================================================== */}

      <Card
        sx={{
          mt: 2.5,
          borderRadius: 3,
          border: "1px solid #EEEEF2",
          boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
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
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#18181B",
                }}
              >
                Inventory Health
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#71717A",
                  mt: 0.5,
                }}
              >
                Overall stock condition
              </Typography>
            </Box>

            <Box
              sx={{
                minWidth: 90,
                textAlign: "center",
                px: 1.5,
                py: 0.8,
                borderRadius: 2,
                bgcolor:
                  healthyPercentage >= 70
                    ? "rgba(34,197,94,0.1)"
                    : "rgba(245,158,11,0.1)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: healthyPercentage >= 70 ? "#16A34A" : "#D97706",
                }}
              >
                {healthyPercentage}%
              </Typography>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "#71717A",
                  fontWeight: 600,
                }}
              >
                HEALTHY
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              height: 10,
              borderRadius: 10,
              bgcolor: "#F1F1F4",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: `${healthyPercentage}%`,
                bgcolor: "#22C55E",
                transition: "width 0.4s ease",
              }}
            />

            <Box
              sx={{
                width: `${lowStockPercentage}%`,
                bgcolor: "#F59E0B",
                transition: "width 0.4s ease",
              }}
            />

            <Box
              sx={{
                width: `${outOfStockPercentage}%`,
                bgcolor: "#EF4444",
                transition: "width 0.4s ease",
              }}
            />
          </Box>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              mt: 2,
              flexWrap: "wrap",
              rowGap: 1,
            }}
          >
            <Legend color="#22C55E" label={`Healthy ${number(healthyStock)}`} />

            <Legend color="#F59E0B" label={`Low Stock ${number(lowStock)}`} />

            <Legend
              color="#EF4444"
              label={`Out of Stock ${number(outOfStock)}`}
            />
          </Stack>
        </CardContent>
      </Card>

      {/* =====================================================
          LOW STOCK + CATEGORY
      ===================================================== */}

      <Grid container spacing={2.5} sx={{ mt: 0 }}>
        {/* ===================================================
            LOW STOCK PRODUCTS
        =================================================== */}

        <Grid item xs={12} lg={7}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              border: "1px solid #EEEEF2",
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  md: 3,
                },
              }}
            >
              <SectionHeader
                icon={<WarningAmberRoundedIcon />}
                title="Low Stock Products"
                subtitle="Products that need restocking"
                count={products.length}
              />

              <Divider sx={{ mb: 2 }} />

              {inventoryLoading ? (
                <Loading />
              ) : products.length === 0 ? (
                <Empty message="No low stock products" />
              ) : (
                <Stack spacing={1.2}>
                  {products.map((product, index) => {
                    const stock =
                      product.stock_quantity ??
                      product.stock ??
                      product.quantity ??
                      0;

                    return (
                      <Box
                        key={`${product.product_id ?? "product"}-${index}`}
                        sx={{
                          p: 2,
                          borderRadius: 2.5,
                          border: "1px solid #F1E6E8",
                          bgcolor: "#FFFAFA",
                          transition: "all 0.2s ease",

                          "&:hover": {
                            borderColor: "rgba(255,79,163,0.25)",
                            transform: "translateY(-1px)",
                            boxShadow: "0 5px 18px rgba(0,0,0,0.04)",
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
                          spacing={1.5}
                        >
                          <Box
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 700,
                                color: "#27272A",
                              }}
                            >
                              {product.product_name ||
                                product.name ||
                                "Unknown Product"}
                            </Typography>

                            {product.category_name && (
                              <Typography
                                sx={{
                                  fontSize: 12,
                                  color: "#71717A",
                                  mt: 0.4,
                                }}
                              >
                                {product.category_name}
                              </Typography>
                            )}
                          </Box>

                          <Chip
                            label={`${number(stock)} left`}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              bgcolor: "rgba(239,68,68,0.09)",
                              color: "#DC2626",
                              borderRadius: 1.5,
                            }}
                          />
                        </Stack>

                        <Box sx={{ mt: 1.5 }}>
                          <LinearProgress
                            variant="determinate"
                            value={Math.min(Number(stock) * 10, 100)}
                            sx={{
                              height: 5,
                              borderRadius: 5,
                              bgcolor: "#F3EAEA",

                              "& .MuiLinearProgress-bar": {
                                borderRadius: 5,
                                bgcolor: "#EF4444",
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
        </Grid>

        {/* ===================================================
            CATEGORY INVENTORY
        =================================================== */}

        <Grid item xs={12} lg={5}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
              border: "1px solid #EEEEF2",
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  md: 3,
                },
              }}
            >
              <SectionHeader
                icon={<TrendingUpRoundedIcon />}
                title="Inventory by Category"
                subtitle="Stock distribution"
                count={categories.length}
              />

              <Divider sx={{ mb: 2 }} />

              {inventoryLoading ? (
                <Loading />
              ) : categories.length === 0 ? (
                <Empty message="No category inventory data" />
              ) : (
                <Stack spacing={2}>
                  {categories.map((category, index) => {
                    const stock = Number(
                      category.total_stock ??
                        category.stock ??
                        category.quantity ??
                        0,
                    );

                    return (
                      <Box key={`${index}-${category.category_id ?? ""}`}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mb: 1 }}
                        >
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#27272A",
                            }}
                          >
                            {category.category_name ||
                              category.name ||
                              "Unknown"}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 800,
                              color: PINK_DARK,
                            }}
                          >
                            {number(stock)}
                          </Typography>
                        </Stack>

                        <LinearProgress
                          variant="determinate"
                          value={
                            categories.length
                              ? Math.min(
                                  (stock /
                                    Math.max(
                                      ...categories.map((item) =>
                                        Number(
                                          item.total_stock ??
                                            item.stock ??
                                            item.quantity ??
                                            0,
                                        ),
                                      ),
                                    )) *
                                    100,
                                  100,
                                )
                              : 0
                          }
                          sx={{
                            height: 6,
                            borderRadius: 10,
                            bgcolor: "#F1F1F4",

                            "& .MuiLinearProgress-bar": {
                              borderRadius: 10,
                              background:
                                "linear-gradient(90deg, #FF4FA3, #E6328B)",
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =====================================================
          SNACKBAR
      ===================================================== */}

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
          {inventoryError || "Unable to load inventory report"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

const MetricCard = ({ title, value, subtitle, icon, loading, type }) => {
  const styles = {
    total: {
      iconBg: "rgba(255,79,163,0.1)",
      iconColor: PINK,
    },

    warning: {
      iconBg: "rgba(245,158,11,0.1)",
      iconColor: "#D97706",
    },

    danger: {
      iconBg: "rgba(239,68,68,0.1)",
      iconColor: "#DC2626",
    },
  };

  const style = styles[type] || styles.total;

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #EEEEF2",
        boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 35px rgba(0,0,0,0.07)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                color: "#71717A",
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 800,
                color: "#18181B",
                mt: 0.5,
                letterSpacing: "-0.5px",
              }}
            >
              {loading ? "..." : value}
            </Typography>

            <Typography
              sx={{
                fontSize: 11.5,
                color: "#A1A1AA",
                mt: 0.3,
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              bgcolor: style.iconBg,
              color: style.iconColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
   SECTION HEADER
========================================================= */

const SectionHeader = ({ icon, title, subtitle, count }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ mb: 2 }}
  >
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          bgcolor: "rgba(255,79,163,0.09)",
          color: PINK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 800,
            color: "#18181B",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: 11.5,
            color: "#71717A",
            mt: 0.2,
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Stack>

    {count !== undefined && (
      <Chip
        label={count}
        size="small"
        sx={{
          minWidth: 32,
          fontWeight: 800,
          bgcolor: "#F7F7F9",
          color: "#52525B",
        }}
      />
    )}
  </Stack>
);

/* =========================================================
   LEGEND
========================================================= */

const Legend = ({ color, label }) => (
  <Stack direction="row" spacing={0.8} alignItems="center">
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: color,
      }}
    />

    <Typography
      sx={{
        fontSize: 11.5,
        color: "#71717A",
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
  </Stack>
);

/* =========================================================
   LOADING
========================================================= */

const Loading = () => (
  <Box
    sx={{
      py: 6,
      textAlign: "center",
    }}
  >
    <Typography
      sx={{
        color: "#71717A",
        fontSize: 13,
      }}
    >
      Loading inventory report...
    </Typography>
  </Box>
);

/* =========================================================
   EMPTY
========================================================= */

const Empty = ({ message }) => (
  <Box
    sx={{
      py: 6,
      px: 2,
      textAlign: "center",
      borderRadius: 2.5,
      bgcolor: "#FAFAFA",
    }}
  >
    <Inventory2RoundedIcon
      sx={{
        fontSize: 36,
        color: "#D4D4D8",
        mb: 1,
      }}
    />

    <Typography
      sx={{
        color: "#71717A",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {message}
    </Typography>
  </Box>
);

export default InventoryReport;
