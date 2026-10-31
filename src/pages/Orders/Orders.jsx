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

import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import { useNavigate } from "react-router-dom";

import { getOrders } from "../../api/order.api";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD ORDERS
  // ============================================================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();

      console.log("Fresh Orders API:", response.data);

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        setError(response.data.message || "Unable to load orders");
      }
    } catch (error) {
      console.error("Get Orders Error:", error);

      setError(error.response?.data?.message || "Unable to load your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ============================================================
  // FORMAT AMOUNT
  // ============================================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString("en-IN");
  };

  // ============================================================
  // STATUS STYLES
  // ============================================================

  const getStatusStyles = (status) => {
    const normalizedStatus = String(status || "").toLowerCase();

    if (
      normalizedStatus.includes("deliver") ||
      normalizedStatus.includes("complete")
    ) {
      return {
        color: "success.main",
        bgcolor: "success.light",
      };
    }

    if (
      normalizedStatus.includes("cancel") ||
      normalizedStatus.includes("reject")
    ) {
      return {
        color: "error.main",
        bgcolor: "error.light",
      };
    }

    if (
      normalizedStatus.includes("pending") ||
      normalizedStatus.includes("confirm") ||
      normalizedStatus.includes("process")
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
        }}
      >
        <Stack alignItems="center" spacing={1.5}>
          <CircularProgress size={34} color="primary" />

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "text.secondary",
            }}
          >
            Loading your orders...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: {
            xs: 5,
            sm: 8,
          },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 76,
                height: 76,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "error.light",
                color: "error.main",
              }}
            >
              <ReceiptLongRoundedIcon
                sx={{
                  fontSize: 38,
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 2.5,
                fontSize: {
                  xs: 20,
                  sm: 23,
                },
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              Unable to load orders
            </Typography>

            <Typography
              sx={{
                mt: 0.8,
                fontSize: 13,
                color: "text.secondary",
              }}
            >
              {error}
            </Typography>

            <Button
              variant="contained"
              startIcon={<RefreshRoundedIcon />}
              onClick={loadOrders}
              sx={{
                mt: 3,
                px: 3,
                minHeight: 46,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Try Again
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  // ============================================================
  // EMPTY STATE
  // ============================================================

  if (!orders.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          py: {
            xs: 5,
            sm: 8,
          },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 3,
                sm: 5,
              },
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 82,
                height: 82,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "primary.light",
                color: "primary.main",
              }}
            >
              <ShoppingBagRoundedIcon
                sx={{
                  fontSize: 42,
                }}
              />
            </Box>

            <Typography
              sx={{
                mt: 2.5,
                fontSize: {
                  xs: 21,
                  sm: 24,
                },
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              No orders yet
            </Typography>

            <Typography
              sx={{
                mt: 0.8,
                fontSize: 13,
                lineHeight: 1.6,
                color: "text.secondary",
                maxWidth: 340,
                mx: "auto",
              }}
            >
              Your orders will appear here once you place your first order.
            </Typography>

            <Button
              variant="contained"
              startIcon={<ShoppingCartRoundedIcon />}
              onClick={() => navigate("/home")}
              sx={{
                mt: 3,
                px: 3,
                minHeight: 48,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  // ============================================================
  // ORDERS PAGE
  // ============================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        pb: {
          xs: 7,
          sm: 9,
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
        }}
      >
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mb: {
              xs: 2.5,
              sm: 3,
            },
          }}
        >
          {/* BACK BUTTON */}

          <IconButton
            onClick={() => navigate("/home")}
            aria-label="Back to home"
            sx={{
              width: {
                xs: 42,
                sm: 46,
              },
              height: {
                xs: 42,
                sm: 46,
              },
              flexShrink: 0,
              mr: {
                xs: 0.8,
                sm: 1,
              },
              borderRadius: 2.5,
              color: "text.primary",
              border: "1px solid",
              borderColor: "divider",
              backgroundColor: "transparent",
              transition: "all 0.2s ease",

              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
                borderColor: "primary.main",
                transform: "translateX(-2px)",
              },
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          {/* SHOPPING BAG ICON */}

          <Box
            sx={{
              width: {
                xs: 46,
                sm: 50,
              },
              height: {
                xs: 46,
                sm: 50,
              },
              mr: 1.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              // No background
              bgcolor: "transparent",

              color: "primary.main",
            }}
          >
            <ShoppingBagRoundedIcon
              sx={{
                fontSize: {
                  xs: 27,
                  sm: 30,
                },
              }}
            />
          </Box>

          {/* TITLE */}

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 26,
                },
                fontWeight: 800,
                color: "text.primary",
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}
            >
              My Orders
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {orders.length} {orders.length === 1 ? "order" : "orders"} placed
            </Typography>
          </Box>
        </Stack>

        {/* =====================================================
            ORDER LIST
        ===================================================== */}

        <Stack spacing={1.8}>
          {orders.map((order) => {
            const statusStyles = getStatusStyles(order.status);

            return (
              <Paper
                key={order.id}
                elevation={0}
                sx={{
                  p: {
                    xs: 1.8,
                    sm: 2.5,
                  },
                  borderRadius: {
                    xs: 3,
                    sm: 3.5,
                  },
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: 2,
                  transition: "all 0.2s ease",

                  "&:hover": {
                    borderColor: "primary.main",
                    boxShadow: 4,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                {/* TOP ROW */}

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: 14,
                          sm: 15,
                        },
                        fontWeight: 800,
                        color: "text.primary",
                      }}
                    >
                      Order #{order.id}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.4,
                        fontSize: 11.5,
                        color: "text.secondary",
                      }}
                    >
                      {order.item_count || 0}{" "}
                      {Number(order.item_count) === 1 ? "item" : "items"}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: {
                        xs: 17,
                        sm: 19,
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

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1.2,
                      py: 0.55,
                      borderRadius: 2,
                      bgcolor: statusStyles.bgcolor,
                      color: statusStyles.color,
                    }}
                  >
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

                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: "text.secondary",
                    }}
                  >
                    {formatDate(order.created_at)}
                  </Typography>
                </Stack>

                <Divider
                  sx={{
                    my: 1.8,
                  }}
                />

                {/* PAYMENT */}

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  >
                    Payment
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "text.primary",
                      textTransform: "uppercase",
                    }}
                  >
                    {order.payment_method || "COD"}
                  </Typography>
                </Stack>

                {/* DETAILS BUTTON */}

                <Button
                  fullWidth
                  variant="outlined"
                  endIcon={<ArrowForwardRoundedIcon />}
                  onClick={() => navigate(`/orders/${order.id}`)}
                  sx={{
                    mt: 2,
                    minHeight: 44,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontSize: 12.5,
                    fontWeight: 700,

                    "& .MuiButton-endIcon": {
                      transition: "transform 0.2s ease",
                    },

                    "&:hover .MuiButton-endIcon": {
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  View Order Details
                </Button>
              </Paper>
            );
          })}
        </Stack>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            fontSize: 10,
            fontWeight: 600,
            color: "text.disabled",
            letterSpacing: 0.5,
          }}
        >
          GRAB EVERYTHING. DELIVERED FAST.
        </Typography>
      </Container>
    </Box>
  );
}

export default Orders;
