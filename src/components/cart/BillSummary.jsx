import { Paper, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";

function BillSummary() {
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal + delivery;

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>
        Bill Details
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography>Subtotal</Typography>
        <Typography>₹{subtotal}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <Typography>Delivery</Typography>
        <Typography>₹{delivery}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography fontWeight={700}>Total</Typography>

        <Typography fontWeight={700}>₹{total}</Typography>
      </Box>
    </Paper>
  );
}

export default BillSummary;
