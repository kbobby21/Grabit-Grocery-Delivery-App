import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import {
  fetchSalesReport,
  fetchTopProducts,
  fetchCategoryReport,
  fetchCustomerReport,
  fetchPaymentReport,
  fetchInventoryReport,
} from "../../../redux/slices/adminReportSlice";

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

const AdminReports = () => {
  const dispatch = useDispatch();

  const {
    sales,
    salesLoading,
    salesError,

    topProducts,
    topProductsLoading,

    categories,
    categoryLoading,

    customerOverview,
    customerLoading,

    paymentOverview,
    paymentMethods,
    paymentLoading,

    inventoryOverview,
    lowStockProducts,
    inventoryLoading,
  } = useSelector((state) => state.adminReports);

  useEffect(() => {
    dispatch(fetchSalesReport("30days"));
    dispatch(
      fetchTopProducts({
        range: "30days",
        limit: 5,
      }),
    );
    dispatch(fetchCategoryReport("30days"));
    dispatch(fetchCustomerReport("30days"));
    dispatch(fetchPaymentReport("30days"));
    dispatch(fetchInventoryReport("low_stock"));
  }, [dispatch]);

  const safeTopProducts = Array.isArray(topProducts) ? topProducts : [];

  const safeCategories = Array.isArray(categories) ? categories : [];

  const safePaymentMethods = Array.isArray(paymentMethods)
    ? paymentMethods
    : [];

  const safeLowStockProducts = Array.isArray(lowStockProducts)
    ? lowStockProducts
    : [];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{ letterSpacing: "-0.5px" }}
        >
          Reports Overview
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Overview of your store performance for the last 30 days
        </Typography>
      </Box>

      {/* Error */}
      {salesError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {salesError}
        </Alert>
      )}

      {/* Main Metrics */}
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Orders"
            value={number(sales?.total_orders)}
            icon={<ShoppingBagRoundedIcon />}
            loading={salesLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Revenue"
            value={currency(sales?.total_revenue)}
            icon={<CurrencyRupeeRoundedIcon />}
            loading={salesLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Completed Orders"
            value={number(sales?.completed_orders)}
            icon={<CheckCircleRoundedIcon />}
            loading={salesLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Pending Orders"
            value={number(sales?.pending_orders)}
            icon={<PendingActionsRoundedIcon />}
            loading={salesLoading}
          />
        </Grid>
      </Grid>

      {/* Secondary Metrics */}
      <Grid container spacing={2.5} sx={{ mt: 0.2 }}>
        <Grid item xs={12} md={4}>
          <InfoCard
            title="Average Order Value"
            value={currency(sales?.average_order_value)}
            loading={salesLoading}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoCard
            title="Total Discount"
            value={currency(sales?.total_discount)}
            loading={salesLoading}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoCard
            title="Delivery Fee"
            value={currency(sales?.total_delivery_fee)}
            loading={salesLoading}
          />
        </Grid>
      </Grid>

      {/* Reports Grid */}
      <Grid container spacing={2.5} sx={{ mt: 1 }}>
        {/* Top Products */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={800}>
                Top Products
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2.5 }}
              >
                Best performing products in the last 30 days
              </Typography>

              {topProductsLoading ? (
                <LoadingBox />
              ) : safeTopProducts.length === 0 ? (
                <EmptyBox message="No product data available" />
              ) : (
                <Stack spacing={1.5}>
                  {safeTopProducts.map((product, index) => (
                    <Box
                      key={`${product.product_id}-${index}`}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "#F8F8FA",
                      }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography fontWeight={700}>
                            {product.product_name}
                          </Typography>

                          <Typography variant="caption" color="text.secondary">
                            {number(product.units_sold)} units ·{" "}
                            {number(product.orders)} orders
                          </Typography>
                        </Box>

                        <Typography fontWeight={800}>
                          {currency(product.revenue)}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Categories */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={800}>
                Category Performance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2.5 }}
              >
                Revenue by category
              </Typography>

              {categoryLoading ? (
                <LoadingBox />
              ) : safeCategories.length === 0 ? (
                <EmptyBox message="No category data available" />
              ) : (
                <Stack spacing={1.5}>
                  {safeCategories.slice(0, 6).map((category, index) => (
                    <Stack
                      key={`${category.category_id ?? "category"}-${index}`}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography fontWeight={700}>
                          {category.category_name || category.name || "Unknown"}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {number(category.orders ?? category.total_orders)}{" "}
                          orders
                        </Typography>
                      </Box>

                      <Typography fontWeight={800}>
                        {currency(category.revenue ?? category.total_revenue)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Customers */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={800}>
                Customer Report
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Customer activity
              </Typography>

              {customerLoading ? (
                <LoadingBox />
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InfoCard
                      title="Customers"
                      value={number(customerOverview?.total_customers)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <InfoCard
                      title="New Customers"
                      value={number(customerOverview?.new_customers)}
                    />
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Payments */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={800}>
                Payment Report
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Payment method performance
              </Typography>

              {paymentLoading ? (
                <LoadingBox />
              ) : (
                <>
                  <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
                    {currency(paymentOverview?.successful_revenue)}
                  </Typography>

                  <Stack spacing={1}>
                    {safePaymentMethods.slice(0, 4).map((method, index) => (
                      <Stack
                        key={`${method.payment_method}-${index}`}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography>
                          {method.payment_method || "Unknown"}
                        </Typography>

                        <Typography fontWeight={700}>
                          {currency(method.revenue)}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Inventory Report
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Current stock status
                  </Typography>
                </Box>

                <Inventory2RoundedIcon />
              </Stack>

              <Divider sx={{ my: 2 }} />

              {inventoryLoading ? (
                <LoadingBox />
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <InfoCard
                      title="Total Products"
                      value={number(inventoryOverview?.total_products)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <InfoCard
                      title="Low Stock"
                      value={number(inventoryOverview?.low_stock)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <InfoCard
                      title="Out of Stock"
                      value={number(inventoryOverview?.out_of_stock)}
                    />
                  </Grid>
                </Grid>
              )}

              {!inventoryLoading && safeLowStockProducts.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                    Low Stock Products
                  </Typography>

                  <Stack spacing={1}>
                    {safeLowStockProducts.slice(0, 5).map((product, index) => (
                      <Stack
                        key={`${product.product_id}-${index}`}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography>{product.product_name}</Typography>

                        <Typography fontWeight={700} color="error.main">
                          {product.stock_quantity ?? product.stock ?? 0} left
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const MetricCard = ({ title, value, icon, loading }) => (
  <Card
    sx={{
      borderRadius: 3,
      height: "100%",
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
            {loading ? "..." : value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: "rgba(255,79,163,0.1)",
            color: "#FF4FA3",
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

const InfoCard = ({ title, value, loading }) => (
  <Card
    variant="outlined"
    sx={{
      borderRadius: 2.5,
      height: "100%",
    }}
  >
    <CardContent>
      <Typography variant="caption" color="text.secondary">
        {title}
      </Typography>

      <Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
        {loading ? "..." : value}
      </Typography>
    </CardContent>
  </Card>
);

const LoadingBox = () => (
  <Box
    sx={{
      minHeight: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <CircularProgress size={28} />
  </Box>
);

const EmptyBox = ({ message }) => (
  <Box
    sx={{
      minHeight: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography color="text.secondary">{message}</Typography>
  </Box>
);

export default AdminReports;
