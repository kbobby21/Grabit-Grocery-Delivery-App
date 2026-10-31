import React, { useEffect, useState } from "react";

import {
  Box,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  MenuItem,
  Pagination,
  Select,
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
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

import { useDispatch, useSelector } from "react-redux";

import { fetchAdminAllInventoryHistory } from "../../redux/slices/adminInventorySlice";

const AdminInventoryHistory = () => {
  const dispatch = useDispatch();

  const {
    history = [],
    historyPagination,
    historyLoading,
    historyError,
  } = useSelector((state) => state.adminInventory);

  const [transactionType, setTransactionType] = useState("");
  const [page, setPage] = useState(1);

  /*
  |--------------------------------------------------------------------------
  | FETCH ALL INVENTORY HISTORY
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    dispatch(
      fetchAdminAllInventoryHistory({
        page,
        limit: 20,
        ...(transactionType
          ? {
              type: transactionType,
            }
          : {}),
      }),
    );
  }, [dispatch, page, transactionType]);

  /*
  |--------------------------------------------------------------------------
  | TRANSACTION TYPE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleTypeChange = (event) => {
    setTransactionType(event.target.value);
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = () => {
    dispatch(
      fetchAdminAllInventoryHistory({
        page,
        limit: 20,
        ...(transactionType
          ? {
              type: transactionType,
            }
          : {}),
      }),
    );
  };

  /*
  |--------------------------------------------------------------------------
  | TRANSACTION LABEL
  |--------------------------------------------------------------------------
  */

  const getTypeLabel = (type) => {
    const labels = {
      purchase: "Purchase",
      return: "Return",
      manual_adjustment_add: "Manual Add",
      sale: "Sale",
      damage: "Damage",
      expired: "Expired",
      lost: "Lost",
      manual_adjustment_remove: "Manual Remove",
    };

    return labels[type] || type || "-";
  };

  /*
  |--------------------------------------------------------------------------
  | TRANSACTION COLOR
  |--------------------------------------------------------------------------
  */

  const getTypeColor = (type) => {
    if (
      type === "purchase" ||
      type === "return" ||
      type === "manual_adjustment_add"
    ) {
      return "success";
    }

    if (type === "damage" || type === "expired" || type === "lost") {
      return "error";
    }

    if (type === "sale" || type === "manual_adjustment_remove") {
      return "warning";
    }

    return "default";
  };

  /*
  |--------------------------------------------------------------------------
  | DATE FORMAT
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box>
      {/* ------------------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------------------ */}

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
        sx={{
          mb: 3,
        }}
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
            Inventory History
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Track all stock movements for your products
          </Typography>
        </Box>

        <IconButton
          onClick={handleRefresh}
          disabled={historyLoading}
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

      {/* ------------------------------------------------------------------ */}
      {/* FILTER */}
      {/* ------------------------------------------------------------------ */}

      <Card
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <FormControl
            size="small"
            sx={{
              width: {
                xs: "100%",
                md: 280,
              },
            }}
          >
            <Select
              value={transactionType}
              displayEmpty
              onChange={handleTypeChange}
              sx={{
                borderRadius: 2.5,
              }}
            >
              <MenuItem value="">All Transactions</MenuItem>

              <MenuItem value="purchase">Purchase</MenuItem>

              <MenuItem value="return">Return</MenuItem>

              <MenuItem value="manual_adjustment_add">Manual Add</MenuItem>

              <MenuItem value="sale">Sale</MenuItem>

              <MenuItem value="damage">Damage</MenuItem>

              <MenuItem value="expired">Expired</MenuItem>

              <MenuItem value="lost">Lost</MenuItem>

              <MenuItem value="manual_adjustment_remove">
                Manual Remove
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>

      {/* ------------------------------------------------------------------ */}
      {/* ERROR */}
      {/* ------------------------------------------------------------------ */}

      {historyError && (
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
            {historyError}
          </Typography>
        </Card>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* HISTORY TABLE */}
      {/* ------------------------------------------------------------------ */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {historyLoading ? (
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
        ) : history.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HistoryRoundedIcon
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
              No history found
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#9CA3AF",
              }}
            >
              No inventory transactions have been recorded yet.
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table
                sx={{
                  minWidth: 1250,
                }}
              >
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#FAFAFA",
                    }}
                  >
                    <TableCell>Date</TableCell>

                    <TableCell>Product</TableCell>

                    <TableCell>Transaction</TableCell>

                    <TableCell>Quantity</TableCell>

                    <TableCell>Before</TableCell>

                    <TableCell>After</TableCell>

                    <TableCell>Reason</TableCell>

                    <TableCell>Reference</TableCell>

                    <TableCell>Updated By</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {history.map((item) => {
                    const isIncrease =
                      Number(item.quantity_after) >=
                      Number(item.quantity_before);

                    return (
                      <TableRow key={item.id} hover>
                        {/* DATE */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: 12,
                              color: "#6B7280",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatDate(item.created_at)}
                          </Typography>
                        </TableCell>

                        {/* PRODUCT */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: "#111111",
                              minWidth: 160,
                            }}
                          >
                            {item.product_name || "-"}
                          </Typography>
                        </TableCell>

                        {/* TRANSACTION */}

                        <TableCell>
                          <Chip
                            label={getTypeLabel(item.type)}
                            size="small"
                            color={getTypeColor(item.type)}
                            sx={{
                              fontWeight: 700,
                              fontSize: 11,
                            }}
                          />
                        </TableCell>

                        {/* QUANTITY */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: isIncrease ? "#16A34A" : "#DC2626",
                            }}
                          >
                            {isIncrease ? "+" : "-"}
                            {item.quantity}
                          </Typography>
                        </TableCell>

                        {/* BEFORE */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 700,
                            }}
                          >
                            {item.quantity_before}
                          </Typography>
                        </TableCell>

                        {/* AFTER */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontWeight: 800,
                            }}
                          >
                            {item.quantity_after}
                          </Typography>
                        </TableCell>

                        {/* REASON */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: "#6B7280",
                              maxWidth: 180,
                            }}
                          >
                            {item.reason || "-"}
                          </Typography>
                        </TableCell>

                        {/* REFERENCE */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: "#6B7280",
                            }}
                          >
                            {item.reference || "-"}
                          </Typography>
                        </TableCell>

                        {/* UPDATED BY */}

                        <TableCell>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            {item.created_by_name || "Admin"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* ---------------------------------------------------------------- */}
            {/* PAGINATION */}
            {/* ---------------------------------------------------------------- */}

            {historyPagination && historyPagination.total_pages > 1 && (
              <Stack
                direction="row"
                justifyContent="center"
                sx={{
                  p: 2.5,
                  borderTop: "1px solid #E5E7EB",
                }}
              >
                <Pagination
                  page={page}
                  count={historyPagination.total_pages}
                  onChange={(_, value) => {
                    setPage(value);
                  }}
                  color="primary"
                />
              </Stack>
            )}
          </>
        )}
      </Card>
    </Box>
  );
};

export default AdminInventoryHistory;
