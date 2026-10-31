import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";

import { hideSnackbar } from "../../redux/slices/uiSlice";

function AppSnackbar() {
  const dispatch = useDispatch();

  const { open, message, severity, duration } = useSelector(
    (state) => state.ui.snackbar,
  );

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;

    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        elevation={6}
        sx={{
          width: "100%",
          borderRadius: 2,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;
