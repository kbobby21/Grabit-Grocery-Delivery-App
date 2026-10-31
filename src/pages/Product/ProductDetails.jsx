import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../../redux/slices/productSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductGrid from "../../components/product/ProductGrid";
function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    selectedProduct: product,
    products,
    loading,
    error,
  } = useSelector((state) => state.product);

  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = product
    ? wishlist.some((item) => item.id === product.id)
    : false;

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);
  // console.log("Product ID:", id);
  // console.log("Selected Product:", product);
  // console.log("Loading:", loading);
  // console.log("Error:", error);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography sx={{ mt: 5 }}>Loading...</Typography>
      </Container>
    );
  }
  if (!product) {
    return (
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="h5" fontWeight={700}>
            Product not found
          </Typography>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    );
  }

  const relatedProducts = products
    ?.filter(
      (item) =>
        item.category_id === product.category_id && item.id !== product.id,
    )
    .slice(0, 4);

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => (current > 1 ? current - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        ...product,
        quantity,
      }),
    );

    navigate("/cart");
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      productId: product.id,
      quantity,
    });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        pb: 5,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <IconButton onClick={() => dispatch(toggleWishlist(product))}>
          {isWishlisted ? (
            <FavoriteIcon color="error" />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </Box>

      {/* Product Image */}
      <Box
        sx={{
          position: "relative",
          height: {
            xs: 280,
            sm: 350,
            md: 420,
          },
          borderRadius: 4,
          bgcolor: "#F8F8F8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {product.discount > 0 && (
          <Chip
            label={`${product.discount}% OFF`}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              fontWeight: 700,
            }}
          />
        )}

        {product.image ? (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography
            sx={{
              fontSize: {
                xs: 90,
                md: 130,
              },
            }}
          >
            🛒
          </Typography>
        )}
      </Box>

      {/* Product Information */}
      <Box mt={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip icon={<StarIcon />} label="4.5" color="success" size="small" />

          <Typography variant="body2" color="text.secondary">
            Customer Rating
          </Typography>
        </Stack>

        <Typography variant="h5" fontWeight={700} mt={2}>
          {product.name}
        </Typography>

        <Typography color="text.secondary" mt={0.5}>
          {product.unit}
        </Typography>
        <Typography mt={2} color="text.secondary" lineHeight={1.6}>
          {product.description}
        </Typography>

        <Box display="flex" alignItems="center" gap={1.5} mt={2}>
          <Typography variant="h5" fontWeight={700} color="primary.main">
            ₹{product.price}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              textDecoration: "line-through",
            }}
          >
            ₹{product.mrp}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Quantity */}
      <Box>
        <Typography variant="subtitle1" fontWeight={700} mb={1.5}>
          Quantity
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <IconButton onClick={decreaseQuantity} disabled={quantity === 1}>
            <RemoveIcon />
          </IconButton>

          <Typography
            fontWeight={700}
            sx={{
              minWidth: 40,
              textAlign: "center",
            }}
          >
            {quantity}
          </Typography>

          <IconButton onClick={increaseQuantity}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Total */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={3}
      >
        <Typography color="text.secondary">Total</Typography>

        <Typography variant="h6" fontWeight={700}>
          ₹{product.price * quantity}
        </Typography>
      </Box>

      <Box
        mt={3}
        p={2}
        sx={{
          borderRadius: 3,
          bgcolor: "#F6FFF8",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <InventoryIcon color="success" />

        <Typography color="success.main" fontWeight={600}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </Typography>
      </Box>
      <Box
        mt={2}
        p={2}
        sx={{
          borderRadius: 3,
          bgcolor: "#FFF7FB",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LocalShippingIcon color="primary" />

        <Box>
          <Typography fontWeight={700}>Fast Delivery</Typography>

          <Typography variant="body2" color="text.secondary">
            Delivered in 20-30 minutes
          </Typography>
        </Box>
      </Box>

      {/* Actions */}
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        mt={3}
      >
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<ShoppingCartOutlinedIcon />}
          onClick={handleAddToCart}
          sx={{
            borderRadius: 3,
            py: 1.5,
          }}
        >
          Add to Cart
        </Button>

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleBuyNow}
          sx={{
            borderRadius: 3,
            py: 1.5,
          }}
        >
          Buy Now
        </Button>
      </Stack>

      <Box mt={5}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Related Products
        </Typography>

        <ProductGrid products={relatedProducts} />
      </Box>
    </Container>
  );
}

export default ProductDetails;
