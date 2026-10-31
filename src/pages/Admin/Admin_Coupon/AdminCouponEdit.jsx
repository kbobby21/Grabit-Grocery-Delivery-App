import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminCouponById,
  updateAdminCoupon,
} from "../../../redux/slices/adminCouponSlice";

import { showSnackbar } from "../../../redux/slices/uiSlice";

const AdminCouponEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { coupon, detailLoading, updateLoading, error } = useSelector(
    (state) => state.adminCoupon,
  );

  const [code, setCode] = useState("");
  const [type, setType] = useState("percentage");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [active, setActive] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | FETCH COUPON
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminCouponById(id));
    }
  }, [dispatch, id]);

  /*
  |--------------------------------------------------------------------------
  | LOAD COUPON INTO FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!coupon) {
      return;
    }

    setCode(coupon.code || "");
    setType(coupon.type || "percentage");
    setValue(coupon.value ?? "");
    setMinOrder(coupon.min_order ?? "");
    setActive(Boolean(coupon.active));

    /*
    |--------------------------------------------------------------------------
    | EXPIRY DATE
    |--------------------------------------------------------------------------
    |
    | Backend returns something like:
    | 2026-08-31T18:29:59.000Z
    |
    | The date input requires:
    | 2026-08-31
    |
    */

    if (coupon.expiry_date) {
      const date = new Date(coupon.expiry_date);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      setExpiryDate(`${year}-${month}-${day}`);
    } else {
      setExpiryDate("");
    }
  }, [coupon]);

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      dispatch(
        showSnackbar({
          message: "Coupon code is required",
          severity: "error",
          duration: 2000,
        }),
      );

      return;
    }

    if (!value || Number(value) <= 0) {
      dispatch(
        showSnackbar({
          message: "Discount value must be greater than 0",
          severity: "error",
          duration: 2000,
        }),
      );

      return;
    }

    if (minOrder === "" || Number(minOrder) < 0) {
      dispatch(
        showSnackbar({
          message: "Minimum order must be 0 or greater",
          severity: "error",
          duration: 2000,
        }),
      );

      return;
    }

    /*
    |--------------------------------------------------------------------------
    | EXPIRY VALIDATION
    |--------------------------------------------------------------------------
    */

    if (expiryDate) {
      const selectedExpiry = new Date(`${expiryDate}T23:59:59`);

      if (selectedExpiry <= new Date()) {
        dispatch(
          showSnackbar({
            message: "Expiry date must be in the future",
            severity: "error",
            duration: 2500,
          }),
        );

        return;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | SEND EXPIRY
    |--------------------------------------------------------------------------
    |
    | Empty expiry date = no expiry
    |
    */

    const expiryDateTime = expiryDate ? `${expiryDate}T23:59:59` : null;

    const result = await dispatch(
      updateAdminCoupon({
        id,
        data: {
          code: code.trim().toUpperCase(),
          type,
          value: Number(value),
          min_order: Number(minOrder),
          active,
          expiry_date: expiryDateTime,
        },
      }),
    );

    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    if (updateAdminCoupon.fulfilled.match(result)) {
      dispatch(
        showSnackbar({
          message: result.payload.message || "Coupon updated successfully!",
          severity: "success",
          duration: 1500,
        }),
      );

      setTimeout(() => {
        navigate("/admin/coupons");
      }, 1500);
    } else {
      dispatch(
        showSnackbar({
          message: result.payload || "Failed to update coupon",
          severity: "error",
          duration: 2500,
        }),
      );
    }
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
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error && !coupon) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/admin/coupons")}
          sx={{
            mb: 3,
            textTransform: "none",
            color: "#111111",
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
              fontWeight: 600,
            }}
          >
            {error}
          </Typography>
        </Card>
      </Box>
    );
  }

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
        sx={{ mb: 3 }}
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
            Edit Coupon
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Update coupon details and promotional settings
          </Typography>
        </Box>
      </Stack>

      {/* FORM */}

      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 800,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              color: "#111111",
              mb: 0.5,
            }}
          >
            Coupon Details
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#6B7280",
              mb: 3,
            }}
          >
            Modify the coupon information below.
          </Typography>

          <Stack spacing={2.5}>
            {/* CODE */}

            <TextField
              fullWidth
              label="Coupon Code"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
              placeholder="e.g. SAVE20"
              inputProps={{
                style: {
                  textTransform: "uppercase",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
            />

            {/* TYPE */}

            <FormControl fullWidth>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#374151",
                  mb: 0.7,
                }}
              >
                Discount Type
              </Typography>

              <Select
                value={type}
                onChange={(event) => setType(event.target.value)}
                sx={{
                  borderRadius: 2.5,
                }}
              >
                <MenuItem value="percentage">Percentage</MenuItem>

                <MenuItem value="flat">Flat Discount</MenuItem>
              </Select>
            </FormControl>

            {/* VALUE */}

            <TextField
              fullWidth
              type="number"
              label={
                type === "percentage"
                  ? "Discount Percentage"
                  : "Discount Amount"
              }
              value={value}
              onChange={(event) => setValue(event.target.value)}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
            />

            {/* MIN ORDER */}

            <TextField
              fullWidth
              type="number"
              label="Minimum Order Value"
              value={minOrder}
              onChange={(event) => setMinOrder(event.target.value)}
              inputProps={{
                min: 0,
                step: "0.01",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
            />

            {/* EXPIRY DATE */}

            <TextField
              fullWidth
              label="Expiry Date"
              type="date"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().slice(0, 10),
              }}
              helperText="Leave empty if the coupon should never expire"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                },
              }}
            />

            {/* ACTIVE */}

            <Box
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 2.5,
                px: 2,
                py: 1.5,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={active}
                    onChange={(event) => setActive(event.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#FF4FA3",
                      },

                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#FF4FA3",
                        },
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      Active Coupon
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Customers can use this coupon when active.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* ACTIONS */}

        <Stack
          direction={{
            xs: "column-reverse",
            sm: "row",
          }}
          justifyContent="flex-end"
          spacing={1.5}
          sx={{
            p: 2.5,
            bgcolor: "#FAFAFA",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/coupons")}
            disabled={updateLoading}
            sx={{
              minHeight: 42,
              px: 2.5,
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 700,
              borderColor: "#D1D5DB",
              color: "#374151",
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={updateLoading}
            startIcon={
              updateLoading ? (
                <CircularProgress
                  size={18}
                  sx={{
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                <SaveRoundedIcon />
              )
            }
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
            {updateLoading ? "Updating..." : "Update Coupon"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdminCouponEdit;
