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
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addAdminProduct,
  uploadProductImage,
  clearAdminProductErrors,
} from "../../redux/slices/adminProductSlice";

import PATHS from "../../routes/paths";

const AdminProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { creating, uploading, createError, uploadError } = useSelector(
    (state) => state.adminProducts,
  );

  const [form, setForm] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    mrp: "",
    stock: "",
    unit: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    dispatch(clearAdminProductErrors());
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | IMAGE SELECT
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);

    // Clear previous uploaded image because a new file was selected
    setForm((previous) => ({
      ...previous,
      image: "",
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE IMAGE
  |--------------------------------------------------------------------------
  */

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");

    setForm((previous) => ({
      ...previous,
      image: "",
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | UPLOAD IMAGE
  |--------------------------------------------------------------------------
  */

  const handleUploadImage = async () => {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();

    formData.append("image", imageFile);

    const result = await dispatch(uploadProductImage(formData));

    if (!uploadProductImage.fulfilled.match(result)) {
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

    setForm((previous) => ({
      ...previous,
      image: uploadedImage,
    }));

    return uploadedImage;
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * Basic validation
     */

    if (!form.name.trim()) {
      return;
    }

    if (!form.category_id) {
      return;
    }

    if (!form.price) {
      return;
    }

    if (!form.mrp) {
      return;
    }

    if (!form.stock && form.stock !== "0") {
      return;
    }

    if (!form.unit.trim()) {
      return;
    }

    /*
     * Upload image first
     */

    let imageUrl = form.image;

    if (imageFile && !imageUrl) {
      imageUrl = await handleUploadImage();

      if (!imageUrl) {
        return;
      }
    }

    /*
     * Create product
     */

    const productData = {
      category_id: Number(form.category_id),
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      mrp: Number(form.mrp),
      stock: Number(form.stock),
      unit: form.unit.trim(),
      image: imageUrl || null,
    };

    const result = await dispatch(addAdminProduct(productData));

    if (addAdminProduct.fulfilled.match(result)) {
      navigate(PATHS.ADMIN_PRODUCTS);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <Box>
      {/* --------------------------------------------------------------- */}
      {/* HEADER */}
      {/* --------------------------------------------------------------- */}

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
            onClick={() => navigate(PATHS.ADMIN_PRODUCTS)}
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
            Back to Products
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
            Add Product
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Create a new grocery product
          </Typography>
        </Box>
      </Stack>

      {/* --------------------------------------------------------------- */}
      {/* CREATE ERROR */}
      {/* --------------------------------------------------------------- */}

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

      {/* --------------------------------------------------------------- */}
      {/* FORM */}
      {/* --------------------------------------------------------------- */}

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
            Product Information
          </Typography>

          <Stack spacing={2.5}>
            {/* PRODUCT NAME */}

            <TextField
              required
              fullWidth
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Lipton Green Tea"
            />

            {/* DESCRIPTION */}

            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter product description"
            />

            {/* CATEGORY */}

            <TextField
              required
              fullWidth
              type="number"
              label="Category ID"
              name="category_id"
              value={form.category_id}
              onChange={handleChange}
              inputProps={{
                min: 1,
              }}
              helperText="Enter the category ID from your categories table"
            />

            {/* PRICE */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <TextField
                required
                fullWidth
                type="number"
                label="Selling Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  step: "0.01",
                }}
              />

              <TextField
                required
                fullWidth
                type="number"
                label="MRP"
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  step: "0.01",
                }}
              />
            </Stack>

            {/* STOCK + UNIT */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
            >
              <TextField
                required
                fullWidth
                type="number"
                label="Stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                }}
              />

              <TextField
                required
                fullWidth
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
                placeholder="e.g. 1 kg, 500 g, 25 bags"
              />
            </Stack>

            {/* --------------------------------------------------------- */}
            {/* PRODUCT IMAGE */}
            {/* --------------------------------------------------------- */}

            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                Product Image
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
                  {/* IMAGE PREVIEW */}

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
                    {imagePreview || form.image ? (
                      <Box
                        component="img"
                        src={imagePreview || form.image}
                        alt="Product preview"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Inventory2RoundedIcon
                        sx={{
                          fontSize: 48,
                          color: "#D1D5DB",
                        }}
                      />
                    )}
                  </Box>

                  {/* UPLOAD CONTROLS */}

                  <Box>
                    <input
                      id="product-image-upload"
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
                        htmlFor="product-image-upload"
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

                      {(imagePreview || form.image) && (
                        <Button
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

                    {form.image && (
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

              {/* UPLOAD ERROR */}

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

        {/* ------------------------------------------------------------- */}
        {/* ACTIONS */}
        {/* ------------------------------------------------------------- */}

        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={1.5}
          sx={{ p: 2 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(PATHS.ADMIN_PRODUCTS)}
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
                <CircularProgress
                  size={18}
                  sx={{
                    color: "#FFFFFF",
                  }}
                />
              ) : (
                <SaveRoundedIcon />
              )
            }
            disabled={creating || uploading}
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
                : "Create Product"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdminProductCreate;
