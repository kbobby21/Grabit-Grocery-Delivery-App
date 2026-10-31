import React, { useEffect } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminDeliveryPartners,
  fetchAdminDeliveryPartnerOrders,
  fetchAdminDeliveryPartnerBankDetails,
} from "../../redux/slices/adminDeliverySlice";

const AdminDeliveryPartnerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    partners = [],
    partnerOrders = [],
    selectedBankDetails,
    loading,
  } = useSelector((state) => state.adminDelivery || {});

  const partner = partners.find((item) => String(item.id) === String(id));

  useEffect(() => {
    if (!partners.length) {
      dispatch(fetchAdminDeliveryPartners());
    }

    dispatch(fetchAdminDeliveryPartnerOrders(id));
    dispatch(fetchAdminDeliveryPartnerBankDetails(id));
  }, [dispatch, id, partners.length]);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
        mb={3}
      >
        <Box>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 1 }}
          >
            Back
          </Button>

          <Typography variant="h4" fontWeight={700}>
            Partner Details
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<EditRoundedIcon />}
          onClick={() => navigate(`/admin/delivery/partners/${id}/edit`)}
        >
          Edit Partner
        </Button>
      </Stack>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Personal Information
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary">Name</Typography>
                  <Typography fontWeight={600}>
                    {partner?.name || "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary">Phone</Typography>
                  <Typography fontWeight={600}>
                    {partner?.phone || "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary">Email</Typography>
                  <Typography fontWeight={600}>
                    {partner?.email || "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary">Status</Typography>

                  <Chip
                    size="small"
                    label={partner?.status || "-"}
                    color={
                      partner?.status === "available"
                        ? "success"
                        : partner?.status === "busy"
                          ? "warning"
                          : "default"
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3, mt: 2.5 }}>
            <CardContent>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <LocalShippingRoundedIcon />
                <Typography variant="h6" fontWeight={700}>
                  Vehicle Information
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary">Vehicle Type</Typography>
                  <Typography fontWeight={600}>
                    {partner?.vehicle_type || "-"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography color="text.secondary">Vehicle Number</Typography>
                  <Typography fontWeight={600}>
                    {partner?.vehicle_number || "-"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Stack direction="row" spacing={1}>
                  <AccountBalanceRoundedIcon />
                  <Typography variant="h6" fontWeight={700}>
                    Bank Details
                  </Typography>
                </Stack>

                <Button
                  size="small"
                  onClick={() =>
                    navigate(`/admin/delivery/partners/${id}/bank-details`)
                  }
                >
                  Manage
                </Button>
              </Stack>

              <Divider sx={{ mb: 2 }} />

              {selectedBankDetails ? (
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Account Holder
                    </Typography>
                    <Typography fontWeight={600}>
                      {selectedBankDetails.account_holder_name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Bank
                    </Typography>
                    <Typography fontWeight={600}>
                      {selectedBankDetails.bank_name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Account Number
                    </Typography>
                    <Typography fontWeight={600}>
                      {selectedBankDetails.account_number}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      IFSC
                    </Typography>
                    <Typography fontWeight={600}>
                      {selectedBankDetails.ifsc_code}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      UPI
                    </Typography>
                    <Typography fontWeight={600}>
                      {selectedBankDetails.upi_id || "-"}
                    </Typography>
                  </Box>
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  Bank details not added.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 3, mt: 2.5 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} mb={2}>
            Partner Orders
          </Typography>

          {partnerOrders.length === 0 ? (
            <Typography color="text.secondary">
              No orders assigned to this partner.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {partnerOrders.map((order) => (
                <Box
                  key={order.delivery_id}
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Typography fontWeight={600}>
                      Order #{order.order_id}
                    </Typography>

                    <Chip size="small" label={order.delivery_status} />
                  </Stack>

                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Customer: {order.customer_name || "-"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Total: ₹{order.total}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminDeliveryPartnerDetails;
