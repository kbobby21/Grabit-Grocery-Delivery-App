import React from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

const getDeliveryStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Out for Delivery":
      return "info";
    case "Picked Up":
      return "warning";
    case "Assigned":
      return "primary";
    default:
      return "default";
  }
};

const getOrderStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Out for Delivery":
      return "info";
    case "Preparing":
      return "warning";
    case "Confirmed":
      return "primary";
    case "Cancelled":
      return "error";
    default:
      return "default";
  }
};

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminDeliveryPartnerOrderDetails = ({ order, onBack }) => {
  if (!order) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="text.secondary">Order details not found.</Typography>

        <Button
          sx={{ mt: 2 }}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={onBack}
        >
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={onBack}
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Back
          </Button>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Order #{order.order_id}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Delivery order details
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
            label={order.delivery_status || "Unknown"}
            color={getDeliveryStatusColor(order.delivery_status)}
          />

          <Chip
            label={order.order_status || "Unknown"}
            color={getOrderStatusColor(order.order_status)}
            variant="outlined"
          />
        </Stack>
      </Stack>

      <Stack spacing={2.5}>
        {/* DELIVERY PARTNER */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <LocalShippingRoundedIcon color="primary" />

              <Typography variant="h6" fontWeight={700}>
                Delivery Partner
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  NAME
                </Typography>

                <Typography fontWeight={600}>
                  {order.partner_name || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  PHONE
                </Typography>

                <Typography fontWeight={600}>
                  {order.partner_phone || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  VEHICLE
                </Typography>

                <Typography fontWeight={600}>
                  {order.vehicle_type || "N/A"}
                </Typography>

                {order.vehicle_number && (
                  <Typography variant="body2" color="text.secondary">
                    {order.vehicle_number}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Box>
        </Card>

        {/* CUSTOMER */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <PersonRoundedIcon color="primary" />

              <Typography variant="h6" fontWeight={700}>
                Customer
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  NAME
                </Typography>

                <Typography fontWeight={600}>
                  {order.customer_name || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  PHONE
                </Typography>

                <Typography fontWeight={600}>
                  {order.customer_phone || "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Card>

        {/* ADDRESS */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <LocationOnRoundedIcon color="primary" />

              <Typography variant="h6" fontWeight={700}>
                Delivery Address
              </Typography>
            </Stack>

            <Typography fontWeight={600}>
              {order.address_name || "Address"}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {order.address || "N/A"}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {order.city || ""}
              {order.city && order.state ? ", " : ""}
              {order.state || ""} {order.pincode || ""}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              Phone: {order.address_phone || "N/A"}
            </Typography>
          </Box>
        </Card>

        {/* PAYMENT */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <PaymentsRoundedIcon color="primary" />

              <Typography variant="h6" fontWeight={700}>
                Payment
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  TOTAL
                </Typography>

                <Typography variant="h6" fontWeight={700}>
                  ₹{Number(order.total || 0).toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  PAYMENT METHOD
                </Typography>

                <Typography fontWeight={600}>
                  {order.payment_method || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  PAYMENT STATUS
                </Typography>

                <Typography fontWeight={600}>
                  {order.payment_status || "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Card>

        {/* DELIVERY TIMELINE */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 2.5 }}>
            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
              <AccessTimeRoundedIcon color="primary" />

              <Typography variant="h6" fontWeight={700}>
                Delivery Timeline
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <TimelineRow label="Assigned" value={order.assigned_at} />

              <Divider />

              <TimelineRow label="Picked Up" value={order.picked_up_at} />

              <Divider />

              <TimelineRow label="Delivered" value={order.delivered_at} />
            </Stack>
          </Box>
        </Card>

        {/* ORDER INFORMATION */}
        <Card sx={{ borderRadius: 3 }}>
          <Box sx={{ p: 2.5 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Order Information
            </Typography>

            <Stack spacing={1.5}>
              <InfoRow label="Order ID" value={order.order_id} />

              <InfoRow label="Delivery ID" value={order.delivery_id} />

              <InfoRow
                label="Order Created"
                value={formatDate(order.order_created_at)}
              />

              <InfoRow label="Delivery Status" value={order.delivery_status} />

              <InfoRow label="Order Status" value={order.order_status} />
            </Stack>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
};

const TimelineRow = ({ label, value }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent="space-between"
      spacing={1}
    >
      <Typography fontWeight={600}>{label}</Typography>

      <Typography
        variant="body2"
        color={value ? "text.primary" : "text.secondary"}
      >
        {value ? formatDate(value) : "Not completed"}
      </Typography>
    </Stack>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body2" fontWeight={600} textAlign="right">
        {value || "N/A"}
      </Typography>
    </Stack>
  );
};

export default AdminDeliveryPartnerOrderDetails;
