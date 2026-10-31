import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { useNavigate, useParams } from "react-router-dom";

import { getOrder } from "../../api/order.api";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrder(id);

      if (response.data?.success) {
        setOrder(response.data.order);
      } else {
        setError(response.data?.message || "Order not found");
      }
    } catch (error) {
      console.error("GET ORDER DETAILS ERROR:", error);

      setError(error.response?.data?.message || "Unable to load order details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadOrder();
    } else {
      setError("Order ID is missing");
      setLoading(false);
    }
  }, [id]);

  const formatAmount = (amount) => Number(amount || 0).toLocaleString("en-IN");

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status) => {
    const value = String(status || "").toLowerCase();

    if (value.includes("deliver") || value.includes("complete")) {
      return {
        color: "success.main",
        bgcolor: "success.light",
      };
    }

    if (value.includes("cancel") || value.includes("reject")) {
      return {
        color: "error.main",
        bgcolor: "error.light",
      };
    }

    if (
      value.includes("pending") ||
      value.includes("confirm") ||
      value.includes("process")
    ) {
      return {
        color: "warning.dark",
        bgcolor: "warning.light",
      };
    }

    return {
      color: "primary.main",
      bgcolor: "primary.light",
    };
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            bgcolor: "primary.light",
            opacity: 0.25,
            filter: "blur(80px)",
            top: -220,
            right: -180,
          },
        }}
      >
        <Stack alignItems="center" spacing={1.5} sx={{ position: "relative" }}>
          <CircularProgress size={34} thickness={4} color="primary" />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Loading order details...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !order) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: { xs: 5, sm: 8 },
          px: 2,
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            width: 380,
            height: 380,
            borderRadius: "50%",
            bgcolor: "primary.light",
            opacity: 0.25,
            filter: "blur(75px)",
            top: -180,
            right: -160,
          },

          "&::after": {
            content: '""',
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            bgcolor: "secondary.light",
            opacity: 0.18,
            filter: "blur(70px)",
            bottom: -180,
            left: -150,
          },
        }}
      >
        <Container maxWidth="sm" sx={{ position: "relative" }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <ReceiptLongRoundedIcon
              sx={{
                fontSize: 64,
                color: "error.main",
              }}
            />

            <Typography
              sx={{
                mt: 2,
                fontSize: { xs: 20, sm: 23 },
                fontWeight: 800,
              }}
            >
              Order not found
            </Typography>

            <Typography
              sx={{
                mt: 0.8,
                fontSize: 13,
                color: "text.secondary",
                lineHeight: 1.6,
              }}
            >
              {error || "This order could not be found."}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackRoundedIcon />}
                onClick={() => navigate("/orders")}
                sx={{
                  minHeight: 46,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Back to Orders
              </Button>

              <Button
                variant="contained"
                startIcon={<RefreshRoundedIcon />}
                onClick={loadOrder}
                sx={{
                  minHeight: 46,
                  borderRadius: 2.5,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Try Again
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    );
  }

  const status = getStatusConfig(order.status);

  // ============================================================
  // MAIN
  // ============================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        // Grabit themed outside background
        bgcolor: "background.default",

        backgroundImage: `
          radial-gradient(
            circle at 8% 8%,
            rgba(255, 79, 163, 0.14) 0,
            rgba(255, 79, 163, 0.07) 18%,
            transparent 38%
          ),
          radial-gradient(
            circle at 92% 85%,
            rgba(255, 79, 163, 0.10) 0,
            rgba(255, 79, 163, 0.04) 20%,
            transparent 42%
          )
        `,

        py: {
          xs: 1.5,
          sm: 3,
          md: 4,
        },

        pb: {
          xs: 6,
          sm: 8,
        },

        "&::before": {
          content: '""',
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.06,
          filter: "blur(80px)",
          top: -100,
          right: -100,
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.05,
          filter: "blur(90px)",
          bottom: -140,
          left: -130,
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
          },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{
            mb: {
              xs: 2,
              sm: 2.5,
            },
          }}
        >
          {/* Transparent icon button */}
          <IconButton
            onClick={() => navigate("/orders")}
            aria-label="Back to orders"
            sx={{
              width: {
                xs: 42,
                sm: 46,
              },
              height: {
                xs: 42,
                sm: 46,
              },

              borderRadius: 2.5,

              // No background color
              bgcolor: "transparent",

              color: "text.primary",

              border: "1px solid",
              borderColor: "divider",

              "&:hover": {
                bgcolor: "transparent",
                color: "primary.main",
                borderColor: "primary.main",
              },
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 21,
                  sm: 25,
                },
                fontWeight: 800,
                color: "text.primary",
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}
            >
              Order Details
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 11.5,
                color: "text.secondary",
              }}
            >
              Order #{order.id}
            </Typography>
          </Box>
        </Stack>

        {/* =====================================================
            SINGLE MAIN PAPER
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",

            bgcolor: "background.paper",

            border: "1px solid",
            borderColor: "rgba(0,0,0,0.07)",

            borderRadius: {
              xs: 3.5,
              sm: 4,
            },

            boxShadow: {
              xs: "0 10px 35px rgba(0,0,0,0.07)",
              sm: "0 20px 60px rgba(0,0,0,0.09)",
            },
          }}
        >
          {/* ===================================================
              ORDER SUMMARY
          =================================================== */}

          <Box
            sx={{
              position: "relative",
              p: {
                xs: 2,
                sm: 3,
              },
              overflow: "hidden",

              background:
                "linear-gradient(135deg, rgba(255,79,163,0.10), rgba(255,255,255,0))",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 230,
                height: 230,
                borderRadius: "50%",
                bgcolor: "primary.main",
                opacity: 0.07,
                filter: "blur(45px)",
                right: -100,
                top: -130,
                pointerEvents: "none",
              }}
            />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              sx={{
                position: "relative",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.3}>
                {/* No colored icon background */}
                <ShoppingBagRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 28,
                      sm: 32,
                    },
                    color: "primary.main",
                    flexShrink: 0,
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 14,
                        sm: 16,
                      },
                      fontWeight: 800,
                    }}
                  >
                    Order #{order.id}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.35,
                      fontSize: 11,
                      color: "text.secondary",
                    }}
                  >
                    Placed {formatDate(order.created_at)}
                  </Typography>
                </Box>
              </Stack>

              <Typography
                sx={{
                  fontSize: {
                    xs: 18,
                    sm: 21,
                  },
                  fontWeight: 900,
                  color: "primary.main",
                  whiteSpace: "nowrap",
                }}
              >
                ₹{formatAmount(order.total)}
              </Typography>
            </Stack>

            {/* STATUS */}

            <Box
              sx={{
                mt: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.7,
                px: 1.3,
                py: 0.65,
                borderRadius: 2,
                bgcolor: status.bgcolor,
                color: status.color,
              }}
            >
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: 15,
                }}
              />

              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "capitalize",
                }}
              >
                {order.status || "Placed"}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* ===================================================
              ITEMS
          =================================================== */}

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              {/* No background */}
              <ShoppingBagRoundedIcon
                sx={{
                  fontSize: 20,
                  color: "primary.main",
                }}
              />

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                Order Items
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              {order.items?.map((item, index) => (
                <Box key={item.id}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: 13.5,
                          fontWeight: 700,
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.3,
                          fontSize: 11.5,
                          color: "text.secondary",
                        }}
                      >
                        ₹{formatAmount(item.price)} × {item.quantity}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{formatAmount(item.total)}
                    </Typography>
                  </Stack>

                  {index !== order.items.length - 1 && (
                    <Divider sx={{ mt: 1.5 }} />
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* ===================================================
              DELIVERY ADDRESS
          =================================================== */}

          {order.address && (
            <>
              <Box
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  {/* No background */}
                  <LocationOnRoundedIcon
                    sx={{
                      fontSize: 21,
                      color: "primary.main",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 800,
                    }}
                  >
                    Delivery Address
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    p: 1.7,
                    borderRadius: 2.5,

                    bgcolor: "rgba(255,79,163,0.035)",

                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    {order.address.name}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 12,
                      lineHeight: 1.6,
                      color: "text.secondary",
                    }}
                  >
                    {order.address.address}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  >
                    {order.address.city}, {order.address.state}{" "}
                    {order.address.pincode}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.7,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Phone: {order.address.phone}
                  </Typography>
                </Box>
              </Box>

              <Divider />
            </>
          )}

          {/* ===================================================
              PAYMENT
          =================================================== */}

          {order.payment && (
            <>
              <Box
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  {/* No background */}
                  <PaymentRoundedIcon
                    sx={{
                      fontSize: 21,
                      color: "primary.main",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 800,
                    }}
                  >
                    Payment
                  </Typography>
                </Stack>

                <Stack spacing={1.2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.secondary",
                      }}
                    >
                      Payment Method
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {order.payment.method}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "text.secondary",
                      }}
                    >
                      Payment Status
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 800,
                        color:
                          String(order.payment.status).toLowerCase() === "paid"
                            ? "success.main"
                            : "warning.main",
                        textTransform: "capitalize",
                      }}
                    >
                      {order.payment.status}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              <Divider />
            </>
          )}

          {/* ===================================================
              TIMELINE
          =================================================== */}

          {order.status_history?.length > 0 && (
            <>
              <Box
                sx={{
                  p: {
                    xs: 2,
                    sm: 3,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 800,
                    mb: 2.5,
                  }}
                >
                  Order Timeline
                </Typography>

                <Stack spacing={0}>
                  {order.status_history.map((history, index) => {
                    const isLast = index === order.status_history.length - 1;

                    return (
                      <Stack key={history.id} direction="row" spacing={1.5}>
                        <Stack
                          alignItems="center"
                          sx={{
                            width: 20,
                            flexShrink: 0,
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              fontSize: 18,
                              color: isLast ? "primary.main" : "success.main",
                            }}
                          />

                          {!isLast && (
                            <Box
                              sx={{
                                width: 2,
                                flex: 1,
                                minHeight: 35,
                                bgcolor: "divider",
                                my: 0.5,
                              }}
                            />
                          )}
                        </Stack>

                        <Box
                          sx={{
                            pb: isLast ? 0 : 2.5,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 800,
                              textTransform: "capitalize",
                            }}
                          >
                            {history.status}
                          </Typography>

                          {history.note && (
                            <Typography
                              sx={{
                                mt: 0.3,
                                fontSize: 11.5,
                                color: "text.secondary",
                                lineHeight: 1.5,
                              }}
                            >
                              {history.note}
                            </Typography>
                          )}

                          <Typography
                            sx={{
                              mt: 0.3,
                              fontSize: 10.5,
                              color: "text.disabled",
                            }}
                          >
                            {formatDate(history.created_at)}
                          </Typography>
                        </Box>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>

              <Divider />
            </>
          )}

          {/* ===================================================
              BILL SUMMARY
          =================================================== */}

          <Box
            sx={{
              p: {
                xs: 2,
                sm: 3,
              },

              background:
                "linear-gradient(135deg, rgba(255,79,163,0.045), rgba(255,255,255,0))",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 2 }}
            >
              {/* No background */}
              <ReceiptLongRoundedIcon
                sx={{
                  fontSize: 21,
                  color: "primary.main",
                }}
              />

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                Bill Summary
              </Typography>
            </Stack>

            <Stack spacing={1.2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                  }}
                >
                  Subtotal
                </Typography>

                <Typography sx={{ fontSize: 12 }}>
                  ₹{formatAmount(order.subtotal)}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                  }}
                >
                  Delivery Fee
                </Typography>

                <Typography sx={{ fontSize: 12 }}>
                  ₹{formatAmount(order.delivery_fee)}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between">
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "text.secondary",
                  }}
                >
                  Discount
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "success.main",
                  }}
                >
                  -₹{formatAmount(order.discount)}
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 800,
                }}
              >
                Total Amount
              </Typography>

              <Typography
                sx={{
                  fontSize: 21,
                  fontWeight: 900,
                  color: "primary.main",
                }}
              >
                ₹{formatAmount(order.total)}
              </Typography>
            </Stack>
          </Box>
        </Paper>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            fontSize: 9.5,
            fontWeight: 700,
            color: "text.disabled",
            letterSpacing: 0.6,
          }}
        >
          GRAB EVERYTHING. DELIVERED FAST.
        </Typography>
      </Container>
    </Box>
  );
}

export default OrderDetails;
