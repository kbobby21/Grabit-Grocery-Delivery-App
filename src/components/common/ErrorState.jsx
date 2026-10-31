import { Box, Button, Typography } from "@mui/material";

function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={1}>
        Something went wrong
      </Typography>

      <Typography color="text.secondary" mb={2}>
        {message}
      </Typography>

      {onRetry && (
        <Button variant="contained" onClick={onRetry} sx={{ borderRadius: 2 }}>
          Try Again
        </Button>
      )}
    </Box>
  );
}

export default ErrorState;
