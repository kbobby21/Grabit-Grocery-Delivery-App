import { Box, Typography } from "@mui/material";

function OnboardingCard({ title, subtitle }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Box
        sx={{
          width: 260,
          height: 260,
          bgcolor: "#F4F4F4",
          borderRadius: 5,
          mb: 5,
        }}
      />

      <Typography variant="h4" fontWeight={700}>
        {title}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 2,
          maxWidth: 320,
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default OnboardingCard;
