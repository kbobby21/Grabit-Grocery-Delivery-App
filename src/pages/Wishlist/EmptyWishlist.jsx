import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 10,
        textAlign: "center",
      }}
    >
      <FavoriteBorderIcon
        sx={{
          fontSize: 90,
          color: "text.disabled",
        }}
      />

      <Typography variant="h5" fontWeight={700} mt={2}>
        Wishlist is Empty
      </Typography>

      <Typography color="text.secondary" mt={1}>
        Save products you love.
      </Typography>

      <Button sx={{ mt: 3 }} variant="contained" onClick={() => navigate("/")}>
        Continue Shopping
      </Button>
    </Box>
  );
}

export default EmptyWishlist;
