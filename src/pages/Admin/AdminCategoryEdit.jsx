import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminCategoryById,
  editAdminCategory,
  uploadCategoryImage,
  clearAdminCategoryErrors,
  clearSelectedCategory,
} from "../../redux/slices/adminCategorySlice";

import PATHS from "../../routes/paths";

const AdminCategoryEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedCategory,
    categoryLoading,
    updating,
    uploading,
    categoryError,
    updateError,
    uploadError,
  } = useSelector((state) => state.adminCategories);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(clearAdminCategoryErrors());
    dispatch(fetchAdminCategoryById(id));

    return () => {
      dispatch(clearSelectedCategory());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!selectedCategory) return;

    setName(selectedCategory.name || "");
    setImage(selectedCategory.image || "");
  }, [selectedCategory]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);

    setImage("");
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setImage("");
  };

  const handleUploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    const result = await dispatch(uploadCategoryImage(formData));

    if (!uploadCategoryImage.fulfilled.match(result)) {
      return null;
    }

    const uploadedImage =
      result.payload?.image ||
      result.payload?.url ||
      result.payload?.imageUrl ||
      result.payload?.path;

    if (!uploadedImage) return null;

    setImage(uploadedImage);

    return uploadedImage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) return;

    let imageUrl = image;

    if (imageFile && !imageUrl) {
      imageUrl = await handleUploadImage();

      if (!imageUrl) return;
    }

    const formData = new FormData();

    formData.append("name", name.trim());

    if (imageUrl) {
      formData.append("image", imageUrl);
    }

    const result = await dispatch(
      editAdminCategory({
        categoryId: id,
        formData,
      }),
    );

    if (editAdminCategory.fulfilled.match(result)) {
      navigate(PATHS.ADMIN_CATEGORY_DETAILS.replace(":id", id));
    }
  };

  if (categoryLoading) {
    return (
      <Box
        sx={{
          minHeight: 450,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: "#FF4FA3" }} />
      </Box>
    );
  }

  if (!selectedCategory) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(PATHS.ADMIN_CATEGORIES)}
          sx={{
            color: "#6B7280",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Categories
        </Button>

        {categoryError && (
          <Card
            sx={{
              mt: 2,
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
                fontWeight: 600,
              }}
            >
              {categoryError}
            </Typography>
          </Card>
        )}
      </Box>
    );
  }

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
            onClick={() =>
              navigate(PATHS.ADMIN_CATEGORY_DETAILS.replace(":id", id))
            }
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
            Back to Category
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
            Edit Category
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Update category information
          </Typography>
        </Box>
      </Stack>

      {/* ERROR */}

      {updateError && (
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
            {updateError}
          </Typography>
        </Card>
      )}

      {/* FORM */}

      <Card
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
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

          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Category Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Fruits & Vegetables"
            />

            {/* IMAGE */}

            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                Category Image
              </Typography>

              <Card
                sx={{
                  borderRadius: 3,
                  border: "1px dashed #D1D5DB",
                  boxShadow: "none",
                  overflow: "hidden",
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={2}
                  alignItems="center"
                  sx={{ p: 2 }}
                >
                  {/* PREVIEW */}

                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: 2.5,
                      bgcolor: "#F9FAFB",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {imagePreview || image ? (
                      <Box
                        component="img"
                        src={
                          imagePreview ||
                          (image?.startsWith("http")
                            ? image
                            : `http://localhost:5000${image}`)
                        }
                        alt={name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <CategoryRoundedIcon
                        sx={{
                          fontSize: 48,
                          color: "#D1D5DB",
                        }}
                      />
                    )}
                  </Box>

                  {/* CONTROLS */}

                  <Box>
                    <input
                      id="edit-category-image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      hidden
                      onChange={handleImageChange}
                    />

                    <Stack
                      direction={{
                        xs: "column",
                        sm: "row",
                      }}
                      spacing={1}
                    >
                      <Button
                        component="label"
                        htmlFor="edit-category-image-upload"
                        variant="outlined"
                        startIcon={<CloudUploadRoundedIcon />}
                        disabled={updating || uploading}
                        sx={{
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        Choose Image
                      </Button>

                      {(imagePreview || image) && (
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteOutlineRoundedIcon />}
                          disabled={updating || uploading}
                          onClick={handleRemoveImage}
                          sx={{
                            borderRadius: 2.5,
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </Stack>

                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      JPG, JPEG, PNG or WEBP
                    </Typography>

                    {imageFile && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          color: "#374151",
                          fontWeight: 600,
                          wordBreak: "break-word",
                        }}
                      >
                        {imageFile.name}
                      </Typography>
                    )}

                    {image && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          color: "#22C55E",
                          fontWeight: 600,
                        }}
                      >
                        Image uploaded successfully
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Card>

              {uploadError && (
                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 13,
                    color: "#DC2626",
                    fontWeight: 600,
                  }}
                >
                  {uploadError}
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>

        <Divider />

        {/* ACTIONS */}

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          sx={{ p: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() =>
              navigate(PATHS.ADMIN_CATEGORY_DETAILS.replace(":id", id))
            }
            disabled={updating || uploading}
            sx={{
              minHeight: 42,
              borderRadius: 2.5,
              borderColor: "#E5E7EB",
              color: "#374151",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={
              updating || uploading ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                <SaveRoundedIcon />
              )
            }
            disabled={updating || uploading}
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
            {uploading
              ? "Uploading Image..."
              : updating
                ? "Updating..."
                : "Save Changes"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdminCategoryEdit;
