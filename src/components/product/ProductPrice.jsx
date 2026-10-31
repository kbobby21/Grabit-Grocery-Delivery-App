import { Box, Typography } from "@mui/material";

function ProductPrice({ price, originalPrice }) {
  return (
    <Box display="flex" alignItems="center" gap={1} mt={1}>
      <Typography fontWeight={700} color="primary.main">
        ₹{price}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          textDecoration: "line-through",
          color: "text.secondary",
        }}
      >
        ₹{originalPrice}
      </Typography>
    </Box>
  );
}

export default ProductPrice;
