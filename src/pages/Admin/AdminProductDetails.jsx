import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminProductById,
  clearSelectedProduct,
} from "../../redux/slices/adminProductSlice";

import PATHS from "../../routes/paths";

const AdminProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, productLoading, productError } = useSelector(
    (state) => state.adminProducts,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminProductById(id));
    }

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(PATHS.ADMIN_PRODUCTS);
  };

  const handleEdit = () => {
    navigate(PATHS.ADMIN_PRODUCT_EDIT.replace(":id", id));
  };

  if (productLoading) {
    return (
      <Box
        sx={{
          minHeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#FF4FA3" }} />
      </Box>
    );
  }

  if (productError) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          sx={{
            mb: 2,
            color: "#374151",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Products
        </Button>

        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #FECACA",
            bgcolor: "#FEF2F2",
            boxShadow: "none",
          }}
        >
          <Typography
            sx={{
              color: "#DC2626",
              fontWeight: 600,
            }}
          >
            {productError}
          </Typography>
        </Card>
      </Box>
    );
  }

  if (!selectedProduct) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          sx={{
            color: "#374151",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Products
        </Button>

        <Typography sx={{ mt: 3, fontWeight: 700 }}>
          Product not found
        </Typography>
      </Box>
    );
  }

  const price = Number(selectedProduct.price) || 0;
  const mrp = Number(selectedProduct.mrp) || 0;
  const discount = Number(selectedProduct.discount) || 0;
  const stock = Number(selectedProduct.stock) || 0;

  return (
    <Box>
      {/* Header */}
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
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={handleBack}
            sx={{
              mb: 1,
              px: 0,
              color: "#6B7280",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                bgcolor: "transparent",
                color: "#111111",
              },
            }}
          >
            Back to Products
          </Button>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 800,
              color: "#111111",
              letterSpacing: "-0.7px",
            }}
          >
            Product Details
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            View product information
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EditRoundedIcon />}
          onClick={handleEdit}
          sx={{
            minHeight: 42,
            borderRadius: 2.5,
            bgcolor: "#FF4FA3",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#E6328B",
              boxShadow: "none",
            },
          }}
        >
          Edit Product
        </Button>
      </Stack>

      {/* Product */}
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={4}
          >
            {/* Image */}
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: 320,
                },
                height: {
                  xs: 280,
                  md: 320,
                },
                flexShrink: 0,
                borderRadius: 3,
                bgcolor: "#F9FAFB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {selectedProduct.image ? (
                <Box
                  component="img"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Inventory2RoundedIcon
                  sx={{
                    fontSize: 80,
                    color: "#D1D5DB",
                  }}
                />
              )}
            </Box>

            {/* Information */}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 24,
                    md: 30,
                  },
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                {selectedProduct.name}
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                Product ID: #{selectedProduct.id}
              </Typography>

              <Chip
                label={stock > 0 ? "In Stock" : "Out of Stock"}
                color={stock > 0 ? "success" : "error"}
                size="small"
                sx={{
                  mt: 2,
                  fontWeight: 700,
                }}
              />

              <Divider sx={{ my: 3 }} />

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#6B7280",
                  mb: 0.5,
                }}
              >
                Category
              </Typography>

              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {selectedProduct.category_name || "-"}
              </Typography>

              <Typography
                sx={{
                  mt: 2.5,
                  fontSize: 14,
                  color: "#6B7280",
                  mb: 0.5,
                }}
              >
                Description
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: "#374151",
                  lineHeight: 1.7,
                }}
              >
                {selectedProduct.description || "-"}
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* Product Stats */}
        <Box sx={{ p: 3 }}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={3}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Selling Price
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                ₹{price.toLocaleString("en-IN")}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                MRP
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#6B7280",
                }}
              >
                ₹{mrp.toLocaleString("en-IN")}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Discount
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#22C55E",
                }}
              >
                {discount}%
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Stock
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                {stock}
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Unit
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                {selectedProduct.unit || "-"}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default AdminProductDetails;
