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
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

import { useDispatch, useSelector } from "react-redux";

import { fetchAdminLowStockInventory } from "../../redux/slices/adminInventorySlice";

const AdminInventoryLowStock = () => {
  const dispatch = useDispatch();

  const {
    lowStock = [],
    lowStockLoading,
    lowStockError,
  } = useSelector((state) => state.adminInventory);

  useEffect(() => {
    dispatch(fetchAdminLowStockInventory());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(fetchAdminLowStockInventory());
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
            Low Stock
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Products that need stock replenishment
          </Typography>
        </Box>

        <IconButton
          onClick={handleRefresh}
          disabled={lowStockLoading}
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

      {lowStockError && (
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
            {lowStockError}
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
        {lowStockLoading ? (
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
        ) : lowStock.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberRoundedIcon
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
              No low stock products
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#9CA3AF",
              }}
            >
              All products currently have sufficient stock
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
                {lowStock.map((item) => (
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
                          color: "#D97706",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.reserved_quantity}</TableCell>

                    <TableCell>
                      <Typography sx={{ fontWeight: 700 }}>
                        {item.available_quantity}
                      </Typography>
                    </TableCell>

                    <TableCell>{item.minimum_stock}</TableCell>

                    <TableCell>{item.maximum_stock}</TableCell>

                    <TableCell>
                      <Chip
                        label="Low Stock"
                        size="small"
                        color="warning"
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

export default AdminInventoryLowStock;
