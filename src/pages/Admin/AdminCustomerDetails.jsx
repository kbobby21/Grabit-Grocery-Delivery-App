import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
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
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminCustomerById,
  fetchAdminCustomerOrders,
  editAdminCustomerStatus,
  clearAdminCustomerErrors,
  clearSelectedCustomer,
} from "../../redux/slices/adminCustomerSlice";

import PATHS from "../../routes/paths";

const AdminCustomerDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedCustomer,
    customerLoading,

    customerOrders = [],
    ordersLoading,
    ordersError,
    updateError,
    updating,
    updatingStatus,
    statusError,
  } = useSelector((state) => state.adminCustomers);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchAdminCustomerById(id));
    dispatch(fetchAdminCustomerOrders(id));

    return () => {
      dispatch(clearSelectedCustomer());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(PATHS.ADMIN_CUSTOMERS);
  };

  const handleStatusChange = async (event) => {
    const isVerified = event.target.checked;

    console.log("PATCH STATUS:", {
      customerId: id,
      isVerified,
      type: typeof isVerified,
    });

    const result = await dispatch(
      editAdminCustomerStatus({
        customerId: id,
        isVerified,
      }),
    );

    if (editAdminCustomerStatus.fulfilled.match(result)) {
      console.log("Customer status updated");
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatMoney = (amount) => {
    return `₹${Number(amount || 0).toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    switch (String(status || "").toLowerCase()) {
      case "delivered":
        return "success";

      case "cancelled":
      case "canceled":
        return "error";

      case "pending":
        return "warning";

      case "confirmed":
      case "processing":
      case "out for delivery":
        return "info";

      default:
        return "default";
    }
  };

  if (customerLoading) {
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

  if (!selectedCustomer) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          sx={{
            px: 0,
            color: "#6B7280",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Customers
        </Button>

        <Card
          sx={{
            mt: 2,
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <PersonRoundedIcon
            sx={{
              fontSize: 50,
              color: "#D1D5DB",
            }}
          />

          <Typography
            sx={{
              mt: 1.5,
              fontWeight: 700,
            }}
          >
            Customer not found
          </Typography>
        </Card>
      </Box>
    );
  }

  const customer = selectedCustomer;

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
            Back to Customers
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
            Customer Details
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            View customer information and order history
          </Typography>
        </Box>

        {/* STATUS BUTTON */}

        <Button
          variant="contained"
          startIcon={
            updatingStatus ? (
              <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
            ) : customer.is_verified ? (
              <BlockRoundedIcon />
            ) : (
              <CheckCircleRoundedIcon />
            )
          }
          onClick={handleStatusChange}
          disabled={updatingStatus}
          sx={{
            minHeight: 42,
            borderRadius: 2.5,
            bgcolor: customer.is_verified ? "#DC2626" : "#22C55E",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",

            "&:hover": {
              bgcolor: customer.is_verified ? "#B91C1C" : "#16A34A",
              boxShadow: "none",
            },
          }}
        >
          {updatingStatus
            ? "Updating..."
            : customer.is_verified
              ? "Deactivate Customer"
              : "Activate Customer"}
        </Button>
      </Stack>

      {/* STATUS ERROR */}

      {statusError && (
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
            {statusError}
          </Typography>
        </Card>
      )}

      {/* CUSTOMER INFORMATION */}

      <Card
        sx={{
          mb: 3,
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
              md: 3,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              mb: 2.5,
            }}
          >
            Customer Information
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={3}
          >
            {/* AVATAR */}

            <Box
              sx={{
                width: 120,
                height: 120,
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
                <PersonRoundedIcon
                  sx={{
                    fontSize: 60,
                    color: "#FF4FA3",
                  }}
                />
              )}
            </Box>

            {/* DETAILS */}

            <Box sx={{ flex: 1 }}>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                justifyContent="space-between"
                spacing={2}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                      mb: 0.5,
                    }}
                  >
                    Customer Name
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#111111",
                    }}
                  >
                    {customer.name || "Unnamed Customer"}
                  </Typography>
                </Box>

                <Chip
                  label={customer.is_verified ? "Active" : "Inactive"}
                  color={customer.is_verified ? "success" : "default"}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    alignSelf: "flex-start",
                  }}
                />
              </Stack>

              <Divider sx={{ my: 2.5 }} />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <Card
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Phone
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 0.7,
                      fontWeight: 700,
                    }}
                  >
                    {customer.phone || "-"}
                  </Typography>
                </Card>

                <Card
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailRoundedIcon
                      sx={{
                        fontSize: 19,
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Email
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 0.7,
                      fontWeight: 700,
                      wordBreak: "break-word",
                    }}
                  >
                    {customer.email || "-"}
                  </Typography>
                </Card>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Card>
      <Card
        sx={{
          mt: 3,
          p: 2.5,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: 800,
                color: "#111111",
              }}
            >
              Customer Verification
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: "#6B7280",
              }}
            >
              {selectedCustomer?.is_verified
                ? "Customer is verified"
                : "Customer is not verified"}
            </Typography>
          </Box>

          <Switch
            checked={Boolean(selectedCustomer?.is_verified)}
            onChange={handleStatusChange}
            disabled={updating}
          />
        </Stack>

        {updateError && (
          <Typography
            sx={{
              mt: 1.5,
              fontSize: 13,
              color: "#DC2626",
              fontWeight: 600,
            }}
          >
            {updateError}
          </Typography>
        )}
      </Card>
      {/* CUSTOMER SUMMARY */}

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
              <ShoppingBagRoundedIcon
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
                Total Orders
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {customer.order_count ?? customerOrders.length}
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
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#F0FDF4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CurrencyRupeeRoundedIcon
                sx={{
                  color: "#22C55E",
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
                Total Spent
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {formatMoney(customer.total_spent)}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Stack>

      {/* ORDER HISTORY */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={1}
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                Order History
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                Orders placed by this customer
              </Typography>
            </Box>

            <Chip
              label={`${customerOrders.length} ${
                customerOrders.length === 1 ? "Order" : "Orders"
              }`}
              sx={{
                bgcolor: "#FFF0F7",
                color: "#E6328B",
                fontWeight: 700,
              }}
            />
          </Stack>

          {ordersError && (
            <Card
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2.5,
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
                {ordersError}
              </Typography>
            </Card>
          )}

          {ordersLoading ? (
            <Box
              sx={{
                minHeight: 250,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ color: "#FF4FA3" }} />
            </Box>
          ) : customerOrders.length === 0 ? (
            <Box
              sx={{
                minHeight: 220,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <ShoppingBagRoundedIcon
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
                No orders found
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#9CA3AF",
                }}
              >
                This customer has not placed any orders yet.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2}>
              {customerOrders.map((order) => (
                <Card
                  key={order.id}
                  sx={{
                    borderRadius: 2.5,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                  }}
                >
                  <Box sx={{ p: 2.5 }}>
                    {/* ORDER HEADER */}

                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      justifyContent="space-between"
                      alignItems={{
                        xs: "flex-start",
                        sm: "center",
                      }}
                      spacing={1.5}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 800,
                          }}
                        >
                          Order #{order.id}
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.4,
                            fontSize: 12,
                            color: "#6B7280",
                          }}
                        >
                          {formatDate(order.created_at)}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={1}>
                        <Chip
                          label={order.status || "Unknown"}
                          size="small"
                          color={getStatusColor(order.status)}
                          sx={{
                            fontWeight: 700,
                            fontSize: 11,
                          }}
                        />

                        <Chip
                          label={order.payment_status || "Unknown"}
                          size="small"
                          sx={{
                            bgcolor: "#F3F4F6",
                            color: "#374151",
                            fontWeight: 700,
                            fontSize: 11,
                            textTransform: "capitalize",
                          }}
                        />
                      </Stack>
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    {/* ORDER DETAILS */}

                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      spacing={2}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#9CA3AF",
                          }}
                        >
                          Items
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {order.item_count ?? 0} Items
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#9CA3AF",
                          }}
                        >
                          Payment Method
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {order.payment_method || "-"}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#9CA3AF",
                          }}
                        >
                          Subtotal
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {formatMoney(order.subtotal)}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#9CA3AF",
                          }}
                        >
                          Delivery Fee
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {formatMoney(order.delivery_fee)}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#9CA3AF",
                          }}
                        >
                          Discount
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {formatMoney(order.discount)}
                        </Typography>
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: "#9CA3AF",
                          }}
                        >
                          Total
                        </Typography>

                        <Typography
                          sx={{
                            mt: 0.3,
                            fontSize: 17,
                            fontWeight: 800,
                            color: "#111111",
                          }}
                        >
                          {formatMoney(order.total)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Card>
              ))}
            </Stack>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default AdminCustomerDetails;
