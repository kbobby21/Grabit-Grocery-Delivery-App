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
import { useNavigate, useParams } from "react-router-dom";

import {
  fetchAdminProductById,
  editAdminProduct,
  uploadProductImage,
  clearSelectedProduct,
  clearAdminProductErrors,
} from "../../redux/slices/adminProductSlice";

import PATHS from "../../routes/paths";

const AdminProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    selectedProduct,
    productLoading,
    productError,
    updating,
    uploading,
    updateError,
    uploadError,
  } = useSelector((state) => state.adminProducts);

  const [form, setForm] = useState({
    categoryId: "",
    name: "",
    description: "",
    price: "",
    mrp: "",
    discount: "",
    unit: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  /*
  |--------------------------------------------------------------------------
  | LOAD PRODUCT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminProductById(id));
    }

    dispatch(clearAdminProductErrors());

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  /*
  |--------------------------------------------------------------------------
  | FILL FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    setForm({
      categoryId: selectedProduct.category_id ?? "",
      name: selectedProduct.name ?? "",
      description: selectedProduct.description ?? "",
      price: selectedProduct.price ?? "",
      mrp: selectedProduct.mrp ?? "",
      discount: selectedProduct.discount ?? "",
      unit: selectedProduct.unit ?? "",
      image: selectedProduct.image ?? "",
    });

    setImagePreview(selectedProduct.image ?? "");
    setImageFile(null);
  }, [selectedProduct]);

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
      return form.image || null;
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

    if (!id) {
      return;
    }

    if (!form.name.trim()) {
      return;
    }

    if (!form.categoryId) {
      return;
    }

    if (form.price === "") {
      return;
    }

    if (form.mrp === "") {
      return;
    }

    if (!form.unit.trim()) {
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | UPLOAD NEW IMAGE IF SELECTED
    |--------------------------------------------------------------------------
    */

    let imageUrl = form.image;

    if (imageFile) {
      imageUrl = await handleUploadImage();

      if (!imageUrl) {
        return;
      }
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE DATA
    |--------------------------------------------------------------------------
    */

    const productData = {
      categoryId: Number(form.categoryId),

      name: form.name.trim(),

      description: form.description.trim(),

      price: Number(form.price),

      mrp: Number(form.mrp),

      discount: form.discount !== "" ? Number(form.discount) : 0,

      image: imageUrl || null,

      unit: form.unit.trim(),
    };

    const result = await dispatch(
      editAdminProduct({
        productId: id,
        productData,
      }),
    );

    if (editAdminProduct.fulfilled.match(result)) {
      navigate(PATHS.ADMIN_PRODUCT_DETAILS.replace(":id", id));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | BACK
  |--------------------------------------------------------------------------
  */

  const handleBack = () => {
    navigate(PATHS.ADMIN_PRODUCT_DETAILS.replace(":id", id));
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (productLoading) {
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

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (productError) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate(PATHS.ADMIN_PRODUCTS)}
          sx={{
            mb: 2,
            color: "#374151",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Products
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
              fontWeight: 600,
            }}
          >
            {productError}
          </Typography>
        </Card>
      </Box>
    );
  }

  if (!selectedProduct) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

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
            Back to Product
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
            Edit Product
          </Typography>

          <Typography
            sx={{
              mt: 0.5,
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Update product information
          </Typography>
        </Box>
      </Stack>

      {/* UPDATE ERROR */}

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
            />

            {/* CATEGORY */}

            <TextField
              required
              fullWidth
              type="number"
              label="Category ID"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              inputProps={{
                min: 1,
              }}
              helperText="Enter the category ID"
            />

            {/* PRICE + MRP */}

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

            {/* DISCOUNT */}

            <TextField
              fullWidth
              type="number"
              label="Discount (%)"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              inputProps={{
                min: 0,
                max: 100,
                step: "0.01",
              }}
            />

            {/* UNIT */}

            <TextField
              required
              fullWidth
              label="Unit"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="e.g. 1 kg, 500 g, 25 bags"
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
                    {imagePreview ? (
                      <Box
                        component="img"
                        src={imagePreview}
                        alt={form.name}
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

                  {/* CONTROLS */}

                  <Box>
                    <input
                      id="edit-product-image-upload"
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
                        htmlFor="edit-product-image-upload"
                        variant="outlined"
                        startIcon={<CloudUploadRoundedIcon />}
                        disabled={updating || uploading}
                        sx={{
                          borderRadius: 2.5,
                          textTransform: "none",
                          fontWeight: 700,
                        }}
                      >
                        Replace Image
                      </Button>

                      {imagePreview && (
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
                        New image: {imageFile.name}
                      </Typography>
                    )}

                    {form.image && !imageFile && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 12,
                          color: "#22C55E",
                          fontWeight: 600,
                        }}
                      >
                        Current image
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
            onClick={handleBack}
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
                : "Update Product"}
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};

export default AdminProductEdit;
