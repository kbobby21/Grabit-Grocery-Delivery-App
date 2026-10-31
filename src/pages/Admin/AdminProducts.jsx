import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminProducts,
  removeAdminProduct,
} from "../../redux/slices/adminProductSlice";

import PATHS from "../../routes/paths";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products = [],
    loading,
    error,
    deleting,
  } = useSelector((state) => state.adminProducts);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      const name = String(product.name || "").toLowerCase();

      const id = String(product.id || "").toLowerCase();

      return name.includes(query) || id.includes(query);
    });
  }, [products, search]);

  const getPrice = (product) => {
    return Number(product.price) || 0;
  };

  const getStock = (product) => {
    return Number(product.stock) || 0;
  };

  const getImage = (product) => {
    return product.image || "";
  };

  const handleRefresh = () => {
    dispatch(fetchAdminProducts());
  };

  const handleCreate = () => {
    navigate(PATHS.ADMIN_PRODUCT_CREATE);
  };

  const handleView = (id) => {
    navigate(PATHS.ADMIN_PRODUCT_DETAILS.replace(":id", id));
  };

  const handleEdit = (id) => {
    navigate(PATHS.ADMIN_PRODUCT_EDIT.replace(":id", id));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) {
      return;
    }

    dispatch(removeAdminProduct(id));
  };

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
            Products
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Manage your grocery products
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<RefreshRoundedIcon />}
            onClick={handleRefresh}
            disabled={loading}
            sx={{
              minHeight: 42,
              borderRadius: 2.5,
              borderColor: "#E5E7EB",
              color: "#374151",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleCreate}
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
            Add Product
          </Button>
        </Stack>
      </Stack>

      {/* Summary */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ p: 2.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#FFF0F7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Inventory2RoundedIcon
                sx={{
                  color: "#FF4FA3",
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Total Products
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {products.length}
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ p: 2.5 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Showing
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {filteredProducts.length}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Stack>

      {/* Search */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{
                      color: "#9CA3AF",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 500,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />
        </Box>
      </Card>

      {/* Error */}

      {error && (
        <Card
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 3,
            border: "1px solid #FECACA",
            bgcolor: "#FEF2F2",
            boxShadow: "none",
          }}
        >
          <Typography
            sx={{
              color: "#DC2626",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {error}
          </Typography>
        </Card>
      )}

      {/* Product Table */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#FF4FA3",
              }}
            />
          </Box>
        ) : filteredProducts.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2RoundedIcon
              sx={{
                fontSize: 48,
                color: "#D1D5DB",
              }}
            />

            <Typography
              sx={{
                mt: 1.5,
                fontWeight: 700,
              }}
            >
              No products found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table
              sx={{
                minWidth: 900,
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#FAFAFA",
                  }}
                >
                  <TableCell>Product</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProducts.map((product) => {
                  const stock = getStock(product);

                  return (
                    <TableRow key={product.id} hover>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                          sx={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleView(product.id)}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              bgcolor: "#F9FAFB",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {getImage(product) ? (
                              <Box
                                component="img"
                                src={getImage(product)}
                                alt={product.name}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <Inventory2RoundedIcon
                                sx={{
                                  color: "#D1D5DB",
                                }}
                              />
                            )}
                          </Box>

                          <Box>
                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 700,
                              }}
                            >
                              {product.name || "Unnamed Product"}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "#9CA3AF",
                              }}
                            >
                              #{String(product.id).slice(0, 8)}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell>
                        {product.category_name ||
                        product.categoryName ||
                        product.category?.name ? (
                          <Typography
                            sx={{
                              fontSize: 13,
                            }}
                          >
                            {product.category_name ||
                              product.categoryName ||
                              product.category?.name}
                          </Typography>
                        ) : (
                          "-"
                        )}
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          ₹{getPrice(product).toLocaleString("en-IN")}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 600,
                          }}
                        >
                          {stock}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={stock > 0 ? "In Stock" : "Out of Stock"}
                          size="small"
                          color={stock > 0 ? "success" : "error"}
                          sx={{
                            fontWeight: 700,
                            fontSize: 11,
                          }}
                        />
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={0.5}
                        >
                          <IconButton onClick={() => handleView(product.id)}>
                            <VisibilityRoundedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            onClick={() => handleEdit(product.id)}
                            sx={{
                              color: "#FF4FA3",
                            }}
                          >
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            disabled={deleting}
                            onClick={() => handleDelete(product.id)}
                            sx={{
                              color: "#DC2626",
                            }}
                          >
                            <DeleteOutlineRoundedIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
};

export default AdminProducts;
