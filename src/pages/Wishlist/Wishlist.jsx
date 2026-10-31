import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductGrid from "../../components/product/ProductGrid";
import EmptyWishlist from "../../pages/Wishlist/EmptyWishlist";

import { removeWishlist } from "../../redux/slices/wishlistSlice";
import { showSnackbar } from "../../redux/slices/uiSlice";

function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================================================
  // WISHLIST
  // =========================================================

  const { items } = useSelector((state) => state.wishlist);

  // =========================================================
  // CART
  // =========================================================

  const cartItems = useSelector((state) => state.cart?.items || []);

  const cartTotalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0,
  );

  // =========================================================
  // REMOVE FROM WISHLIST
  // =========================================================

  const handleRemove = (id) => {
    dispatch(removeWishlist(id));

    dispatch(
      showSnackbar({
        message: "Removed from your wishlist",
        severity: "success",
        duration: 2500,
      }),
    );
  };

  // =========================================================
  // EMPTY WISHLIST
  // =========================================================

  if (!items.length) {
    return <EmptyWishlist />;
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        background:
          "radial-gradient(circle at 0% 0%, rgba(255,79,163,.10), transparent 28%), radial-gradient(circle at 100% 15%, rgba(255,79,163,.07), transparent 25%), linear-gradient(180deg, #FFF8FC 0%, #FAFAFC 45%, #FFFFFF 100%)",

        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },

        pb: 10,
      }}
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <Box
        sx={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(255,79,163,.09), transparent 70%)",

          top: -150,
          right: -100,

          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 220,
          height: 220,
          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(255,79,163,.06), transparent 70%)",

          bottom: 80,
          left: -150,

          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            mb: {
              xs: 2.5,
              sm: 3,
            },

            px: {
              xs: 1.2,
              sm: 2,
              md: 2.5,
            },

            py: {
              xs: 1.2,
              sm: 1.5,
            },

            borderRadius: {
              xs: "18px",
              sm: "20px",
            },

            backgroundColor: "rgba(255,255,255,.90)",

            border: "1px solid rgba(255,79,163,.10)",

            boxShadow:
              "0 8px 30px rgba(30,20,25,.045), 0 2px 8px rgba(255,79,163,.03)",

            backdropFilter: "blur(16px)",
          }}
        >
          {/* IMPORTANT:
              width 100% + space-between keeps left/right
              content at opposite sides without margins.
          */}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: "100%",
              minWidth: 0,
            }}
          >
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <Stack
              direction="row"
              alignItems="center"
              spacing={{
                xs: 1.2,
                sm: 1.5,
              }}
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              {/* BACK BUTTON */}

              <IconButton
                onClick={() => navigate("/home")}
                aria-label="Back to home"
                sx={{
                  width: {
                    xs: 40,
                    sm: 44,
                  },

                  height: {
                    xs: 40,
                    sm: 44,
                  },

                  flexShrink: 0,

                  borderRadius: "13px",

                  color: "#222",

                  backgroundColor: "#FFFFFF",

                  border: "1px solid #EEEEEE",

                  boxShadow: "0 5px 16px rgba(0,0,0,.05)",

                  transition: "all .2s ease",

                  "&:hover": {
                    color: "#FF4FA3",

                    backgroundColor: "#FFF7FB",

                    borderColor: "#FFD3E5",

                    transform: "translateX(-2px)",

                    boxShadow: "0 7px 20px rgba(255,79,163,.10)",
                  },
                }}
              >
                <ArrowBackRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 20,
                      sm: 22,
                    },
                  }}
                />
              </IconButton>

              {/* WISHLIST TITLE */}

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.8}
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 20,
                        sm: 23,
                        md: 25,
                      },

                      fontWeight: 900,

                      color: "#171717",

                      letterSpacing: "-.6px",

                      lineHeight: 1.1,

                      whiteSpace: "nowrap",
                    }}
                  >
                    My Wishlist
                  </Typography>

                  {/* SAVED ITEMS */}

                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        sm: "flex",
                      },

                      alignItems: "center",

                      justifyContent: "center",

                      gap: 0.6,

                      px: 1.1,

                      height: 25,

                      borderRadius: "8px",

                      backgroundColor: "#FFF0F7",

                      border: "1px solid rgba(255,79,163,.10)",

                      color: "#FF4FA3",

                      whiteSpace: "nowrap",

                      flexShrink: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 11,

                        fontWeight: 900,

                        lineHeight: 1,

                        color: "#FF4FA3",
                      }}
                    >
                      {items.length}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 10,

                        fontWeight: 700,

                        lineHeight: 1,

                        color: "#C05A88",
                      }}
                    >
                      Saved Items
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  sx={{
                    mt: 0.35,

                    fontSize: {
                      xs: 10,
                      sm: 11,
                    },

                    color: "#999",

                    fontWeight: 500,

                    whiteSpace: "nowrap",
                  }}
                >
                  Your saved favorites
                </Typography>
              </Box>
            </Stack>

            {/* =================================================
                RIGHT SIDE — CART
            ================================================= */}

            <Box
              component="button"
              onClick={() => navigate("/cart")}
              aria-label="Open cart"
              sx={{
                display: "flex",

                alignItems: "center",

                gap: {
                  xs: 0,
                  sm: 1,
                },

                flexShrink: 0,

                border: "1px solid rgba(255,79,163,.13)",

                background: "linear-gradient(135deg,#FFF8FB 0%,#FFF0F7 100%)",

                borderRadius: {
                  xs: "12px",
                  sm: "14px",
                },

                px: {
                  xs: 0.7,
                  sm: 1.3,
                },

                py: {
                  xs: 0.7,
                  sm: 0.8,
                },

                cursor: "pointer",

                boxShadow: "0 5px 18px rgba(255,79,163,.07)",

                transition: "all .2s ease",

                "&:hover": {
                  transform: "translateY(-2px)",

                  borderColor: "rgba(255,79,163,.28)",

                  boxShadow: "0 8px 24px rgba(255,79,163,.13)",

                  background: "linear-gradient(135deg,#FFF5FA 0%,#FFEAF4 100%)",
                },

                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              {/* CART ICON */}

              <Box
                sx={{
                  position: "relative",

                  width: {
                    xs: 34,
                    sm: 36,
                  },

                  height: {
                    xs: 34,
                    sm: 36,
                  },

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  borderRadius: {
                    xs: "10px",
                    sm: "11px",
                  },

                  background: "linear-gradient(135deg,#FF4FA3 0%,#FF2F91 100%)",

                  color: "#FFFFFF",

                  boxShadow: "0 5px 14px rgba(255,79,163,.20)",
                }}
              >
                <ShoppingCartRoundedIcon
                  sx={{
                    fontSize: {
                      xs: 18,
                      sm: 20,
                    },
                  }}
                />

                {/* CART QUANTITY BADGE */}

                {cartTotalItems > 0 && (
                  <Box
                    sx={{
                      position: "absolute",

                      top: -6,

                      right: -6,

                      minWidth: 17,

                      height: 17,

                      px: 0.3,

                      borderRadius: "50%",

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "center",

                      backgroundColor: "#171717",

                      color: "#FFFFFF",

                      border: "2px solid #FFFFFF",

                      fontSize: 8,

                      fontWeight: 900,

                      lineHeight: 1,
                    }}
                  >
                    {cartTotalItems > 99 ? "99+" : cartTotalItems}
                  </Box>
                )}
              </Box>

              {/* CART TEXT — DESKTOP */}

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },

                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,

                    fontWeight: 700,

                    color: "#A05A7D",

                    lineHeight: 1,

                    mb: 0.4,
                  }}
                >
                  Your Cart
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,

                    fontWeight: 900,

                    color: "#222",

                    lineHeight: 1,
                  }}
                >
                  {cartTotalItems} {cartTotalItems === 1 ? "item" : "items"}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>

        {/* =====================================================
            PRODUCTS HEADER
        ===================================================== */}

        <Box
          sx={{
            mb: 1.5,

            px: {
              xs: 0.5,
              sm: 1,
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 4,

                height: 20,

                borderRadius: 10,

                background: "linear-gradient(180deg,#FF4FA3,#FF2F91)",

                boxShadow: "0 3px 10px rgba(255,79,163,.20)",
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: 16,
                  sm: 18,
                },

                fontWeight: 900,

                color: "#1B1B1B",

                letterSpacing: "-.3px",
              }}
            >
              Saved for later
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 0.4,

              ml: 1.25,

              fontSize: {
                xs: 10,
                sm: 10.5,
              },

              color: "#999",

              fontWeight: 500,
            }}
          >
            Your favorite products are waiting for you.
          </Typography>
        </Box>

        {/* =====================================================
            PRODUCT GRID
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 1,
              sm: 1.8,
              md: 2.2,
            },

            borderRadius: {
              xs: "18px",
              sm: "22px",
            },

            backgroundColor: "rgba(255,255,255,.94)",

            border: "1px solid rgba(0,0,0,.055)",

            boxShadow:
              "0 12px 40px rgba(20,20,20,.045), 0 2px 10px rgba(255,79,163,.025)",

            backdropFilter: "blur(12px)",
          }}
        >
          <ProductGrid
            products={items}
            showWishlistActions
            onRemoveWishlist={handleRemove}
          />
        </Paper>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            mt: 4,
            mb: 1,
          }}
        >
          <Divider
            sx={{
              width: {
                xs: 30,
                sm: 50,
              },

              borderColor: "#F0DCE6",
            }}
          />

          <Typography
            sx={{
              fontSize: {
                xs: 8.5,
                sm: 9.5,
              },

              fontWeight: 700,

              color: "#B5A0AA",

              letterSpacing: ".5px",

              whiteSpace: "nowrap",
            }}
          >
            GRAB EVERYTHING. DELIVERED FAST.
          </Typography>

          <Divider
            sx={{
              width: {
                xs: 30,
                sm: 50,
              },

              borderColor: "#F0DCE6",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default Wishlist;
