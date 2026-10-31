import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Container, Typography, IconButton, Stack } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../../components/product/ProductCard";

import { fetchCategoryProducts } from "../../redux/slices/categorySlice";

function CategoryProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedCategoryProducts = [],
    loadingProducts,
    productError,
    categories = [],
  } = useSelector((state) => state.category);

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryProducts(id));
    }
  }, [dispatch, id]);

  const category = categories.find((item) => String(item.id) === String(id));

  const categoryName = category?.name || "Category";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #fff7fb 0%, #FAFAFC 300px)",
        pb: 8,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: {
            xs: 1.5,
            sm: 2,
            md: 3,
          },
        }}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <Box
          sx={{
            pt: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            pb: {
              xs: 2.5,
              md: 3.5,
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* BACK */}

            <IconButton
              onClick={() => navigate("/home")}
              sx={{
                width: 42,
                height: 42,
                borderRadius: "13px",

                backgroundColor: "#FFFFFF",

                border: "1px solid #EEEEEE",

                color: "#222222",

                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",

                "&:hover": {
                  backgroundColor: "#FFF0F7",
                  borderColor: "#FFC4DF",
                  color: "#FF4FA3",
                },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>

            {/* TITLE */}

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: 22,
                    sm: 26,
                    md: 30,
                  },

                  fontWeight: 800,

                  color: "#171717",

                  lineHeight: 1.2,

                  letterSpacing: "-0.5px",
                }}
              >
                {categoryName}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: {
                    xs: 12,
                    sm: 13,
                  },

                  color: "#777777",
                }}
              >
                {selectedCategoryProducts.length}{" "}
                {selectedCategoryProducts.length === 1 ? "product" : "products"}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {productError && (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "#DC2626",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {productError}
            </Typography>
          </Box>
        )}

        {/* ================================================= */}
        {/* LOADING */}
        {/* ================================================= */}

        {loadingProducts && (
          <Box
            sx={{
              display: "grid",

              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
                lg: "repeat(5, minmax(0, 1fr))",
                xl: "repeat(6, minmax(0, 1fr))",
              },

              gap: {
                xs: 1.2,
                sm: 1.5,
                md: 2,
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  height: 335,
                  borderRadius: "18px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #F0F0F0",
                  animation: "categorySkeleton 1.5s ease-in-out infinite",

                  "@keyframes categorySkeleton": {
                    "0%": {
                      opacity: 0.45,
                    },
                    "50%": {
                      opacity: 1,
                    },
                    "100%": {
                      opacity: 0.45,
                    },
                  },
                }}
              />
            ))}
          </Box>
        )}

        {/* ================================================= */}
        {/* PRODUCT GRID */}
        {/* ================================================= */}

        {!loadingProducts &&
          !productError &&
          selectedCategoryProducts.length > 0 && (
            <Box
              sx={{
                display: "grid",

                /*
                 * SAME ProductCard as ProductSection
                 * ONLY the layout is different.
                 */

                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  md: "repeat(4, minmax(0, 1fr))",
                  lg: "repeat(5, minmax(0, 1fr))",
                  xl: "repeat(6, minmax(0, 1fr))",
                },

                gap: {
                  xs: 1.2,
                  sm: 1.5,
                  md: 2,
                  lg: 2.2,
                },

                alignItems: "start",

                "& > *": {
                  minWidth: 0,
                },
              }}
            >
              {selectedCategoryProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    width: "100%",
                    minWidth: 0,

                    /*
                     * ProductCard itself has margin: 3px
                     * so give it enough room.
                     */

                    "& .MuiCard-root": {
                      width: "100%",
                      height: {
                        xs: 365,
                        sm: 380,
                        md: 390,
                        lg: 395,
                      },
                    },
                  }}
                >
                  <ProductCard product={product} />
                </Box>
              ))}
            </Box>
          )}

        {/* ================================================= */}
        {/* EMPTY */}
        {/* ================================================= */}

        {!loadingProducts &&
          !productError &&
          selectedCategoryProducts.length === 0 && (
            <Box
              sx={{
                py: 10,
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#222222",
                }}
              >
                No products available
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  fontSize: 13,
                  color: "#888888",
                }}
              >
                There are currently no products in this category.
              </Typography>
            </Box>
          )}
      </Container>
    </Box>
  );
}

export default CategoryProducts;
