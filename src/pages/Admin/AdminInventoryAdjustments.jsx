import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminInventory,
  adjustAdminInventoryStock,
} from "../../redux/slices/adminInventorySlice";

const AdminStockAdjustments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    inventory = [],
    loading,
    adjusting,
    adjustError,
  } = useSelector((state) => state.adminInventory);

  const [form, setForm] = useState({
    productId: "",
    type: "restock",
    quantity: "",
    reason: "",
    reference: "",
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    dispatch(
      fetchAdminInventory({
        page: 1,
        limit: 100,
      }),
    );
  }, [dispatch]);

  const selectedProduct = useMemo(() => {
    return inventory.find(
      (item) => String(item.product_id) === String(form.productId),
    );
  }, [inventory, form.productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccessMessage("");

    if (!form.productId) {
      return;
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      return;
    }

    const result = await dispatch(
      adjustAdminInventoryStock({
        productId: Number(form.productId),
        type: form.type,
        quantity: Number(form.quantity),
        reason: form.reason || undefined,
        reference: form.reference || undefined,
        notes: form.notes || undefined,
      }),
    );

    if (adjustAdminInventoryStock.fulfilled.match(result)) {
      setSuccessMessage("Stock adjusted successfully.");

      setForm({
        productId: "",
        type: "",
        quantity: "",
        reason: "",
        reference: "",
        notes: "",
      });

      dispatch(
        fetchAdminInventory({
          page: 1,
          limit: 100,
        }),
      );
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
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                minWidth: 0,
                color: "#374151",
                textTransform: "none",
              }}
            >
              Back
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
              Stock Adjustments
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 0.5,
              ml: {
                xs: 0,
                md: 8,
              },
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            Add, remove, or adjust product stock
          </Typography>
        </Box>
      </Stack>

      {/* FORM */}
      <Card
        sx={{
          maxWidth: 900,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
          boxShadow: "none",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: { xs: 2, md: 3 } }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
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
              <InventoryRoundedIcon
                sx={{
                  color: "#FF4FA3",
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: 17,
                  fontWeight: 800,
                }}
              >
                Adjust Inventory
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#6B7280",
                }}
              >
                Update the stock quantity for a product
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2.5}>
            {/* PRODUCT */}
            <TextField
              select
              fullWidth
              label="Product"
              name="productId"
              value={form.productId}
              onChange={handleChange}
              disabled={loading || adjusting}
              required
            >
              {inventory.map((item) => (
                <MenuItem key={item.product_id} value={item.product_id}>
                  {item.product_name} — Current stock: {item.available_quantity}
                </MenuItem>
              ))}
            </TextField>

            {/* CURRENT STOCK */}
            {selectedProduct && (
              <Card
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  bgcolor: "#FAFAFA",
                  border: "1px solid #E5E7EB",
                  boxShadow: "none",
                }}
              >
                <Stack
                  direction={{
                    xs: "column",
                    sm: "row",
                  }}
                  spacing={3}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Current Quantity
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 800,
                      }}
                    >
                      {selectedProduct.quantity}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Reserved
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 800,
                      }}
                    >
                      {selectedProduct.reserved_quantity}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Available
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 22,
                        fontWeight: 800,
                      }}
                    >
                      {selectedProduct.available_quantity}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            )}

            {/* TYPE */}
            <TextField
              select
              fullWidth
              label="Adjustment Type"
              name="type"
              value={form.type}
              onChange={handleChange}
              disabled={adjusting}
              required
            >
              <MenuItem value="">Select transaction type</MenuItem>

              <MenuItem value="purchase">Purchase / Stock In</MenuItem>

              <MenuItem value="return">Customer Return</MenuItem>

              <MenuItem value="manual_adjustment_add">
                Manual Stock Addition
              </MenuItem>

              <MenuItem value="sale">Sale / Stock Out</MenuItem>

              <MenuItem value="damage">Damaged</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>

              <MenuItem value="lost">Lost</MenuItem>

              <MenuItem value="manual_adjustment_remove">
                Manual Stock Removal
              </MenuItem>
            </TextField>

            {/* QUANTITY */}
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              disabled={adjusting}
              inputProps={{
                min: 1,
              }}
              required
            />

            {/* REASON */}
            <TextField
              fullWidth
              label="Reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              disabled={adjusting}
              placeholder="Example: New stock received"
            />

            {/* REFERENCE */}
            <TextField
              fullWidth
              label="Reference"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              disabled={adjusting}
              placeholder="Example: PO-1024"
            />

            {/* NOTES */}
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              disabled={adjusting}
              placeholder="Additional information..."
            />

            {/* ERROR */}
            {adjustError && (
              <Card
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  bgcolor: "#FEF2F2",
                  border: "1px solid #FECACA",
                  boxShadow: "none",
                }}
              >
                <Typography
                  sx={{
                    color: "#DC2626",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {adjustError}
                </Typography>
              </Card>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <Card
                sx={{
                  p: 2,
                  borderRadius: 2.5,
                  bgcolor: "#F0FDF4",
                  border: "1px solid #BBF7D0",
                  boxShadow: "none",
                }}
              >
                <Typography
                  sx={{
                    color: "#16A34A",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {successMessage}
                </Typography>
              </Card>
            )}

            {/* SUBMIT */}
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="flex-end"
              spacing={1.5}
              sx={{ pt: 1 }}
            >
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate(-1)}
                disabled={adjusting}
                sx={{
                  minHeight: 44,
                  borderRadius: 2.5,
                  borderColor: "#E5E7EB",
                  color: "#374151",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={adjusting || !form.productId || !form.quantity}
                startIcon={
                  adjusting ? (
                    <CircularProgress size={18} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    <SaveRoundedIcon />
                  )
                }
                sx={{
                  minHeight: 44,
                  minWidth: 170,
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
                {adjusting ? "Adjusting..." : "Adjust Stock"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
};

export default AdminStockAdjustments;
