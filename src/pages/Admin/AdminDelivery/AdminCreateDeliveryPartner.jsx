import React, { useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createAdminDeliveryPartner } from "../../../redux/slices/adminDeliverySlice";
import { showSnackbar } from "../../../redux/slices/uiSlice";

const AdminCreateDeliveryPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { createLoading } = useSelector((state) => state.adminDelivery);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    vehicle_type: "",
    vehicle_number: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      dispatch(
        showSnackbar({
          message: "Delivery partner name is required",
          severity: "error",
        }),
      );
      return;
    }

    if (!form.phone.trim()) {
      dispatch(
        showSnackbar({
          message: "Phone number is required",
          severity: "error",
        }),
      );
      return;
    }

    try {
      const result = await dispatch(
        createAdminDeliveryPartner({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          vehicle_type: form.vehicle_type.trim(),
          vehicle_number: form.vehicle_number.trim(),
        }),
      ).unwrap();

      /*
       * Backend response:
       *
       * {
       *   success: true,
       *   message: "Delivery partner created successfully",
       *   delivery_partner: {...}
       * }
       */

      dispatch(
        showSnackbar({
          message: result.message || "Delivery partner created successfully",
          severity: "success",
        }),
      );

      setForm({
        name: "",
        phone: "",
        email: "",
        vehicle_type: "",
        vehicle_number: "",
      });

      setTimeout(() => {
        navigate("/admin/delivery/partners");
      }, 800);
    } catch (error) {
      dispatch(
        showSnackbar({
          message:
            typeof error === "string"
              ? error
              : error?.message || "Failed to create delivery partner",
          severity: "error",
        }),
      );
    }
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        maxWidth: 1100,
        mx: "auto",
      }}
    >
      {/* HEADER */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        sx={{ mb: 3 }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/admin/delivery/partners")}
          sx={{
            borderRadius: 2.5,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back
        </Button>

        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Create Delivery Partner
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            Add a new delivery partner to your Grabit delivery team.
          </Typography>
        </Box>
      </Stack>

      {/* FORM CARD */}

      <Card
        sx={{
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
          }}
        >
          {/* CARD HEADER */}

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            sx={{ mb: 2.5 }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2.5,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalShippingRoundedIcon />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Partner Information
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Enter the details of the delivery partner.
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* FORM */}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2.5}>
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="name"
                placeholder="Enter delivery partner name"
              />

              <TextField
                label="Phone Number"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="tel"
                placeholder="Enter phone number"
              />

              <TextField
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                fullWidth
                autoComplete="email"
                placeholder="Enter email address"
              />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  label="Vehicle Type"
                  name="vehicle_type"
                  value={form.vehicle_type}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Bike / Scooter / Car"
                />

                <TextField
                  label="Vehicle Number"
                  name="vehicle_number"
                  value={form.vehicle_number}
                  onChange={handleChange}
                  fullWidth
                  placeholder="BR01AB1234"
                />
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1.5,
                  pt: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/delivery/partners")}
                  disabled={createLoading}
                  sx={{
                    px: 3,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={createLoading}
                  startIcon={<SaveRoundedIcon />}
                  sx={{
                    px: 3,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  {createLoading ? "Creating..." : "Create Partner"}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminCreateDeliveryPartner;
