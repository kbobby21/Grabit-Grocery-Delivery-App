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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchAdminCouponById } from "../../../redux/slices/adminCouponSlice";

const AdminCouponDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { coupon, detailLoading, error } = useSelector(
    (state) => state.adminCoupon,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminCouponById(id));
    }
  }, [dispatch, id]);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  const isExpired = (coupon) => {
    if (!coupon?.expiry_date) {
      return false;
    }

    return new Date(coupon.expiry_date) <= new Date();
  };

  const formatDiscount = (coupon) => {
    if (!coupon) {
      return "-";
    }

    const value = Number(coupon.value || 0);

    if (coupon.type === "percentage") {
      return `${value}%`;
    }

    return `₹${value.toFixed(2)}`;
  };

  const formatMinimumOrder = (value) => {
    return `₹${Number(value || 0).toFixed(2)}`;
  };

  const formatExpiryDate = (value) => {
    if (!value) {
      return "No expiry";
    }

    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (detailLoading) {
    return (
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
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR / NOT FOUND
  |--------------------------------------------------------------------------
  */

  if (error || !coupon) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/admin/coupons")}
          sx={{
            mb: 3,
            textTransform: "none",
            color: "#6B7280",
            fontWeight: 600,
          }}
        >
          Back to Coupons
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
              fontWeight: 700,
            }}
          >
            {error || "Coupon not found"}
          </Typography>
        </Card>
      </Box>
    );
  }

  const expired = isExpired(coupon);

  /*
  |--------------------------------------------------------------------------
  | STATUS
  |--------------------------------------------------------------------------
  */

  const statusLabel = expired
    ? "Expired"
    : coupon.active
      ? "Active"
      : "Inactive";

  const statusColor = expired ? "error" : coupon.active ? "success" : "default";

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

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
        sx={{
          mb: 3,
        }}
      >
        <Box>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate("/admin/coupons")}
            sx={{
              mb: 1,
              px: 0,
              textTransform: "none",
              color: "#6B7280",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#111111",
              },
            }}
          >
            Back to Coupons
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
            Coupon Details
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            View coupon information and promotional settings
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EditRoundedIcon />}
          onClick={() => navigate(`/admin/coupons/${coupon.id}/edit`)}
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
          Edit Coupon
        </Button>
      </Stack>

      {/* MAIN CARD */}

      <Card
        sx={{
          maxWidth: 900,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {/* COUPON HEADER */}

        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 3,
            },
            bgcolor: "#FAFAFA",
          }}
        >
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
            spacing={2}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: 1,
                  color: "#111111",
                }}
              >
                {coupon.code}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                Coupon ID: {coupon.id}
              </Typography>
            </Box>

            <Chip
              label={statusLabel}
              color={statusColor}
              sx={{
                fontWeight: 800,
                px: 1,
              }}
            />
          </Stack>
        </Box>

        <Divider />

        {/* DETAILS */}

        <Box
          sx={{
            p: {
              xs: 2.5,
              md: 3,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111111",
              mb: 2.5,
            }}
          >
            Coupon Information
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {/* TYPE */}

            <DetailItem
              label="Discount Type"
              value={
                coupon.type === "percentage" ? "Percentage" : "Flat Discount"
              }
            />

            {/* DISCOUNT */}

            <DetailItem
              label="Discount"
              value={formatDiscount(coupon)}
              highlight
            />

            {/* MINIMUM ORDER */}

            <DetailItem
              label="Minimum Order"
              value={formatMinimumOrder(coupon.min_order)}
            />

            {/* EXPIRY DATE */}

            <DetailItem
              label="Expiry Date"
              value={formatExpiryDate(coupon.expiry_date)}
              expired={expired}
            />

            {/* STATUS */}

            <DetailItem label="Status" value={statusLabel} />
          </Box>
        </Box>

        <Divider />

        {/* EXPIRY MESSAGE */}

        <Box
          sx={{
            p: 3,
          }}
        >
          {expired ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: "#FEF2F2",
                border: "1px solid #FECACA",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#DC2626",
                  fontSize: 14,
                }}
              >
                This coupon has expired.
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#991B1B",
                }}
              >
                Customers should no longer be able to use this coupon.
              </Typography>
            </Box>
          ) : coupon.expiry_date ? (
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: "#F0FDF4",
                border: "1px solid #BBF7D0",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#15803D",
                  fontSize: 14,
                }}
              >
                Coupon is valid until {formatExpiryDate(coupon.expiry_date)}.
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#166534",
                }}
              >
                The coupon can be used before the expiry date.
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: 2.5,
                bgcolor: "#F9FAFB",
                border: "1px solid #E5E7EB",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 800,
                  color: "#374151",
                  fontSize: 14,
                }}
              >
                No expiry date
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                This coupon does not have an expiry date.
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};

/*
|--------------------------------------------------------------------------
| DETAIL ITEM
|--------------------------------------------------------------------------
*/

const DetailItem = ({ label, value, highlight = false, expired = false }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #E5E7EB",
        borderRadius: 2.5,
        bgcolor: "#FFFFFF",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: "#6B7280",
          fontWeight: 600,
          mb: 0.7,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: highlight ? 20 : 15,
          fontWeight: 800,
          color: expired ? "#DC2626" : highlight ? "#FF4FA3" : "#111111",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default AdminCouponDetails;
