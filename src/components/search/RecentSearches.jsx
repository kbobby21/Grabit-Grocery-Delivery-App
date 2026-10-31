import { Box, Typography, Chip, Stack, Button } from "@mui/material";

function RecentSearches({ searches = [], onSearch, onClear }) {
  if (!searches.length) return null;

  return (
    <Box mt={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Recent Searches
        </Typography>

        <Button size="small" color="error" onClick={onClear}>
          Clear
        </Button>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {searches.map((item) => (
          <Chip
            key={item}
            label={item}
            color="primary"
            variant="outlined"
            clickable
            onClick={() => onSearch(item)}
          />
        ))}
      </Stack>
    </Box>
  );
}
export default RecentSearches;
