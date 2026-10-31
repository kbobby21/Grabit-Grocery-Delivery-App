import { Card, CardContent, Box, Typography, IconButton } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";

import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";

import { addItem } from "../../redux/slices/cartSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import { showSnackbar } from "../../redux/slices/uiSlice";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
function ProductCard({ product, showWishlistActions, onRemoveWishlist }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const { name, unit, weight, price, mrp, originalPrice, discount, image } =
    product;

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAdd = (e) => {
    e.stopPropagation();

    dispatch(
      addItem({
        ...product,
        quantity: 1,
      }),
    );

    dispatch(
      showSnackbar({
        message: `${product.name} added to cart`,
        severity: "success",
      }),
    );
  };

  // =========================================================
  // WISHLIST
  // =========================================================

  const handleWishlist = (e) => {
    e.stopPropagation();

    dispatch(toggleWishlist(product));

    dispatch(
      showSnackbar({
        message: isWishlisted
          ? `${product.name} removed from wishlist`
          : `${product.name} added to wishlist`,
        severity: "success",
      }),
    );
  };

  // =========================================================
  // PRODUCT DETAILS
  // =========================================================

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card
      elevation={0}
      onClick={handleProductClick}
      sx={{
        margin: "3px",
        width: "100%",
        height: 335,

        display: "flex",
        flexDirection: "column",

        backgroundColor: "#FFFFFF",

        border: "1px solid rgba(224, 162, 230, 0.98)",
        borderRadius: "18px",

        overflow: "hidden",

        cursor: "pointer",

        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

        "&:hover": {
          transform: "translateY(-3px)",
          borderColor: "rgba(248, 42, 142, 0.98)",
          boxShadow: "0 10px 28px rgba(255, 79, 163, 0.12)",
        },
      }}
    >
      {/* ===================================================== */}
      {/* IMAGE AREA - 4:4 SQUARE */}
      {/* ===================================================== */}

      <Box
        sx={{
          position: "relative",

          width: "100%",
          aspectRatio: "1 / 1",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: "#ffffff",

          flexShrink: 0,
        }}
      >
        {/* ================================================= */}
        {/* SALE BADGE */}
        {/* ================================================= */}

        {Number(discount) > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: -12,
              left: 10,

              zIndex: 5,

              width: 62,
              height: 62,

              pointerEvents: "none",
            }}
          >
            {/* Bookmark */}

            <BookmarkRoundedIcon
              sx={{
                position: "absolute",

                top: 0,
                left: 0,

                width: 62,
                height: 62,

                color: "rgb(37, 111, 239)",

                display: "block",

                filter: "drop-shadow(0 3px 5px rgba(37, 111, 239, 0.20))",
              }}
            />

            {/* Discount Text */}

            <Box
              sx={{
                position: "absolute",

                top: 18,
                left: 0,
                width: 62,

                display: "flex",
                flexDirection: "column",

                alignItems: "center",

                color: "#FFFFFF",
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,

                  fontWeight: 900,

                  lineHeight: 1,

                  color: "#FFFFFF",
                }}
              >
                {discount}%
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,

                  fontSize: 9,

                  fontWeight: 900,

                  lineHeight: 1,

                  color: "#FFFFFF",
                }}
              >
                OFF
              </Typography>
            </Box>
          </Box>
        )}
        {/* ================================================= */}
        {/* WISHLIST */}
        {/* ================================================= */}

        <Box
          sx={{
            position: "absolute",
            top: 1,
            right: 9,
            zIndex: 2,
          }}
        >
          {showWishlistActions ? (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveWishlist(product.id);
              }}
              sx={{
                width: 32,
                height: 32,

                backgroundColor: "#FFFFFF",

                border: "1px solid rgba(255, 79, 163, 0.14)",

                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",

                "&:hover": {
                  backgroundColor: "#FFF7FB",
                },
              }}
            >
              <DeleteIcon
                sx={{
                  fontSize: 17,
                  color: "#EF4444",
                }}
              />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={handleWishlist}>
              {isWishlisted ? (
                <FavoriteIcon
                  sx={{
                    fontSize: 24,
                    color: "#FF4FA3",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{
                    fontSize: 24,
                    color: "#FF4FA3",
                  }}
                />
              )}
            </IconButton>
          )}
        </Box>

        {/* ================================================= */}
        {/* PRODUCT IMAGE */}
        {/* ================================================= */}

        <Box
          sx={{
            width: "100%",
            height: "100%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            px: 1.5,
            py: 1.5,

            "& img": {
              width: "100%",
              height: "100%",

              maxWidth: "100%",
              maxHeight: "100%",

              objectFit: "fill",
            },
          }}
        >
          <ProductImage image={image} name={name} />
        </Box>
      </Box>

      {/* ===================================================== */}
      {/* CONTENT */}
      {/* ===================================================== */}

      <CardContent
        sx={{
          p: "10px 12px 11px !important",

          flex: 1,

          display: "flex",
          flexDirection: "column",

          minHeight: 0,
        }}
      >
        {/* ================================================= */}
        {/* PRODUCT NAME */}
        {/* ================================================= */}

        <Typography
          sx={{
            fontSize: 13,

            lineHeight: 1.35,

            fontWeight: 600,

            color: "#FF4FA3",

            minHeight: 35,

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",

            overflow: "hidden",
          }}
        >
          {name}
        </Typography>

        {/* ================================================= */}
        {/* QUANTITY */}
        {/* ================================================= */}

        <Typography
          sx={{
            mt: 0.6,

            fontSize: 12,

            lineHeight: 1.3,

            color: "#777777",

            minHeight: 17,
          }}
        >
          {unit || weight || "500 ml"}
        </Typography>

        {/* ================================================= */}
        {/* PRICE + ADD */}
        {/* ================================================= */}

        <Box
          sx={{
            mt: "auto",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            gap: 1,
          }}
        >
          {/* PRICE */}

          <Box
            sx={{
              minWidth: 0,

              display: "flex",
              alignItems: "center",
            }}
          >
            <ProductPrice price={price} originalPrice={mrp || originalPrice} />
          </Box>

          {/* ADD BUTTON */}

          <IconButton
            onClick={handleAdd}
            sx={{
              width: 68,
              height: 33,

              flexShrink: 0,

              borderRadius: "7px",

              border: "1.5px solid #22A447",

              color: "#168A38",

              backgroundColor: "#FFFFFF",

              "&:hover": {
                borderColor: "#FF4FA3",
                color: "#FF4FA3",
                backgroundColor: "#FFF8FC",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              ADD
            </Typography>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
