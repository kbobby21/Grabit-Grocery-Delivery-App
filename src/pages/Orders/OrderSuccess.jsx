import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  const formatAmount = (amount) => Number(amount || 0).toLocaleString("en-IN");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: {
          xs: 2,
          sm: 3,
          md: 5,
        },
        pb: {
          xs: 6,
          sm: 8,
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
          },
        }}
      >
        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <IconButton
          onClick={() => navigate("/checkout")}
          aria-label="Back to checkout"
          sx={{
            width: {
              xs: 42,
              sm: 46,
            },
            height: {
              xs: 42,
              sm: 46,
            },
            mb: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: 3,
            bgcolor: "background.paper",
            color: "text.primary",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 2,
            transition: "all 0.2s ease",

            "&:hover": {
              color: "primary.main",
              bgcolor: "action.hover",
              borderColor: "primary.main",
              transform: "translateX(-2px)",
              boxShadow: 3,
            },
          }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>

        {/* =====================================================
            SUCCESS CARD
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.5,
              sm: 4,
            },
            borderRadius: {
              xs: 4,
              sm: 5,
            },
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: 4,
            textAlign: "center",
          }}
        >
          {/* SUCCESS ICON */}

          <Box
            sx={{
              width: {
                xs: 82,
                sm: 96,
              },
              height: {
                xs: 82,
                sm: 96,
              },
              mx: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              bgcolor: "success.light",
              color: "success.main",
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: {
                  xs: 54,
                  sm: 64,
                },
              }}
            />
          </Box>

          {/* TITLE */}

          <Typography
            sx={{
              mt: 3,
              fontSize: {
                xs: 24,
                sm: 30,
              },
              fontWeight: 800,
              lineHeight: 1.2,
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            Order Placed Successfully
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: {
                xs: 13,
                sm: 14,
              },
              lineHeight: 1.6,
              color: "text.secondary",
              maxWidth: 390,
              mx: "auto",
            }}
          >
            Thank you for shopping with Grabit. Your order has been placed and
            we'll get it delivered to you soon.
          </Typography>

          {/* =====================================================
              ORDER DETAILS
          ===================================================== */}

          {order && (
            <Paper
              elevation={0}
              sx={{
                mt: 3.5,
                p: {
                  xs: 2,
                  sm: 2.5,
                },
                borderRadius: 3.5,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
                textAlign: "left",
              }}
            >
              {/* ORDER HEADER */}

              <Stack
                direction="row"
                alignItems="center"
                spacing={1.2}
                sx={{
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2.5,
                    bgcolor: "primary.light",
                    color: "primary.main",
                  }}
                >
                  <ReceiptLongRoundedIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "text.primary",
                    }}
                  >
                    Order Summary
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.2,
                      fontSize: 11,
                      color: "text.secondary",
                    }}
                  >
                    Your order details
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              {/* ORDER ID */}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: 1.8,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ShoppingBagRoundedIcon
                    sx={{
                      fontSize: 19,
                      color: "text.secondary",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "text.secondary",
                    }}
                  >
                    Order ID
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  #{order.id}
                </Typography>
              </Stack>

              <Divider />

              {/* STATUS */}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: 1.8,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <LocalShippingRoundedIcon
                    sx={{
                      fontSize: 19,
                      color: "text.secondary",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "text.secondary",
                    }}
                  >
                    Status
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "success.main",
                    textTransform: "capitalize",
                  }}
                >
                  {order.status || "Placed"}
                </Typography>
              </Stack>

              <Divider />

              {/* PAYMENT */}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  py: 1.8,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PaymentsRoundedIcon
                    sx={{
                      fontSize: 19,
                      color: "text.secondary",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "text.secondary",
                    }}
                  >
                    Payment Method
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: "text.primary",
                    textTransform: "uppercase",
                  }}
                >
                  {order.payment_method || "COD"}
                </Typography>
              </Stack>

              <Divider />

              {/* TOTAL */}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  pt: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "text.primary",
                  }}
                >
                  Total Amount
                </Typography>

                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: "primary.main",
                  }}
                >
                  ₹{formatAmount(order.total)}
                </Typography>
              </Stack>
            </Paper>
          )}

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <Stack
            spacing={1.5}
            sx={{
              mt: 3.5,
            }}
          >
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate("/orders")}
              sx={{
                minHeight: 52,
                borderRadius: 3,
                textTransform: "none",
                fontSize: 14,
                fontWeight: 800,
                boxShadow: 3,

                "&:hover": {
                  boxShadow: 5,
                },
              }}
            >
              View My Orders
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                minHeight: 52,
                borderRadius: 3,
                textTransform: "none",
                fontSize: 14,
                fontWeight: 800,
              }}
            >
              Continue Shopping
            </Button>
          </Stack>
        </Paper>

        {/* =====================================================
            FOOTER MESSAGE
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

export default OrderSuccess;
