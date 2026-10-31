import React, { useEffect } from "react";

import {
  Box,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";

import { useDispatch, useSelector } from "react-redux";

import { fetchAdminOutOfStockInventory } from "../../redux/slices/adminInventorySlice";

const AdminInventoryOutOfStock = () => {
  const dispatch = useDispatch();

  const {
    outOfStock = [],
    outOfStockLoading,
    outOfStockError,
  } = useSelector((state) => state.adminInventory);

  useEffect(() => {
    dispatch(fetchAdminOutOfStockInventory());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAdminOutOfStockInventory());
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
            Out of Stock
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Products that are currently unavailable
          </Typography>
        </Box>

        <IconButton
          onClick={handleRefresh}
          disabled={outOfStockLoading}
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

      {/* ERROR */}

      {outOfStockError && (
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
            {outOfStockError}
          </Typography>
        </Card>
      )}

      {/* TABLE */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {outOfStockLoading ? (
          <Box
            sx={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress sx={{ color: "#FF4FA3" }} />
          </Box>
        ) : outOfStock.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RemoveShoppingCartRoundedIcon
              sx={{
                fontSize: 52,
                color: "#D1D5DB",
              }}
            />

            <Typography
              sx={{
                mt: 1.5,
                fontWeight: 700,
              }}
            >
              No out of stock products
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#9CA3AF",
              }}
            >
              All products currently have available stock
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: "#FAFAFA" }}>
                  <TableCell>Product</TableCell>
                  <TableCell>Current Stock</TableCell>
                  <TableCell>Reserved</TableCell>
                  <TableCell>Available</TableCell>
                  <TableCell>Minimum Stock</TableCell>
                  <TableCell>Maximum Stock</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {outOfStock.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        {item.image ? (
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.product_name}
                            sx={{
                              width: 46,
                              height: 46,
                              objectFit: "cover",
                              borderRadius: 2,
                              border: "1px solid #E5E7EB",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 46,
                              height: 46,
                              borderRadius: 2,
                              bgcolor: "#F3F4F6",
                            }}
                          />
                        )}

                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 14,
                          }}
                        >
                          {item.product_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#DC2626",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.reserved_quantity}</TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          color: "#DC2626",
                        }}
                      >
                        {item.available_quantity}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.minimum_stock}</TableCell>

                    <TableCell>{item.maximum_stock}</TableCell>

                    <TableCell>
                      <Chip
                        label="Out of Stock"
                        size="small"
                        color="error"
                        sx={{
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
};

export default AdminInventoryOutOfStock;
