import React, { useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: "Grabit",
    supportEmail: "support@grabit.com",
    supportPhone: "+91 98765 43210",

    currency: "INR",
    timezone: "Asia/Kolkata",

    minOrderAmount: 99,
    freeDeliveryAmount: 499,
    deliveryFee: 40,

    orderNotifications: true,
    emailNotifications: true,
    paymentNotifications: true,
    lowStockNotifications: true,

    maintenanceMode: false,
    allowNewOrders: true,

    codEnabled: true,
    onlinePaymentEnabled: true,

    deliveryEnabled: true,
  });

  const [saving, setSaving] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    // Connect your settings API here later.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSaving(false);

    setSnackbar({
      open: true,
      message: "Settings saved successfully",
      severity: "success",
    });
  };

  const handleReset = () => {
    setSettings({
      storeName: "Grabit",
      supportEmail: "support@grabit.com",
      supportPhone: "+91 98765 43210",

      currency: "INR",
      timezone: "Asia/Kolkata",

      minOrderAmount: 99,
      freeDeliveryAmount: 499,
      deliveryFee: 40,

      orderNotifications: true,
      emailNotifications: true,
      paymentNotifications: true,
      lowStockNotifications: true,

      maintenanceMode: false,
      allowNewOrders: true,

      codEnabled: true,
      onlinePaymentEnabled: true,

      deliveryEnabled: true,
    });

    setSnackbar({
      open: true,
      message: "Settings restored to default",
      severity: "info",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F7F9",
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
        sx={{ mb: 4 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#FF4FA3",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 20px rgba(255,79,163,0.22)",
              }}
            >
              <StorefrontRoundedIcon />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 26,
                    md: 30,
                  },
                  fontWeight: 800,
                  color: "#18181B",
                  letterSpacing: "-0.8px",
                }}
              >
                Settings
              </Typography>

              <Typography
                sx={{
                  color: "#71717A",
                  fontSize: 14,
                  mt: 0.2,
                }}
              >
                Manage your Grabit admin panel and store preferences
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<RefreshRoundedIcon />}
            onClick={handleReset}
            sx={{
              borderRadius: 2.5,
              px: 2,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              borderColor: "#E4E4E7",
              color: "#52525B",
              "&:hover": {
                borderColor: "#FF4FA3",
                color: "#FF4FA3",
                bgcolor: "rgba(255,79,163,0.04)",
              },
            }}
          >
            Reset
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{
              borderRadius: 2.5,
              px: 2.5,
              py: 1,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#FF4FA3",
              boxShadow: "0 8px 18px rgba(255,79,163,0.2)",
              "&:hover": {
                bgcolor: "#E6328B",
              },
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Stack>
      </Stack>

      {/* =====================================================
          STORE STATUS
      ===================================================== */}

      <Card
        sx={{
          borderRadius: 3,
          mb: 3,
          border: "1px solid #EEEEF2",
          boxShadow: "0 4px 18px rgba(0,0,0,0.035)",
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
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: "rgba(34,197,94,0.1)",
                  color: "#16A34A",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircleRoundedIcon />
              </Box>

              <Box>
                <Typography fontWeight={800}>Store Status</Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.3 }}
                >
                  Control whether customers can place new orders
                </Typography>
              </Box>
            </Stack>

            <FormControlLabel
              control={
                <Switch
                  checked={settings.allowNewOrders}
                  onChange={(e) =>
                    updateSetting("allowNewOrders", e.target.checked)
                  }
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#FF4FA3",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: "#FF4FA3",
                    },
                  }}
                />
              }
              label={
                <Chip
                  label={
                    settings.allowNewOrders ? "Store Open" : "Store Closed"
                  }
                  size="small"
                  sx={{
                    fontWeight: 700,
                    bgcolor: settings.allowNewOrders
                      ? "rgba(34,197,94,0.1)"
                      : "rgba(239,68,68,0.1)",
                    color: settings.allowNewOrders ? "#16A34A" : "#DC2626",
                  }}
                />
              }
            />
          </Stack>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* =====================================================
            STORE INFORMATION
        ===================================================== */}

        <Grid item xs={12} lg={7}>
          <SettingsCard
            icon={<StorefrontRoundedIcon />}
            title="Store Information"
            subtitle="Basic information about your Grabit store"
          >
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Store Name"
                  value={settings.storeName}
                  onChange={(e) => updateSetting("storeName", e.target.value)}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Support Email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    updateSetting("supportEmail", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Support Phone"
                  value={settings.supportPhone}
                  onChange={(e) =>
                    updateSetting("supportPhone", e.target.value)
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 0.7, display: "block" }}
                >
                  Currency
                </Typography>

                <Select
                  fullWidth
                  size="small"
                  value={settings.currency}
                  onChange={(e) => updateSetting("currency", e.target.value)}
                >
                  <MenuItem value="INR">Indian Rupee (₹)</MenuItem>

                  <MenuItem value="USD">US Dollar ($)</MenuItem>

                  <MenuItem value="EUR">Euro (€)</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 0.7, display: "block" }}
                >
                  Timezone
                </Typography>

                <Select
                  fullWidth
                  size="small"
                  value={settings.timezone}
                  onChange={(e) => updateSetting("timezone", e.target.value)}
                >
                  <MenuItem value="Asia/Kolkata">India Standard Time</MenuItem>

                  <MenuItem value="UTC">UTC</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </SettingsCard>
        </Grid>

        {/* =====================================================
            DELIVERY
        ===================================================== */}

        <Grid item xs={12} lg={5}>
          <SettingsCard
            icon={<LocalShippingRoundedIcon />}
            title="Delivery Settings"
            subtitle="Configure delivery charges and order limits"
          >
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Order Amount"
                value={settings.minOrderAmount}
                onChange={(e) =>
                  updateSetting("minOrderAmount", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                type="number"
                label="Free Delivery Above"
                value={settings.freeDeliveryAmount}
                onChange={(e) =>
                  updateSetting("freeDeliveryAmount", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                type="number"
                label="Delivery Fee"
                value={settings.deliveryFee}
                onChange={(e) => updateSetting("deliveryFee", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <SettingSwitch
                title="Delivery Service"
                description="Allow customers to use delivery"
                checked={settings.deliveryEnabled}
                onChange={(value) => updateSetting("deliveryEnabled", value)}
              />
            </Stack>
          </SettingsCard>
        </Grid>

        {/* =====================================================
            PAYMENT
        ===================================================== */}

        <Grid item xs={12} md={6}>
          <SettingsCard
            icon={<PaymentRoundedIcon />}
            title="Payment Settings"
            subtitle="Manage available payment methods"
          >
            <Stack spacing={1}>
              <SettingSwitch
                title="Cash on Delivery"
                description="Allow customers to pay when their order arrives"
                checked={settings.codEnabled}
                onChange={(value) => updateSetting("codEnabled", value)}
              />

              <Divider />

              <SettingSwitch
                title="Online Payments"
                description="Accept UPI, cards and online payments"
                checked={settings.onlinePaymentEnabled}
                onChange={(value) =>
                  updateSetting("onlinePaymentEnabled", value)
                }
              />
            </Stack>
          </SettingsCard>
        </Grid>

        {/* =====================================================
            NOTIFICATIONS
        ===================================================== */}

        <Grid item xs={12} md={6}>
          <SettingsCard
            icon={<NotificationsRoundedIcon />}
            title="Notifications"
            subtitle="Choose which admin notifications you receive"
          >
            <Stack spacing={1}>
              <SettingSwitch
                title="Order Notifications"
                description="Get notified when a new order is placed"
                checked={settings.orderNotifications}
                onChange={(value) => updateSetting("orderNotifications", value)}
              />

              <Divider />

              <SettingSwitch
                title="Email Notifications"
                description="Receive important updates by email"
                checked={settings.emailNotifications}
                onChange={(value) => updateSetting("emailNotifications", value)}
              />

              <Divider />

              <SettingSwitch
                title="Payment Notifications"
                description="Get notified about payment activity"
                checked={settings.paymentNotifications}
                onChange={(value) =>
                  updateSetting("paymentNotifications", value)
                }
              />

              <Divider />

              <SettingSwitch
                title="Low Stock Alerts"
                description="Receive alerts when products are running low"
                checked={settings.lowStockNotifications}
                onChange={(value) =>
                  updateSetting("lowStockNotifications", value)
                }
              />
            </Stack>
          </SettingsCard>
        </Grid>

        {/* =====================================================
            SECURITY / SYSTEM
        ===================================================== */}

        <Grid item xs={12}>
          <SettingsCard
            icon={<SecurityRoundedIcon />}
            title="System & Security"
            subtitle="Manage important system-level settings"
          >
            <Stack spacing={1}>
              <SettingSwitch
                title="Maintenance Mode"
                description="Temporarily disable customer access while you perform maintenance"
                checked={settings.maintenanceMode}
                onChange={(value) => updateSetting("maintenanceMode", value)}
                danger
              />
            </Stack>
          </SettingsCard>
        </Grid>
      </Grid>

      {/* =====================================================
          BOTTOM SAVE
      ===================================================== */}

      <Card
        sx={{
          mt: 3,
          borderRadius: 3,
          border: "1px solid rgba(255,79,163,0.18)",
          bgcolor: "rgba(255,79,163,0.035)",
        }}
      >
        <CardContent sx={{ p: 3 }}>
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
              <Typography fontWeight={800}>Save your changes</Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.4 }}
              >
                Make sure your settings are correct before saving.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<SaveRoundedIcon />}
              onClick={handleSave}
              disabled={saving}
              sx={{
                minWidth: 150,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
                bgcolor: "#FF4FA3",
                "&:hover": {
                  bgcolor: "#E6328B",
                },
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* =====================================================
          SNACKBAR
      ===================================================== */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3500}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

/* =============================================================
   SETTINGS CARD
============================================================= */

const SettingsCard = ({ icon, title, subtitle, children }) => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 3,
        border: "1px solid #EEEEF2",
        boxShadow: "0 4px 18px rgba(0,0,0,0.035)",
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
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
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

          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 17,
              }}
            >
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.2 }}>
              {subtitle}
            </Typography>
          </Box>
        </Stack>

        {children}
      </CardContent>
    </Card>
  );
};

/* =============================================================
   SWITCH
============================================================= */

const SettingSwitch = ({
  title,
  description,
  checked,
  onChange,
  danger = false,
}) => {
  return (
    <Box
      sx={{
        py: 1.2,
        px: 0.5,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              color: danger ? "#DC2626" : "#27272A",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.3,
              maxWidth: 600,
            }}
          >
            {description}
          </Typography>
        </Box>

        <Switch
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          sx={{
            flexShrink: 0,

            "& .MuiSwitch-switchBase.Mui-checked": {
              color: danger ? "#EF4444" : "#FF4FA3",
            },

            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              bgcolor: danger ? "#EF4444" : "#FF4FA3",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default AdminSettings;
