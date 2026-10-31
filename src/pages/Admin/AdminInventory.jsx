import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
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
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminInventory,
  fetchAdminInventoryOverview,
} from "../../redux/slices/adminInventorySlice";

const AdminInventory = () => {
  const dispatch = useDispatch();

  const {
    inventory = [],
    overview,
    pagination,
    loading,
    overviewLoading,
    error,
  } = useSelector((state) => state.adminInventory);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const limit = 20;

  /*
  |--------------------------------------------------------------------------
  | FETCH INVENTORY
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(
      fetchAdminInventory({
        search: search.trim() || undefined,
        status: status || undefined,
        page,
        limit,
      }),
    );
  }, [dispatch, search, status, page]);

  /*
  |--------------------------------------------------------------------------
  | FETCH OVERVIEW
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(fetchAdminInventoryOverview());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = () => {
    dispatch(
      fetchAdminInventory({
        search: search.trim() || undefined,
        status: status || undefined,
        page,
        limit,
      }),
    );

    dispatch(fetchAdminInventoryOverview());
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS CHIP
  |--------------------------------------------------------------------------
  */

  const getStatusChip = (item) => {
    if (item.status === "out_of_stock") {
      return (
        <Chip
          label="Out of Stock"
          size="small"
          color="error"
          sx={{
            fontWeight: 700,
            fontSize: 11,
          }}
        />
      );
    }

    if (item.status === "low_stock") {
      return (
        <Chip
          label="Low Stock"
          size="small"
          color="warning"
          sx={{
            fontWeight: 700,
            fontSize: 11,
          }}
        />
      );
    }

    return (
      <Chip
        label="In Stock"
        size="small"
        color="success"
        sx={{
          fontWeight: 700,
          fontSize: 11,
        }}
      />
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PRODUCT IMAGE
  |--------------------------------------------------------------------------
  */

  const getProductInitial = (name) => {
    if (!name) {
      return "P";
    }

    return name.charAt(0).toUpperCase();
  };

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  const totalPages = pagination?.total_pages || 1;

  const handlePrevious = () => {
    if (page > 1) {
      setPage((current) => current - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((current) => current + 1);
    }
  };

  return (
    <Box>
      {/* HEADER */}

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
            Inventory
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Manage product stock and inventory
          </Typography>
        </Box>

        <IconButton
          onClick={handleRefresh}
          disabled={loading || overviewLoading}
          sx={{
            width: 42,
            height: 42,
            border: "1px solid #E5E7EB",
            borderRadius: 2.5,
          }}
        >
          <RefreshRoundedIcon />
        </IconButton>
      </Stack>

      {/* OVERVIEW */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* TOTAL PRODUCTS */}

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
                {overview?.total_products ?? 0}
              </Typography>
            </Box>
          </Stack>
        </Card>

        {/* IN STOCK */}

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
                bgcolor: "#ECFDF5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleRoundedIcon
                sx={{
                  color: "#16A34A",
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
                In Stock
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {overview?.in_stock ?? 0}
              </Typography>
            </Box>
          </Stack>
        </Card>

        {/* LOW STOCK */}

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
                bgcolor: "#FFF7ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningAmberRoundedIcon
                sx={{
                  color: "#F59E0B",
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
                Low Stock
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {overview?.low_stock ?? 0}
              </Typography>
            </Box>
          </Stack>
        </Card>

        {/* OUT OF STOCK */}

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
                bgcolor: "#FEF2F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RemoveShoppingCartRoundedIcon
                sx={{
                  color: "#DC2626",
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
                Out of Stock
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {overview?.out_of_stock ?? 0}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Stack>

      {/* SEARCH + FILTER */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{ p: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search product..."
            value={search}
            onChange={handleSearchChange}
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
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />

          <Select
            size="small"
            value={status}
            onChange={handleStatusChange}
            displayEmpty
            sx={{
              minWidth: 180,
              borderRadius: 2.5,
            }}
          >
            <MenuItem value="">All Status</MenuItem>

            <MenuItem value="in_stock">In Stock</MenuItem>

            <MenuItem value="low_stock">Low Stock</MenuItem>

            <MenuItem value="out_of_stock">Out of Stock</MenuItem>
          </Select>
        </Stack>
      </Card>

      {/* ERROR */}

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

      {/* INVENTORY TABLE */}

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
        ) : inventory.length === 0 ? (
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
              No inventory found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table
              sx={{
                minWidth: 1050,
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
                  <TableCell>Quantity</TableCell>
                  <TableCell>Reserved</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Min Stock</TableCell>
                  <TableCell>Max Stock</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id} hover>
                    {/* PRODUCT */}

                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 2,
                            bgcolor: "#F3F4F6",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {item.image ? (
                            <Box
                              component="img"
                              src={item.image}
                              alt={item.product_name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Typography
                              sx={{
                                fontWeight: 800,
                                color: "#6B7280",
                              }}
                            >
                              {getProductInitial(item.product_name)}
                            </Typography>
                          )}
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {item.product_name}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#9CA3AF",
                            }}
                          >
                            Product #{item.product_id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* CATEGORY */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#6B7280",
                        }}
                      >
                        {item.category_name || "-"}
                      </Typography>
                    </TableCell>

                    {/* QUANTITY */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </TableCell>

                    {/* RESERVED */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: "#6B7280",
                        }}
                      >
                        {item.reserved_quantity}
                      </Typography>
                    </TableCell>

                    {/* AVAILABLE */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 800,
                        }}
                      >
                        {item.available_quantity}
                      </Typography>
                    </TableCell>

                    {/* MIN */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: 13,
                        }}
                      >
                        {item.minimum_stock}
                      </Typography>
                    </TableCell>

                    {/* MAX */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: 13,
                        }}
                      >
                        {item.maximum_stock}
                      </Typography>
                    </TableCell>

                    {/* STATUS */}

                    <TableCell>{getStatusChip(item)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* PAGINATION */}

        {!loading && inventory.length > 0 && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 2,
              py: 1.5,
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                color: "#6B7280",
              }}
            >
              Page {pagination?.page || page} of {totalPages}
              {" • "}
              {pagination?.total || 0} products
            </Typography>

            <Stack direction="row" spacing={1}>
              <Box
                component="button"
                onClick={handlePrevious}
                disabled={page <= 1}
                sx={{
                  px: 2,
                  py: 0.8,
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  bgcolor: "#FFFFFF",
                  cursor: page <= 1 ? "default" : "pointer",
                }}
              >
                Previous
              </Box>

              <Box
                component="button"
                onClick={handleNext}
                disabled={page >= totalPages}
                sx={{
                  px: 2,
                  py: 0.8,
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  bgcolor: "#FFFFFF",
                  cursor: page >= totalPages ? "default" : "pointer",
                }}
              >
                Next
              </Box>
            </Stack>
          </Stack>
        )}
      </Card>
    </Box>
  );
};

export default AdminInventory;
