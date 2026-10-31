import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
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
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteAdminCoupon,
  fetchAdminCoupons,
  updateAdminCouponStatus,
} from "../../../redux/slices/adminCouponSlice";
import { showSnackbar } from "../../../redux/slices/uiSlice";

const AdminCoupons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    coupon: null,
  });
  const {
    coupons = [],
    loading,
    error,
    pagination,
    statusUpdatingId,
    deletingId,
    deleteLoading,
  } = useSelector((state) => state.adminCoupon);

  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchAdminCoupons({
        search: search || undefined,
        active: active || undefined,
        type: type || undefined,
        page,
        limit: 20,
      }),
    );
  }, [dispatch, search, active, type, page]);

  const handleRefresh = () => {
    dispatch(
      fetchAdminCoupons({
        search: search || undefined,
        active: active || undefined,
        type: type || undefined,
        page,
        limit: 20,
      }),
    );
  };

  const handleStatusChange = async (coupon) => {
    const result = await dispatch(
      updateAdminCouponStatus({
        id: coupon.id,
        active: !coupon.active,
      }),
    );

    if (updateAdminCouponStatus.fulfilled.match(result)) {
      dispatch(
        showSnackbar({
          message:
            result.payload.message ||
            `Coupon ${coupon.active ? "deactivated" : "activated"} successfully`,
          severity: "success",
          duration: 1500,
        }),
      );
    }
  };

  const handleDelete = (coupon) => {
    setDeleteDialog({
      open: true,
      coupon,
    });
  };

  const handleConfirmDelete = async () => {
    const coupon = deleteDialog.coupon;

    if (!coupon) {
      return;
    }

    const result = await dispatch(deleteAdminCoupon(coupon.id));

    if (deleteAdminCoupon.fulfilled.match(result)) {
      dispatch(
        showSnackbar({
          message: result.payload.message || "Coupon deleted successfully",
          severity: "success",
          duration: 1500,
        }),
      );

      setDeleteDialog({
        open: false,
        coupon: null,
      });
    } else {
      dispatch(
        showSnackbar({
          message: result.payload || "Failed to delete coupon",
          severity: "error",
          duration: 2500,
        }),
      );
    }
  };
  const formatValue = (coupon) => {
    const value = Number(coupon.value);

    if (coupon.type === "percentage") {
      return `${value}%`;
    }

    return `₹${value.toFixed(2)}`;
  };

  const formatMinimumOrder = (value) => {
    return `₹${Number(value || 0).toFixed(2)}`;
  };
  const isCouponExpired = (coupon) => {
    if (!coupon.expiry_date) {
      return false;
    }

    return new Date(coupon.expiry_date) <= new Date();
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
            Coupons
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Manage discount coupons and promotional offers
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={handleRefresh}
            disabled={loading}
            sx={{
              width: 42,
              height: 42,
              border: "1px solid #E5E7EB",
              borderRadius: 2.5,
            }}
          >
            <RefreshRoundedIcon />
          </IconButton>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate("/admin/coupons/create")}
            sx={{
              minHeight: 42,
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#FF4FA3",
              "&:hover": {
                bgcolor: "#E6328B",
              },
            }}
          >
            Create Coupon
          </Button>
        </Stack>
      </Stack>

      {/* FILTERS */}

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
          <TextField
            fullWidth
            size="small"
            placeholder="Search coupon code..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            sx={{
              maxWidth: {
                md: 400,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: 180,
            }}
          >
            <Select
              displayEmpty
              value={active}
              onChange={(event) => {
                setActive(event.target.value);
                setPage(1);
              }}
              sx={{
                borderRadius: 2.5,
              }}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            size="small"
            sx={{
              minWidth: 180,
            }}
          >
            <Select
              displayEmpty
              value={type}
              onChange={(event) => {
                setType(event.target.value);
                setPage(1);
              }}
              sx={{
                borderRadius: 2.5,
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
              <MenuItem value="flat">Flat Discount</MenuItem>
            </Select>
          </FormControl>
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

      {/* TABLE */}

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
        ) : coupons.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              No coupons found
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#9CA3AF",
              }}
            >
              Try changing your filters or create a new coupon.
            </Typography>
          </Box>
        ) : (
          <>
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
                    <TableCell>Code</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Min. Order</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Expiry_Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow
                      key={coupon.id}
                      hover
                      onClick={() => navigate(`/admin/coupons/${coupon.id}`)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#FFF7FB",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 800,
                            letterSpacing: 0.4,
                          }}
                        >
                          {coupon.code}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            coupon.type === "percentage" ? "Percentage" : "Flat"
                          }
                          sx={{
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography
                          sx={{
                            fontWeight: 800,
                          }}
                        >
                          {formatValue(coupon)}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {formatMinimumOrder(coupon.min_order)}
                      </TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={
                            isCouponExpired(coupon)
                              ? "Expired"
                              : coupon.active
                                ? "Active"
                                : "Inactive"
                          }
                          color={
                            isCouponExpired(coupon)
                              ? "error"
                              : coupon.active
                                ? "success"
                                : "default"
                          }
                          sx={{
                            fontWeight: 700,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        {coupon.expiry_date ? (
                          <Typography
                            sx={{
                              fontSize: 13,
                              color:
                                new Date(coupon.expiry_date) <= new Date()
                                  ? "#DC2626"
                                  : "#6B7280",
                              fontWeight:
                                new Date(coupon.expiry_date) <= new Date()
                                  ? 700
                                  : 500,
                            }}
                          >
                            {new Date(coupon.expiry_date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: 13,
                              color: "#6B7280",
                            }}
                          >
                            No expiry
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction="row"
                          justifyContent="flex-end"
                          spacing={0.5}
                        >
                          <IconButton
                            size="small"
                            title="Edit"
                            onClick={() =>
                              navigate(`/admin/coupons/${coupon.id}/edit`)
                            }
                          >
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            title={coupon.active ? "Deactivate" : "Activate"}
                            disabled={statusUpdatingId === coupon.id}
                            onClick={() => handleStatusChange(coupon)}
                          >
                            <Typography
                              sx={{
                                fontSize: 11,
                                fontWeight: 800,
                                color: coupon.active ? "#DC2626" : "#16A34A",
                              }}
                            >
                              {statusUpdatingId === coupon.id
                                ? "..."
                                : coupon.active
                                  ? "OFF"
                                  : "ON"}
                            </Typography>
                          </IconButton>

                          <IconButton
                            size="small"
                            title="Delete"
                            disabled={deletingId === coupon.id}
                            onClick={() => handleDelete(coupon)}
                          >
                            {deletingId === coupon.id ? (
                              <CircularProgress
                                size={17}
                                sx={{ color: "#DC2626" }}
                              />
                            ) : (
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {pagination.totalPages > 1 && (
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
                  count={pagination.totalPages}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </Stack>
            )}
          </>
        )}
      </Card>
      <Dialog
        open={deleteDialog.open}
        onClose={() => {
          if (!deleteLoading) {
            setDeleteDialog({
              open: false,
              coupon: null,
            });
          }
        }}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
          }}
        >
          Delete Coupon?
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete coupon{" "}
            <strong>{deleteDialog.coupon?.code}</strong>
            ?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 2.5,
          }}
        >
          <Button
            onClick={() => {
              setDeleteDialog({
                open: false,
                coupon: null,
              });
            }}
            disabled={deleteLoading}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              color: "#6B7280",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmDelete}
            disabled={deleteLoading}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              bgcolor: "#DC2626",
              "&:hover": {
                bgcolor: "#B91C1C",
              },
            }}
          >
            {deleteLoading ? "Deleting..." : "Delete Coupon"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminCoupons;
