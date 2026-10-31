import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { adminLogin } from "../../redux/slices/adminAuthSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!identifier.trim()) {
      setError("Email or phone is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      setLoading(true);

      await dispatch(
        adminLogin({
          identifier: identifier.trim(),
          password,
        }),
      ).unwrap();

      navigate("/admin/orders");
    } catch (err) {
      setError(err || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #FFF0F7 0%, #FAFAFA 50%, #FFFFFF 100%)",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 430,
          p: {
            xs: 3,
            sm: 5,
          },
          borderRadius: 4,
          border: "1px solid #E5E7EB",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FF4FA3",
              color: "#FFFFFF",
              mb: 2,
            }}
          >
            <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 36 }} />
          </Box>

          <Typography variant="h4" fontWeight={800} sx={{ color: "#111111" }}>
            Grabit
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#6B7280",
              mt: 0.5,
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email or Phone"
            placeholder="Enter email or phone"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            sx={{ mb: 2 }}
            autoComplete="username"
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              height: 52,
              borderRadius: 2.5,
              backgroundColor: "#FF4FA3",
              fontWeight: 700,
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#E6328B",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
            ) : (
              "Login to Admin Panel"
            )}
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: "#9CA3AF",
          }}
        >
          Grabit • Admin Access
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
