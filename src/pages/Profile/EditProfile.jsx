import { useState } from "react";

import {
  Avatar,
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
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../redux/slices/profileSlice";

function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateProfile(form));
    navigate("/profile");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.default",
        py: {
          xs: 2,
          sm: 4,
          md: 5,
        },
        pb: 8,

        // Premium Grabit background
        "&::before": {
          content: '""',
          position: "absolute",
          width: {
            xs: 260,
            sm: 380,
          },
          height: {
            xs: 260,
            sm: 380,
          },
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.08,
          filter: "blur(70px)",
          top: -120,
          right: -100,
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: {
            xs: 220,
            sm: 320,
          },
          height: {
            xs: 220,
            sm: 320,
          },
          borderRadius: "50%",
          bgcolor: "primary.light",
          opacity: 0.14,
          filter: "blur(65px)",
          bottom: -100,
          left: -100,
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
          px: {
            xs: 1.5,
            sm: 2,
          },
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{
            mb: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <IconButton
            onClick={() => navigate("/profile")}
            aria-label="Back to profile"
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,

              // No filled background
              bgcolor: "transparent",

              color: "text.primary",

              border: "1px solid",
              borderColor: "divider",

              "&:hover": {
                bgcolor: "transparent",
                color: "primary.main",
                borderColor: "primary.main",
              },
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 21,
                  sm: 25,
                },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}
            >
              Edit Profile
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 11.5,
                color: "text.secondary",
              }}
            >
              Update your personal information
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
              xs: 3.5,
              sm: 4.5,
            },

            bgcolor: "background.paper",

            border: "1px solid",
            borderColor: "divider",

            boxShadow: {
              xs: 3,
              sm: 5,
            },

            // Premium pink top accent
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background:
                "linear-gradient(90deg, #FF4FA3 0%, #FF77B7 50%, #FF4FA3 100%)",
            },
          }}
        >
          {/* ===================================================
              PROFILE HEADER
          =================================================== */}

          <Box
            sx={{
              textAlign: "center",
              py: {
                xs: 1,
                sm: 1.5,
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 116,
                height: 116,
                mx: "auto",
              }}
            >
              {/* Avatar ring */}

              <Box
                sx={{
                  position: "absolute",
                  inset: -5,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FF4FA3, #FF9AC8)",
                  opacity: 0.9,
                }}
              />

              <Avatar
                src={form.avatar}
                sx={{
                  position: "relative",
                  width: 116,
                  height: 116,

                  bgcolor: "background.paper",
                  color: "primary.main",

                  border: "5px solid",
                  borderColor: "background.paper",

                  fontSize: 38,
                  fontWeight: 800,
                }}
              >
                {form.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              {/* Camera */}

              <IconButton
                aria-label="Change profile picture"
                sx={{
                  position: "absolute",
                  right: -4,
                  bottom: -2,

                  width: 40,
                  height: 40,

                  bgcolor: "primary.main",
                  color: "#fff",

                  border: "3px solid",
                  borderColor: "background.paper",

                  boxShadow: 3,

                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <CameraAltRoundedIcon sx={{ fontSize: 19 }} />
              </IconButton>
            </Box>

            <Typography
              sx={{
                mt: 2,
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              {form.name || "Your Name"}
            </Typography>

            <Typography
              sx={{
                mt: 0.4,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Keep your Grabit profile up to date
            </Typography>
          </Box>

          {/* ===================================================
              FORM
          =================================================== */}

          <Stack
            spacing={2}
            sx={{
              mt: {
                xs: 2.5,
                sm: 3,
              },
            }}
          >
            {/* Name */}

            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <PersonRoundedIcon
                    sx={{
                      mr: 1.2,
                      color: "primary.main",
                      fontSize: 21,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.8,
                  bgcolor: "background.default",

                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },

                  "&.Mui-focused fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />

            {/* Email */}

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <EmailRoundedIcon
                    sx={{
                      mr: 1.2,
                      color: "primary.main",
                      fontSize: 21,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.8,
                  bgcolor: "background.default",

                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },

                  "&.Mui-focused fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />

            {/* Phone */}

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <PhoneRoundedIcon
                    sx={{
                      mr: 1.2,
                      color: "primary.main",
                      fontSize: 21,
                    }}
                  />
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.8,
                  bgcolor: "background.default",

                  "&:hover fieldset": {
                    borderColor: "primary.main",
                  },

                  "&.Mui-focused fieldset": {
                    borderWidth: 1.5,
                  },
                },
              }}
            />
          </Stack>

          {/* ===================================================
              SAVE BUTTON
          =================================================== */}

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<CheckRoundedIcon />}
            onClick={handleSave}
            sx={{
              mt: 3,

              minHeight: 52,

              borderRadius: 3,

              textTransform: "none",

              fontSize: 14,
              fontWeight: 800,

              boxShadow: "0 10px 25px rgba(255, 79, 163, 0.25)",

              background: "linear-gradient(135deg, #FF4FA3 0%, #FF77B7 100%)",

              "&:hover": {
                background: "linear-gradient(135deg, #F43D94 0%, #FF68AE 100%)",

                boxShadow: "0 12px 28px rgba(255, 79, 163, 0.32)",
              },
            }}
          >
            Save Changes
          </Button>

          {/* Cancel */}

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/profile")}
            sx={{
              mt: 1,

              minHeight: 44,

              borderRadius: 2.5,

              textTransform: "none",

              fontSize: 13,
              fontWeight: 700,

              color: "text.secondary",

              "&:hover": {
                bgcolor: "transparent",
                color: "primary.main",
              },
            }}
          >
            Cancel
          </Button>
        </Paper>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            fontSize: 9.5,
            fontWeight: 700,
            color: "text.disabled",
            letterSpacing: 0.7,
          }}
        >
          GRAB EVERYTHING. DELIVERED FAST.
        </Typography>
      </Container>
    </Box>
  );
}

export default EditProfile;
