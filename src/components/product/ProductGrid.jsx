import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";
import ErrorState from "../common/ErrorState";

function ProductGrid({
  products = [],
  loading = false,
  error = null,
  onRetry,
  showWishlistActions = false,
  onRemoveWishlist,
}) {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!products.length) {
    return (
      <Box py={6} textAlign="center">
        <Typography variant="h6" fontWeight={600}>
          No products found
        </Typography>

        <Typography color="text.secondary" mt={1}>
          Try another category or search.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid
          key={product.id}
          size={{
            xs: 6,
            sm: 4,
            md: 3,
          }}
        >
          <ProductCard
            product={product}
            showWishlistActions={showWishlistActions}
            onRemoveWishlist={onRemoveWishlist}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGrid;
