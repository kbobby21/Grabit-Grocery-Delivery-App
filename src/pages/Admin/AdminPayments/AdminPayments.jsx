import React, { useEffect, useMemo, useState } from "react";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PendingRoundedIcon from "@mui/icons-material/PendingRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminPayments,
  fetchPaymentDetails,
  fetchPaymentOverview,
  clearPaymentDetails,
} from "../../../redux/slices/adminPaymentSlice";

// If your uiSlice exports showSnackbar, keep this import.
// If your existing action has a different name, change only this import.
import { showSnackbar } from "../../../redux/slices/uiSlice";

const PRIMARY = "#FF4FA3";
const PRIMARY_LIGHT = "#FFF0F7";
const BACKGROUND = "#FAFAFC";
const TEXT = "#17171B";
const MUTED = "#85858D";
const BORDER = "#EEEEF2";

// ======================================================
// HELPERS
// ======================================================

const formatCurrency = (value) => {
  const amount = Number(value || 0);

  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
};

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatus = (status) => {
  const normalized = String(status || "").toLowerCase();

  switch (normalized) {
    case "success":
      return {
        label: "Success",
        color: "success",
      };

    case "paid":
      return {
        label: "Paid",
        color: "success",
      };

    case "pending":
      return {
        label: "Pending",
        color: "warning",
      };

    case "failed":
      return {
        label: "Failed",
        color: "error",
      };

    case "refunded":
      return {
        label: "Refunded",
        color: "info",
      };

    case "cancelled":
      return {
        label: "Cancelled",
        color: "default",
      };

    default:
      return {
        label: status || "Unknown",
        color: "default",
      };
  }
};

// ======================================================
// STAT CARD
// ======================================================

function PaymentStatCard({
  title,
  value,
  amount,
  icon: Icon,
  iconBackground = PRIMARY_LIGHT,
  iconColor = PRIMARY,
  loading,
}) {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "20px",
        border: `1px solid ${BORDER}`,
        boxShadow: "0 8px 30px rgba(20, 20, 40, 0.045)",
        background: "#fff",
        transition: "all .2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 12px 35px rgba(20, 20, 40, 0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 13,
                color: MUTED,
                fontWeight: 600,
                mb: 1,
              }}
            >
              {title}
            </Typography>

            {loading ? (
              <Skeleton variant="text" width={90} height={40} />
            ) : (
              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: TEXT,
                  lineHeight: 1.15,
                }}
              >
                {value}
              </Typography>
            )}

            {loading ? (
              <Skeleton variant="text" width={110} height={22} />
            ) : (
              <Typography
                sx={{
                  mt: 0.8,
                  fontSize: 12,
                  color: "#999",
                  fontWeight: 500,
                }}
              >
                {amount}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: iconBackground,
              color: iconColor,
              flexShrink: 0,
            }}
          >
            <Icon />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ======================================================
// PAYMENT METHOD CARD
// ======================================================

function PaymentMethodCard({
  title,
  transactions,
  amount,
  icon: Icon,
  background,
  color,
}) {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        border: `1px solid ${BORDER}`,
        boxShadow: "0 8px 30px rgba(20,20,40,.045)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={1.7}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: "14px",
                background,
                color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: MUTED,
                  fontWeight: 600,
                }}
              >
                {title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 21,
                  fontWeight: 800,
                  color: TEXT,
                  mt: 0.2,
                }}
              >
                {formatCurrency(amount)}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 800,
                color: TEXT,
              }}
            >
              {transactions}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: MUTED,
              }}
            >
              transactions
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ======================================================
// DETAILS ROW
// ======================================================

function DetailRow({ label, value, copyable = false }) {
  const handleCopy = async () => {
    if (!value || value === "—") return;

    try {
      await navigator.clipboard.writeText(String(value));
    } catch {
      // Clipboard can fail in some browsers.
    }
  };

  return (
    <Box
      sx={{
        py: 1.4,
        borderBottom: `1px solid ${BORDER}`,
        "&:last-child": {
          borderBottom: 0,
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: MUTED,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          {label}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: TEXT,
              fontWeight: 600,
              textAlign: "right",
              wordBreak: "break-word",
            }}
          >
            {value || "—"}
          </Typography>

          {copyable && value && value !== "—" && (
            <Tooltip title="Copy">
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  color: "#999",
                }}
              >
                <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

// ======================================================
// PAYMENT DETAILS DIALOG
// ======================================================

function PaymentDetailsDialog({ open, onClose, payment, loading, error }) {
  const status = getStatus(payment?.payment_status);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 25px 70px rgba(0,0,0,.18)",
        },
      }}
    >
      <Box
        sx={{
          px: 3,
          py: 2.2,
          background: "linear-gradient(135deg, #fff0f7 0%, #ffffff 75%)",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                background: PRIMARY,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ReceiptLongRoundedIcon />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: TEXT,
                }}
              >
                Payment Details
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: MUTED,
                  mt: 0.2,
                }}
              >
                Transaction information
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={onClose}
            sx={{
              background: "#fff",
              border: `1px solid ${BORDER}`,
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        {loading ? (
          <Stack spacing={2}>
            <Skeleton variant="rounded" height={110} sx={{ borderRadius: 3 }} />

            <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3 }} />

            <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3 }} />
          </Stack>
        ) : error ? (
          <Alert severity="error" sx={{ borderRadius: 3 }}>
            {error}
          </Alert>
        ) : !payment ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
            }}
          >
            <Typography color="text.secondary">
              Payment details not available.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.2}>
            {/* PAYMENT SUMMARY */}
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${BORDER}`,
                background: "linear-gradient(135deg, #fff4f9, #fff)",
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
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
                  gap={2}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: MUTED,
                        fontWeight: 600,
                      }}
                    >
                      Payment #{payment.id}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 26,
                        fontWeight: 900,
                        color: TEXT,
                        mt: 0.5,
                      }}
                    >
                      {formatCurrency(payment.amount)}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: MUTED,
                        mt: 0.4,
                      }}
                    >
                      Order: {payment.order_id}
                    </Typography>
                  </Box>

                  <Chip
                    label={status.label}
                    color={status.color}
                    sx={{
                      fontWeight: 800,
                      borderRadius: 2,
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>

            <Grid container spacing={2}>
              {/* CUSTOMER */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{ mb: 1 }}
                    >
                      <PersonRoundedIcon
                        sx={{
                          fontSize: 19,
                          color: PRIMARY,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 800,
                        }}
                      >
                        Customer
                      </Typography>
                    </Stack>

                    <DetailRow label="Name" value={payment.customer_name} />

                    <DetailRow label="Phone" value={payment.customer_phone} />

                    <DetailRow label="Email" value={payment.customer_email} />

                    <DetailRow label="User ID" value={payment.user_id} />
                  </CardContent>
                </Card>
              </Grid>

              {/* PAYMENT */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{ mb: 1 }}
                    >
                      <CurrencyRupeeRoundedIcon
                        sx={{
                          fontSize: 19,
                          color: PRIMARY,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 800,
                        }}
                      >
                        Payment Information
                      </Typography>
                    </Stack>

                    <DetailRow label="Method" value={payment.payment_method} />

                    <DetailRow label="Status" value={payment.payment_status} />

                    <DetailRow label="Currency" value={payment.currency} />

                    <DetailRow
                      label="Amount"
                      value={formatCurrency(payment.amount)}
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* RAZORPAY */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{ mb: 1 }}
                    >
                      <CreditCardRoundedIcon
                        sx={{
                          fontSize: 19,
                          color: "#4267D5",
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 800,
                        }}
                      >
                        Gateway Information
                      </Typography>
                    </Stack>

                    <DetailRow
                      label="Razorpay Order ID"
                      value={payment.razorpay_order_id}
                      copyable
                    />

                    <DetailRow
                      label="Razorpay Payment ID"
                      value={payment.razorpay_payment_id}
                      copyable
                    />

                    <DetailRow
                      label="Transaction ID"
                      value={payment.transaction_id}
                      copyable
                    />

                    <DetailRow
                      label="Signature"
                      value={payment.razorpay_signature}
                      copyable
                    />
                  </CardContent>
                </Card>
              </Grid>

              {/* ORDER */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    border: `1px solid ${BORDER}`,
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 2.5 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      sx={{ mb: 1 }}
                    >
                      <ReceiptLongRoundedIcon
                        sx={{
                          fontSize: 19,
                          color: PRIMARY,
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 800,
                        }}
                      >
                        Order Information
                      </Typography>
                    </Stack>

                    <DetailRow
                      label="Order ID"
                      value={payment.order_id}
                      copyable
                    />

                    <DetailRow
                      label="Order Status"
                      value={payment.order_status}
                    />

                    <DetailRow
                      label="Subtotal"
                      value={
                        payment.subtotal !== null
                          ? formatCurrency(payment.subtotal)
                          : "—"
                      }
                    />

                    <DetailRow
                      label="Delivery Fee"
                      value={
                        payment.delivery_fee !== null
                          ? formatCurrency(payment.delivery_fee)
                          : "—"
                      }
                    />

                    <DetailRow
                      label="Discount"
                      value={
                        payment.discount !== null
                          ? formatCurrency(payment.discount)
                          : "—"
                      }
                    />

                    <DetailRow
                      label="Order Total"
                      value={
                        payment.order_total !== null
                          ? formatCurrency(payment.order_total)
                          : "—"
                      }
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* TIMESTAMPS */}
            <Card
              sx={{
                borderRadius: 4,
                border: `1px solid ${BORDER}`,
                boxShadow: "none",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{ mb: 1 }}
                >
                  <CalendarMonthRoundedIcon
                    sx={{
                      fontSize: 19,
                      color: PRIMARY,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 800,
                    }}
                  >
                    Timeline
                  </Typography>
                </Stack>

                <DetailRow
                  label="Created At"
                  value={formatDate(payment.created_at)}
                />

                <DetailRow
                  label="Updated At"
                  value={formatDate(payment.updated_at)}
                />

                <DetailRow
                  label="Paid At"
                  value={formatDate(payment.paid_at)}
                />

                <DetailRow
                  label="Order Created At"
                  value={formatDate(payment.order_created_at)}
                />
              </CardContent>
            </Card>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ======================================================
// MAIN PAGE
// ======================================================

export default function AdminPayments() {
  const dispatch = useDispatch();

  const {
    overview,
    payments,
    pagination,
    loading,
    overviewLoading,
    detailsLoading,
    error,
    detailsError,
    paymentDetails,
  } = useSelector((state) => state.adminPayment);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [method, setMethod] = useState("");
  const [page, setPage] = useState(1);

  const [detailsOpen, setDetailsOpen] = useState(false);

  // ====================================================
  // LOAD OVERVIEW
  // ====================================================

  useEffect(() => {
    dispatch(fetchPaymentOverview());
  }, [dispatch]);

  // ====================================================
  // LOAD PAYMENTS
  // ====================================================

  useEffect(() => {
    dispatch(
      fetchAdminPayments({
        page,
        limit: 20,
        ...(status ? { status } : {}),
        ...(method ? { method } : {}),
      }),
    );
  }, [dispatch, page, status, method]);

  // ====================================================
  // SEARCH
  // ====================================================

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return payments;
    }

    return payments.filter((payment) => {
      return (
        String(payment.id || "")
          .toLowerCase()
          .includes(query) ||
        String(payment.order_id || "")
          .toLowerCase()
          .includes(query) ||
        String(payment.customer_name || "")
          .toLowerCase()
          .includes(query) ||
        String(payment.customer_phone || "")
          .toLowerCase()
          .includes(query) ||
        String(payment.customer_email || "")
          .toLowerCase()
          .includes(query) ||
        String(payment.payment_method || "")
          .toLowerCase()
          .includes(query) ||
        String(payment.razorpay_payment_id || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [payments, search]);

  // ====================================================
  // FILTERS
  // ====================================================

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setMethod("");
    setPage(1);
  };

  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh = async () => {
    await Promise.all([
      dispatch(fetchPaymentOverview()),
      dispatch(
        fetchAdminPayments({
          page,
          limit: 20,
          ...(status ? { status } : {}),
          ...(method ? { method } : {}),
        }),
      ),
    ]);

    dispatch(
      showSnackbar({
        message: "Payment data refreshed successfully",
        severity: "success",
      }),
    );
  };

  // ====================================================
  // VIEW DETAILS
  // ====================================================

  const handleViewDetails = (paymentId) => {
    setDetailsOpen(true);

    dispatch(fetchPaymentDetails(paymentId));
  };

  // ====================================================
  // CLOSE DETAILS
  // ====================================================

  const handleCloseDetails = () => {
    setDetailsOpen(false);

    dispatch(clearPaymentDetails());
  };

  // ====================================================
  // ERROR SNACKBAR
  // ====================================================

  useEffect(() => {
    if (!error) return;

    dispatch(
      showSnackbar({
        message: error,
        severity: "error",
      }),
    );
  }, [dispatch, error]);

  // ====================================================
  // PAGE
  // ====================================================

  return (
    <Box
      sx={{
        minHeight: "100%",
        background: BACKGROUND,
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
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
          <Stack direction="row" alignItems="center" gap={1.3}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                background: PRIMARY_LIGHT,
                color: PRIMARY,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PaymentsRoundedIcon />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 24,
                  md: 30,
                },
                fontWeight: 850,
                color: TEXT,
                letterSpacing: "-0.5px",
              }}
            >
              Payments
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: MUTED,
              fontSize: 13.5,
              mt: 0.8,
            }}
          >
            Track transactions, payment methods and payment status.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={
            loading ? (
              <CircularProgress size={17} color="inherit" />
            ) : (
              <RefreshRoundedIcon />
            )
          }
          onClick={handleRefresh}
          disabled={loading}
          sx={{
            minWidth: 110,
            height: 42,
            borderRadius: "12px",
            borderColor: BORDER,
            color: TEXT,
            background: "#fff",
            textTransform: "none",
            fontWeight: 700,
            "&:hover": {
              borderColor: PRIMARY,
              color: PRIMARY,
              background: PRIMARY_LIGHT,
            },
          }}
        >
          Refresh
        </Button>
      </Stack>

      {/* =================================================
          OVERVIEW CARDS
      ================================================= */}

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <PaymentStatCard
            title="Total Transactions"
            value={overview.total_transactions}
            amount={formatCurrency(overview.total_amount)}
            icon={PaymentsRoundedIcon}
            loading={overviewLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <PaymentStatCard
            title="Successful Payments"
            value={overview.successful_transactions}
            amount={formatCurrency(overview.successful_amount)}
            icon={CheckCircleRoundedIcon}
            iconBackground="#ECFDF3"
            iconColor="#16A34A"
            loading={overviewLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <PaymentStatCard
            title="Pending Payments"
            value={overview.pending_transactions}
            amount={formatCurrency(overview.pending_amount)}
            icon={PendingRoundedIcon}
            iconBackground="#FFF8E7"
            iconColor="#D97706"
            loading={overviewLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <PaymentStatCard
            title="Failed Payments"
            value={overview.failed_transactions}
            amount={formatCurrency(overview.failed_amount)}
            icon={ErrorRoundedIcon}
            iconBackground="#FEF2F2"
            iconColor="#DC2626"
            loading={overviewLoading}
          />
        </Grid>
      </Grid>

      {/* =================================================
          PAYMENT METHODS
      ================================================= */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PaymentMethodCard
            title="Cash on Delivery"
            transactions={overview.cod_transactions}
            amount={overview.cod_amount}
            icon={AccountBalanceWalletRoundedIcon}
            background="#FFF0F7"
            color={PRIMARY}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PaymentMethodCard
            title="Razorpay"
            transactions={overview.razorpay_transactions}
            amount={overview.razorpay_amount}
            icon={CreditCardRoundedIcon}
            background="#EEF3FF"
            color="#4267D5"
          />
        </Grid>
      </Grid>

      {/* =================================================
          PAYMENTS TABLE
      ================================================= */}

      <Card
        sx={{
          borderRadius: "22px",
          border: `1px solid ${BORDER}`,
          boxShadow: "0 8px 30px rgba(20,20,40,.045)",
          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}

        <Box sx={{ p: 2.5 }}>
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "stretch",
              lg: "center",
            }}
            spacing={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: TEXT,
                }}
              >
                Payment Transactions
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: MUTED,
                  mt: 0.3,
                }}
              >
                {pagination.total || 0} total transactions
              </Typography>
            </Box>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={1}
            >
              {/* SEARCH */}

              <TextField
                size="small"
                placeholder="Search payments..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{
                  minWidth: {
                    sm: 240,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "#FAFAFC",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon
                        sx={{
                          color: "#999",
                          fontSize: 20,
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              {/* STATUS */}

              <FormControl
                size="small"
                sx={{
                  minWidth: 140,
                }}
              >
                <InputLabel>Status</InputLabel>

                <Select
                  value={status}
                  label="Status"
                  onChange={handleStatusChange}
                  sx={{
                    borderRadius: "12px",
                    background: "#FAFAFC",
                  }}
                >
                  <MenuItem value="">All Status</MenuItem>

                  <MenuItem value="success">Success</MenuItem>

                  <MenuItem value="paid">Paid</MenuItem>

                  <MenuItem value="pending">Pending</MenuItem>

                  <MenuItem value="failed">Failed</MenuItem>

                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>

              {/* METHOD */}

              <FormControl
                size="small"
                sx={{
                  minWidth: 140,
                }}
              >
                <InputLabel>Method</InputLabel>

                <Select
                  value={method}
                  label="Method"
                  onChange={handleMethodChange}
                  sx={{
                    borderRadius: "12px",
                    background: "#FAFAFC",
                  }}
                >
                  <MenuItem value="">All Methods</MenuItem>

                  <MenuItem value="COD">COD</MenuItem>

                  <MenuItem value="Razorpay">Razorpay</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Box>

        <Divider />

        {/* =================================================
            ACTIVE FILTERS
        ================================================= */}

        {(status || method || search) && (
          <Box
            sx={{
              px: 2.5,
              py: 1.3,
              background: "#FFFBFD",
              borderBottom: `1px solid ${BORDER}`,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: MUTED,
                  fontWeight: 600,
                }}
              >
                Active filters:
              </Typography>

              {search && (
                <Chip
                  label={`Search: ${search}`}
                  size="small"
                  onDelete={() => setSearch("")}
                  sx={{
                    borderRadius: 2,
                  }}
                />
              )}

              {status && (
                <Chip
                  label={`Status: ${status}`}
                  size="small"
                  onDelete={() => {
                    setStatus("");
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: 2,
                  }}
                />
              )}

              {method && (
                <Chip
                  label={`Method: ${method}`}
                  size="small"
                  onDelete={() => {
                    setMethod("");
                    setPage(1);
                  }}
                  sx={{
                    borderRadius: 2,
                  }}
                />
              )}

              <Button
                size="small"
                onClick={handleClearFilters}
                sx={{
                  textTransform: "none",
                  color: PRIMARY,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                Clear all
              </Button>
            </Stack>
          </Box>
        )}

        {/* =================================================
            TABLE
        ================================================= */}

        <TableContainer
          sx={{
            overflowX: "auto",
          }}
        >
          <Table
            sx={{
              minWidth: 900,
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  background: "#FAFAFC",
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                    py: 1.8,
                  }}
                >
                  PAYMENT
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  CUSTOMER
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  METHOD
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  AMOUNT
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  STATUS
                </TableCell>

                <TableCell
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  DATE
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 800,
                    fontSize: 12,
                    color: "#666",
                  }}
                >
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* LOADING */}

              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <TableRow key={index}>
                    {Array.from({ length: 7 }).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton
                          variant="text"
                          width={cellIndex === 6 ? 40 : "80%"}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredPayments.length === 0 ? (
                /* EMPTY */

                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box
                      sx={{
                        py: 8,
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: "20px",
                          background: PRIMARY_LIGHT,
                          color: PRIMARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <PaymentsRoundedIcon sx={{ fontSize: 30 }} />
                      </Box>

                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: TEXT,
                          fontSize: 16,
                        }}
                      >
                        No payments found
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 13,
                          color: MUTED,
                          mt: 0.5,
                        }}
                      >
                        Try changing your filters or search.
                      </Typography>

                      {(status || method || search) && (
                        <Button
                          onClick={handleClearFilters}
                          sx={{
                            mt: 2,
                            color: PRIMARY,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          Clear filters
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                /* DATA */

                filteredPayments.map((payment) => {
                  const statusConfig = getStatus(payment.payment_status);

                  return (
                    <TableRow
                      key={payment.id}
                      hover
                      sx={{
                        "&:last-child td": {
                          borderBottom: 0,
                        },
                        "&:hover": {
                          background: "#FFFBFD",
                        },
                      }}
                    >
                      {/* PAYMENT */}

                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1.5}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "12px",
                              background: PRIMARY_LIGHT,
                              color: PRIMARY,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <PaymentsRoundedIcon
                              sx={{
                                fontSize: 20,
                              }}
                            />
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                fontWeight: 800,
                                fontSize: 13,
                                color: TEXT,
                              }}
                            >
                              PAY-{payment.id}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 11,
                                color: MUTED,
                                mt: 0.2,
                              }}
                            >
                              Order #{payment.order_id}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* CUSTOMER */}

                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1.2}>
                          <Avatar
                            src={payment.customer_avatar || undefined}
                            sx={{
                              width: 34,
                              height: 34,
                              background: PRIMARY_LIGHT,
                              color: PRIMARY,
                              fontSize: 13,
                              fontWeight: 800,
                            }}
                          >
                            {(payment.customer_name || "G")
                              .charAt(0)
                              .toUpperCase()}
                          </Avatar>

                          <Box>
                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: TEXT,
                              }}
                            >
                              {payment.customer_name || "Guest Customer"}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 11,
                                color: MUTED,
                              }}
                            >
                              {payment.customer_phone ||
                                payment.customer_email ||
                                "—"}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* METHOD */}

                      <TableCell>
                        <Chip
                          icon={
                            payment.payment_method === "Razorpay" ? (
                              <CreditCardRoundedIcon />
                            ) : (
                              <AccountBalanceWalletRoundedIcon />
                            )
                          }
                          label={payment.payment_method || "—"}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 700,
                            fontSize: 11,
                            background:
                              payment.payment_method === "Razorpay"
                                ? "#EEF3FF"
                                : "#F5F5F7",
                            color:
                              payment.payment_method === "Razorpay"
                                ? "#4267D5"
                                : "#555",
                            "& .MuiChip-icon": {
                              fontSize: 15,
                            },
                          }}
                        />
                      </TableCell>

                      {/* AMOUNT */}

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: TEXT,
                          }}
                        >
                          {formatCurrency(payment.amount)}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 10,
                            color: MUTED,
                          }}
                        >
                          {payment.currency || "INR"}
                        </Typography>
                      </TableCell>

                      {/* STATUS */}

                      <TableCell>
                        <Chip
                          label={statusConfig.label}
                          color={statusConfig.color}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 800,
                            fontSize: 11,
                          }}
                        />
                      </TableCell>

                      {/* DATE */}

                      <TableCell>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#555",
                          }}
                        >
                          {formatDate(payment.created_at)}
                        </Typography>
                      </TableCell>

                      {/* ACTION */}

                      <TableCell align="right">
                        <Tooltip title="View payment details">
                          <IconButton
                            onClick={() => handleViewDetails(payment.id)}
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "10px",
                              color: PRIMARY,
                              background: PRIMARY_LIGHT,
                              "&:hover": {
                                background: "#FFE0EE",
                              },
                            }}
                          >
                            <VisibilityRoundedIcon
                              sx={{
                                fontSize: 19,
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {!loading &&
          filteredPayments.length > 0 &&
          pagination.totalPages > 1 && (
            <>
              <Divider />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                alignItems={{
                  xs: "center",
                  sm: "center",
                }}
                spacing={2}
                sx={{
                  p: 2.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: MUTED,
                  }}
                >
                  Page {pagination.page} of {pagination.totalPages} •{" "}
                  {pagination.total} payments
                </Typography>

                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={(_, value) => setPage(value)}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      borderRadius: "9px",
                      fontWeight: 700,
                    },

                    "& .MuiPaginationItem-root.Mui-selected": {
                      background: PRIMARY,
                      color: "#fff",

                      "&:hover": {
                        background: PRIMARY,
                      },
                    },
                  }}
                />
              </Stack>
            </>
          )}
      </Card>

      {/* =================================================
          DETAILS DIALOG
      ================================================= */}

      <PaymentDetailsDialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        payment={paymentDetails}
        loading={detailsLoading}
        error={detailsError}
      />
    </Box>
  );
}
