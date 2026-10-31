import { Box, Typography } from "@mui/material";

function BannerSlider() {
  return (
    <Box
      sx={{
        mt: 3,
        height: 170,
        borderRadius: 4,
        background: "linear-gradient(135deg,#FF4FA3,#FF82C3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        50% OFF
      </Typography>
    </Box>
  );
}

export default BannerSlider;
