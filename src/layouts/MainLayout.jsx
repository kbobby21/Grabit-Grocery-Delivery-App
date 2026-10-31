import { Box } from "@mui/material";
import AppSnackbar from "../components/common/AppSnackbar";
function MainLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {children}
      <AppSnackbar />
    </Box>
  );
}

export default MainLayout;
