import { useState } from "react";

import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addAddress } from "../../redux/slices/addressSlice";
import { createAddress } from "../../api/address.api";

const pink = "#FF4FA3";
const dark = "#171717";

function AddAddress() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      return;
    }

    try {
      setSaving(true);

      const response = await createAddress(form);

      console.log("CREATE ADDRESS RESPONSE:", response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || "Unable to create address");
      }

      const newAddress = response.data.address;

      dispatch(addAddress(newAddress));

      navigate("/addresses");
    } catch (error) {
      console.error("Create Address Error:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to save address",
      );
    } finally {
      setSaving(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      minHeight: 54,
      borderRadius: "14px",
      backgroundColor: "#FFFFFF",
      transition: "all .2s ease",

      "& fieldset": {
        borderColor: "#EAEAEA",
      },

      "&:hover fieldset": {
        borderColor: "#FFB6D5",
      },

      "&.Mui-focused fieldset": {
        borderColor: pink,
        borderWidth: "1.5px",
      },

      "&.Mui-focused": {
        boxShadow: "0 0 0 4px rgba(255,79,163,.08)",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#888",
      fontSize: 13,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: pink,
    },

    "& .MuiInputBase-input": {
      fontSize: 13.5,
      fontWeight: 500,
      color: "#222",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #FFF8FC 0%, #FAFAFC 45%, #FAFAFC 100%)",
        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        pb: 8,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            mb: {
              xs: 2.5,
              sm: 3,
            },
          }}
        >
          <IconButton
            onClick={() => navigate("/addresses")}
            aria-label="Back to checkout"
            sx={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              backgroundColor: "#FFFFFF",
              color: "#222",
              border: "1px solid rgba(0,0,0,.07)",
              boxShadow: "0 6px 20px rgba(20,20,20,.06)",
              transition: "all .2s ease",

              "&:hover": {
                color: pink,
                backgroundColor: "#FFF7FB",
                borderColor: "#FFD1E3",
                transform: "translateX(-2px)",
                boxShadow: "0 8px 22px rgba(255,79,163,.10)",
              },
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 25,
                },
                fontWeight: 900,
                color: dark,
                letterSpacing: "-.7px",
                lineHeight: 1.1,
              }}
            >
              Add Address
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 11.5,
                color: "#888",
                fontWeight: 500,
              }}
            >
              Add a delivery address for your order
            </Typography>
          </Box>
        </Stack>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",

            p: {
              xs: 2,
              sm: 3.5,
            },

            borderRadius: {
              xs: "22px",
              sm: "26px",
            },

            background:
              "linear-gradient(145deg, rgba(255,255,255,.98), rgba(255,248,252,.98))",

            border: "1px solid rgba(255,79,163,.12)",

            boxShadow:
              "0 20px 60px rgba(30,20,25,.07), 0 4px 15px rgba(255,79,163,.035)",
          }}
        >
          {/* Pink glow */}

          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,79,163,.09), transparent 70%)",
              right: -120,
              top: -120,
              pointerEvents: "none",
            }}
          />

          {/* =====================================================
              CARD HEADER
          ===================================================== */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              position: "relative",
              zIndex: 1,
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: 46,
                height: 46,
                flexShrink: 0,
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                background: "linear-gradient(135deg, #FFF0F7 0%, #FFE4F0 100%)",

                border: "1px solid rgba(255,79,163,.12)",

                boxShadow: "0 7px 20px rgba(255,79,163,.08)",
              }}
            >
              <LocationOnRoundedIcon
                sx={{
                  fontSize: 24,
                  color: pink,
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 850,
                  color: dark,
                }}
              >
                Delivery details
              </Typography>

              <Typography
                sx={{
                  mt: 0.25,
                  fontSize: 10.5,
                  color: "#999",
                }}
              >
                Where should we deliver your order?
              </Typography>
            </Box>
          </Stack>

          {/* =====================================================
              FORM
          ===================================================== */}

          <Stack
            spacing={1.8}
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* NAME */}

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <PersonRoundedIcon
                    sx={{
                      mr: 1,
                      fontSize: 20,
                      color: "#B0B0B0",
                    }}
                  />
                ),
              }}
            />

            {/* PHONE */}

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="tel"
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <PhoneRoundedIcon
                    sx={{
                      mr: 1,
                      fontSize: 20,
                      color: "#B0B0B0",
                    }}
                  />
                ),
              }}
            />

            {/* ADDRESS */}

            <TextField
              fullWidth
              multiline
              minRows={2}
              label="House / Street / Area"
              name="address"
              value={form.address}
              onChange={handleChange}
              autoComplete="street-address"
              sx={{
                ...fieldSx,

                "& .MuiOutlinedInput-root": {
                  ...fieldSx["& .MuiOutlinedInput-root"],
                  alignItems: "flex-start",
                  py: 1.2,
                },
              }}
              InputProps={{
                startAdornment: (
                  <HomeRoundedIcon
                    sx={{
                      mr: 1,
                      mt: 0.5,
                      fontSize: 20,
                      color: "#B0B0B0",
                    }}
                  />
                ),
              }}
            />

            {/* CITY + STATE */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={1.8}
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                autoComplete="address-level2"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <LocationCityRoundedIcon
                      sx={{
                        mr: 1,
                        fontSize: 20,
                        color: "#B0B0B0",
                      }}
                    />
                  ),
                }}
              />

              <TextField
                fullWidth
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                autoComplete="address-level1"
                sx={fieldSx}
                InputProps={{
                  startAdornment: (
                    <MapRoundedIcon
                      sx={{
                        mr: 1,
                        fontSize: 20,
                        color: "#B0B0B0",
                      }}
                    />
                  ),
                }}
              />
            </Stack>

            {/* PINCODE */}

            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              inputMode="numeric"
              autoComplete="postal-code"
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <PinDropRoundedIcon
                    sx={{
                      mr: 1,
                      fontSize: 20,
                      color: "#B0B0B0",
                    }}
                  />
                ),
              }}
            />

            {/* =================================================
                SAVE BUTTON
            ================================================= */}

            <Button
              variant="contained"
              size="large"
              fullWidth
              disabled={saving}
              onClick={handleSubmit}
              sx={{
                mt: 0.8,

                minHeight: 55,

                borderRadius: "15px",

                textTransform: "none",

                fontSize: 14,

                fontWeight: 850,

                color: "#FFFFFF",

                background: "linear-gradient(135deg, #FF4FA3 0%, #FF2F91 100%)",

                boxShadow: "0 12px 28px rgba(255,79,163,.23)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg, #FF3D99 0%, #FF2187 100%)",

                  boxShadow: "0 15px 32px rgba(255,79,163,.30)",
                },

                "&.Mui-disabled": {
                  color: "#FFFFFF",
                  background: "#FF9FC5",
                },
              }}
            >
              {saving ? "Saving Address..." : "Save Address"}
            </Button>
          </Stack>

          {/* =====================================================
              SECURITY MESSAGE
          ===================================================== */}

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.7}
            sx={{
              position: "relative",
              zIndex: 1,
              mt: 2.5,
            }}
          >
            <LocationOnRoundedIcon
              sx={{
                fontSize: 15,
                color: "#22A447",
              }}
            />

            <Typography
              sx={{
                fontSize: 10,
                color: "#999",
                fontWeight: 500,
              }}
            >
              Your address is securely saved to your Grabit account
            </Typography>
          </Stack>
        </Paper>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            mt: 3.5,
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 1,
              backgroundColor: "#F0DCE6",
            }}
          />

          <Typography
            sx={{
              fontSize: 9,
              fontWeight: 700,
              color: "#B5A0AA",
              letterSpacing: ".5px",
              whiteSpace: "nowrap",
            }}
          >
            GRAB EVERYTHING. DELIVERED FAST.
          </Typography>

          <Box
            sx={{
              width: 35,
              height: 1,
              backgroundColor: "#F0DCE6",
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default AddAddress;
