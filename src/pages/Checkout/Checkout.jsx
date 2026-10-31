import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  applyCoupon,
  removeCoupon,
  fetchAvailableCoupons,
  clearCouponError,
} from "../../redux/slices/couponSlice";

import { addOrder } from "../../redux/slices/orderSlice";
import { clearCart } from "../../redux/slices/cartSlice";

import loadRazorpay from "../../utils/loadRazorpay";

import { createOrder } from "../../api/order.api";

import {
  createRazorpayOrder,
  verifyPayment,
} from "../../redux/slices/paymentSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================================
  // REDUX
  // =========================================================

  const {
    coupons = [],
    appliedCoupon,
    discount = 0,
    couponError,
    loading: couponLoading,
  } = useSelector((state) => state.coupon);

  const {
    items = [],
    totalItems = 0,
    totalPrice = 0,
  } = useSelector((state) => state.cart);

  const { addresses = [], selectedAddress } = useSelector(
    (state) => state.address,
  );

  // =========================================================
  // STATE
  // =========================================================

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [deliverySlot, setDeliverySlot] = useState("10 AM - 12 PM");
  const [placingOrder, setPlacingOrder] = useState(false);

  // =========================================================
  // FETCH AVAILABLE COUPONS
  // =========================================================

  useEffect(() => {
    dispatch(fetchAvailableCoupons());
  }, [dispatch]);

  // =========================================================
  // SELECTED ADDRESS
  // =========================================================

  const selected = addresses.find((address) => address.id === selectedAddress);

  // =========================================================
  // TOTAL
  // =========================================================

  const deliveryFee = 40;

  const finalTotal = Math.max(
    0,
    Number(totalPrice || 0) + deliveryFee - Number(discount || 0),
  );

  // =========================================================
  // APPLY COUPON
  // =========================================================

  const handleApplyCoupon = (coupon) => {
    if (!coupon) return;

    dispatch(
      applyCoupon({
        coupon,
        subtotal: Number(totalPrice || 0),
      }),
    );

    const minimumOrder = Number(coupon.min_order || 0);

    if (Number(totalPrice || 0) >= minimumOrder) {
      setCouponCode(coupon.code || "");
      setCouponDialogOpen(false);
    }
  };

  // =========================================================
  // MANUAL COUPON
  // =========================================================

  const handleManualCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (!code) return;

    const coupon = coupons.find(
      (item) => String(item.code || "").toUpperCase() === code,
    );

    if (!coupon) {
      dispatch(clearCouponError());
      return;
    }

    handleApplyCoupon(coupon);
  };

  // =========================================================
  // REMOVE COUPON
  // =========================================================

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    setCouponCode("");
  };

  // =========================================================
  // PLACE ORDER
  // =========================================================

  const handlePlaceOrder = async () => {
    if (placingOrder) return;

    if (!selected) {
      navigate("/addresses/new");
      return;
    }

    const orderPayload = {
      address_id: selected.id,

      payment_method: paymentMethod === "COD" ? "COD" : "RAZORPAY",

      subtotal: Number(totalPrice || 0),

      delivery_fee: deliveryFee,

      discount: Number(discount || 0),

      total: finalTotal,

      items: items.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
      })),
    };

    try {
      setPlacingOrder(true);

      // =====================================================
      // CREATE ORDER
      // =====================================================

      const response = await createOrder(orderPayload);

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Unable to create order");
      }

      const createdOrder = data.order;

      // =====================================================
      // COD
      // =====================================================

      if (paymentMethod === "COD") {
        dispatch(addOrder(createdOrder));

        dispatch(clearCart());

        navigate("/orders/success");

        return;
      }

      // =====================================================
      // RAZORPAY
      // =====================================================

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Unable to load Razorpay SDK");
        return;
      }

      const razorpayResponse = await dispatch(
        createRazorpayOrder({
          orderId: createdOrder.id,
          amount: createdOrder.total,
        }),
      ).unwrap();

      const razorpayOrder = razorpayResponse.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: razorpayOrder.currency,

        name: "Grabit",

        description: `Order #${createdOrder.id}`,

        order_id: razorpayOrder.id,

        handler: async function (paymentResponse) {
          try {
            await dispatch(
              verifyPayment({
                razorpay_order_id: paymentResponse.razorpay_order_id,

                razorpay_payment_id: paymentResponse.razorpay_payment_id,

                razorpay_signature: paymentResponse.razorpay_signature,
              }),
            ).unwrap();

            dispatch(addOrder(createdOrder));

            dispatch(clearCart());

            navigate(`/orders/success/${createdOrder.id}`);
          } catch (error) {
            console.error("Payment verification failed:", error);

            alert("Payment verification failed.");
          } finally {
            setPlacingOrder(false);
          }
        },

        prefill: {
          name: selected.name || "",
          contact: selected.phone || "",
        },

        theme: {
          color: "#FF4FA3",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

      paymentObject.on("payment.failed", () => {
        setPlacingOrder(false);
      });
    } catch (error) {
      console.error("Create order error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to place order",
      );

      setPlacingOrder(false);
    }
  };

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (!items.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg,#FFF5FA 0%,#FAFAFC 55%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 450,
            p: 5,
            textAlign: "center",
            borderRadius: 5,
            border: "1px solid #F1DCE7",
            background: "#FFFFFF",
            boxShadow: "0 20px 60px rgba(255,79,163,.08)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              mx: "auto",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#FFF0F7,#FFE2EF)",
              color: "#FF4FA3",
            }}
          >
            <ShoppingBagRoundedIcon sx={{ fontSize: 40 }} />
          </Box>

          <Typography
            sx={{
              mt: 2.5,
              fontSize: 24,
              fontWeight: 850,
              color: "#171717",
            }}
          >
            Your cart is empty
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              fontSize: 13,
              color: "#888",
            }}
          >
            Add some products before checking out.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/home")}
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 800,
              background: "linear-gradient(135deg,#FF4FA3,#FF2F91)",
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Box>
    );
  }

  // =========================================================
  // CHECKOUT
  // =========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#FFF7FB 0%,#FAFAFC 420px)",
        pb: {
          xs: 5,
          md: 8,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: {
            xs: 2,
            md: 4,
          },
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
        }}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <Box mb={{ xs: 2.5, md: 4 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              onClick={() => navigate("/cart")}
              sx={{
                width: 42,
                height: 42,
                borderRadius: "13px",
                background: "#FFFFFF",
                border: "1px solid #EEEEEE",
                color: "#222",
                boxShadow: "0 5px 16px rgba(0,0,0,.05)",

                "&:hover": {
                  background: "#FFF1F7",
                  color: "#FF4FA3",
                  borderColor: "#FFC7DE",
                },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 25,
                    sm: 30,
                    md: 34,
                  },
                  fontWeight: 900,
                  letterSpacing: "-.8px",
                  color: "#171717",
                  lineHeight: 1.1,
                }}
              >
                Checkout
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#858585",
                }}
              >
                Complete your order securely
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ================================================= */}
        {/* MAIN GRID */}
        {/* ================================================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0,1.55fr) minmax(320px,.85fr)",
            },
            gap: {
              xs: 2,
              md: 3,
            },
            alignItems: "start",
          }}
        >
          {/* ================================================= */}
          {/* LEFT */}
          {/* ================================================= */}

          <Stack spacing={2}>
            {/* ================================================= */}
            {/* ADDRESS */}
            {/* ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },
                borderRadius: 4,
                border: "1px solid #F0E3EA",
                background: "#FFFFFF",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFF0F7",
                      color: "#FF4FA3",
                    }}
                  >
                    <LocationOnRoundedIcon />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 850,
                        color: "#171717",
                      }}
                    >
                      Delivery Address
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#888",
                        mt: 0.2,
                      }}
                    >
                      Where should we deliver?
                    </Typography>
                  </Box>
                </Stack>

                {selected && (
                  <Button
                    size="small"
                    startIcon={<EditRoundedIcon sx={{ fontSize: 16 }} />}
                    onClick={() => navigate("/addresses")}
                    sx={{
                      color: "#FF4FA3",
                      fontWeight: 800,
                      textTransform: "none",
                    }}
                  >
                    Change
                  </Button>
                )}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {selected ? (
                <Box
                  sx={{
                    p: 1.8,
                    borderRadius: 3,
                    border: "1px solid #F0DDE7",
                    background: "linear-gradient(135deg,#FFF9FC,#FFFFFF)",
                  }}
                >
                  <Stack direction="row" spacing={1.2} alignItems="flex-start">
                    <CheckCircleRoundedIcon
                      sx={{
                        mt: 0.2,
                        color: "#22A447",
                        fontSize: 21,
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 850,
                          color: "#222",
                        }}
                      >
                        {selected.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12.5,
                          color: "#666",
                          lineHeight: 1.6,
                        }}
                      >
                        {selected.address}
                        <br />
                        {selected.city}, {selected.pincode}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          color: "#777",
                        }}
                      >
                        Phone: {selected.phone}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#777",
                    }}
                  >
                    No delivery address selected
                  </Typography>

                  <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => navigate("/addresses/new")}
                    sx={{
                      mt: 1.5,
                      px: 3,
                      py: 1.1,
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontWeight: 800,
                      background: "linear-gradient(135deg,#FF4FA3,#FF2F91)",
                      boxShadow: "0 8px 20px rgba(255,79,163,.2)",
                    }}
                  >
                    Add Delivery Address
                  </Button>
                </Box>
              )}
            </Paper>

            {/* ================================================= */}
            {/* DELIVERY SLOT */}
            {/* ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },
                borderRadius: 4,
                border: "1px solid #F0E3EA",
                background: "#FFFFFF",
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 850,
                }}
              >
                Delivery Slot
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 12,
                  color: "#888",
                }}
              >
                Choose a convenient delivery time
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "repeat(3,1fr)",
                  },
                  gap: 1.2,
                }}
              >
                {["10 AM - 12 PM", "12 PM - 2 PM", "4 PM - 6 PM"].map(
                  (slot) => {
                    const active = deliverySlot === slot;

                    return (
                      <Button
                        key={slot}
                        onClick={() => setDeliverySlot(slot)}
                        sx={{
                          minHeight: 50,
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontSize: 12,
                          fontWeight: 800,
                          border: active
                            ? "1.5px solid #FF4FA3"
                            : "1px solid #E7E7E7",
                          color: active ? "#FF4FA3" : "#555",
                          background: active ? "#FFF3F8" : "#FFFFFF",

                          "&:hover": {
                            background: "#FFF3F8",
                            borderColor: "#FF4FA3",
                          },
                        }}
                      >
                        {slot}
                      </Button>
                    );
                  },
                )}
              </Box>
            </Paper>

            {/* ================================================= */}
            {/* COUPON */}
            {/* ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },
                borderRadius: 4,
                border: "1px solid #F0E3EA",
                background: "#FFFFFF",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFF0F7",
                      color: "#FF4FA3",
                    }}
                  >
                    <LocalOfferRoundedIcon />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 850,
                      }}
                    >
                      Apply Coupon
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        color: "#888",
                        mt: 0.2,
                      }}
                    >
                      Save more on your order
                    </Typography>
                  </Box>
                </Stack>

                {!appliedCoupon && (
                  <Button
                    onClick={() => {
                      dispatch(clearCouponError());
                      setCouponDialogOpen(true);
                    }}
                    sx={{
                      color: "#FF4FA3",
                      fontWeight: 800,
                      textTransform: "none",
                    }}
                  >
                    View Coupons
                  </Button>
                )}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {!appliedCoupon ? (
                <>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{ flex: 1 }}>
                      <input
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        placeholder="Enter coupon code"
                        style={{
                          width: "100%",
                          height: "44px",
                          borderRadius: "10px",
                          border: "1px solid #E4E4E4",
                          padding: "0 13px",
                          fontSize: "13px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </Box>

                    <Button
                      variant="outlined"
                      onClick={handleManualCoupon}
                      disabled={!couponCode.trim()}
                      sx={{
                        px: 2.5,
                        borderRadius: 2.5,
                        color: "#FF4FA3",
                        borderColor: "#FFB5D2",
                        textTransform: "none",
                        fontWeight: 800,
                      }}
                    >
                      Apply
                    </Button>
                  </Stack>

                  {couponError && (
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 11,
                        color: "#DC2626",
                      }}
                    >
                      {couponError}
                    </Typography>
                  )}
                </>
              ) : (
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    background: "#F2FFF6",
                    border: "1px solid #BFE8CB",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircleRoundedIcon
                        sx={{
                          color: "#22A447",
                          fontSize: 22,
                        }}
                      />

                      <Box>
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: 850,
                            color: "#168A38",
                          }}
                        >
                          {appliedCoupon.code}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#548061",
                          }}
                        >
                          ₹{discount} saved
                        </Typography>
                      </Box>
                    </Stack>

                    <Button
                      size="small"
                      onClick={handleRemoveCoupon}
                      sx={{
                        color: "#DC2626",
                        textTransform: "none",
                        fontWeight: 800,
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              )}
            </Paper>

            {/* ================================================= */}
            {/* PAYMENT */}
            {/* ================================================= */}

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2,
                  sm: 2.5,
                },
                borderRadius: 4,
                border: "1px solid #F0E3EA",
                background: "#FFFFFF",
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FFF0F7",
                    color: "#FF4FA3",
                  }}
                >
                  <PaymentRoundedIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 850,
                    }}
                  >
                    Payment Method
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#888",
                      mt: 0.2,
                    }}
                  >
                    Choose how you'd like to pay
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.2}>
                <PaymentOption
                  active={paymentMethod === "COD"}
                  icon={<CurrencyRupeeRoundedIcon />}
                  title="Cash on Delivery"
                  subtitle="Pay when your order arrives"
                  onClick={() => setPaymentMethod("COD")}
                />

                <PaymentOption
                  active={paymentMethod === "ONLINE"}
                  icon={<AccountBalanceWalletRoundedIcon />}
                  title="UPI / Razorpay"
                  subtitle="Pay securely using UPI, cards or wallet"
                  onClick={() => setPaymentMethod("ONLINE")}
                />
              </Stack>
            </Paper>
          </Stack>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2,
                sm: 2.5,
              },
              borderRadius: 4,
              border: "1px solid #F0E4EA",
              background: "#FFFFFF",
              position: {
                md: "sticky",
              },
              top: {
                md: 20,
              },
              boxShadow: "0 14px 40px rgba(25,25,25,.06)",
            }}
          >
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 900,
              }}
            >
              Order Summary
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "#888",
              }}
            >
              {totalItems} {totalItems === 1 ? "item" : "items"} in your order
            </Typography>

            <Divider sx={{ my: 2.2 }} />

            <Stack spacing={1.4}>
              <SummaryRow
                label={`Items (${totalItems})`}
                value={`₹${totalPrice}`}
              />

              <SummaryRow label="Delivery Fee" value={`₹${deliveryFee}`} />

              {discount > 0 && (
                <SummaryRow
                  label="Coupon Discount"
                  value={`-₹${discount}`}
                  success
                />
              )}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 850,
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,
                    fontSize: 10,
                    color: "#888",
                  }}
                >
                  Inclusive of all charges
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: 900,
                  color: "#FF4FA3",
                }}
              >
                ₹{finalTotal}
              </Typography>
            </Stack>

            {/* DELIVERY INFO */}

            <Box
              sx={{
                mt: 2,
                p: 1.4,
                borderRadius: 2.5,
                background: "#FAFAFC",
                border: "1px solid #F0F0F0",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <LocationOnRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: "#FF4FA3",
                  }}
                />

                <Box>
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: "#888",
                    }}
                  >
                    Delivery slot
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  >
                    {deliverySlot}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* PLACE ORDER */}

            <Button
              fullWidth
              variant="contained"
              size="large"
              disabled={!selected || placingOrder}
              onClick={handlePlaceOrder}
              endIcon={
                placingOrder ? (
                  <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                ) : (
                  <ArrowForwardRoundedIcon />
                )
              }
              sx={{
                mt: 2,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontSize: 14,
                fontWeight: 900,
                background: "linear-gradient(135deg,#FF4FA3,#FF2F91)",
                boxShadow: "0 10px 25px rgba(255,79,163,.25)",

                "&:hover": {
                  background: "linear-gradient(135deg,#FF3D99,#FF2187)",
                  boxShadow: "0 14px 30px rgba(255,79,163,.3)",
                },

                "&.Mui-disabled": {
                  background: "#E5E5E5",
                  color: "#999",
                },
              }}
            >
              {placingOrder
                ? "Processing..."
                : paymentMethod === "COD"
                  ? "Place Order"
                  : "Proceed to Payment"}
            </Button>

            {/* SECURITY */}

            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 1.8,
                color: "#888",
              }}
            >
              <SecurityRoundedIcon sx={{ fontSize: 15 }} />

              <Typography
                sx={{
                  fontSize: 10.5,
                }}
              >
                Secure & trusted checkout
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Container>

      {/* ===================================================== */}
      {/* COUPON DIALOG */}
      {/* ===================================================== */}

      <Dialog
        open={couponDialogOpen}
        onClose={() => setCouponDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: 560,
            },
            maxHeight: {
              xs: "88vh",
              sm: "82vh",
            },
            m: {
              xs: 0,
              sm: 2,
            },
            position: {
              xs: "absolute",
              sm: "relative",
            },
            bottom: {
              xs: 0,
              sm: "auto",
            },
            borderRadius: {
              xs: "24px 24px 0 0",
              sm: "24px",
            },
            overflow: "hidden",
            background: "#FAFAFC",
            boxShadow: {
              xs: "0 -12px 45px rgba(0,0,0,0.16)",
              sm: "0 24px 70px rgba(0,0,0,0.18)",
            },
          },
        }}
      >
        {/* ================================================= */}
        {/* DIALOG HEADER */}
        {/* ================================================= */}

        <Box
          sx={{
            position: "relative",
            px: {
              xs: 2.5,
              sm: 3,
            },
            pt: {
              xs: 2.5,
              sm: 3,
            },
            pb: 2.5,
            background: "linear-gradient(135deg,#FFF3F8 0%,#FFFFFF 75%)",
            borderBottom: "1px solid #F0E4EA",
          }}
        >
          <IconButton
            onClick={() => setCouponDialogOpen(false)}
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#FFFFFF",
              color: "#555",
              border: "1px solid #EDEDED",
              boxShadow: "0 4px 14px rgba(0,0,0,0.07)",

              "&:hover": {
                background: "#FFF0F7",
                color: "#FF4FA3",
                borderColor: "#FFD0E2",
                transform: "rotate(90deg)",
              },

              transition: "all .2s ease",
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{ pr: 5 }}
          >
            <Box
              sx={{
                width: 50,
                height: 50,
                flexShrink: 0,
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg,#FF4FA3,#FF78B7)",
                color: "#FFFFFF",
                boxShadow: "0 8px 22px rgba(255,79,163,0.25)",
              }}
            >
              <LocalOfferRoundedIcon />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 19,
                    sm: 21,
                  },
                  fontWeight: 850,
                  color: "#171717",
                  lineHeight: 1.2,
                }}
              >
                Available Coupons
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: "#777",
                }}
              >
                Choose an offer and save more
              </Typography>
            </Box>
          </Stack>

          {!couponLoading && coupons.length > 0 && (
            <Box
              sx={{
                mt: 2,
                display: "inline-flex",
                px: 1.2,
                py: 0.55,
                borderRadius: "20px",
                background: "#FFF0F7",
                border: "1px solid #FFD6E7",
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 750,
                  color: "#FF4FA3",
                }}
              >
                {coupons.length} {coupons.length === 1 ? "offer" : "offers"}{" "}
                available
              </Typography>
            </Box>
          )}
        </Box>

        {/* ================================================= */}
        {/* DIALOG CONTENT */}
        {/* ================================================= */}

        <DialogContent
          sx={{
            p: {
              xs: 1.8,
              sm: 2.5,
            },
            background: "#FAFAFC",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: 5,
            },

            "&::-webkit-scrollbar-thumb": {
              background: "#E6C8D7",
              borderRadius: 10,
            },
          }}
        >
          {/* LOADING */}

          {couponLoading ? (
            <Box
              sx={{
                py: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CircularProgress
                size={30}
                thickness={4}
                sx={{ color: "#FF4FA3" }}
              />

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 13,
                  color: "#888",
                }}
              >
                Finding the best offers...
              </Typography>
            </Box>
          ) : coupons.length === 0 ? (
            <Box
              sx={{
                py: 7,
                px: 2,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  mx: "auto",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FFF0F7",
                  color: "#FFB3D1",
                }}
              >
                <LocalOfferRoundedIcon sx={{ fontSize: 34 }} />
              </Box>

              <Typography
                sx={{
                  mt: 2,
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#222",
                }}
              >
                No coupons available
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  fontSize: 12.5,
                  color: "#888",
                }}
              >
                Check again later for new offers and savings.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {coupons.map((coupon) => {
                const minOrder = Number(coupon.min_order || 0);

                const currentTotal = Number(totalPrice || 0);

                const remaining = Math.max(0, minOrder - currentTotal);

                const isEligible = currentTotal >= minOrder;

                const isApplied =
                  appliedCoupon?.id === coupon.id ||
                  String(appliedCoupon?.code || "").toUpperCase() ===
                    String(coupon.code || "").toUpperCase();

                const expiryText = coupon.expiry_date
                  ? new Date(coupon.expiry_date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : null;

                const discountText =
                  coupon.type === "percentage"
                    ? `${coupon.value}% OFF`
                    : `₹${coupon.value} OFF`;

                return (
                  <Paper
                    key={coupon.id}
                    elevation={0}
                    sx={{
                      p: {
                        xs: 1.7,
                        sm: 2,
                      },
                      borderRadius: "18px",
                      background: isApplied
                        ? "linear-gradient(135deg,#F4FFF7,#FFFFFF)"
                        : "#FFFFFF",

                      border: isApplied
                        ? "1.5px solid #9BD9AB"
                        : "1px solid #EDE4E8",

                      boxShadow: isApplied
                        ? "0 8px 24px rgba(34,164,71,0.07)"
                        : "0 5px 18px rgba(0,0,0,0.025)",
                    }}
                  >
                    {/* TOP */}

                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      spacing={1.5}
                    >
                      <Box
                        sx={{
                          width: 46,
                          height: 46,
                          flexShrink: 0,
                          borderRadius: "13px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isApplied ? "#DDF7E5" : "#FFF0F7",
                          color: isApplied ? "#22A447" : "#FF4FA3",
                        }}
                      >
                        {isApplied ? (
                          <CheckCircleRoundedIcon />
                        ) : coupon.type === "percentage" ? (
                          <PercentRoundedIcon />
                        ) : (
                          <CurrencyRupeeRoundedIcon />
                        )}
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 900,
                            color: "#171717",
                            letterSpacing: ".5px",
                            wordBreak: "break-word",
                          }}
                        >
                          {coupon.code}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.45,
                            fontSize: 11.5,
                            color: "#777",
                            lineHeight: 1.45,
                          }}
                        >
                          {coupon.type === "percentage"
                            ? `Get ${coupon.value}% off on your order`
                            : `Get flat ₹${coupon.value} off on your order`}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flexShrink: 0,
                          px: 1.1,
                          py: 0.7,
                          borderRadius: "10px",
                          background: isApplied ? "#E5F9EB" : "#FFF0F7",
                          border: isApplied
                            ? "1px solid #C7EBD2"
                            : "1px solid #FFD5E5",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 900,
                            color: isApplied ? "#22A447" : "#FF4FA3",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {discountText}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* DETAILS */}

                    <Box
                      sx={{
                        mt: 1.5,
                        pt: 1.4,
                        borderTop: "1px solid #F1E9ED",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Box
                          sx={{
                            px: 1,
                            py: 0.55,
                            borderRadius: "8px",
                            background: "#F8F8F8",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              color: "#666",
                              fontWeight: 650,
                            }}
                          >
                            Min. order ₹{minOrder}
                          </Typography>
                        </Box>

                        {expiryText && (
                          <Box
                            sx={{
                              px: 1,
                              py: 0.55,
                              borderRadius: "8px",
                              background: "#F8F8F8",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 10.5,
                                color: "#666",
                                fontWeight: 650,
                              }}
                            >
                              Valid until {expiryText}
                            </Typography>
                          </Box>
                        )}
                      </Stack>

                      {!isEligible && remaining > 0 && (
                        <Box
                          sx={{
                            mt: 1.2,
                            px: 1.2,
                            py: 0.8,
                            borderRadius: "9px",
                            background: "#FFF5F5",
                            border: "1px solid #FADADA",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: "#DC2626",
                            }}
                          >
                            Add ₹{remaining.toFixed(0)} more to unlock this
                            coupon
                          </Typography>
                        </Box>
                      )}

                      {isEligible && !isApplied && (
                        <Box
                          sx={{
                            mt: 1.2,
                            px: 1.2,
                            py: 0.8,
                            borderRadius: "9px",
                            background: "#F3FFF6",
                            border: "1px solid #D9F2DF",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: "#22A447",
                            }}
                          >
                            ✓ This coupon is available for your order
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* APPLY */}

                    <Button
                      fullWidth
                      disabled={!isEligible || isApplied}
                      onClick={() => handleApplyCoupon(coupon)}
                      sx={{
                        mt: 1.5,
                        height: 38,
                        borderRadius: "10px",
                        textTransform: "none",
                        fontSize: 12,
                        fontWeight: 850,

                        border: isApplied
                          ? "1px solid #A7DDB3"
                          : isEligible
                            ? "1px solid #FF4FA3"
                            : "1px solid #E2E2E2",

                        color: isApplied
                          ? "#22A447"
                          : isEligible
                            ? "#FF4FA3"
                            : "#999",

                        background: isApplied
                          ? "#EDFFF2"
                          : isEligible
                            ? "#FFF8FB"
                            : "#F7F7F7",

                        "&:hover": {
                          background: isApplied
                            ? "#EDFFF2"
                            : isEligible
                              ? "#FFF0F7"
                              : "#F7F7F7",
                        },

                        "&.Mui-disabled": {
                          color: isApplied ? "#22A447" : "#999",
                        },
                      }}
                    >
                      {isApplied
                        ? "✓ Coupon Applied"
                        : isEligible
                          ? "Apply Coupon"
                          : "Not Eligible"}
                    </Button>
                  </Paper>
                );
              })}
            </Stack>
          )}
        </DialogContent>

        {/* FOOTER */}

        {!couponLoading && coupons.length > 0 && (
          <Box
            sx={{
              px: {
                xs: 2,
                sm: 2.5,
              },
              py: 1.4,
              background: "#FFFFFF",
              borderTop: "1px solid #EEE5E9",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 10.5,
                color: "#999",
              }}
            >
              Coupons are subject to minimum order requirements and expiry
              dates.
            </Typography>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}

// =============================================================
// PAYMENT OPTION
// =============================================================

function PaymentOption({ active, icon, title, subtitle, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: 3,
        border: active ? "1.5px solid #FF4FA3" : "1px solid #E8E8E8",
        background: active ? "#FFF5F9" : "#FFFFFF",
        cursor: "pointer",
        transition: "all .2s ease",

        "&:hover": {
          borderColor: "#FF4FA3",
          background: "#FFF8FB",
        },
      }}
    >
      <Stack direction="row" spacing={1.3} alignItems="center">
        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: active ? "#FFE0EC" : "#F7F7F7",
            color: active ? "#FF4FA3" : "#777",
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 850,
              color: "#222",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 11,
              color: "#888",
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: active ? "6px solid #FF4FA3" : "1.5px solid #CCC",
            background: "#FFFFFF",
            flexShrink: 0,
          }}
        />
      </Stack>
    </Box>
  );
}

// =============================================================
// SUMMARY ROW
// =============================================================

function SummaryRow({ label, value, success = false }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography
        sx={{
          fontSize: 13,
          color: "#777",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 750,
          color: success ? "#22A447" : "#222",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

export default Checkout;
