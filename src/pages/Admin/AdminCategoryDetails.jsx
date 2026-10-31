import React, { useEffect } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminCategoryById,
  clearSelectedCategory,
} from "../../redux/slices/adminCategorySlice";

import PATHS from "../../routes/paths";

const AdminCategoryDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedCategory, categoryLoading, categoryError } = useSelector(
    (state) => state.adminCategories,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminCategoryById(id));
    }

    return () => {
      dispatch(clearSelectedCategory());
    };
  }, [dispatch, id]);

  const handleBack = () => {
    navigate(PATHS.ADMIN_CATEGORIES);
  };

  const handleEdit = () => {
    navigate(PATHS.ADMIN_CATEGORY_EDIT.replace(":id", id));
  };

  if (categoryLoading) {
    return (
      <Box
        sx={{
          minHeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: "#FF4FA3",
          }}
        />
      </Box>
    );
  }

  if (categoryError) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          sx={{
            mb: 2,
            px: 0,
            color: "#6B7280",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "transparent",
              color: "#111111",
            },
          }}
        >
          Back to Categories
        </Button>

        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #FECACA",
            bgcolor: "#FEF2F2",
            boxShadow: "none",
          }}
        >
          <Typography
            sx={{
              color: "#DC2626",
              fontWeight: 700,
            }}
          >
            {categoryError}
          </Typography>
        </Card>
      </Box>
    );
  }

  if (!selectedCategory) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          sx={{
            px: 0,
            color: "#6B7280",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Categories
        </Button>

        <Card
          sx={{
            mt: 2,
            p: 5,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <CategoryRoundedIcon
            sx={{
              fontSize: 50,
              color: "#D1D5DB",
            }}
          />

          <Typography
            sx={{
              mt: 1.5,
              fontWeight: 700,
            }}
          >
            Category not found
          </Typography>
        </Card>
      </Box>
    );
  }

  const category = selectedCategory;

  return (
    <Box>
      {/* HEADER */}

      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={handleBack}
            sx={{
              mb: 1,
              px: 0,
              color: "#6B7280",
              textTransform: "none",
              fontWeight: 600,

              "&:hover": {
                bgcolor: "transparent",
                color: "#111111",
              },
            }}
          >
            Back to Categories
          </Button>

          <Typography
            sx={{
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 800,
              color: "#111111",
              letterSpacing: "-0.7px",
            }}
          >
            Category Details
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            View category information and product count
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EditRoundedIcon />}
          onClick={handleEdit}
          sx={{
            minHeight: 42,
            borderRadius: 2.5,
            bgcolor: "#FF4FA3",
            textTransform: "none",
            fontWeight: 700,
            boxShadow: "none",

            "&:hover": {
              bgcolor: "#E6328B",
              boxShadow: "none",
            },
          }}
        >
          Edit Category
        </Button>
      </Stack>

      {/* MAIN CARD */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: {
              xs: 2,
              md: 3,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 800,
              mb: 2.5,
            }}
          >
            Category Information
          </Typography>

          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            spacing={3}
          >
            {/* IMAGE */}

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: 220,
                },
                height: 220,
                borderRadius: 3,
                bgcolor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {category.image ? (
                <Box
                  component="img"
                  src={
                    category.image?.startsWith("http")
                      ? category.image
                      : `http://localhost:5000${category.image}`
                  }
                  alt={category.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CategoryRoundedIcon
                  sx={{
                    fontSize: 70,
                    color: "#D1D5DB",
                  }}
                />
              )}
            </Box>

            {/* DETAILS */}

            <Box
              sx={{
                flex: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                  mb: 0.5,
                }}
              >
                Category Name
              </Typography>

              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#111111",
                  mb: 2.5,
                }}
              >
                {category.name}
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                {/* CATEGORY ID */}

                <Card
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                    }}
                  >
                    Category ID
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    #{category.id}
                  </Typography>
                </Card>

                {/* PRODUCTS */}

                <Card
                  sx={{
                    flex: 1,
                    p: 2,
                    borderRadius: 2.5,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Inventory2RoundedIcon
                      sx={{
                        fontSize: 20,
                        color: "#FF4FA3",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Products
                    </Typography>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 20,
                      fontWeight: 800,
                    }}
                  >
                    {category.product_count ?? 0}
                  </Typography>
                </Card>
              </Stack>

              <Box sx={{ mt: 2.5 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#6B7280",
                    mb: 0.8,
                  }}
                >
                  Status
                </Typography>

                <Chip
                  label="Active"
                  size="small"
                  color="success"
                  sx={{
                    fontWeight: 700,
                    fontSize: 11,
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* FOOTER */}

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          sx={{
            p: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            sx={{
              minHeight: 42,
              borderRadius: 2.5,
              borderColor: "#E5E7EB",
              color: "#374151",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={handleEdit}
            sx={{
              minHeight: 42,
              borderRadius: 2.5,
              bgcolor: "#FF4FA3",
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",

              "&:hover": {
                bgcolor: "#E6328B",
                boxShadow: "none",
              },
            }}
          >
            Edit Category
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdminCategoryDetails;
