import { Button } from "@mui/material";

function ProductQuantity({ onAdd }) {
  return (
    <Button
      variant="contained"
      size="small"
      onClick={onAdd}
      sx={{
        borderRadius: 3,
        px: 3,
      }}
    >
      ADD
    </Button>
  );
}

export default ProductQuantity;
