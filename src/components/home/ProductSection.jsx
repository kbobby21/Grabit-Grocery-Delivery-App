import { Box, Typography } from "@mui/material";

import ProductCard from "../product/ProductCard";

function ProductSection({ products = [], title }) {
  if (!products.length) return null;

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Optional standalone title */}
      {title && (
        <Typography
          sx={{
            mb: 2,
            fontSize: {
              xs: 18,
              sm: 21,
              md: 24,
            },
            fontWeight: 800,
            color: "#171717",
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </Typography>
      )}

      {/* Product horizontal row */}
      <Box
        sx={{
          display: "flex",
          gap: {
            xs: 1.2,
            sm: 1.5,
            md: 2,
          },

          overflowX: "auto",
          overflowY: "hidden",

          pb: 1,

          scrollBehavior: "smooth",

          // Hide scrollbar
          scrollbarWidth: "none",

          "&::-webkit-scrollbar": {
            display: "none",
          },

          // Prevent cards from shrinking
          "& > *": {
            flexShrink: 0,
          },
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              width: {
                xs: "165px",
                sm: "190px",
                md: "210px",
                lg: "220px",
              },
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProductSection;
