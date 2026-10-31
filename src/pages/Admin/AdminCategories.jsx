import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminCategories,
  removeAdminCategory,
} from "../../redux/slices/adminCategorySlice";

import PATHS from "../../routes/paths";

const AdminCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    categories = [],
    loading,
    error,
    deleting,
    deleteError,
  } = useSelector((state) => state.adminCategories);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return categories;
    }

    return categories.filter((category) => {
      const name = String(category.name || "").toLowerCase();
      const id = String(category.id || "").toLowerCase();

      return name.includes(query) || id.includes(query);
    });
  }, [categories, search]);

  const handleRefresh = () => {
    dispatch(fetchAdminCategories());
  };

  const handleCreate = () => {
    navigate(PATHS.ADMIN_CATEGORY_CREATE);
  };

  const handleView = (id) => {
    navigate(PATHS.ADMIN_CATEGORY_DETAILS.replace(":id", id));
  };

  const handleEdit = (id) => {
    navigate(PATHS.ADMIN_CATEGORY_EDIT.replace(":id", id));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    const result = await dispatch(removeAdminCategory(id));

    if (removeAdminCategory.rejected.match(result)) {
      return;
    }
  };

  const getImage = (category) => {
    if (!category.image) {
      return "";
    }

    if (category.image.startsWith("http")) {
      return category.image;
    }

    return `http://localhost:5000${category.image}`;
  };

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
            Categories
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Manage your grocery categories
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<RefreshRoundedIcon />}
            onClick={handleRefresh}
            disabled={loading}
            sx={{
              minHeight: 42,
              borderRadius: 2.5,
              borderColor: "#E5E7EB",
              color: "#374151",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Refresh
          </Button>

          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={handleCreate}
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
            Add Category
          </Button>
        </Stack>
      </Stack>

      {/* SUMMARY */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ p: 2.5 }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2.5,
                bgcolor: "#FFF0F7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CategoryRoundedIcon
                sx={{
                  color: "#FF4FA3",
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Total Categories
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {categories.length}
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ p: 2.5 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Showing
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {filteredCategories.length}
              </Typography>
            </Box>
          </Stack>
        </Card>

        <Card
          sx={{
            flex: 1,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            boxShadow: "none",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ p: 2.5 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#6B7280",
                }}
              >
                Total Products
              </Typography>

              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                }}
              >
                {categories.reduce(
                  (total, category) =>
                    total + Number(category.product_count || 0),
                  0,
                )}
              </Typography>
            </Box>
          </Stack>
        </Card>
      </Stack>

      {/* SEARCH */}

      <Card
        sx={{
          mb: 2,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search categories..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    sx={{
                      color: "#9CA3AF",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 500,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2.5,
              },
            }}
          />
        </Box>
      </Card>

      {/* ERROR */}

      {(error || deleteError) && (
        <Card
          sx={{
            mb: 2,
            p: 2,
            borderRadius: 3,
            border: "1px solid #FECACA",
            bgcolor: "#FEF2F2",
            boxShadow: "none",
          }}
        >
          <Typography
            sx={{
              color: "#DC2626",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {error || deleteError}
          </Typography>
        </Card>
      )}

      {/* TABLE */}

      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        {loading ? (
          <Box
            sx={{
              minHeight: 400,
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
        ) : filteredCategories.length === 0 ? (
          <Box
            sx={{
              minHeight: 350,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CategoryRoundedIcon
              sx={{
                fontSize: 48,
                color: "#D1D5DB",
              }}
            />

            <Typography
              sx={{
                mt: 1.5,
                fontWeight: 700,
              }}
            >
              No categories found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table
              sx={{
                minWidth: 800,
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#FAFAFA",
                  }}
                >
                  <TableCell>Category</TableCell>
                  <TableCell>Products</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id} hover>
                    {/* CATEGORY */}

                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleView(category.id)}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "#F9FAFB",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {getImage(category) ? (
                            <Box
                              component="img"
                              src={getImage(category)}
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
                                color: "#D1D5DB",
                              }}
                            />
                          )}
                        </Box>

                        <Box>
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {category.name}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 11,
                              color: "#9CA3AF",
                            }}
                          >
                            #{category.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* PRODUCTS */}

                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {Number(category.product_count || 0)}
                      </Typography>
                    </TableCell>

                    {/* IMAGE */}

                    <TableCell>
                      {category.image ? (
                        <Chip
                          label="Uploaded"
                          size="small"
                          color="success"
                          sx={{
                            fontWeight: 700,
                            fontSize: 11,
                          }}
                        />
                      ) : (
                        <Chip
                          label="No Image"
                          size="small"
                          sx={{
                            bgcolor: "#F3F4F6",
                            color: "#6B7280",
                            fontWeight: 700,
                            fontSize: 11,
                          }}
                        />
                      )}
                    </TableCell>

                    {/* STATUS */}

                    <TableCell>
                      <Chip
                        label="Active"
                        size="small"
                        color="success"
                        sx={{
                          fontWeight: 700,
                          fontSize: 11,
                        }}
                      />
                    </TableCell>

                    {/* ACTIONS */}

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={0.5}
                      >
                        <IconButton onClick={() => handleView(category.id)}>
                          <VisibilityRoundedIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          onClick={() => handleEdit(category.id)}
                          sx={{
                            color: "#FF4FA3",
                          }}
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          disabled={deleting}
                          onClick={() => handleDelete(category.id)}
                          sx={{
                            color: "#DC2626",
                          }}
                        >
                          <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
};

export default AdminCategories;
