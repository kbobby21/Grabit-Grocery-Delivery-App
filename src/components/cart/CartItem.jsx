import { Box, Card, Typography, IconButton, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/slices/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 3,
      }}
    >
      <Box display="flex" gap={2}>
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
          }}
        />

        <Box flex={1}>
          <Typography fontWeight={700}>{item.name}</Typography>

          <Typography color="text.secondary">{item.weight}</Typography>

          <Typography mt={1}>₹{item.price}</Typography>

          <Box display="flex" alignItems="center" gap={1} mt={2}>
            <IconButton onClick={() => dispatch(decreaseQuantity(item.id))}>
              −
            </IconButton>

            <Typography>{item.quantity}</Typography>

            <IconButton onClick={() => dispatch(increaseQuantity(item.id))}>
              +
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default CartItem;
