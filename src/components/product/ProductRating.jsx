import { Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function ProductRating({ rating }) {
  return (
    <Chip size="small" icon={<StarIcon />} label={rating} color="success" />
  );
}

export default ProductRating;
