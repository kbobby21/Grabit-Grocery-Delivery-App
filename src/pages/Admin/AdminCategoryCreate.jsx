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
import { useNavigate } from "react-router-dom";

import {
  addAdminCategory,
  uploadCategoryImage,
  clearAdminCategoryErrors,
} from "../../redux/slices/adminCategorySlice";

import PATHS from "../../routes/paths";

const AdminCategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creating, uploading, createError, uploadError } = useSelector(
    (state) => state.adminCategories,
  );

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(clearAdminCategoryErrors());

    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [dispatch, imagePreview]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
    setImage("");

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(null);
    setImagePreview("");
    setImage("");
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      return null;
    }

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

    if (!uploadedImage) {
      return null;
    }

    setImage(uploadedImage);

    return uploadedImage;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    let imageUrl = image;

    /*
     * STEP 1
     * Upload image first.
     */
    if (imageFile && !imageUrl) {
      imageUrl = await handleUploadImage();

      if (!imageUrl) {
        return;
      }
    }

    /*
     * STEP 2
     * Create category using the uploaded image URL.
     */
    const categoryData = {
      name: name.trim(),
      image: imageUrl || null,
    };

    const result = await dispatch(addAdminCategory(categoryData));

    /*
     * STEP 3
     * Go back to categories after successful creation.
     */
    if (addAdminCategory.fulfilled.match(result)) {
      navigate(PATHS.ADMIN_CATEGORIES);
    }
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
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(PATHS.ADMIN_CATEGORIES)}
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
            Add Category
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Create a new grocery category
          </Typography>
        </Box>
      </Stack>

      {/* CREATE ERROR */}

      {createError && (
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
            {createError}
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
              disabled={creating || uploading}
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
                        src={imagePreview || image}
                        alt="Category preview"
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

                  <Box>
                    <input
                      id="category-image-upload"
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
                        htmlFor="category-image-upload"
                        variant="outlined"
                        startIcon={<CloudUploadRoundedIcon />}
                        disabled={creating || uploading}
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
                          type="button"
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteOutlineRoundedIcon />}
                          disabled={creating || uploading}
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
            onClick={() => navigate(PATHS.ADMIN_CATEGORIES)}
            disabled={creating || uploading}
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
              creating || uploading ? (
                <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
              ) : (
                <SaveRoundedIcon />
              )
            }
            disabled={creating || uploading || !name.trim()}
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
              : creating
                ? "Creating..."
                : "Create Category"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdminCategoryCreate;
