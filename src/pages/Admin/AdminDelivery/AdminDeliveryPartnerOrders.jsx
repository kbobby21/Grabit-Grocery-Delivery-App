import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  Chip,
  Button,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";

import {
  fetchDeliveryPartnerOrders,
  clearSelectedPartner,
} from "../../../redux/slices/adminDeliverySlice";
import AdminDeliveryPartnerOrderDetails from "./AdminDeliveryPartnerOrderDetails";

const getStatusColor = (status) => {
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

const AdminDeliveryPartnerOrders = ({ partnerId, onBack }) => {
  const dispatch = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { partnerOrders, partnerOrdersLoading, partnerOrdersError } =
    useSelector((state) => state.adminDelivery);

  useEffect(() => {
    if (!partnerId) return;

    dispatch(fetchDeliveryPartnerOrders(partnerId));
  }, [dispatch, partnerId]);

  const handleBack = () => {
    dispatch(clearSelectedPartner());

    if (onBack) {
      onBack();
    }
  };
  if (selectedOrder) {
    return (
      <AdminDeliveryPartnerOrderDetails
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* HEADER */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={handleBack}
            sx={{
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Back
          </Button>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              Partner Orders
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Orders assigned to this delivery partner
            </Typography>
          </Box>
        </Stack>

        <Chip
          icon={<ShoppingBagRoundedIcon />}
          label={`${partnerOrders.length} Orders`}
          color="primary"
          variant="outlined"
        />
      </Stack>

      {/* LOADING */}
      {partnerOrdersLoading && (
        <Box
          sx={{
            minHeight: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* ERROR */}
      {!partnerOrdersLoading && partnerOrdersError && (
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography color="error">{partnerOrdersError}</Typography>
        </Card>
      )}

      {/* EMPTY */}
      {!partnerOrdersLoading &&
        !partnerOrdersError &&
        partnerOrders.length === 0 && (
          <Card
            sx={{
              p: 5,
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <LocalShippingRoundedIcon
              sx={{
                fontSize: 50,
                color: "text.secondary",
                mb: 1,
              }}
            />

            <Typography variant="h6" fontWeight={600}>
              No orders found
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.5}>
              This delivery partner has no assigned orders yet.
            </Typography>
          </Card>
        )}

      {/* ORDERS */}
      {!partnerOrdersLoading &&
        !partnerOrdersError &&
        partnerOrders.length > 0 && (
          <Stack spacing={2}>
            {partnerOrders.map((order) => (
              <Card
                key={order.delivery_id}
                onClick={() => setSelectedOrder(order)}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                  },
                }}
              >
                {/* ORDER HEADER */}
                <Box sx={{ p: 2.5 }}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight={700}>
                        Order #{order.order_id}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Delivery ID: {order.delivery_id}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip
                        size="small"
                        label={order.delivery_status || "Unknown"}
                        color={getStatusColor(order.delivery_status)}
                      />

                      <Chip
                        size="small"
                        label={order.order_status || "Unknown"}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>
                </Box>

                <Divider />

                {/* CUSTOMER + ORDER */}
                <Box sx={{ p: 2.5 }}>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    {/* CUSTOMER */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        CUSTOMER
                      </Typography>

                      <Typography variant="body1" fontWeight={600} mt={0.5}>
                        {order.customer_name || "N/A"}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {order.customer_phone || "N/A"}
                      </Typography>
                    </Box>

                    {/* PAYMENT */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        PAYMENT
                      </Typography>

                      <Typography variant="body1" fontWeight={600} mt={0.5}>
                        ₹{Number(order.total || 0).toFixed(2)}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {order.payment_method || "N/A"} •{" "}
                        {order.payment_status || "N/A"}
                      </Typography>
                    </Box>

                    {/* DELIVERY */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        DELIVERY
                      </Typography>

                      <Typography variant="body2" mt={0.5}>
                        Assigned:{" "}
                        {order.assigned_at
                          ? new Date(order.assigned_at).toLocaleString()
                          : "N/A"}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Delivered:{" "}
                        {order.delivered_at
                          ? new Date(order.delivered_at).toLocaleString()
                          : "Not delivered"}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Divider />

                {/* ADDRESS */}
                <Box sx={{ p: 2.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    DELIVERY ADDRESS
                  </Typography>

                  <Typography variant="body1" fontWeight={600} mt={0.5}>
                    {order.address_name || "Address"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {order.address || "N/A"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {order.city || ""}
                    {order.city && order.state ? ", " : ""}
                    {order.state || ""} {order.pincode || ""}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Phone: {order.address_phone || "N/A"}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
    </Box>
  );
};

export default AdminDeliveryPartnerOrders;
