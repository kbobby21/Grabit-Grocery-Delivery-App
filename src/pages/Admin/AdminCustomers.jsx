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
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminCustomers,
  editAdminCustomerStatus,
} from "../../redux/slices/adminCustomerSlice";

import PATHS from "../../routes/paths";

const AdminCustomers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    customers = [],
    loading,
    error,
    updating,
    updateError,
  } = useSelector((state) => state.adminCustomers);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAdminCustomers());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const filteredCustomers = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) => {
      const name = String(customer.name || "").toLowerCase();
      const phone = String(customer.phone || "").toLowerCase();
      const email = String(customer.email || "").toLowerCase();
      const id = String(customer.id || "").toLowerCase();

      return (
        name.includes(query) ||
        phone.includes(query) ||
        email.includes(query) ||
        id.includes(query)
      );
    });
  }, [customers, search]);

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = () => {
    dispatch(fetchAdminCustomers());
  };

  /*
  |--------------------------------------------------------------------------
  | VIEW CUSTOMER
  |--------------------------------------------------------------------------
  */

  const handleView = (id) => {
    navigate(PATHS.ADMIN_CUSTOMER_DETAILS.replace(":id", id));
  };
  const handleToggleStatus = async (customer) => {
    const isVerified = !customer.is_verified;

    const action = isVerified ? "reactivate" : "deactivate";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this customer?`,
    );

    if (!confirmed) {
      return;
    }

    const result = await dispatch(
      editAdminCustomerStatus({
        customerId: customer.id,
        isVerified,
      }),
    );

    if (editAdminCustomerStatus.fulfilled.match(result)) {
      console.log(
        `Customer ${isVerified ? "reactivated" : "deactivated"} successfully`,
      );
    }
  };
  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | AVATAR
  |--------------------------------------------------------------------------
  */

  const getInitial = (customer) => {
    if (customer.name) {
      return customer.name.charAt(0).toUpperCase();
    }

    if (customer.phone) {
      return customer.phone.charAt(0);
    }

    return "U";
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
            Customers
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Manage your grocery customers
          </Typography>
        </Box>

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
      </Stack>

      {/* SUMMARY */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* TOTAL CUSTOMERS */}

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
              <PersonRoundedIcon
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
                Total Customers
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {customers.length}
              </Typography>
            </Box>
          </Stack>
        </Card>

        {/* VERIFIED */}

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack sx={{ p: 2.5 }}>
            <Typography
              sx={{
                fontSize: 12,
                color: "#6B7280",
              }}
            >
              Verified Customers
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {customers.filter((customer) => customer.is_verified).length}
            </Typography>
          </Stack>
        </Card>

        {/* ORDERS */}

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack sx={{ p: 2.5 }}>
            <Typography
              sx={{
                fontSize: 12,
                color: "#6B7280",
              }}
            >
              Total Orders
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              {customers.reduce(
                (total, customer) => total + Number(customer.order_count || 0),
                0,
              )}
            </Typography>
          </Stack>
        </Card>

        {/* REVENUE */}

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack sx={{ p: 2.5 }}>
            <Typography
              sx={{
                fontSize: 12,
                color: "#6B7280",
              }}
            >
              Total Spent
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              ₹
              {customers
                .reduce(
                  (total, customer) =>
                    total + Number(customer.total_spent || 0),
                  0,
                )
                .toFixed(2)}
            </Typography>
          </Stack>
        </Card>
      </Stack>

      {/* SEARCH */}

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
            placeholder="Search by name, phone, email or ID..."
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
              maxWidth: 550,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />
        </Box>
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
        ) : filteredCustomers.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonRoundedIcon
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
              No customers found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table
              sx={{
                minWidth: 950,
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#FAFAFA",
                  }}
                >
                  <TableCell>Customer</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Orders</TableCell>
                  <TableCell>Total Spent</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id} hover>
                    {/* CUSTOMER */}

                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleView(customer.id)}
                      >
                        <Box
                          sx={{
                            width: 44,
                            height: 44,
                            borderRadius: "50%",
                            bgcolor: "#FFF0F7",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {customer.avatar ? (
                            <Box
                              component="img"
                              src={customer.avatar}
                              alt={customer.name || "Customer"}
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
                                color: "#FF4FA3",
                              }}
                            >
                              {getInitial(customer)}
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
                            {customer.name || "Unnamed Customer"}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#9CA3AF",
                            }}
                          >
                            #{customer.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* PHONE */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        {customer.phone || "-"}
                      </Typography>
                    </TableCell>

                    {/* EMAIL */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#6B7280",
                        }}
                      >
                        {customer.email || "-"}
                      </Typography>
                    </TableCell>

                    {/* ORDERS */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {Number(customer.order_count || 0)}
                      </Typography>
                    </TableCell>

                    {/* TOTAL SPENT */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        ₹{Number(customer.total_spent || 0).toFixed(2)}
                      </Typography>
                    </TableCell>

                    {/* STATUS */}

                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          label={
                            customer.is_verified ? "Verified" : "Deactivated"
                          }
                          size="small"
                          color={customer.is_verified ? "success" : "default"}
                          sx={{
                            fontWeight: 700,
                            fontSize: 11,
                          }}
                        />

                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleToggleStatus(customer)}
                          disabled={updating}
                          sx={{
                            minWidth: 95,
                            borderRadius: 2,
                            textTransform: "none",
                            fontSize: 11,
                            fontWeight: 700,
                            borderColor: customer.is_verified
                              ? "#DC2626"
                              : "#22C55E",
                            color: customer.is_verified ? "#DC2626" : "#22C55E",
                            "&:hover": {
                              borderColor: customer.is_verified
                                ? "#B91C1C"
                                : "#16A34A",
                              backgroundColor: customer.is_verified
                                ? "#FEF2F2"
                                : "#F0FDF4",
                            },
                          }}
                        >
                          {customer.is_verified ? "Deactivate" : "Reactivate"}
                        </Button>
                      </Stack>
                    </TableCell>

                    {/* JOINED */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "#6B7280",
                        }}
                      >
                        {formatDate(customer.created_at)}
                      </Typography>
                    </TableCell>

                    {/* ACTIONS */}

                    <TableCell align="right">
                      <IconButton onClick={() => handleView(customer.id)}>
                        <VisibilityRoundedIcon fontSize="small" />
                      </IconButton>
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

export default AdminCustomers;
