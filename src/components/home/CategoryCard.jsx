import { Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();

  // ============================================================
  // IMAGE URL
  // ============================================================

  const imageUrl = category?.image
    ? category.image.startsWith("http")
      ? category.image
      : `http://localhost:5000${
          category.image.startsWith("/") ? category.image : `/${category.image}`
        }`
    : "";

  return (
    <Paper
      elevation={0}
      onClick={() => navigate(`/categories/${category.id}/products`)}
      sx={{
        width: "100%",
        aspectRatio: "1 / 1",
        minHeight: 0,

        position: "relative",
        overflow: "hidden",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: {
          xs: "16px",
          sm: "18px",
          md: "20px",
        },

        bgcolor: "background.paper",

        border: "1px solid",
        borderColor: "rgba(255, 79, 163, 0.14)",

        boxShadow: "0 4px 14px rgba(23, 23, 23, 0.05)",

        cursor: "pointer",

        transition:
          "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

        "&:hover": {
          transform: "translateY(-4px)",

          borderColor: "primary.main",

          boxShadow: "0 10px 25px rgba(255, 79, 163, 0.14)",

          "& .category-image": {
            transform: "scale(1.06)",
          },

          "& .category-name": {
            color: "primary.main",
          },
        },

        "&:active": {
          transform: "scale(0.97)",
        },
      }}
    >
      {/* ========================================================
          IMAGE
      ======================================================== */}

      <Box
        sx={{
          width: {
            xs: "62%",
            sm: "64%",
            md: "66%",
            lg: "68%",
          },

          aspectRatio: "1 / 1",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: 3,

          background: "linear-gradient(145deg, #FFF8FC 0%, #FFEAF4 100%)",

          overflow: "hidden",

          mb: {
            xs: 0.8,
            sm: 1,
          },
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            className="category-image"
            src={imageUrl}
            alt={category?.name || "Category"}
            loading="lazy"
            onError={(event) => {
              console.error("Category image failed:", imageUrl);

              event.currentTarget.style.display = "none";
            }}
            sx={{
              width: "100%",
              height: "100%",

              objectFit: "fill",

              display: "block",

              transition: "transform 0.25s ease",
            }}
          />
        ) : (
          <Box
            sx={{
              color: "primary.main",
              fontSize: 12,
              fontWeight: 700,
              textAlign: "center",
              px: 1,
            }}
          >
            No Image
          </Box>
        )}
      </Box>

      {/* ========================================================
          CATEGORY NAME
      ======================================================== */}

      <Typography
        className="category-name"
        sx={{
          width: "88%",

          textAlign: "center",

          fontSize: {
            xs: 10.5,
            sm: 12,
            md: 13,
          },

          fontWeight: 700,

          lineHeight: 1.25,

          color: "primary.main",

          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",

          overflow: "hidden",

          transition: "color 0.2s ease",
        }}
      >
        {category?.name}
      </Typography>
    </Paper>
  );
}

export default CategoryCard;
