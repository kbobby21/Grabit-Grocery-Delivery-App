import { Box, Typography, Button } from "@mui/material";

function SectionHeader({ title, actionText = "See All", onAction }) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>

      <Button size="small" color="primary" onClick={onAction}>
        {actionText}
      </Button>
    </Box>
  );
}

export default SectionHeader;
