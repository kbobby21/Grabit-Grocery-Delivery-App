import { Box, CircularProgress } from "@mui/material";

function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Loader;
