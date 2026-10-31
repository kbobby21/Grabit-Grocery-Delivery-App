import React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Tooltip,
  Button,
} from "@mui/material";

import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();

  // =========================================================
  // AUTH
  // =========================================================

  const user = useSelector((state) => state.auth?.user);

  const isLoggedIn = Boolean(user);

  // =========================================================
  // CART
  // =========================================================

  const cartItems = useSelector((state) => state.cart?.items || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();

      if (value) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      }
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid rgba(255, 79, 163, 0.10)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "72px !important",
          width: "100%",
          maxWidth: "1440px",
          mx: "auto",
          px: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          gap: {
            xs: 1,
            md: 2,
          },
        }}
      >
        {/* ================================================= */}
        {/* GRABIT BRAND */}
        {/* ================================================= */}

        <Box
          onClick={() => navigate("/home")}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: 28,
                sm: 25,
              },
              fontWeight: 900,
              letterSpacing: "-1px",
              color: "#FF4FA3",
              lineHeight: 1,
            }}
          >
            Grabit
          </Typography>

          <Typography
            sx={{
              color: "#FF4FA3",
              fontSize: "10px",
              padding: "4px",
            }}
          >
            “Grab Everything.Delivered Fast.”
          </Typography>
        </Box>

        {/* ================================================= */}
        {/* LOCATION */}
        {/* ================================================= */}

        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
            gap: 0.8,
            minWidth: {
              sm: 130,
              md: 175,
            },
            cursor: "pointer",
          }}
        >
          <LocationOnRoundedIcon
            sx={{
              fontSize: 22,
              color: "#FF4FA3",
            }}
          />

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 10,
                color: "#8A8A8A",
                lineHeight: 1.2,
                fontWeight: 500,
              }}
            >
              Deliver to
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#171717",
                fontWeight: 700,
                lineHeight: 1.3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Home
            </Typography>
          </Box>
        </Box>

        {/* ================================================= */}
        {/* SEARCH */}
        {/* ================================================= */}

        <Box
          sx={{
            flex: 1,
            maxWidth: 650,
            mx: {
              xs: 0,
              md: 1,
            },
            height: 44,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#F8F8FA",
            border: "1px solid rgba(255, 79, 163, 0.10)",
            borderRadius: "12px",
            transition: "all 0.2s ease",

            "&:focus-within": {
              backgroundColor: "#FFFFFF",
              borderColor: "rgba(255, 79, 163, 0.45)",
              boxShadow: "0 0 0 3px rgba(255, 79, 163, 0.08)",
            },
          }}
        >
          <SearchRoundedIcon
            sx={{
              ml: 1.5,
              mr: 0.8,
              fontSize: 21,
              color: "#777777",
            }}
          />

          <InputBase
            placeholder="Search for products..."
            onKeyDown={handleSearch}
            sx={{
              flex: 1,
              fontSize: 13,
              color: "#171717",

              "& input": {
                py: 1,
              },

              "& input::placeholder": {
                color: "#999999",
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* ================================================= */}
        {/* RIGHT ACTIONS */}
        {/* ================================================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: {
              xs: 0.5,
              sm: 1,
            },
            ml: "auto",
          }}
        >
          {/* ================================================= */}
          {/* WISHLIST */}
          {/* ================================================= */}
          <Tooltip title={isLoggedIn ? "Wishlist" : "Login to use wishlist"}>
            <span>
              <IconButton
                disabled={!isLoggedIn}
                onClick={() => navigate("/wishlist")}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 79, 163, 0.18)",
                  color: "#FF4FA3",

                  "&:hover": {
                    backgroundColor: "#FFF5FA",
                    borderColor: "#FF4FA3",
                  },

                  "&.Mui-disabled": {
                    color: "#C8C8C8",
                    borderColor: "#E8E8E8",
                    backgroundColor: "#FAFAFA",
                  },
                }}
              >
                <FavoriteBorderRoundedIcon
                  sx={{
                    fontSize: 21,
                  }}
                />
              </IconButton>
            </span>
          </Tooltip>
          {/* ================================================= */}
          {/* CART */}
          {/* ================================================= */}
          <Tooltip title={isLoggedIn ? "Cart" : "Login to use cart"}>
            <span>
              <IconButton
                disabled={!isLoggedIn}
                onClick={() => navigate("/cart")}
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 79, 163, 0.18)",
                  color: "#FF4FA3",

                  "&:hover": {
                    backgroundColor: "#FFF5FA",
                    borderColor: "#FF4FA3",
                  },

                  "&.Mui-disabled": {
                    color: "#C8C8C8",
                    borderColor: "#E8E8E8",
                    backgroundColor: "#FAFAFA",
                  },
                }}
              >
                <Badge
                  badgeContent={isLoggedIn ? cartCount : 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: 9,
                      minWidth: 17,
                      height: 17,
                      fontWeight: 700,
                      backgroundColor: "#FF4FA3",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  <ShoppingCartRoundedIcon
                    sx={{
                      fontSize: 21,
                    }}
                  />
                </Badge>
              </IconButton>
            </span>
          </Tooltip>
          {/* ================================================= */}
          {/* PROFILE — ONLY WHEN LOGGED IN */}
          {/* ================================================= */}
          {isLoggedIn && (
            <Tooltip title="Profile">
              <span>
                <IconButton
                  onClick={() => navigate("/profile")}
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 79, 163, 0.18)",
                    color: "#FF4FA3",
                    backgroundColor: "#FFFFFF",

                    "&:hover": {
                      backgroundColor: "#FFF5FA",
                      borderColor: "#FF4FA3",
                    },
                  }}
                >
                  <PersonOutlineRoundedIcon
                    sx={{
                      fontSize: 25,
                    }}
                  />
                </IconButton>
              </span>
            </Tooltip>
          )}

          {/* ================================================= */}
          {/* LOGIN — ONLY WHEN NOT LOGGED IN */}
          {/* ================================================= */}
          {!isLoggedIn && (
            <Tooltip title="Login">
              <Button
                onClick={() => navigate("/login")}
                variant="contained"
                sx={{
                  minWidth: 78,
                  height: 40,
                  px: 2.2,
                  borderRadius: "11px",

                  background:
                    "linear-gradient(135deg, #FF4FA3 0%, #FF2F91 100%)",

                  color: "#FFFFFF",

                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: "0.2px",

                  textTransform: "none",

                  boxShadow: "0 5px 14px rgba(255, 79, 163, 0.22)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #FF3D99 0%, #FF2187 100%)",

                    boxShadow: "0 7px 18px rgba(255, 79, 163, 0.28)",

                    transform: "translateY(-1px)",
                  },

                  transition: "all 0.2s ease",
                }}
              >
                Login
              </Button>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
