import { Chip } from "@mui/material";

function DiscountBadge({ discount }) {
  return (
    <Chip
      label={`${discount}% OFF`}
      color="error"
      size="small"
      sx={{
        fontWeight: 700,
      }}
    />
  );
}

export default DiscountBadge;
