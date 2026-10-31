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
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import TwoWheelerRoundedIcon from "@mui/icons-material/TwoWheelerRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAllDeliveryPartners,
  fetchDeliveryPartnerOrders,
  fetchAdminDeliveryPartnerBankDetails,
  addAdminDeliveryPartnerBankDetails,
  updateAdminDeliveryPartnerBankDetails,
  updateAdminDeliveryPartnerStatus,
  updateAdminDeliveryPartner,
  clearBankDetails,
  clearSelectedPartner,
} from "../../../redux/slices/adminDeliverySlice";

/*
|--------------------------------------------------------------------------
| STATUS COLORS
|--------------------------------------------------------------------------
*/

const getStatusColor = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "available":
      return "success";

    case "online":
      return "info";

    case "busy":
      return "warning";

    case "delivered":
      return "success";

    case "assigned":
      return "info";

    case "out_for_delivery":
      return "warning";

    case "cancelled":
      return "error";

    case "offline":
    default:
      return "default";
  }
};

/*
|--------------------------------------------------------------------------
| INFO ITEM
|--------------------------------------------------------------------------
*/

const InfoItem = ({ label, value, icon }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2.5,
        bgcolor: "background.default",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        {icon && (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(255,79,163,0.10)",
              color: "#FF4FA3",
              flexShrink: 0,
            }}
          >
            {icon}
          </Box>
        )}

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: "block",
              mb: 0.3,
            }}
          >
            {label}
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              wordBreak: "break-word",
            }}
          >
            {value || "N/A"}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

/*
|--------------------------------------------------------------------------
| BANK INFO
|--------------------------------------------------------------------------
*/

const BankInfo = ({ label, value }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography
        variant="body1"
        fontWeight={600}
        sx={{
          mt: 0.5,
          textTransform: label === "Account Type" ? "capitalize" : "none",
          wordBreak: "break-word",
        }}
      >
        {value || "-"}
      </Typography>
    </Box>
  );
};

/*
|--------------------------------------------------------------------------
| ADMIN DELIVERY PARTNER DETAILS
|--------------------------------------------------------------------------
*/

const AdminDeliveryPartnerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partnerId } = useParams();

  const {
    partners,
    partnerOrders,
    partnerOrdersLoading,
    partnerOrdersError,

    bankDetails,
    bankLoading,
    bankSaving,
    bankError,

    statusLoading,
    statusError,

    loading,
    error,
  } = useSelector((state) => state.adminDelivery);

  /*
  |--------------------------------------------------------------------------
  | LOCAL STATE
  |--------------------------------------------------------------------------
  */

  const [editingPartner, setEditingPartner] = useState(false);
  const [editingBank, setEditingBank] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleType: "",
    vehicleNumber: "",
  });

  const [bankForm, setBankForm] = useState({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
    accountType: "savings",
    upiId: "",
  });

  /*
  |--------------------------------------------------------------------------
  | FIND PARTNER
  |--------------------------------------------------------------------------
  */

  const partner = useMemo(() => {
    return partners.find((item) => Number(item.id) === Number(partnerId));
  }, [partners, partnerId]);

  /*
  |--------------------------------------------------------------------------
  | FETCH PARTNERS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!partners.length) {
      dispatch(fetchAllDeliveryPartners());
    }
  }, [dispatch, partners.length]);

  /*
  |--------------------------------------------------------------------------
  | FETCH PARTNER DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!partnerId) return;

    dispatch(fetchDeliveryPartnerOrders(Number(partnerId)));

    dispatch(fetchAdminDeliveryPartnerBankDetails(Number(partnerId)));

    return () => {
      dispatch(clearBankDetails());
      dispatch(clearSelectedPartner());
    };
  }, [dispatch, partnerId]);

  /*
  |--------------------------------------------------------------------------
  | PARTNER FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!partner) return;

    setPartnerForm({
      name: partner.name || "",
      phone: partner.phone || "",
      email: partner.email || "",
      vehicleType: partner.vehicle_type || "",
      vehicleNumber: partner.vehicle_number || "",
    });
  }, [partner]);

  /*
  |--------------------------------------------------------------------------
  | BANK FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!bankDetails) return;

    setBankForm({
      accountHolderName: bankDetails.account_holder_name || "",

      accountNumber: bankDetails.account_number || "",

      ifscCode: bankDetails.ifsc_code || "",

      bankName: bankDetails.bank_name || "",

      branchName: bankDetails.branch_name || "",

      accountType: bankDetails.account_type || "savings",

      upiId: bankDetails.upi_id || "",
    });
  }, [bankDetails]);

  /*
  |--------------------------------------------------------------------------
  | HANDLERS
  |--------------------------------------------------------------------------
  */

  const handlePartnerChange = (event) => {
    const { name, value } = event.target;

    setPartnerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankChange = (event) => {
    const { name, value } = event.target;

    setBankForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE PARTNER
  |--------------------------------------------------------------------------
  */

  const handleSavePartner = async () => {
    if (!partnerId) return;

    const result = await dispatch(
      updateAdminDeliveryPartner({
        partnerId: Number(partnerId),
        data: partnerForm,
      }),
    );

    if (!result.error) {
      setEditingPartner(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE BANK
  |--------------------------------------------------------------------------
  */

  const handleSaveBankDetails = async () => {
    if (!partnerId) return;

    const payload = {
      accountHolderName: bankForm.accountHolderName,
      accountNumber: bankForm.accountNumber,
      ifscCode: bankForm.ifscCode,
      bankName: bankForm.bankName,
      branchName: bankForm.branchName,
      accountType: bankForm.accountType,
      upiId: bankForm.upiId,
    };

    let result;

    if (bankDetails) {
      result = await dispatch(
        updateAdminDeliveryPartnerBankDetails({
          partnerId: Number(partnerId),
          data: payload,
        }),
      );
    } else {
      result = await dispatch(
        addAdminDeliveryPartnerBankDetails({
          partnerId: Number(partnerId),
          data: payload,
        }),
      );
    }

    if (!result.error) {
      setEditingBank(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  const handleStatusChange = (event) => {
    if (!partner) return;

    dispatch(
      updateAdminDeliveryPartnerStatus({
        partnerId: Number(partner.id),

        data: {
          status: event.target.value,
        },
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | ACTIVE TOGGLE
  |--------------------------------------------------------------------------
  */

  const handleActiveToggle = () => {
    if (!partner) return;

    dispatch(
      updateAdminDeliveryPartnerStatus({
        partnerId: Number(partner.id),

        data: {
          isActive: !partner.is_active,
        },
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN ORDER
  |--------------------------------------------------------------------------
  */

  const handleOpenOrder = (order) => {
    console.log("ORDER CLICKED:", order);

    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE ORDER
  |--------------------------------------------------------------------------
  */

  const handleCloseOrder = () => {
    setOrderDialogOpen(false);

    setTimeout(() => {
      setSelectedOrder(null);
    }, 200);
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading && !partner) {
    return (
      <Box
        sx={{
          minHeight: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error && !partner) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>

        <Button
          sx={{ mt: 2 }}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/admin/delivery/partners")}
        >
          Back to Partners
        </Button>
      </Box>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PARTNER NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (!partner) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Delivery partner not found.</Alert>

        <Button
          sx={{ mt: 2 }}
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/admin/delivery/partners")}
        >
          Back to Partners
        </Button>
      </Box>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {/* ================================================================ */}
      {/* HEADER */}
      {/* ================================================================ */}

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
        mb={3}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <IconButton onClick={() => navigate("/admin/delivery/partners")}>
            <ArrowBackRoundedIcon />
          </IconButton>

          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#FF4FA3",
              fontWeight: 700,
            }}
          >
            {partner.name?.charAt(0)?.toUpperCase() || "D"}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              {partner.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Delivery Partner #{partner.id}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Chip
            label={partner.status || "offline"}
            color={getStatusColor(partner.status)}
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          />

          <Chip
            label={partner.is_active ? "Active" : "Inactive"}
            color={partner.is_active ? "success" : "default"}
            sx={{
              fontWeight: 600,
            }}
          />
        </Stack>
      </Stack>

      {statusError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {statusError}
        </Alert>
      )}

      {/* ================================================================ */}
      {/* MAIN GRID */}
      {/* ================================================================ */}

      <Grid container spacing={2.5}>
        {/* ============================================================ */}
        {/* PARTNER INFORMATION */}
        {/* ============================================================ */}

        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Partner Information
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Personal and contact information
                  </Typography>
                </Box>

                <Button
                  size="small"
                  startIcon={
                    editingPartner ? <SaveRoundedIcon /> : <EditRoundedIcon />
                  }
                  onClick={() => {
                    if (editingPartner) {
                      handleSavePartner();
                    } else {
                      setEditingPartner(true);
                    }
                  }}
                >
                  {editingPartner ? "Save" : "Edit"}
                </Button>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={partnerForm.name}
                    onChange={handlePartnerChange}
                    disabled={!editingPartner}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={partnerForm.phone}
                    onChange={handlePartnerChange}
                    disabled={!editingPartner}
                    InputProps={{
                      startAdornment: (
                        <PhoneRoundedIcon
                          sx={{
                            mr: 1,
                            color: "text.secondary",
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={partnerForm.email}
                    onChange={handlePartnerChange}
                    disabled={!editingPartner}
                    InputProps={{
                      startAdornment: (
                        <EmailRoundedIcon
                          sx={{
                            mr: 1,
                            color: "text.secondary",
                          }}
                        />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* ============================================================ */}
        {/* STATUS */}
        {/* ============================================================ */}

        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              borderRadius: 3,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Partner Status
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage partner availability.
              </Typography>

              <TextField
                fullWidth
                select
                label="Current Status"
                value={partner.status || "offline"}
                onChange={handleStatusChange}
                disabled={statusLoading}
              >
                <MenuItem value="offline">Offline</MenuItem>

                <MenuItem value="online">Online</MenuItem>

                <MenuItem value="available">Available</MenuItem>

                <MenuItem value="busy">Busy</MenuItem>
              </TextField>

              <Button
                fullWidth
                variant={partner.is_active ? "outlined" : "contained"}
                color={partner.is_active ? "error" : "success"}
                sx={{
                  mt: 2,
                  textTransform: "none",
                  borderRadius: 2,
                }}
                disabled={statusLoading}
                onClick={handleActiveToggle}
              >
                {partner.is_active ? "Deactivate Partner" : "Activate Partner"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ============================================================ */}
        {/* VEHICLE */}
        {/* ============================================================ */}

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <LocalShippingRoundedIcon />

                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    Vehicle Details
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Delivery vehicle information
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Vehicle Type"
                    name="vehicleType"
                    value={partnerForm.vehicleType}
                    onChange={handlePartnerChange}
                    disabled={!editingPartner}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Vehicle Number"
                    name="vehicleNumber"
                    value={partnerForm.vehicleNumber}
                    onChange={handlePartnerChange}
                    disabled={!editingPartner}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* ============================================================ */}
        {/* BANK DETAILS */}
        {/* ============================================================ */}

        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 3 }}>
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
                mb={2}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccountBalanceRoundedIcon />

                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      Bank Details
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Payment and settlement information
                    </Typography>
                  </Box>
                </Stack>

                {!bankLoading && (
                  <Button
                    variant={editingBank ? "contained" : "outlined"}
                    startIcon={
                      editingBank ? <SaveRoundedIcon /> : <EditRoundedIcon />
                    }
                    onClick={() => {
                      if (editingBank) {
                        handleSaveBankDetails();
                      } else {
                        setEditingBank(true);
                      }
                    }}
                    disabled={bankSaving}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                  >
                    {editingBank
                      ? "Save Bank Details"
                      : bankDetails
                        ? "Edit Bank Details"
                        : "Add Bank Details"}
                  </Button>
                )}
              </Stack>

              <Divider sx={{ mb: 3 }} />

              {bankError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {bankError}
                </Alert>
              )}

              {bankLoading ? (
                <Box
                  sx={{
                    minHeight: 180,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : !bankDetails && !editingBank ? (
                <Box
                  sx={{
                    py: 5,
                    textAlign: "center",
                  }}
                >
                  <AccountBalanceRoundedIcon
                    sx={{
                      fontSize: 45,
                      color: "text.secondary",
                      mb: 1,
                    }}
                  />

                  <Typography fontWeight={600}>
                    No bank details added
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    Add bank details for this delivery partner.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      mt: 2,
                      textTransform: "none",
                      borderRadius: 2,
                    }}
                    onClick={() => setEditingBank(true)}
                  >
                    Add Bank Details
                  </Button>
                </Box>
              ) : editingBank ? (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Account Holder Name"
                      name="accountHolderName"
                      value={bankForm.accountHolderName}
                      onChange={handleBankChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Account Number"
                      name="accountNumber"
                      value={bankForm.accountNumber}
                      onChange={handleBankChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="IFSC Code"
                      name="ifscCode"
                      value={bankForm.ifscCode}
                      onChange={handleBankChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Bank Name"
                      name="bankName"
                      value={bankForm.bankName}
                      onChange={handleBankChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Branch Name"
                      name="branchName"
                      value={bankForm.branchName}
                      onChange={handleBankChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      label="Account Type"
                      name="accountType"
                      value={bankForm.accountType}
                      onChange={handleBankChange}
                    >
                      <MenuItem value="savings">Savings</MenuItem>

                      <MenuItem value="current">Current</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="UPI ID"
                      name="upiId"
                      value={bankForm.upiId}
                      onChange={handleBankChange}
                      placeholder="example@upi"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      justifyContent="flex-end"
                      spacing={1}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEditingBank(false);

                          if (bankDetails) {
                            setBankForm({
                              accountHolderName:
                                bankDetails.account_holder_name || "",

                              accountNumber: bankDetails.account_number || "",

                              ifscCode: bankDetails.ifsc_code || "",

                              bankName: bankDetails.bank_name || "",

                              branchName: bankDetails.branch_name || "",

                              accountType:
                                bankDetails.account_type || "savings",

                              upiId: bankDetails.upi_id || "",
                            });
                          }
                        }}
                        disabled={bankSaving}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        startIcon={
                          bankSaving ? (
                            <CircularProgress size={18} color="inherit" />
                          ) : (
                            <SaveRoundedIcon />
                          )
                        }
                        onClick={handleSaveBankDetails}
                        disabled={bankSaving}
                      >
                        Save
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <BankInfo
                      label="Account Holder"
                      value={bankDetails.account_holder_name}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <BankInfo
                      label="Account Number"
                      value={bankDetails.account_number}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <BankInfo label="IFSC Code" value={bankDetails.ifsc_code} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <BankInfo label="Bank Name" value={bankDetails.bank_name} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <BankInfo label="Branch" value={bankDetails.branch_name} />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <BankInfo
                      label="Account Type"
                      value={bankDetails.account_type}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <BankInfo
                      label="UPI ID"
                      value={bankDetails.upi_id || "-"}
                    />
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* ============================================================ */}
        {/* ORDER HISTORY */}
        {/* ============================================================ */}

        <Grid item xs={12}>
          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* ORDER HEADER */}

              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: "rgba(255,79,163,0.10)",
                      color: "#FF4FA3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ReceiptLongRoundedIcon />
                  </Box>

                  <Box>
                    <Typography variant="h6" fontWeight={700}>
                      Order History
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Orders handled by this delivery partner
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  label={`${partnerOrders.length} Orders`}
                  sx={{
                    fontWeight: 600,
                    bgcolor: "rgba(255,79,163,0.10)",
                    color: "#FF4FA3",
                  }}
                />
              </Box>

              <Divider />

              {/* ORDER CONTENT */}

              {partnerOrdersLoading ? (
                <Box
                  sx={{
                    py: 6,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : partnerOrdersError ? (
                <Box sx={{ p: 3 }}>
                  <Alert severity="error">{partnerOrdersError}</Alert>
                </Box>
              ) : partnerOrders.length === 0 ? (
                <Box
                  sx={{
                    py: 7,
                    textAlign: "center",
                  }}
                >
                  <ReceiptLongRoundedIcon
                    sx={{
                      fontSize: 50,
                      color: "text.secondary",
                      mb: 1,
                    }}
                  />

                  <Typography fontWeight={600}>No orders found</Typography>

                  <Typography variant="body2" color="text.secondary">
                    This delivery partner has no order history yet.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow
                        sx={{
                          bgcolor: "background.default",
                        }}
                      >
                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            ORDER
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            CUSTOMER
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            TOTAL
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            PAYMENT
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            DELIVERY
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            ORDER STATUS
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography variant="caption" fontWeight={700}>
                            DATE
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {partnerOrders.map((order) => (
                        <TableRow
                          key={order.delivery_id || order.order_id}
                          hover
                          onClick={() => handleOpenOrder(order)}
                          sx={{
                            cursor: "pointer",

                            "&:hover": {
                              backgroundColor: "rgba(255,79,163,0.04)",
                            },
                          }}
                        >
                          <TableCell>
                            <Typography fontWeight={700} color="#FF4FA3">
                              #{order.order_id}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography fontWeight={600}>
                              {order.customer_name || "N/A"}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                              {order.customer_phone || "N/A"}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography fontWeight={700}>
                              ₹{Number(order.total || 0).toFixed(2)}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              label={order.payment_status || "Pending"}
                            />
                          </TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              label={order.delivery_status || "N/A"}
                              color={getStatusColor(order.delivery_status)}
                              sx={{
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              label={order.order_status || "N/A"}
                              color={getStatusColor(order.order_status)}
                              sx={{
                                textTransform: "capitalize",
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {order.order_created_at
                                ? new Date(
                                    order.order_created_at,
                                  ).toLocaleString()
                                : "N/A"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================================================================= */}
      {/* ORDER DETAILS DIALOG */}
      {/* ================================================================= */}

      <Dialog
        open={orderDialogOpen}
        onClose={handleCloseOrder}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 24px 70px rgba(0,0,0,0.20)",
          },
        }}
      >
        {/* ============================================================= */}
        {/* DIALOG HEADER */}
        {/* ============================================================= */}

        <DialogTitle
          sx={{
            p: 0,
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 2.5,
              background:
                "linear-gradient(135deg, rgba(255,79,163,0.12), rgba(255,255,255,0.95))",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2.5,
                    bgcolor: "#FF4FA3",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ReceiptLongRoundedIcon />
                </Box>

                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Order Details
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Order #{selectedOrder?.order_id || "N/A"}
                  </Typography>
                </Box>
              </Stack>

              <IconButton
                onClick={handleCloseOrder}
                sx={{
                  bgcolor: "rgba(0,0,0,0.04)",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.08)",
                  },
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </Stack>
          </Box>
        </DialogTitle>

        {/* ============================================================= */}
        {/* DIALOG CONTENT */}
        {/* ============================================================= */}

        <DialogContent
          dividers
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
            bgcolor: "#FAFAFC",
          }}
        >
          {selectedOrder && (
            <Stack spacing={2.5}>
              {/* ===================================================== */}
              {/* STATUS SUMMARY */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack
                    direction={{
                      xs: "column",
                      sm: "row",
                    }}
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        ORDER NUMBER
                      </Typography>

                      <Typography
                        variant="h6"
                        fontWeight={800}
                        sx={{
                          mt: 0.3,
                        }}
                      >
                        #{selectedOrder.order_id}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                    >
                      <Chip
                        label={selectedOrder.order_status || "N/A"}
                        color={getStatusColor(selectedOrder.order_status)}
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 600,
                        }}
                      />

                      <Chip
                        label={selectedOrder.delivery_status || "N/A"}
                        color={getStatusColor(selectedOrder.delivery_status)}
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              {/* ===================================================== */}
              {/* ORDER INFORMATION */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <AccessTimeRoundedIcon
                      sx={{
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                      Order Information
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Order ID"
                        value={`#${selectedOrder.order_id}`}
                        icon={<ReceiptLongRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Order Date"
                        value={
                          selectedOrder.order_created_at
                            ? new Date(
                                selectedOrder.order_created_at,
                              ).toLocaleString()
                            : "N/A"
                        }
                        icon={<AccessTimeRoundedIcon fontSize="small" />}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* ===================================================== */}
              {/* CUSTOMER */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <PersonRoundedIcon
                      sx={{
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                      Customer Details
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Customer Name"
                        value={selectedOrder.customer_name}
                        icon={<PersonRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Phone"
                        value={selectedOrder.customer_phone}
                        icon={<PhoneRoundedIcon fontSize="small" />}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* ===================================================== */}
              {/* DELIVERY ADDRESS */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <LocationOnRoundedIcon
                      sx={{
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                      Delivery Address
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Recipient"
                        value={selectedOrder.address_name}
                        icon={<PersonRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Phone"
                        value={selectedOrder.address_phone}
                        icon={<PhoneRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InfoItem
                        label="Address"
                        value={selectedOrder.address}
                        icon={<LocationOnRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <InfoItem label="City" value={selectedOrder.city} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <InfoItem label="State" value={selectedOrder.state} />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <InfoItem label="Pincode" value={selectedOrder.pincode} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* ===================================================== */}
              {/* PAYMENT */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <PaymentsRoundedIcon
                      sx={{
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                      Payment Details
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Payment Method"
                        value={selectedOrder.payment_method}
                        icon={<PaymentsRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Payment Status"
                        value={selectedOrder.payment_status}
                        icon={<CheckCircleRoundedIcon fontSize="small" />}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* ===================================================== */}
              {/* DELIVERY PARTNER */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <TwoWheelerRoundedIcon
                      sx={{
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography variant="h6" fontWeight={700}>
                      Delivery Information
                    </Typography>
                  </Stack>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Delivery Status"
                        value={selectedOrder.delivery_status}
                        icon={<LocalShippingRoundedIcon fontSize="small" />}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <InfoItem
                        label="Delivery Partner"
                        value={
                          selectedOrder.delivery_partner_name || partner.name
                        }
                        icon={<PersonRoundedIcon fontSize="small" />}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* ===================================================== */}
              {/* ORDER AMOUNT */}
              {/* ===================================================== */}

              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      p: 2.5,
                    }}
                  >
                    <Typography variant="h6" fontWeight={700}>
                      Order Amount
                    </Typography>
                  </Box>

                  <Divider />

                  <Stack
                    spacing={1.5}
                    sx={{
                      p: 2.5,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Subtotal</Typography>

                      <Typography fontWeight={600}>
                        ₹{Number(selectedOrder.subtotal || 0).toFixed(2)}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">
                        Delivery Fee
                      </Typography>

                      <Typography fontWeight={600}>
                        ₹{Number(selectedOrder.delivery_fee || 0).toFixed(2)}
                      </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between">
                      <Typography color="text.secondary">Discount</Typography>

                      <Typography fontWeight={600} color="success.main">
                        - ₹{Number(selectedOrder.discount || 0).toFixed(2)}
                      </Typography>
                    </Stack>

                    <Divider />

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight={800}>
                        Total
                      </Typography>

                      <Typography
                        variant="h5"
                        fontWeight={800}
                        sx={{
                          color: "#FF4FA3",
                        }}
                      >
                        ₹{Number(selectedOrder.total || 0).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          )}
        </DialogContent>

        {/* ============================================================= */}
        {/* DIALOG FOOTER */}
        {/* ============================================================= */}

        <Box
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "flex-end",
            bgcolor: "background.paper",
          }}
        >
          <Button
            variant="contained"
            onClick={handleCloseOrder}
            sx={{
              minWidth: 110,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "#FF4FA3",
              "&:hover": {
                bgcolor: "#e83f91",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default AdminDeliveryPartnerDetails;
