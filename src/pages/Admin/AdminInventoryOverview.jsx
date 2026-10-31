import React, { useEffect } from "react";

import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

import { useDispatch, useSelector } from "react-redux";

import { fetchAdminInventoryOverview } from "../../redux/slices/adminInventorySlice";

const AdminInventoryOverview = () => {
  const dispatch = useDispatch();

  const { overview, overviewLoading, overviewError } = useSelector(
    (state) => state.adminInventory,
  );

  useEffect(() => {
    dispatch(fetchAdminInventoryOverview());
  }, [dispatch]);

  const cards = [
    {
      title: "Total Products",
      value: overview?.total_products ?? 0,
      icon: <Inventory2OutlinedIcon />,
      background: "#FFF0F7",
      iconColor: "#FF4FA3",
    },
    {
      title: "In Stock",
      value: overview?.in_stock ?? 0,
      icon: <CheckCircleOutlineRoundedIcon />,
      background: "#ECFDF3",
      iconColor: "#16A34A",
    },
    {
      title: "Low Stock",
      value: overview?.low_stock ?? 0,
      icon: <WarningAmberOutlinedIcon />,
      background: "#FFF7ED",
      iconColor: "#EA580C",
    },
    {
      title: "Out of Stock",
      value: overview?.out_of_stock ?? 0,
      icon: <RemoveShoppingCartOutlinedIcon />,
      background: "#FEF2F2",
      iconColor: "#DC2626",
    },
  ];

  return (
    <Box>
      {/* HEADER */}

      <Box sx={{ mb: 3 }}>
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
          Inventory Overview
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: "#6B7280",
          }}
        >
          Monitor your store inventory and stock levels
        </Typography>
      </Box>

      {/* ERROR */}

      {overviewError && (
        <Card
          sx={{
            mb: 3,
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
            {overviewError}
          </Typography>
        </Card>
      )}

      {/* LOADING */}

      {overviewLoading ? (
        <Box
          sx={{
            minHeight: 300,
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
      ) : (
        <>
          {/* SUMMARY CARDS */}

          <Grid container spacing={2}>
            {cards.map((card) => (
              <Grid item xs={12} sm={6} lg={3} key={card.title}>
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #E5E7EB",
                    boxShadow: "none",
                    height: "100%",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{
                      p: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: card.background,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        sx={{
                          color: card.iconColor,
                          display: "flex",
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#6B7280",
                        }}
                      >
                        {card.title}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.3,
                          fontSize: 24,
                          fontWeight: 800,
                          color: "#111111",
                        }}
                      >
                        {Number(card.value).toLocaleString("en-IN")}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* QUANTITY SUMMARY */}

          <Card
            sx={{
              mt: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              boxShadow: "none",
            }}
          >
            <Box sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 2.5 }}
              >
                <InventoryOutlinedIcon
                  sx={{
                    color: "#FF4FA3",
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#111111",
                  }}
                >
                  Stock Quantity
                </Typography>
              </Stack>

              <Grid container spacing={2}>
                {/* TOTAL QUANTITY */}

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: "#FAFAFA",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Total Quantity
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#111111",
                      }}
                    >
                      {Number(overview?.total_quantity ?? 0).toLocaleString(
                        "en-IN",
                      )}
                    </Typography>
                  </Box>
                </Grid>

                {/* RESERVED */}

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: "#FFF7ED",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Reserved Quantity
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#EA580C",
                      }}
                    >
                      {Number(
                        overview?.total_reserved_quantity ?? 0,
                      ).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                </Grid>

                {/* AVAILABLE */}

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: "#ECFDF3",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#6B7280",
                      }}
                    >
                      Available Quantity
                    </Typography>

                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#16A34A",
                      }}
                    >
                      {Number(
                        overview?.total_available_quantity ?? 0,
                      ).toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </>
      )}
    </Box>
  );
};

export default AdminInventoryOverview;
