import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PATHS from "../../routes/paths";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(PATHS.ONBOARDING);
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FF4FA3 0%, #FF82C3 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: "32px",
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 52,
          fontWeight: 700,
          color: "#FF4FA3",
          mb: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,.15)",
        }}
      >
        G
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
        }}
      >
        Grabit
      </Typography>

      <Typography
        sx={{
          mt: 1,
          opacity: 0.9,
          fontSize: 18,
        }}
      >
        Grab Everything. Delivered Fast.
      </Typography>

      <CircularProgress
        sx={{
          color: "#fff",
          mt: 8,
        }}
      />
    </Box>
  );
}

export default Splash;
