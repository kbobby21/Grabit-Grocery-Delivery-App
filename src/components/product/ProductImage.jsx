import { Box } from "@mui/material";

function ProductImage({ image, name }) {
  return (
    <Box
      sx={{
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#F8F8F8",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <span style={{ fontSize: 60 }}>🛒</span>
      )}
    </Box>
  );
}

export default ProductImage;
