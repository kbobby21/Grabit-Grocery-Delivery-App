import { useState } from "react";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Alert,
} from "@mui/material";

import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PrimaryButton from "../../components/ui/PrimaryButton";
import Logo from "../../components/common/Logo";
import PATHS from "../../routes/paths";
import useAuth from "../../hooks/useAuth";
import { showSnackbar } from "../../redux/slices/uiSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { login, loading } = useAuth();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // PHONE INPUT
  // =========================================================

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);

    setPhone(value);

    if (error) {
      setError("");
    }
  };

  // =========================================================
  // SEND OTP
  // =========================================================

  const handleContinue = async () => {
    if (!phone) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!/^\d+$/.test(phone)) {
      setError("Mobile number can contain digits only.");
      return;
    }

    if (phone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid Indian mobile number.");
      return;
    }

    setError("");

    try {
      await login(phone);

      dispatch(
        showSnackbar({
          message: "OTP sent successfully.",
          severity: "success",
          duration: 3000,
        }),
      );

      navigate(PATHS.OTP, {
        state: { phone },
      });
    } catch (error) {
      console.error(error);

      setError(
        error?.message ||
          "Unable to send OTP. Please check your mobile number and try again.",
      );
    }
  };

  // =========================================================
  // ENTER KEY
  // =========================================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        py: {
          xs: 3,
          sm: 5,
        },

        background:
          "radial-gradient(circle at 10% 10%, rgba(255,79,163,.14), transparent 30%), radial-gradient(circle at 90% 90%, rgba(255,79,163,.10), transparent 28%), linear-gradient(180deg,#FFF7FB 0%,#FAFAFC 55%,#FFFFFF 100%)",
      }}
    >
      {/* Background decoration */}

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,79,163,.07)",
          top: -150,
          right: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(255,79,163,.06)",
          bottom: -120,
          left: -100,
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 470,
            mx: "auto",

            p: {
              xs: 2.5,
              sm: 4.5,
            },

            borderRadius: {
              xs: 4,
              sm: 5,
            },

            background: "rgba(255,255,255,.96)",

            border: "1px solid rgba(255,79,163,.12)",

            boxShadow:
              "0 25px 80px rgba(35,20,30,.09), 0 5px 20px rgba(255,79,163,.06)",

            backdropFilter: "blur(15px)",
          }}
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Box
            sx={{
              textAlign: "center",
              mb: 4,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 1,
                borderRadius: 3,
                background:
                  "linear-gradient(135deg,rgba(255,79,163,.10),rgba(255,79,163,.04))",
              }}
            >
              <Logo />
            </Box>

            <Typography
              sx={{
                mt: 1.2,
                fontSize: 12,
                color: "#888",
                fontWeight: 500,
              }}
            >
              Grab Everything. Delivered Fast.
            </Typography>
          </Box>

          {/* =================================================
              HEADING
          ================================================= */}

          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: 27,
                  sm: 31,
                },

                fontWeight: 900,

                color: "#171717",

                letterSpacing: "-1px",

                lineHeight: 1.15,
              }}
            >
              Welcome to{" "}
              <Box
                component="span"
                sx={{
                  color: "#FF4FA3",
                }}
              >
                Grabit
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 1,

                fontSize: {
                  xs: 13,
                  sm: 13.5,
                },

                color: "#777",

                lineHeight: 1.65,

                maxWidth: 350,

                mx: "auto",
              }}
            >
              Enter your mobile number to continue your grocery journey.
            </Typography>
          </Box>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2,

                borderRadius: 2.5,

                fontSize: 12,

                border: "1px solid #FFD0D0",

                backgroundColor: "#FFF7F7",

                "& .MuiAlert-icon": {
                  fontSize: 20,
                },
              }}
            >
              {error}
            </Alert>
          )}

          {/* =================================================
              PHONE
          ================================================= */}

          <TextField
            fullWidth
            label="Mobile Number"
            placeholder="9876543210"
            value={phone}
            onChange={handlePhoneChange}
            onKeyDown={handleKeyDown}
            error={Boolean(error)}
            inputProps={{
              maxLength: 10,
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                    }}
                  >
                    <PhoneRoundedIcon
                      sx={{
                        fontSize: 20,
                        color: error ? "#EF4444" : "#FF4FA3",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#555",
                      }}
                    >
                      +91
                    </Typography>
                  </Box>
                </InputAdornment>
              ),
            }}
            helperText={
              error ? "" : "We'll send a secure OTP to verify your number."
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                minHeight: 60,

                borderRadius: 3,

                backgroundColor: "#FCFCFD",

                "& fieldset": {
                  borderColor: error ? "#EF4444" : "#E5E5E5",
                },

                "&:hover fieldset": {
                  borderColor: error ? "#EF4444" : "#FF9FC5",
                },

                "&.Mui-focused": {
                  backgroundColor: "#FFFFFF",
                },

                "&.Mui-focused fieldset": {
                  borderColor: error ? "#EF4444" : "#FF4FA3",

                  borderWidth: "1.5px",

                  boxShadow: error
                    ? "0 0 0 3px rgba(239,68,68,.08)"
                    : "0 0 0 3px rgba(255,79,163,.08)",
                },
              },

              "& .MuiInputLabel-root.Mui-focused": {
                color: error ? "#EF4444" : "#FF4FA3",
              },

              "& .MuiFormHelperText-root": {
                ml: 0.5,
                mt: 0.8,
                fontSize: 10.5,
                color: "#999",
              },
            }}
          />

          {/* =================================================
              CONTINUE
          ================================================= */}

          <PrimaryButton
            loading={loading}
            onClick={handleContinue}
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              mt: 2.5,

              width: "100%",

              minHeight: 54,

              borderRadius: 3,

              fontSize: 14,

              fontWeight: 850,

              background: "linear-gradient(135deg,#FF4FA3 0%,#FF2F91 100%)",

              boxShadow: "0 10px 25px rgba(255,79,163,.24)",

              "&:hover": {
                background: "linear-gradient(135deg,#FF3D99 0%,#FF2187 100%)",

                boxShadow: "0 14px 30px rgba(255,79,163,.30)",
              },
            }}
          >
            Continue
          </PrimaryButton>

          {/* =================================================
              TERMS
          ================================================= */}

          <Typography
            sx={{
              mt: 3,

              textAlign: "center",

              fontSize: 10.5,

              lineHeight: 1.6,

              color: "#999",
            }}
          >
            By continuing, you agree to Grabit's Terms & Conditions and Privacy
            Policy.
          </Typography>

          {/* =================================================
              SECURITY
          ================================================= */}

          <Box
            sx={{
              mt: 2.5,

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              gap: 0.7,
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#22A447",
                boxShadow: "0 0 0 4px rgba(34,164,71,.10)",
              }}
            />

            <Typography
              sx={{
                fontSize: 10.5,
                color: "#888",
                fontWeight: 500,
              }}
            >
              Secure OTP authentication
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
