import { useEffect, useRef, useState } from "react";

import {
  Box,
  Container,
  Paper,
  Typography,
  Stack,
  Alert,
  Divider,
} from "@mui/material";

import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import PrimaryButton from "../../components/ui/PrimaryButton";
import Logo from "../../components/common/Logo";
import PATHS from "../../routes/paths";
import useAuth from "../../hooks/useAuth";
import { showSnackbar } from "../../redux/slices/uiSlice";

function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const phone = location.state?.phone;

  const { verifyOtp, login, loading } = useAuth();

  // =========================================================
  // OTP
  // =========================================================

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef([]);

  // =========================================================
  // ERROR
  // =========================================================

  const [error, setError] = useState("");

  // =========================================================
  // RESEND OTP
  // =========================================================

  const [resendTimer, setResendTimer] = useState(30);
  const [resending, setResending] = useState(false);

  // =========================================================
  // AUTO FOCUS
  // =========================================================

  useEffect(() => {
    if (phone) {
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [phone]);

  // =========================================================
  // RESEND TIMER
  // =========================================================

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // =========================================================
  // OTP INPUT
  // =========================================================

  const handleOtpChange = (index, value) => {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      const updatedOtp = [...otp];

      updatedOtp[index] = "";

      setOtp(updatedOtp);

      return;
    }

    // Handle paste
    if (digits.length > 1) {
      const pastedDigits = digits.slice(0, 6).split("");

      const updatedOtp = [...otp];

      pastedDigits.forEach((digit, i) => {
        if (index + i < 6) {
          updatedOtp[index + i] = digit;
        }
      });

      setOtp(updatedOtp);
      setError("");

      const nextIndex = Math.min(index + pastedDigits.length, 5);

      setTimeout(() => {
        inputRefs.current[nextIndex]?.focus();
      }, 0);

      return;
    }

    const updatedOtp = [...otp];

    updatedOtp[index] = digits;

    setOtp(updatedOtp);

    setError("");

    // Move to next box
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // =========================================================
  // KEYBOARD
  // =========================================================

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];

        updatedOtp[index] = "";

        setOtp(updatedOtp);

        return;
      }

      if (index > 0) {
        const updatedOtp = [...otp];

        updatedOtp[index - 1] = "";

        setOtp(updatedOtp);

        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (event.key === "Enter") {
      handleVerify();
    }
  };

  // =========================================================
  // VERIFY OTP
  // =========================================================

  const handleVerify = async () => {
    if (!phone) {
      setError("Mobile number is missing. Please login again.");

      return;
    }

    const otpValue = otp.join("");

    if (!otpValue) {
      setError("Please enter the OTP.");

      inputRefs.current[0]?.focus();

      return;
    }

    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");

      const emptyIndex = otp.findIndex((value) => !value);

      if (emptyIndex !== -1) {
        inputRefs.current[emptyIndex]?.focus();
      }

      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      setError("OTP can contain digits only.");

      return;
    }

    setError("");

    try {
      await verifyOtp(phone, otpValue);

      // =====================================================
      // SUCCESS SNACKBAR
      // =====================================================

      dispatch(
        showSnackbar({
          message: "Login successful! Welcome to Grabit.",
          severity: "success",
          duration: 3000,
        }),
      );

      // =====================================================
      // GO HOME
      // =====================================================

      navigate(PATHS.HOME, {
        replace: true,
      });
    } catch (error) {
      console.error(error);

      setError(
        error?.message || "Invalid OTP. Please check the OTP and try again.",
      );
    }
  };

  // =========================================================
  // RESEND OTP
  // =========================================================

  const handleResendOtp = async () => {
    if (!phone || resendTimer > 0 || resending) {
      return;
    }

    try {
      setResending(true);
      setError("");

      await login(phone);

      setOtp(["", "", "", "", "", ""]);

      setResendTimer(30);

      dispatch(
        showSnackbar({
          message: "A new OTP has been sent.",
          severity: "success",
          duration: 3000,
        }),
      );

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error(error);

      setError(error?.message || "Unable to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // =========================================================
  // PHONE
  // =========================================================

  const maskedPhone = phone
    ? `+91 ${phone.slice(0, 2)}******${phone.slice(-2)}`
    : "";

  // =========================================================
  // UI
  // =========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

        position: "relative",

        overflow: "hidden",

        background:
          "radial-gradient(circle at 10% 10%, rgba(255,79,163,.14), transparent 30%), radial-gradient(circle at 90% 90%, rgba(255,79,163,.10), transparent 28%), linear-gradient(180deg,#FFF7FB 0%,#FAFAFC 55%,#FFFFFF 100%)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        py: {
          xs: 3,
          sm: 5,
        },
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <Box
        sx={{
          position: "absolute",

          width: 280,

          height: 280,

          borderRadius: "50%",

          background: "rgba(255,79,163,.08)",

          top: -130,

          right: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",

          width: 220,

          height: 220,

          borderRadius: "50%",

          background: "rgba(255,79,163,.06)",

          bottom: -100,

          left: -80,
        }}
      />

      {/* =====================================================
          CARD
      ===================================================== */}

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

              mb: 3.5,

              px: 1,
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

                mb: 1,
              }}
            >
              Verify Your{" "}
              <Box
                component="span"
                sx={{
                  color: "#FF4FA3",

                  position: "relative",

                  display: "inline-block",
                }}
              >
                Mobile
              </Box>
            </Typography>

            <Typography
              sx={{
                maxWidth: 340,

                mx: "auto",

                fontSize: {
                  xs: 13,
                  sm: 13.5,
                },

                fontWeight: 500,

                color: "#777",

                lineHeight: 1.65,
              }}
            >
              We've sent a secure 6-digit verification code to your mobile.
            </Typography>
          </Box>

          {/* =================================================
              PHONE
          ================================================= */}

          {phone && (
            <Box
              sx={{
                mb: 2.5,

                p: 1.5,

                borderRadius: 3,

                background: "#FFF8FB",

                border: "1px solid #F5DCE8",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <PhoneRoundedIcon
                  sx={{
                    fontSize: 18,

                    color: "#FF4FA3",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,

                    fontWeight: 750,

                    color: "#444",
                  }}
                >
                  {maskedPhone}
                </Typography>
              </Stack>
            </Box>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 2.2,

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
              OTP BOXES
          ================================================= */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "center",

              gap: {
                xs: 0.8,
                sm: 1.2,
              },

              mb: 1,
            }}
          >
            {otp.map((digit, index) => (
              <Box
                key={index}
                component="input"
                ref={(element) => {
                  inputRefs.current[index] = element;
                }}
                value={digit}
                maxLength={1}
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={(e) => e.target.select()}
                aria-label={`OTP digit ${index + 1}`}
                sx={{
                  width: {
                    xs: 43,
                    sm: 54,
                  },

                  height: {
                    xs: 54,
                    sm: 62,
                  },

                  borderRadius: {
                    xs: 2.5,
                    sm: 3,
                  },

                  border: "1px solid",

                  borderColor: error
                    ? "#EF4444"
                    : digit
                      ? "#FF4FA3"
                      : "#E5E5E5",

                  outline: "none",

                  backgroundColor: digit ? "#FFF7FB" : "#FCFCFD",

                  textAlign: "center",

                  fontSize: {
                    xs: 20,
                    sm: 24,
                  },

                  fontWeight: 850,

                  color: "#171717",

                  transition: "all .2s ease",

                  boxShadow: digit ? "0 5px 15px rgba(255,79,163,.10)" : "none",

                  "&:focus": {
                    borderColor: error ? "#EF4444" : "#FF4FA3",

                    backgroundColor: "#FFFFFF",

                    boxShadow: error
                      ? "0 0 0 4px rgba(239,68,68,.08)"
                      : "0 0 0 4px rgba(255,79,163,.10)",
                  },

                  "&:hover": {
                    borderColor: error ? "#EF4444" : "#FF9FC5",
                  },
                }}
              />
            ))}
          </Box>

          <Typography
            sx={{
              textAlign: "center",

              fontSize: 10.5,

              color: "#999",

              mt: 1,
            }}
          >
            Enter the 6-digit verification code
          </Typography>

          {/* =================================================
              VERIFY
          ================================================= */}

          <PrimaryButton
            loading={loading}
            onClick={handleVerify}
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
            Verify OTP
          </PrimaryButton>

          {/* =================================================
              RESEND + CHANGE NUMBER
          ================================================= */}

          <Box
            sx={{
              mt: 2.5,

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              gap: 1.5,

              flexWrap: "wrap",
            }}
          >
            {/* RESEND */}

            <Box
              component="button"
              disabled={resendTimer > 0 || resending}
              onClick={handleResendOtp}
              sx={{
                display: "inline-flex",

                alignItems: "center",

                gap: 0.5,

                border: 0,

                background: "transparent",

                cursor: resendTimer > 0 || resending ? "default" : "pointer",

                fontSize: 12,

                fontWeight: 750,

                color: resendTimer > 0 || resending ? "#BDBDBD" : "#FF4FA3",

                p: 0,

                "&:hover": {
                  textDecoration:
                    resendTimer > 0 || resending ? "none" : "underline",
                },
              }}
            >
              <RefreshRoundedIcon
                sx={{
                  fontSize: 16,

                  animation: resending ? "spin 1s linear infinite" : "none",

                  "@keyframes spin": {
                    from: {
                      transform: "rotate(0deg)",
                    },

                    to: {
                      transform: "rotate(360deg)",
                    },
                  },
                }}
              />

              {resending
                ? "Sending..."
                : resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
            </Box>

            <Typography
              sx={{
                color: "#D7D7D7",

                fontSize: 12,
              }}
            >
              |
            </Typography>

            {/* CHANGE NUMBER */}

            <Box
              component="button"
              onClick={() => navigate(PATHS.LOGIN)}
              sx={{
                border: 0,

                background: "transparent",

                cursor: "pointer",

                fontSize: 12,

                fontWeight: 750,

                color: "#FF4FA3",

                p: 0,

                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Change mobile number
            </Box>
          </Box>

          {/* =================================================
              SECURITY
          ================================================= */}

          <Stack
            direction="row"
            spacing={0.8}
            justifyContent="center"
            alignItems="center"
            sx={{
              mt: 3,

              color: "#8A8A8A",
            }}
          >
            <VerifiedUserRoundedIcon
              sx={{
                fontSize: 16,

                color: "#22A447",
              }}
            />

            <Typography
              sx={{
                fontSize: 10.5,
              }}
            >
              Your verification is secure and protected
            </Typography>
          </Stack>

          <Divider
            sx={{
              mt: 2.5,

              mb: 2,

              borderColor: "#F0E6EB",
            }}
          />

          <Typography
            sx={{
              textAlign: "center",

              fontSize: 10.5,

              lineHeight: 1.6,

              color: "#999",
            }}
          >
            Never share your OTP with anyone. Grabit will never ask you for your
            OTP.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Otp;
