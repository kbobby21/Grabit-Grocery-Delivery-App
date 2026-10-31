import React, { useEffect, useState } from "react";

import { Box, Container, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

import Header from "../../components/home/Header";
import SearchBar from "../../components/home/SearchBar";
import BannerSlider from "../../components/home/BannerSlider";
import CategoryGrid from "../../components/home/CategoryGrid";
import ProductSection from "../../components/home/ProductSection";
import BottomNav from "../../components/home/BottomNav";

import useDispatch from "../../hooks/useDispatch";
import useSelector from "../../hooks/useSelector";

import { fetchProducts } from "../../redux/slices/productSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const {
    products = [],
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  const {
    categories = [],
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.category);

  // =========================================================
  // FETCH DATA
  // =========================================================

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  // =========================================================
  // GROUP PRODUCTS BY CATEGORY
  // =========================================================

  const productsByCategory = categories
    .map((category) => {
      const categoryId = String(category.id ?? category.category_id ?? "");

      const categoryName = category.name ?? category.category_name ?? "";

      const categoryProducts = products.filter((product) => {
        const productCategoryId = String(
          product.category_id ??
            product.categoryId ??
            product.category?.id ??
            "",
        );

        const productCategoryName =
          product.category_name ??
          product.categoryName ??
          product.category?.name ??
          "";

        return (
          productCategoryId === categoryId ||
          productCategoryName.toLowerCase() ===
            String(categoryName).toLowerCase()
        );
      });

      return {
        ...category,
        products: categoryProducts,
      };
    })
    .filter((category) => category.products.length > 0);

  // =========================================================
  // UI
  // =========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",

        // =====================================================
        // GRABIT PAGE BACKGROUND
        // =====================================================

        backgroundColor: "#FFF8FC",

        // Prevent any child from visually creating
        // unwanted page gaps at the bottom.
        pb: {
          xs: 11,
          sm: 12,
        },
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

          backgroundColor: "transparent",
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Header />

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <Box
          sx={{
            mt: {
              xs: 1,
              sm: 1.5,
              md: 2,
            },

            mb: {
              xs: 2.2,
              sm: 2.8,
              md: 3.5,
            },
          }}
        >
          <SearchBar value={search} onChange={handleSearch} />
        </Box>

        {/* =====================================================
            HERO BANNER
        ===================================================== */}

        <Box
          sx={{
            mb: {
              xs: 3,
              sm: 3.5,
              md: 5,
            },

            borderRadius: {
              xs: "20px",
              sm: "24px",
              md: "28px",
            },

            overflow: "hidden",

            boxShadow: "0 12px 35px rgba(255,79,163,.08)",

            border: "1px solid rgba(255,79,163,.08)",
          }}
        >
          <BannerSlider />
        </Box>

        {/* =====================================================
            CATEGORY SECTION
        ===================================================== */}

        <Box
          sx={{
            mb: {
              xs: 4,
              sm: 5,
              md: 7,
            },
          }}
        >
          {/* ===================================================
              CATEGORY HEADER
          =================================================== */}

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",

              mb: {
                xs: 1.8,
                sm: 2,
                md: 2.5,
              },

              px: {
                xs: 0.5,
                sm: 0.8,
              },
            }}
          >
            <Box>
              {/* Small label */}

              <Typography
                sx={{
                  mb: 0.6,

                  fontSize: {
                    xs: 9.5,
                    sm: 10,
                  },

                  fontWeight: 800,

                  color: "#C05A88",

                  letterSpacing: "1px",

                  textTransform: "uppercase",
                }}
              >
                Explore & Discover
              </Typography>

              {/* Title */}

              <Typography
                sx={{
                  fontSize: {
                    xs: 21,
                    sm: 25,
                    md: 29,
                  },

                  fontWeight: 900,

                  color: "#171717",

                  letterSpacing: "-0.8px",

                  lineHeight: 1.1,
                }}
              >
                Shop by{" "}
                <Box
                  component="span"
                  sx={{
                    color: "#FF4FA3",
                  }}
                >
                  Category
                </Box>
              </Typography>

              {/* Subtitle */}

              <Typography
                sx={{
                  mt: 0.5,

                  fontSize: {
                    xs: 11,
                    sm: 12,
                    md: 13,
                  },

                  color: "#858585",

                  fontWeight: 500,

                  lineHeight: 1.5,
                }}
              >
                Everything you need, all in one place.
              </Typography>
            </Box>
          </Box>

          {/* ===================================================
              CATEGORY GRID
          =================================================== */}

          <Box
            sx={{
              p: {
                xs: 1,
                sm: 1.5,
                md: 2,
              },

              borderRadius: {
                xs: "20px",
                sm: "24px",
              },

              backgroundColor: "rgba(255,255,255,0.65)",

              border: "1px solid rgba(255,79,163,.07)",

              boxShadow: "0 8px 25px rgba(40,20,30,.025)",

              backdropFilter: "blur(8px)",
            }}
          >
            <CategoryGrid categories={categories} loading={categoriesLoading} />
          </Box>

          {/* Category Error */}

          {categoriesError && (
            <Typography
              sx={{
                mt: 1.5,

                px: 1,

                color: "#DC2626",

                fontSize: 12,

                fontWeight: 600,
              }}
            >
              {categoriesError}
            </Typography>
          )}
        </Box>

        {/* =====================================================
            CATEGORY-WISE PRODUCTS
        ===================================================== */}

        <Box>
          {/* ===================================================
              LOADING
          =================================================== */}

          {productsLoading && products.length === 0 ? (
            <Box
              sx={{
                py: {
                  xs: 7,
                  md: 10,
                },

                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#777",

                  fontSize: 13,

                  fontWeight: 600,
                }}
              >
                Loading your products...
              </Typography>
            </Box>
          ) : productsError ? (
            /* =================================================
               ERROR
            ================================================= */

            <Box
              sx={{
                py: {
                  xs: 7,
                  md: 10,
                },

                px: 2,

                textAlign: "center",

                borderRadius: 4,

                backgroundColor: "rgba(255,255,255,.65)",

                border: "1px solid rgba(220,38,38,.08)",
              }}
            >
              <Typography
                sx={{
                  color: "#DC2626",

                  fontSize: 13,

                  fontWeight: 600,
                }}
              >
                {productsError}
              </Typography>
            </Box>
          ) : (
            /* =================================================
               PRODUCT SECTIONS
            ================================================= */

            <Box
              sx={{
                display: "flex",

                flexDirection: "column",

                gap: {
                  xs: 4.5,
                  sm: 5.5,
                  md: 7,
                },
              }}
            >
              {productsByCategory.map((category) => (
                <Box
                  key={category.id}
                  sx={{
                    minWidth: 0,
                  }}
                >
                  {/* ===========================================
                      CATEGORY HEADER
                  =========================================== */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems: "flex-end",

                      justifyContent: "space-between",

                      mb: {
                        xs: 1.5,
                        sm: 1.8,
                        md: 2.2,
                      },

                      px: {
                        xs: 0.5,
                        sm: 0.8,
                      },
                    }}
                  >
                    {/* CATEGORY TITLE */}

                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",

                          alignItems: "center",

                          gap: 1,
                        }}
                      >
                        {/* Pink accent */}

                        <Box
                          sx={{
                            width: {
                              xs: 4,
                              sm: 5,
                            },

                            height: {
                              xs: 22,
                              sm: 26,
                            },

                            flexShrink: 0,

                            borderRadius: 10,

                            background:
                              "linear-gradient(180deg,#FF4FA3,#FF2F91)",

                            boxShadow: "0 4px 12px rgba(255,79,163,.18)",
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 22,
                              md: 26,
                            },

                            lineHeight: 1.15,

                            fontWeight: 900,

                            color: "#171717",

                            letterSpacing: "-0.6px",

                            overflow: "hidden",

                            textOverflow: "ellipsis",

                            whiteSpace: "nowrap",
                          }}
                        >
                          {category.name}
                        </Typography>
                      </Box>

                      {/* Product count */}

                      <Typography
                        sx={{
                          mt: 0.5,

                          ml: {
                            xs: 1.25,
                            sm: 1.5,
                          },

                          fontSize: {
                            xs: 10,
                            sm: 11,
                          },

                          color: "#999",

                          fontWeight: 500,
                        }}
                      >
                        {category.products.length}{" "}
                        {category.products.length === 1
                          ? "product"
                          : "products"}{" "}
                        available
                      </Typography>
                    </Box>

                    {/* =========================================
                        SEE ALL
                    ========================================= */}

                    <Box
                      onClick={() => navigate(`/category/${category.id}`)}
                      sx={{
                        flexShrink: 0,

                        ml: 2,

                        px: {
                          xs: 1,
                          sm: 1.3,
                        },

                        py: {
                          xs: 0.6,
                          sm: 0.7,
                        },

                        borderRadius: "10px",

                        color: "#FF4FA3",

                        backgroundColor: "rgba(255,79,163,.055)",

                        border: "1px solid rgba(255,79,163,.09)",

                        fontSize: {
                          xs: 10,
                          sm: 11,
                        },

                        fontWeight: 800,

                        cursor: "pointer",

                        transition: "all .2s ease",

                        "&:hover": {
                          backgroundColor: "#FFF0F7",

                          borderColor: "rgba(255,79,163,.18)",

                          transform: "translateX(2px)",
                        },
                      }}
                    >
                      See all
                    </Box>
                  </Box>

                  {/* ===========================================
                      PRODUCT SECTION
                  =========================================== */}

                  <Box
                    sx={{
                      p: {
                        xs: 0.8,
                        sm: 1.2,
                        md: 1.5,
                      },

                      borderRadius: {
                        xs: "20px",
                        sm: "24px",
                      },

                      backgroundColor: "rgba(255,255,255,.68)",

                      border: "1px solid rgba(0,0,0,.04)",

                      boxShadow: "0 10px 30px rgba(20,20,20,.025)",

                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <ProductSection
                      products={category.products}
                      loading={productsLoading}
                    />
                  </Box>
                </Box>
              ))}

              {/* ===============================================
                  NO PRODUCTS
              =============================================== */}

              {productsByCategory.length === 0 && (
                <Box
                  sx={{
                    py: {
                      xs: 8,
                      md: 11,
                    },

                    px: 2,

                    textAlign: "center",

                    borderRadius: {
                      xs: 4,
                      md: 5,
                    },

                    backgroundColor: "rgba(255,255,255,.65)",

                    border: "1px solid rgba(255,79,163,.08)",

                    boxShadow: "0 10px 35px rgba(30,20,25,.035)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: 17,
                        sm: 19,
                      },

                      fontWeight: 850,

                      color: "#222",

                      letterSpacing: "-.3px",
                    }}
                  >
                    No products available
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.6,

                      fontSize: 12,

                      color: "#999",

                      lineHeight: 1.6,
                    }}
                  >
                    Products will appear here once they're available.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Container>

      {/* =====================================================
          BOTTOM NAVIGATION
      ===================================================== */}

      {/* <BottomNav /> */}
    </Box>
  );
}

export default Home;
