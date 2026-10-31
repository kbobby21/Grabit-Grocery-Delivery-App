import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminOrderById,
  fetchOrderDelivery,
  fetchDeliveryPartners,
  assignPartner,
  changeOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const statusOptions = [
  "Placed",
  "Confirmed",
  "Processing",
  "Packed",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const timelineStatuses = [
  "Placed",
  "Confirmed",
  "Processing",
  "Packed",
  "Out for Delivery",
  "Delivered",
];

const getStatusColor = (status) => {
  switch (status) {
    case "Placed":
      return "warning";
    case "Confirmed":
      return "info";
    case "Processing":
      return "secondary";
    case "Packed":
      return "primary";
    case "Out for Delivery":
      return "info";
    case "Delivered":
      return "success";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const AdminOrderDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const orderId = id;

  const {
    selectedOrder,
    selectedDelivery,
    deliveryPartners,
    orderLoading,
    deliveryLoading,
    assigning,
    updatingStatus,
    orderError,
    deliveryError,
    assignError,
  } = useSelector((state) => state.adminOrders);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPartner, setSelectedPartner] = useState("");

  useEffect(() => {
    if (!orderId) return;

    dispatch(fetchAdminOrderById(orderId));
    dispatch(fetchOrderDelivery(orderId));
    dispatch(fetchDeliveryPartners());
  }, [dispatch, orderId]);

  useEffect(() => {
    if (selectedOrder?.status) {
      setSelectedStatus(selectedOrder.status);
    }
  }, [selectedOrder]);

  useEffect(() => {
    if (
      selectedDelivery?.delivery_partner_id !== null &&
      selectedDelivery?.delivery_partner_id !== undefined
    ) {
      setSelectedPartner(String(selectedDelivery.delivery_partner_id));
    }
  }, [selectedDelivery]);

  const formattedDate = useMemo(() => {
    if (!selectedOrder?.created_at) return "-";

    return new Date(selectedOrder.created_at).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }, [selectedOrder]);

  const handleStatusUpdate = () => {
    if (!orderId || !selectedStatus) return;

    dispatch(
      changeOrderStatus({
        orderId: Number(orderId),
        status: selectedStatus,
        note: `Order status changed to ${selectedStatus}`,
      }),
    ).then((result) => {
      if (!result.error) {
        dispatch(fetchAdminOrderById(orderId));
        dispatch(fetchOrderDelivery(orderId));
      }
    });
  };

  const handleAssignPartner = () => {
    if (!selectedPartner || !orderId) return;

    dispatch(
      assignPartner({
        orderId: Number(orderId),
        deliveryPartnerId: Number(selectedPartner),
      }),
    ).then((result) => {
      if (!result.error) {
        dispatch(fetchOrderDelivery(orderId));
        dispatch(fetchAdminOrderById(orderId));
        dispatch(fetchDeliveryPartners());
      }
    });
  };

  if (orderLoading && !selectedOrder) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F8FA",
        }}
      >
        <CircularProgress sx={{ color: "#FF4FA3" }} />
      </Box>
    );
  }

  if (orderError && !selectedOrder) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F8FA", p: 4 }}>
        <Alert severity="error">{orderError}</Alert>
      </Box>
    );
  }

  if (!selectedOrder) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: "#F7F8FA", p: 4 }}>
        <Alert severity="info">Order not found.</Alert>
      </Box>
    );
  }

  const hasDeliveryPartner =
    selectedDelivery?.delivery_partner_id !== null &&
    selectedDelivery?.delivery_partner_id !== undefined;

  const availablePartners = deliveryPartners.filter(
    (partner) =>
      partner.is_active &&
      ["offline", "online", "available"].includes(partner.status),
  );

  const currentStatusIndex = timelineStatuses.indexOf(selectedOrder.status);

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F7F8FA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: { xs: 2, md: 3, lg: 4 },
          py: 1.5,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          flexShrink: 0,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1.5} minWidth={0}>
            <IconButton
              onClick={() => navigate("/admin/orders")}
              sx={{ border: "1px solid #E5E7EB", borderRadius: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Box minWidth={0}>
              <Stack direction="row" alignItems="center" spacing={1.2}>
                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{ color: "#111827" }}
                >
                  Order #{selectedOrder.id}
                </Typography>
                <Chip
                  label={selectedOrder.status}
                  color={getStatusColor(selectedOrder.status)}
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              </Stack>
              <Typography variant="body2" sx={{ color: "#6B7280", mt: 0.3 }}>
                Placed on {formattedDate}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<PaymentOutlinedIcon />}
              label={selectedOrder.payment_method || "-"}
              variant="outlined"
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
            <Chip
              icon={<Inventory2OutlinedIcon />}
              label={`${selectedOrder.items?.length || 0} items`}
              variant="outlined"
              sx={{ fontWeight: 600, borderRadius: 2 }}
            />
          </Stack>
        </Stack>
      </Box>

      {/* COMPACT HORIZONTAL TIMELINE */}
      <Box
        sx={{
          px: { xs: 2, md: 3, lg: 4 },
          py: 1.5,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          flexShrink: 0,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ overflowX: "auto", pb: 0.25 }}
        >
          {timelineStatuses.map((status, index) => {
            const completed =
              currentStatusIndex >= index && currentStatusIndex !== -1;
            const current = selectedOrder.status === status;
            const isLast = index === timelineStatuses.length - 1;

            return (
              <React.Fragment key={status}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.7}
                  sx={{ flexShrink: 0 }}
                >
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: completed ? "#FFF0F7" : "#F3F4F6",
                      border: current
                        ? "2px solid #FF4FA3"
                        : "1px solid #E5E7EB",
                    }}
                  >
                    {completed ? (
                      <CheckCircleOutlinedIcon
                        sx={{ fontSize: 15, color: "#FF4FA3" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: "#9CA3AF",
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={current ? 800 : completed ? 600 : 500}
                    sx={{
                      color: current
                        ? "#111827"
                        : completed
                          ? "#374151"
                          : "#9CA3AF",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {status === "Out for Delivery"
                      ? "Out for Delivery"
                      : status}
                  </Typography>
                </Stack>

                {!isLast && (
                  <Box
                    sx={{
                      width: { xs: 22, md: 42, lg: 60 },
                      height: 1.5,
                      flexShrink: 0,
                      backgroundColor:
                        currentStatusIndex > index ? "#FF4FA3" : "#D1D5DB",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Stack>
      </Box>

      {/* MAIN 65 / 35 CONTENT */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          px: { xs: 2, md: 3, lg: 4 },
          py: 2,
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%", minHeight: 0 }}>
          {/* LEFT 65% */}
          <Grid
            size={{ xs: 12, lg: 8 }}
            sx={{
              height: "100%",
              minHeight: 0,
              overflowY: "auto",
              pr: { lg: 0.5 },
              "&::-webkit-scrollbar": { width: 5 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#D1D5DB",
                borderRadius: 10,
              },
            }}
          >
            <Stack spacing={2}>
              {/* CUSTOMER + ADDRESS */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 2.25 }}>
                      <Stack
                        direction="row"
                        spacing={1.2}
                        alignItems="center"
                        mb={1.5}
                      >
                        <PersonOutlinedIcon sx={{ color: "#FF4FA3" }} />
                        <Typography fontWeight={700}>Customer</Typography>
                      </Stack>
                      <Stack spacing={0.6}>
                        <Typography fontWeight={700}>
                          User #{selectedOrder.user_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Customer ID: {selectedOrder.user_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Order ID: #{selectedOrder.id}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      border: "1px solid #E5E7EB",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 2.25 }}>
                      <Stack
                        direction="row"
                        spacing={1.2}
                        alignItems="center"
                        mb={1.5}
                      >
                        <LocationOnOutlinedIcon sx={{ color: "#FF4FA3" }} />
                        <Typography fontWeight={700}>
                          Delivery Address
                        </Typography>
                      </Stack>
                      <Typography fontWeight={700}>
                        {selectedOrder.address?.name || "Customer"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.3 }}
                      >
                        {selectedOrder.address?.phone || "-"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.8, lineHeight: 1.5 }}
                      >
                        {selectedOrder.address?.address || "-"}
                        <br />
                        {selectedOrder.address?.city || "-"},{" "}
                        {selectedOrder.address?.state || "-"} -{" "}
                        {selectedOrder.address?.pincode || "-"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* ORDER ITEMS */}
              <Card
                elevation={0}
                sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Inventory2OutlinedIcon sx={{ color: "#FF4FA3" }} />
                      <Box>
                        <Typography fontWeight={700}>Order Items</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Products included in this order
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="text.secondary"
                    >
                      {selectedOrder.items?.length || 0} products
                    </Typography>
                  </Stack>

                  <Stack spacing={1}>
                    {selectedOrder.items?.map((item) => (
                      <Paper
                        key={item.id}
                        elevation={0}
                        sx={{
                          p: 1.35,
                          borderRadius: 2,
                          border: "1px solid #EEF0F3",
                          backgroundColor: "#FAFAFA",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          spacing={2}
                        >
                          <Box sx={{ minWidth: 0 }}>
                            <Typography fontWeight={650} noWrap>
                              {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{Number(item.price).toFixed(2)} × {item.quantity}
                            </Typography>
                          </Box>
                          <Typography fontWeight={700} sx={{ flexShrink: 0 }}>
                            ₹
                            {(
                              Number(item.price) * Number(item.quantity)
                            ).toFixed(2)}
                          </Typography>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={0.55}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Subtotal
                      </Typography>
                      <Typography variant="body2">
                        ₹{Number(selectedOrder.subtotal).toFixed(2)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Delivery Fee
                      </Typography>
                      <Typography variant="body2">
                        ₹{Number(selectedOrder.delivery_fee).toFixed(2)}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Discount
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#22C55E" }}>
                        - ₹{Number(selectedOrder.discount).toFixed(2)}
                      </Typography>
                    </Stack>
                    <Divider sx={{ my: 0.5 }} />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography fontWeight={800}>Grand Total</Typography>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{ color: "#FF4FA3" }}
                      >
                        ₹{Number(selectedOrder.total).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* RIGHT 35% */}
          <Grid
            size={{ xs: 12, lg: 4 }}
            sx={{
              height: "100%",
              minHeight: 0,
              overflowY: "auto",
              pr: { lg: 0.5 },
              "&::-webkit-scrollbar": { width: 5 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#D1D5DB",
                borderRadius: 10,
              },
            }}
          >
            <Stack spacing={2}>
              {/* STATUS CONTROL */}
              <Card
                elevation={0}
                sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack
                    direction="row"
                    spacing={1.2}
                    alignItems="center"
                    mb={1.5}
                  >
                    <CheckCircleOutlinedIcon sx={{ color: "#FF4FA3" }} />
                    <Typography fontWeight={700}>Status Control</Typography>
                  </Stack>

                  <Typography variant="caption" color="text.secondary">
                    Current status
                  </Typography>
                  <Typography fontWeight={700} sx={{ mb: 1.2 }}>
                    {selectedOrder.status}
                  </Typography>

                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={selectedStatus}
                      label="Status"
                      onChange={(event) =>
                        setSelectedStatus(event.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={
                      updatingStatus || selectedStatus === selectedOrder.status
                    }
                    onClick={handleStatusUpdate}
                    sx={{
                      mt: 1.25,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      backgroundColor: "#FF4FA3",
                      "&:hover": { backgroundColor: "#E6328B" },
                    }}
                  >
                    {updatingStatus ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* DELIVERY PARTNER */}
              <Card
                elevation={0}
                sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack
                    direction="row"
                    spacing={1.2}
                    alignItems="center"
                    mb={1.5}
                  >
                    <LocalShippingOutlinedIcon sx={{ color: "#FF4FA3" }} />
                    <Box>
                      <Typography fontWeight={700}>Delivery Partner</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Assignment details
                      </Typography>
                    </Box>
                  </Stack>

                  {deliveryLoading ? (
                    <Box
                      sx={{ display: "flex", justifyContent: "center", py: 2 }}
                    >
                      <CircularProgress size={26} sx={{ color: "#FF4FA3" }} />
                    </Box>
                  ) : hasDeliveryPartner ? (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        backgroundColor: "#F9FAFB",
                        border: "1px solid #EEF0F3",
                      }}
                    >
                      <Stack direction="row" spacing={1.3} alignItems="center">
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: "#FFF0F7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <DirectionsBikeOutlinedIcon
                            sx={{ color: "#FF4FA3" }}
                          />
                        </Box>
                        <Box minWidth={0}>
                          <Typography fontWeight={700}>
                            {selectedDelivery.partner?.name ||
                              "Delivery Partner"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedDelivery.partner?.phone || "-"}
                          </Typography>
                        </Box>
                      </Stack>
                      <Divider sx={{ my: 1.2 }} />
                      <Stack spacing={0.5}>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Vehicle
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {selectedDelivery.partner?.vehicle_type || "-"}
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography variant="body2" color="text.secondary">
                            Number
                          </Typography>
                          <Typography variant="body2" fontWeight={600}>
                            {selectedDelivery.partner?.vehicle_number || "-"}
                          </Typography>
                        </Stack>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="body2" color="text.secondary">
                            Status
                          </Typography>
                          <Chip
                            label={selectedDelivery.status || "Assigned"}
                            size="small"
                            color="info"
                          />
                        </Stack>
                      </Stack>
                    </Paper>
                  ) : (
                    <>
                      <FormControl fullWidth size="small">
                        <InputLabel>Delivery Partner</InputLabel>
                        <Select
                          value={selectedPartner}
                          label="Delivery Partner"
                          onChange={(event) =>
                            setSelectedPartner(event.target.value)
                          }
                        >
                          {availablePartners.map((partner) => (
                            <MenuItem
                              key={partner.id}
                              value={String(partner.id)}
                            >
                              {partner.name} — {partner.phone}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {availablePartners.length === 0 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 1 }}
                        >
                          No available delivery partners found.
                        </Typography>
                      )}

                      <Button
                        fullWidth
                        variant="contained"
                        disabled={!selectedPartner || assigning}
                        onClick={handleAssignPartner}
                        sx={{
                          mt: 1.25,
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 700,
                          backgroundColor: "#111827",
                          "&:hover": { backgroundColor: "#000000" },
                        }}
                      >
                        {assigning ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          "Assign Delivery Partner"
                        )}
                      </Button>
                    </>
                  )}

                  {deliveryError && (
                    <Alert severity="error" sx={{ mt: 1.25 }}>
                      {deliveryError}
                    </Alert>
                  )}
                  {assignError && (
                    <Alert severity="error" sx={{ mt: 1.25 }}>
                      {assignError}
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* PAYMENT */}
              <Card
                elevation={0}
                sx={{ border: "1px solid #E5E7EB", borderRadius: 3 }}
              >
                <CardContent sx={{ p: 2.25 }}>
                  <Stack
                    direction="row"
                    spacing={1.2}
                    alignItems="center"
                    mb={1.5}
                  >
                    <PaymentOutlinedIcon sx={{ color: "#FF4FA3" }} />
                    <Typography fontWeight={700}>Payment</Typography>
                  </Stack>

                  <Stack spacing={0.8}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2" color="text.secondary">
                        Method
                      </Typography>
                      <Chip
                        label={selectedOrder.payment_method || "-"}
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Amount
                      </Typography>
                      <Typography fontWeight={700}>
                        ₹{Number(selectedOrder.total).toFixed(2)}
                      </Typography>
                    </Stack>
                    {selectedOrder.payment && (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Payment Status
                        </Typography>
                        <Chip
                          label={selectedOrder.payment.status}
                          size="small"
                          color={
                            selectedOrder.payment.status === "paid"
                              ? "success"
                              : "warning"
                          }
                        />
                      </Stack>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminOrderDetails;
