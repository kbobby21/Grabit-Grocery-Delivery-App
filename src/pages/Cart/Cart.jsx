import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../../redux/slices/cartSlice";

import {
  applyCoupon,
  removeCoupon,
  fetchAvailableCoupons,
} from "../../redux/slices/couponSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items = [],
    totalItems = 0,
    totalPrice = 0,
  } = useSelector((state) => state.cart);

  const {
    coupons = [],
    appliedCoupon,
    discount = 0,
    loading: couponLoading,
    error: couponError,
  } = useSelector((state) => state.coupon);

  const [couponCode, setCouponCode] = useState("");
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);

  // =========================================================
  // FETCH COUPONS
  // =========================================================

  useEffect(() => {
    dispatch(fetchAvailableCoupons());
  }, [dispatch]);

  // =========================================================
  // FINAL TOTAL
  // =========================================================

  const finalTotal = useMemo(() => {
    return Math.max(0, Number(totalPrice) - Number(discount));
  }, [totalPrice, discount]);

  // =========================================================
  // APPLY COUPON
  // =========================================================

  const handleApplyCoupon = (coupon) => {
    dispatch(
      applyCoupon({
        coupon,
        subtotal: totalPrice,
      }),
    );

    setCouponCode(coupon.code);
    setCouponDialogOpen(false);
  };

  // =========================================================
  // MANUAL COUPON
  // =========================================================

  const handleManualCoupon = () => {
    const enteredCode = couponCode.trim().toUpperCase();

    if (!enteredCode) return;

    const coupon = coupons.find(
      (item) => String(item.code).toUpperCase() === enteredCode,
    );

    if (!coupon) {
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
  // EMPTY CART
  // =========================================================

  if (!items.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #fff7fb 0%, #FAFAFC 420px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 4,
                sm: 6,
              },
              textAlign: "center",
              borderRadius: 5,
              border: "1px solid #F3DCE8",
              background: "rgba(255,255,255,0.92)",
              boxShadow: "0 18px 50px rgba(255,79,163,0.08)",
            }}
          >
            <Box
              sx={{
                width: 90,
                height: 90,
                mx: "auto",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #FFF0F7, #FFE3F0)",
                color: "#FF4FA3",
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 46 }} />
            </Box>

            <Typography
              sx={{
                mt: 3,
                fontSize: 24,
                fontWeight: 800,
                color: "#171717",
              }}
            >
              Your cart is empty
            </Typography>

            <Typography
              sx={{
                mt: 1,
                fontSize: 14,
                color: "#777",
              }}
            >
              Looks like you haven't added anything yet.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate("/home")}
              sx={{
                mt: 3,
                px: 4,
                py: 1.3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #FF4FA3, #FF2F91)",
                fontWeight: 800,
                textTransform: "none",
                boxShadow: "0 10px 24px rgba(255,79,163,0.25)",
                "&:hover": {
                  background: "linear-gradient(135deg, #FF3D99, #FF2187)",
                },
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff7fb 0%, #FAFAFC 500px)",
        pb: {
          xs: 5,
          md: 8,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
          pt: {
            xs: 2,
            md: 4,
          },
        }}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <Box
          sx={{
            mb: {
              xs: 2.5,
              md: 4,
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <IconButton
              onClick={() => navigate("/home")}
              sx={{
                width: 42,
                height: 42,
                borderRadius: "13px",
                background: "#FFFFFF",
                border: "1px solid #EEEEEE",
                color: "#222",
                boxShadow: "0 5px 16px rgba(0,0,0,0.05)",
                "&:hover": {
                  background: "#FFF1F7",
                  borderColor: "#FFC6DF",
                  color: "#FF4FA3",
                  transform: "translateX(-2px)",
                },
                transition: "all .2s ease",
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 28,
                    md: 32,
                  },
                  fontWeight: 850,
                  lineHeight: 1.15,
                  letterSpacing: "-0.7px",
                  color: "#171717",
                }}
              >
                My Cart
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 13,
                  color: "#777",
                }}
              >
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.6fr) minmax(320px, .9fr)",
            },
            gap: {
              xs: 2,
              md: 3,
            },
            alignItems: "start",
          }}
        >
          {/* ================================================= */}
          {/* CART ITEMS */}
          {/* ================================================= */}

          <Box>
            <Stack spacing={1.5}>
              {items.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: {
                      xs: 1.5,
                      sm: 2,
                    },
                    borderRadius: 3.5,
                    border: "1px solid #F0E4EA",
                    background: "#FFFFFF",
                    transition: "all .2s ease",
                    "&:hover": {
                      borderColor: "#FFD0E4",
                      boxShadow: "0 10px 30px rgba(255,79,163,0.07)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: {
                        xs: 1.5,
                        sm: 2,
                      },
                    }}
                  >
                    {/* PRODUCT IMAGE */}

                    <Box
                      sx={{
                        width: {
                          xs: 82,
                          sm: 100,
                        },
                        height: {
                          xs: 82,
                          sm: 100,
                        },
                        flexShrink: 0,
                        borderRadius: 3,
                        background: "#FAFAFA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          p: 1,
                        }}
                      />
                    </Box>

                    {/* PRODUCT DETAILS */}

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            xs: 14,
                            sm: 15,
                          },
                          fontWeight: 750,
                          color: "#171717",
                          lineHeight: 1.35,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.name}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          color: "#888",
                        }}
                      >
                        {item.unit || item.weight || "500 ml"}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 1,
                          fontSize: 16,
                          fontWeight: 850,
                          color: "#171717",
                        }}
                      >
                        ₹{item.price}
                      </Typography>
                    </Box>

                    {/* ACTIONS */}

                    <Stack alignItems="flex-end" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={() => dispatch(removeItem(item.id))}
                        sx={{
                          width: 32,
                          height: 32,
                          color: "#999",
                          "&:hover": {
                            color: "#EF4444",
                            background: "#FFF1F1",
                          },
                        }}
                      >
                        <DeleteOutlineRoundedIcon sx={{ fontSize: 19 }} />
                      </IconButton>

                      <Box
                        sx={{
                          height: 36,
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #E7E7E7",
                          borderRadius: 2.5,
                          background: "#FFFFFF",
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          sx={{
                            width: 34,
                            height: 34,
                            color: "#555",
                            "&:hover": {
                              color: "#FF4FA3",
                              background: "#FFF5FA",
                            },
                          }}
                        >
                          <RemoveRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>

                        <Typography
                          sx={{
                            minWidth: 25,
                            textAlign: "center",
                            fontSize: 13,
                            fontWeight: 800,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          sx={{
                            width: 34,
                            height: 34,
                            color: "#555",
                            "&:hover": {
                              color: "#FF4FA3",
                              background: "#FFF5FA",
                            },
                          }}
                        >
                          <AddRoundedIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>

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
              boxShadow: "0 12px 35px rgba(25,25,25,0.05)",
            }}
          >
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 850,
                color: "#171717",
              }}
            >
              Order Summary
            </Typography>

            {/* ================================================= */}
            {/* COUPON */}
            {/* ================================================= */}

            <Box sx={{ mt: 2.5 }}>
              {!appliedCoupon ? (
                <Box
                  sx={{
                    p: 1.7,
                    borderRadius: 3,
                    border: "1px dashed #FFB7D5",
                    background: "linear-gradient(135deg, #FFF8FB, #FFF1F7)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#FFE2EF",
                        color: "#FF4FA3",
                        flexShrink: 0,
                      }}
                    >
                      <LocalOfferRoundedIcon sx={{ fontSize: 21 }} />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: "#222",
                        }}
                      >
                        Have a coupon?
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

                    <Button
                      onClick={() => setCouponDialogOpen(true)}
                      endIcon={<ChevronRightRoundedIcon />}
                      sx={{
                        color: "#FF4FA3",
                        fontSize: 12,
                        fontWeight: 800,
                        textTransform: "none",
                        minWidth: "auto",
                        px: 0.5,
                        "&:hover": {
                          background: "transparent",
                        },
                      }}
                    >
                      View
                    </Button>
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1.5,
                    }}
                  >
                    <TextField
                      size="small"
                      fullWidth
                      value={couponCode}
                      placeholder="Enter coupon code"
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          background: "#FFFFFF",
                          fontSize: 13,
                          "&.Mui-focused fieldset": {
                            borderColor: "#FF4FA3",
                          },
                        },
                      }}
                    />

                    <Button
                      variant="outlined"
                      onClick={handleManualCoupon}
                      disabled={!couponCode.trim()}
                      sx={{
                        borderRadius: 2,
                        px: 2,
                        color: "#FF4FA3",
                        borderColor: "#FF9BC4",
                        fontWeight: 800,
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "#FF4FA3",
                          background: "#FFF5FA",
                        },
                      }}
                    >
                      Apply
                    </Button>
                  </Box>

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
                </Box>
              ) : (
                <Box
                  sx={{
                    p: 1.7,
                    borderRadius: 3,
                    border: "1px solid #BFE8CB",
                    background: "linear-gradient(135deg, #F2FFF6, #ECFFF2)",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.2}>
                    <CheckCircleRoundedIcon
                      sx={{
                        color: "#22A447",
                        fontSize: 25,
                      }}
                    />

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 850,
                          color: "#168A38",
                        }}
                      >
                        {appliedCoupon.code} applied
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: 11,
                          color: "#548061",
                          mt: 0.2,
                        }}
                      >
                        You saved ₹{discount}
                      </Typography>
                    </Box>

                    <Button
                      size="small"
                      onClick={handleRemoveCoupon}
                      sx={{
                        color: "#DC2626",
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: "none",
                      }}
                    >
                      Remove
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>

            {/* ================================================= */}
            {/* PRICE BREAKDOWN */}
            {/* ================================================= */}

            <Stack spacing={1.4} sx={{ mt: 2.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#777",
                  }}
                >
                  Items
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {totalItems}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#777",
                  }}
                >
                  Subtotal
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  ₹{totalPrice}
                </Typography>
              </Box>

              {discount > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#777",
                    }}
                  >
                    Coupon discount
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#22A447",
                    }}
                  >
                    -₹{discount}
                  </Typography>
                </Box>
              )}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 17,
                    fontWeight: 850,
                    color: "#171717",
                  }}
                >
                  Total
                </Typography>

                {discount > 0 && (
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: "#22A447",
                      mt: 0.2,
                    }}
                  >
                    Coupon savings included
                  </Typography>
                )}
              </Box>

              <Typography
                sx={{
                  fontSize: 23,
                  fontWeight: 900,
                  color: "#FF4FA3",
                }}
              >
                ₹{finalTotal}
              </Typography>
            </Box>

            {/* ================================================= */}
            {/* CHECKOUT */}
            {/* ================================================= */}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => navigate("/checkout")}
              sx={{
                mt: 2.5,
                py: 1.5,
                borderRadius: 3,
                background: "linear-gradient(135deg, #FF4FA3, #FF2F91)",
                fontSize: 14,
                fontWeight: 850,
                textTransform: "none",
                boxShadow: "0 10px 24px rgba(255,79,163,0.24)",
                "&:hover": {
                  background: "linear-gradient(135deg, #FF3D99, #FF2187)",
                  boxShadow: "0 14px 28px rgba(255,79,163,0.3)",
                },
              }}
            >
              Proceed to Checkout
            </Button>
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
        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

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
            background: "linear-gradient(135deg, #FFF3F8 0%, #FFFFFF 75%)",
            borderBottom: "1px solid #F0E4EA",
            flexShrink: 0,
          }}
        >
          {/* TOP CLOSE BUTTON */}

          <IconButton
            onClick={() => setCouponDialogOpen(false)}
            aria-label="Close coupons"
            sx={{
              position: "absolute",
              top: {
                xs: 12,
                sm: 14,
              },
              right: {
                xs: 12,
                sm: 14,
              },

              width: 36,
              height: 36,

              borderRadius: "50%",

              background: "#FFFFFF",
              color: "#555",

              border: "1px solid #EDEDED",

              boxShadow: "0 4px 14px rgba(0,0,0,0.07)",

              zIndex: 5,

              transition: "all .2s ease",

              "&:hover": {
                background: "#FFF0F7",
                color: "#FF4FA3",
                borderColor: "#FFD0E2",
                transform: "rotate(90deg)",
              },
            }}
          >
            <CloseRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>

          {/* HEADER CONTENT */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              pr: 5,
            }}
          >
            {/* ICON */}

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
                flexShrink: 0,

                borderRadius: "15px",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: "linear-gradient(135deg, #FF4FA3, #FF78B7)",

                color: "#FFFFFF",

                boxShadow: "0 8px 22px rgba(255,79,163,0.25)",
              }}
            >
              <LocalOfferRoundedIcon
                sx={{
                  fontSize: {
                    xs: 23,
                    sm: 25,
                  },
                }}
              />
            </Box>

            {/* TITLE */}

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 19,
                    sm: 21,
                  },
                  fontWeight: 850,
                  color: "#171717",
                  lineHeight: 1.2,
                  letterSpacing: "-0.3px",
                }}
              >
                Available Coupons
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: "#777",
                  lineHeight: 1.4,
                }}
              >
                Choose an offer and save more
              </Typography>
            </Box>
          </Stack>

          {/* OFFER COUNT */}

          {!couponLoading && coupons.length > 0 && (
            <Box
              sx={{
                mt: 2,
                display: "inline-flex",
                alignItems: "center",
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

        {/* ===================================================== */}
        {/* CONTENT */}
        {/* ===================================================== */}

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
                justifyContent: "center",
              }}
            >
              <CircularProgress
                size={30}
                thickness={4}
                sx={{
                  color: "#FF4FA3",
                }}
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
            /* EMPTY */

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
                <LocalOfferRoundedIcon
                  sx={{
                    fontSize: 34,
                  }}
                />
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
                  lineHeight: 1.5,
                }}
              >
                Check again later for new offers and savings.
              </Typography>
            </Box>
          ) : (
            /* ================================================= */
            /* COUPON LIST */
            /* ================================================= */

            <Stack spacing={1.5}>
              {coupons.map((coupon) => {
                const isApplied =
                  appliedCoupon?.id === coupon.id ||
                  String(appliedCoupon?.code || "").toUpperCase() ===
                    String(coupon.code || "").toUpperCase();

                const minOrder = Number(coupon.min_order || 0);

                const currentTotal = Number(totalPrice || 0);

                const remaining = Math.max(0, minOrder - currentTotal);

                const isEligible = currentTotal >= minOrder;

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
                        ? "linear-gradient(135deg, #F4FFF7, #FFFFFF)"
                        : "#FFFFFF",

                      border: isApplied
                        ? "1.5px solid #9BD9AB"
                        : "1px solid #EDE4E8",

                      boxShadow: isApplied
                        ? "0 8px 24px rgba(34,164,71,0.07)"
                        : "0 5px 18px rgba(0,0,0,0.025)",

                      transition: "all .2s ease",

                      "&:hover": {
                        borderColor: isApplied ? "#22A447" : "#FFB3D1",

                        boxShadow: "0 10px 25px rgba(255,79,163,0.08)",
                      },
                    }}
                  >
                    {/* ======================================= */}
                    {/* TOP ROW */}
                    {/* ======================================= */}

                    <Stack
                      direction="row"
                      alignItems="flex-start"
                      spacing={1.5}
                    >
                      {/* ICON */}

                      <Box
                        sx={{
                          width: {
                            xs: 44,
                            sm: 48,
                          },
                          height: {
                            xs: 44,
                            sm: 48,
                          },

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
                          <CheckCircleRoundedIcon sx={{ fontSize: 24 }} />
                        ) : coupon.type === "percentage" ? (
                          <PercentRoundedIcon sx={{ fontSize: 23 }} />
                        ) : (
                          <CurrencyRupeeRoundedIcon sx={{ fontSize: 23 }} />
                        )}
                      </Box>

                      {/* MAIN INFO */}

                      <Box
                        sx={{
                          flex: 1,
                          minWidth: 0,
                        }}
                      >
                        {/* CODE */}

                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 900,
                            color: "#171717",
                            letterSpacing: "0.6px",
                            wordBreak: "break-word",
                          }}
                        >
                          {coupon.code}
                        </Typography>

                        {/* DESCRIPTION */}

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

                      {/* DISCOUNT BADGE */}

                      <Box
                        sx={{
                          flexShrink: 0,

                          px: {
                            xs: 1,
                            sm: 1.3,
                          },

                          py: 0.7,

                          borderRadius: "10px",

                          background: isApplied ? "#E5F9EB" : "#FFF0F7",

                          border: isApplied
                            ? "1px solid #C7EBD2"
                            : "1px solid #FFD5E5",

                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 11,
                              sm: 12,
                            },
                            fontWeight: 900,
                            color: isApplied ? "#22A447" : "#FF4FA3",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {discountText}
                        </Typography>
                      </Box>
                    </Stack>

                    {/* ======================================= */}
                    {/* DETAILS */}
                    {/* ======================================= */}

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
                        {/* MINIMUM */}

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
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

                        {/* EXPIRY */}

                        {expiryText && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
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

                      {/* NOT ELIGIBLE */}

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

                      {/* ELIGIBLE */}

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

                    {/* ======================================= */}
                    {/* APPLY BUTTON */}
                    {/* ======================================= */}

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

                          borderColor: isApplied
                            ? "#22A447"
                            : isEligible
                              ? "#FF4FA3"
                              : "#E2E2E2",
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

        {/* ===================================================== */}
        {/* FOOTER */}
        {/* ===================================================== */}

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

              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: 10.5,
                color: "#999",
                lineHeight: 1.4,
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

export default Cart;
