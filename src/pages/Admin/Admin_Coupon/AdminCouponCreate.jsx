import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { showSnackbar } from "../../../redux/slices/uiSlice";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAdminCoupon } from "../../../redux/slices/adminCouponSlice";
const AdminCouponCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading, createError } = useSelector(
    (state) => state.adminCoupon,
  );

  const [code, setCode] = useState("");
  const [type, setType] = useState("percentage");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [active, setActive] = useState(true);
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!code.trim()) {
      return;
    }

    if (!value || Number(value) <= 0) {
      return;
    }

    if (minOrder === "" || Number(minOrder) < 0) {
      return;
    }
    const expiryDateTime = expiryDate ? `${expiryDate}T23:59:59` : null;
    const result = await dispatch(
      createAdminCoupon({
        code: code.trim().toUpperCase(),
        type,
        value: Number(value),
        min_order: Number(minOrder),
        active,
        expiry_date: expiryDateTime,
      }),
    );

    if (createAdminCoupon.fulfilled.match(result)) {
      dispatch(
        showSnackbar({
          message: "Coupon created successfully!",
          severity: "success",
          duration: 1500,
        }),
      );

      setTimeout(() => {
        navigate("/admin/coupons");
      }, 1500);
    }
  };

  return (
    <Box>
      {/* HEADER */}

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
              color: "#6B7280",
              textTransform: "none",
              fontWeight: 600,

              "&:hover": {
                backgroundColor: "transparent",
                color: "#FF4FA3",
              },
            }}
          >
            Back to Coupons
          </Button>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FFF0F7",
                color: "#FF4FA3",
              }}
            >
              <LocalOfferRoundedIcon />
            </Box>

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
                Create Coupon
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 14,
                  color: "#6B7280",
                }}
              >
                Create a discount code for your customers
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      {/* MAIN CONTENT */}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* COUPON DETAILS */}
          {createError && (
            <Box
              sx={{
                mb: 2,
                p: 1.5,
                borderRadius: 2,
                border: "1px solid #FECACA",
                bgcolor: "#FEF2F2",
              }}
            >
              <Typography
                sx={{
                  color: "#DC2626",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {createError}
              </Typography>
            </Box>
          )}
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              boxShadow: "none",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                Coupon Details
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                Set the discount code and offer details.
              </Typography>

              <Divider
                sx={{
                  my: 2.5,
                }}
              />

              <Stack spacing={2.5}>
                {/* COUPON CODE */}

                <Box>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Coupon Code
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    placeholder="e.g. WELCOME20"
                    value={code}
                    onChange={(event) =>
                      setCode(event.target.value.toUpperCase())
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                  />

                  <Typography
                    sx={{
                      mt: 0.7,
                      fontSize: 12,
                      color: "#9CA3AF",
                    }}
                  >
                    Customers will enter this code at checkout.
                  </Typography>
                </Box>

                {/* TYPE + VALUE */}

                <Stack
                  direction={{
                    xs: "column",
                    md: "row",
                  }}
                  spacing={2}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        mb: 0.8,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#374151",
                      }}
                    >
                      Discount Type
                    </Typography>

                    <FormControl fullWidth size="small">
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
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        mb: 0.8,
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#374151",
                      }}
                    >
                      Discount Value
                    </Typography>

                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      placeholder={
                        type === "percentage" ? "e.g. 20" : "e.g. 50"
                      }
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                      InputProps={{
                        startAdornment: (
                          <Typography
                            sx={{
                              mr: 1,
                              color: "#6B7280",
                              fontWeight: 700,
                            }}
                          >
                            {type === "percentage" ? "%" : "₹"}
                          </Typography>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                        },
                      }}
                    />
                  </Box>
                </Stack>

                {/* MIN ORDER */}

                <Box>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Minimum Order Amount
                  </Typography>

                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    placeholder="e.g. 500"
                    value={minOrder}
                    onChange={(event) => setMinOrder(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <Typography
                          sx={{
                            mr: 1,
                            color: "#6B7280",
                            fontWeight: 700,
                          }}
                        >
                          ₹
                        </Typography>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2.5,
                      },
                    }}
                  />

                  <Typography
                    sx={{
                      mt: 0.7,
                      fontSize: 12,
                      color: "#9CA3AF",
                    }}
                  >
                    Minimum cart value required to use this coupon.
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    Coupon Valid Till
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    // placeholder="e.g. 500"
                    value={expiryDate}
                    onChange={(event) => setExpiryDate(event.target.value)}
                    inputProps={{
                      min: new Date().toISOString().slice(0, 10),
                    }}
                  />
                  <Typography
                    sx={{
                      mt: 0.7,
                      fontSize: 12,
                      color: "#9CA3AF",
                    }}
                  >
                    Coupon expires at the end of the selected day
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Card>

          {/* STATUS */}

          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              boxShadow: "none",
            }}
          >
            <Box
              sx={{
                p: 3,
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#111111",
                }}
              >
                Coupon Status
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                Control whether customers can use this coupon.
              </Typography>

              <Divider
                sx={{
                  my: 2.5,
                }}
              />

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
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      Active Coupon
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#9CA3AF",
                      }}
                    >
                      Customers can use this coupon immediately.
                    </Typography>
                  </Box>
                }
              />
            </Box>
          </Card>

          {/* ACTIONS */}

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={1.5}
            sx={{
              pb: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/admin/coupons")}
              sx={{
                minHeight: 44,
                px: 3,
                borderRadius: 2.5,
                borderColor: "#D1D5DB",
                color: "#374151",
                textTransform: "none",
                fontWeight: 700,

                "&:hover": {
                  borderColor: "#9CA3AF",
                  backgroundColor: "#F9FAFB",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={createLoading}
              startIcon={createLoading ? null : <LocalOfferRoundedIcon />}
              sx={{
                minHeight: 44,
                px: 3,
                borderRadius: 2.5,
                backgroundColor: "#FF4FA3",
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "#E6328B",
                  boxShadow: "none",
                },
              }}
            >
              {createLoading ? "Creating..." : "Create Coupon"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminCouponCreate;
