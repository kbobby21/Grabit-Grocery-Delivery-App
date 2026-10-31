import { Box, Typography, Stack, Chip } from "@mui/material";

const trending = [
  "Milk",
  "Rice",
  "Apple",
  "Banana",
  "Tomato",
  "Bread",
  "Butter",
  "Eggs",
];

function TrendingSearches({ onSearch }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        🔥 Trending Searches
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {trending.map((item) => (
          <Chip
            key={item}
            label={item}
            clickable
            color="primary"
            variant="outlined"
            onClick={() => onSearch(item)}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default TrendingSearches;
