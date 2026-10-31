import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Card,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

import {
  fetchAdminDeliveryHistory,
  clearAdminDeliveryErrors,
} from "../../../redux/slices/adminDeliverySlice";

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
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminDeliveryHistory = () => {
  const dispatch = useDispatch();

  const { deliveryHistory, historyLoading, historyError } = useSelector(
    (state) => state.adminDelivery,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(clearAdminDeliveryErrors());
    dispatch(fetchAdminDeliveryHistory());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAdminDeliveryHistory());
  };

  const filteredHistory = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return deliveryHistory;
    }

    return deliveryHistory.filter((item) => {
      return (
        String(item.order_id || "")
          .toLowerCase()
          .includes(value) ||
        String(item.partner_name || "")
          .toLowerCase()
          .includes(value) ||
        String(item.partner_phone || "")
          .toLowerCase()
          .includes(value) ||
        String(item.customer_name || "")
          .toLowerCase()
          .includes(value) ||
        String(item.customer_phone || "")
          .toLowerCase()
          .includes(value) ||
        String(item.delivery_status || "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [deliveryHistory, search]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Stack direction="row" spacing={1.2} alignItems="center">
            <LocalShippingRoundedIcon
              sx={{
                fontSize: 30,
                color: "primary.main",
              }}
            />

            <Typography variant="h5" fontWeight={700}>
              Delivery History
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            View all delivery assignments and their status history.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Chip
            label={`${deliveryHistory.length} Deliveries`}
            variant="outlined"
            color="primary"
          />

          <IconButton
            onClick={handleRefresh}
            disabled={historyLoading}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <RefreshRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* SEARCH */}
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by order, partner, customer or phone..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      {/* ERROR */}
      {historyError && !historyLoading && (
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Typography color="error" fontWeight={600}>
            {historyError}
          </Typography>
        </Card>
      )}

      {/* LOADING */}
      {historyLoading && (
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

      {/* EMPTY */}
      {!historyLoading && !historyError && filteredHistory.length === 0 && (
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
            No delivery history found
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {search
              ? "Try a different search."
              : "There are no delivery records yet."}
          </Typography>
        </Card>
      )}

      {/* HISTORY */}
      {!historyLoading && filteredHistory.length > 0 && (
        <Stack spacing={2}>
          {filteredHistory.map((item) => (
            <Card
              key={item.delivery_id}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {/* TOP */}
              <Box sx={{ p: 2.5 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      Order #{item.order_id}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Delivery ID: {item.delivery_id}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      size="small"
                      label={item.delivery_status || "Unknown"}
                      color={getDeliveryStatusColor(item.delivery_status)}
                    />

                    <Chip
                      size="small"
                      label={item.order_status || "Unknown"}
                      color={getOrderStatusColor(item.order_status)}
                      variant="outlined"
                    />
                  </Stack>
                </Stack>
              </Box>

              <Divider />

              {/* DETAILS */}
              <Box sx={{ p: 2.5 }}>
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                    md: "row",
                  }}
                  spacing={3}
                >
                  {/* PARTNER */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      DELIVERY PARTNER
                    </Typography>

                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      {item.partner_name || "N/A"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.partner_phone || "N/A"}
                    </Typography>

                    {item.vehicle_type && (
                      <Typography variant="body2" color="text.secondary">
                        {item.vehicle_type}
                        {item.vehicle_number ? ` • ${item.vehicle_number}` : ""}
                      </Typography>
                    )}
                  </Box>

                  {/* CUSTOMER */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      CUSTOMER
                    </Typography>

                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      {item.customer_name || "N/A"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.customer_phone || "N/A"}
                    </Typography>
                  </Box>

                  {/* PAYMENT */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      PAYMENT
                    </Typography>

                    <Typography variant="body1" fontWeight={600} mt={0.5}>
                      ₹{Number(item.total || 0).toFixed(2)}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.payment_method || "N/A"}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.payment_status || "N/A"}
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* TIMELINE */}
              <Box sx={{ p: 2.5 }}>
                <Typography variant="caption" color="text.secondary">
                  DELIVERY TIMELINE
                </Typography>

                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={{ xs: 1, sm: 3 }}
                  mt={1}
                >
                  <Typography variant="body2">
                    <strong>Assigned:</strong> {formatDate(item.assigned_at)}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Picked Up:</strong> {formatDate(item.picked_up_at)}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Delivered:</strong> {formatDate(item.delivered_at)}
                  </Typography>
                </Stack>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default AdminDeliveryHistory;
