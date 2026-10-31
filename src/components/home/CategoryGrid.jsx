import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import CategoryCard from "./CategoryCard";

function CategoryGrid({ categories = [] }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        spacing={{
          xs: 1.2,
          sm: 1.5,
          md: 2,
        }}
      >
        {categories.map((category) => (
          <Grid
            key={category.id}
            size={{
              xs: 4,
              sm: 3,
              md: 2,
            }}
          >
            <CategoryCard category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryGrid;
