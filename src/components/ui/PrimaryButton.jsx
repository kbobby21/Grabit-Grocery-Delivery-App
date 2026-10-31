import { Button } from "@mui/material";

function PrimaryButton({ children, ...props }) {
  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      sx={{
        height: 54,
        borderRadius: 3,
        fontWeight: 600,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
