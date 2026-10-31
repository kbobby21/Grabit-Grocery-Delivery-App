import { Chip } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

function RatingBadge({ rating }) {
  return (
    <Chip
      size="small"
      color="success"
      icon={<StarIcon />}
      label={rating}
      sx={{
        fontWeight: 600,
      }}
    />
  );
}

export default RatingBadge;
