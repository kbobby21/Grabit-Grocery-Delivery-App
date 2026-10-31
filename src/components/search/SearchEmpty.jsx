import { Box, Button, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

function SearchEmpty({ query, onClear }) {
  return (
    <Box
      sx={{
        py: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <SearchOffIcon
        sx={{
          fontSize: 80,
          color: "text.secondary",
          mb: 2,
        }}
      />

      <Typography variant="h5" fontWeight={700}>
        No products found
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          mb: 3,
          maxWidth: 400,
        }}
      >
        We couldn't find any products matching <strong>"{query}"</strong>.
      </Typography>

      <Button variant="contained" onClick={onClear}>
        Clear Search
      </Button>
    </Box>
  );
}

export default SearchEmpty;
