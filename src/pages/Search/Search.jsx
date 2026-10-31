import { useEffect, useState } from "react";

import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Typography,
  IconButton,
  Chip,
  Stack,
  Paper,
  Fade,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import ProductGrid from "../../components/product/ProductGrid";

import { searchProducts, clearSearch } from "../../redux/slices/searchSlice";

import RecentSearches from "../../components/search/RecentSearches";
import TrendingSearches from "../../components/search/TrendingSearches";
import SearchEmpty from "../../components/search/SearchEmpty";

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  const { products, loading, error } = useSelector((state) => state.search);

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const data = localStorage.getItem("recent-searches");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recent-searches");
  };

  const saveSearch = (text) => {
    if (!text.trim()) return;

    const cleanText = text.trim();

    let updated = [
      cleanText,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== cleanText.toLowerCase(),
      ),
    ];

    updated = updated.slice(0, 10);

    setRecentSearches(updated);

    localStorage.setItem("recent-searches", JSON.stringify(updated));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchProducts(query));
        saveSearch(query);
      } else {
        dispatch(clearSearch());
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const urlQuery = searchParams.get("q") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  // Clear current search
  const handleClearSearch = () => {
    setQuery("");
    dispatch(clearSearch());
  };

  // Back to home
  const handleBack = () => {
    dispatch(clearSearch());
    navigate("/home");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 70px)",
        background: "linear-gradient(180deg, #fff7fb 0%, #ffffff 320px)",
        pb: 8,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: {
            xs: 2,
            sm: 3,
            md: 4,
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
              xs: 2,
              md: 3,
            },
          }}
        >
          {/* Back + Title */}

          <Stack direction="row" alignItems="center" spacing={1.2} mb={0.5}>
            <IconButton
              onClick={handleBack}
              sx={{
                width: 42,
                height: 42,
                borderRadius: "13px",
                backgroundColor: "#fff",
                border: "1px solid #eeeeee",
                color: "#222",

                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",

                "&:hover": {
                  backgroundColor: "#fff0f7",
                  color: "#FF4FA3",
                  borderColor: "#ffc4df",
                },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>

            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 26,
                },
                fontWeight: 800,
                color: "#171717",
                letterSpacing: "-0.5px",
              }}
            >
              Search
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: "#777",
              fontSize: 14,
              ml: {
                xs: 0,
                sm: 0.5,
              },
              mt: 0.8,
              mb: 2.5,
            }}
          >
            Find your groceries in seconds
          </Typography>

          {/* ================================================= */}
          {/* SEARCH BAR */}
          {/* ================================================= */}

          <TextField
            fullWidth
            autoFocus
            placeholder="Search for groceries, fruits, snacks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: {
                  xs: 54,
                  sm: 60,
                },
                borderRadius: "18px",
                backgroundColor: "#fff",
                boxShadow: "0 5px 22px rgba(255, 79, 163, 0.08)",

                "& fieldset": {
                  borderColor: "#eeeeee",
                },

                "&:hover fieldset": {
                  borderColor: "#ffc4df",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#FF4FA3",
                  borderWidth: 1.5,
                },
              },

              "& input": {
                fontSize: {
                  xs: 14,
                  sm: 15,
                },
                fontWeight: 500,
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        color: "#FF4FA3",
                        fontSize: 25,
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: query.trim() ? (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                      sx={{
                        width: 32,
                        height: 32,
                        minWidth: 32,
                        minHeight: 32,
                        padding: 0,
                        borderRadius: "50%",
                        backgroundColor: "#FF4FA3",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        "&:hover": {
                          backgroundColor: "#E83D91",
                        },

                        "& svg": {
                          color: "#fff",
                          fontSize: 19,
                        },
                      }}
                    >
                      <CloseRoundedIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
          />
        </Box>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        {!query.trim() ? (
          <Fade in>
            <Box>
              {/* RECENT SEARCHES */}

              {recentSearches.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: "20px",
                    border: "1px solid #f0f0f0",
                    backgroundColor: "#fff",
                    p: {
                      xs: 2,
                      sm: 2.5,
                    },
                    mb: 2.5,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={2}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <HistoryRoundedIcon
                        sx={{
                          fontSize: 20,
                          color: "#FF4FA3",
                        }}
                      />

                      <Typography
                        sx={{
                          fontWeight: 750,
                          fontSize: 16,
                        }}
                      >
                        Recent searches
                      </Typography>
                    </Stack>

                    <Typography
                      onClick={clearHistory}
                      sx={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#FF4FA3",
                        cursor: "pointer",

                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      Clear all
                    </Typography>
                  </Stack>

                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {recentSearches.map((item, index) => (
                      <Chip
                        key={`${item}-${index}`}
                        icon={
                          <HistoryRoundedIcon
                            sx={{
                              fontSize: "17px !important",
                            }}
                          />
                        }
                        label={item}
                        onClick={() => setQuery(item)}
                        sx={{
                          height: 38,
                          borderRadius: "12px",
                          backgroundColor: "#fafafa",
                          border: "1px solid #eeeeee",
                          fontWeight: 500,

                          "& .MuiChip-icon": {
                            color: "#999",
                          },

                          "&:hover": {
                            backgroundColor: "#fff0f7",
                            borderColor: "#ffc4df",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              )}

              {/* TRENDING */}

              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  border: "1px solid #f0f0f0",
                  backgroundColor: "#fff",
                  p: {
                    xs: 2,
                    sm: 2.5,
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <TrendingUpRoundedIcon
                    sx={{
                      fontSize: 21,
                      color: "#FF4FA3",
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 750,
                      fontSize: 16,
                    }}
                  >
                    Trending searches
                  </Typography>
                </Stack>

                <TrendingSearches onSearch={setQuery} />
              </Paper>

              {/* EMPTY STATE */}

              {recentSearches.length === 0 && (
                <Box
                  sx={{
                    mt: 5,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "linear-gradient(135deg, #fff0f7, #ffe4f1)",
                      mb: 1.5,
                    }}
                  >
                    <SearchRoundedIcon
                      sx={{
                        fontSize: 30,
                        color: "#FF4FA3",
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: "#333",
                    }}
                  >
                    What are you looking for?
                  </Typography>

                  <Typography
                    sx={{
                      color: "#999",
                      fontSize: 13,
                      mt: 0.5,
                    }}
                  >
                    Search from thousands of groceries
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        ) : (
          <Box>
            {/* SEARCH RESULT HEADER */}

            {!loading && products.length > 0 && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mb: 2,
                  mt: 1,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#171717",
                    }}
                  >
                    Search results
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      color: "#888",
                      mt: 0.3,
                    }}
                  >
                    Results for "{query}"
                  </Typography>
                </Box>

                <Chip
                  label={`${products.length} items`}
                  size="small"
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#fff0f7",
                    color: "#FF4FA3",
                    fontWeight: 700,
                  }}
                />
              </Stack>
            )}

            {/* PRODUCTS */}

            {products.length === 0 && !loading ? (
              <SearchEmpty query={query} onClear={handleClearSearch} />
            ) : (
              <ProductGrid
                products={products}
                loading={loading}
                error={error}
              />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Search;
