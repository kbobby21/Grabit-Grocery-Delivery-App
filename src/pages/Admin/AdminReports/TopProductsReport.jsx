import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

import { fetchTopProducts } from "../../../redux/slices/adminReportSlice";

const GRABIT_PINK = "#FF4FA3";
const GRABIT_DARK_PINK = "#E6328B";

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

const TopProductsReport = () => {
  const dispatch = useDispatch();

  const { topProducts, topProductsLoading, topProductsError } = useSelector(
    (state) => state.adminReports,
  );

  const [range, setRange] = useState("30days");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(
      fetchTopProducts({
        range,
        limit,
      }),
    );
  }, [dispatch, range, limit]);

  const products = Array.isArray(topProducts) ? topProducts : [];

  /*
   * Summary data
   * Uses the exact existing API fields.
   */
  const summary = useMemo(() => {
    const totalUnits = products.reduce(
      (sum, product) => sum + Number(product.units_sold ?? 0),
      0,
    );

    const totalOrders = products.reduce(
      (sum, product) => sum + Number(product.orders ?? 0),
      0,
    );

    const totalRevenue = products.reduce(
      (sum, product) => sum + Number(product.revenue ?? 0),
      0,
    );

    return {
      totalProducts: products.length,
      totalUnits,
      totalOrders,
      totalRevenue,
    };
  }, [products]);

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        bgcolor: "#F8F8FA",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

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
        spacing={2.5}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack
            direction="row"
            spacing={1.2}
            alignItems="center"
            sx={{ mb: 0.7 }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: "linear-gradient(135deg, #FF4FA3 0%, #E6328B 100%)",
                boxShadow: "0 8px 20px rgba(230,50,139,0.20)",
              }}
            >
              <LocalFireDepartmentRoundedIcon />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 26,
                  sm: 30,
                },
                fontWeight: 800,
                letterSpacing: "-0.7px",
                color: "#18181B",
              }}
            >
              Top Products
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: "#71717A",
              fontSize: 14,
              ml: {
                xs: 0,
                sm: 0.2,
              },
            }}
          >
            Best performing products by sales and revenue
          </Typography>
        </Box>

        {/* Filters */}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1.2}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          <Select
            size="small"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            sx={{
              minWidth: 155,
              height: 42,
              bgcolor: "#fff",
              borderRadius: 2.5,
              fontSize: 13,
              fontWeight: 600,

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E4E4E7",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: GRABIT_PINK,
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: GRABIT_PINK,
              },
            }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="7days">Last 7 Days</MenuItem>
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="90days">Last 90 Days</MenuItem>
          </Select>

          <Select
            size="small"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            sx={{
              minWidth: 125,
              height: 42,
              bgcolor: "#fff",
              borderRadius: 2.5,
              fontSize: 13,
              fontWeight: 600,

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E4E4E7",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: GRABIT_PINK,
              },

              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: GRABIT_PINK,
              },
            }}
          >
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </Stack>
      </Stack>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {topProductsError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
          }}
        >
          {topProductsError}
        </Alert>
      )}

      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <SummaryCard
          title="Products"
          value={number(summary.totalProducts)}
          subtitle="Top performing"
          icon={<Inventory2RoundedIcon />}
          loading={topProductsLoading}
        />

        <SummaryCard
          title="Units Sold"
          value={number(summary.totalUnits)}
          subtitle="Total quantity"
          icon={<TrendingUpRoundedIcon />}
          loading={topProductsLoading}
        />

        <SummaryCard
          title="Orders"
          value={number(summary.totalOrders)}
          subtitle="Product orders"
          icon={<ShoppingBagRoundedIcon />}
          loading={topProductsLoading}
        />

        <SummaryCard
          title="Revenue"
          value={currency(summary.totalRevenue)}
          subtitle="Generated revenue"
          icon={<CurrencyRupeeRoundedIcon />}
          loading={topProductsLoading}
          highlight
        />
      </Box>

      {/* =====================================================
          MAIN TABLE CARD
      ===================================================== */}

      <Card
        sx={{
          borderRadius: 3.5,
          border: "1px solid #ECECF0",
          boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        {/* Table Header */}
        <CardContent
          sx={{
            px: {
              xs: 2,
              sm: 3,
            },
            py: 2.5,
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            spacing={1.5}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#18181B",
                }}
              >
                Product Performance
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#71717A",
                }}
              >
                Products ranked by sales performance
              </Typography>
            </Box>

            <Chip
              label={`${products.length} products`}
              size="small"
              sx={{
                height: 30,
                px: 0.5,
                borderRadius: 2,
                bgcolor: "rgba(255,79,163,0.09)",
                color: GRABIT_DARK_PINK,
                fontWeight: 700,
                border: "1px solid rgba(255,79,163,0.15)",
              }}
            />
          </Stack>
        </CardContent>

        <Divider />

        {/* =====================================================
            TABLE
        ===================================================== */}

        <TableContainer
          sx={{
            width: "100%",
            overflowX: "auto",

            "&::-webkit-scrollbar": {
              height: 6,
            },

            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#D4D4D8",
              borderRadius: 10,
            },
          }}
        >
          <Table
            sx={{
              minWidth: 850,
            }}
          >
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#FAFAFB",
                }}
              >
                <TableCell
                  sx={{
                    width: 70,
                    py: 1.8,
                    pl: 3,
                    color: "#71717A",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Rank
                </TableCell>

                <TableCell
                  sx={{
                    py: 1.8,
                    color: "#71717A",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Product
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    py: 1.8,
                    color: "#71717A",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Units Sold
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    py: 1.8,
                    color: "#71717A",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Orders
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    py: 1.8,
                    color: "#71717A",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Average Price
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    py: 1.8,
                    pr: 3,
                    color: "#71717A",
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 0.7,
                  }}
                >
                  Revenue
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Loading */}
              {topProductsLoading &&
                Array.from({ length: 6 }).map((_, index) => (
                  <TableRow key={`loading-${index}`}>
                    <TableCell sx={{ pl: 3 }}>
                      <Skeleton variant="rounded" width={32} height={28} />
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Skeleton variant="rounded" width={42} height={42} />

                        <Skeleton width={150} />
                      </Stack>
                    </TableCell>

                    <TableCell align="right">
                      <Skeleton width={60} sx={{ ml: "auto" }} />
                    </TableCell>

                    <TableCell align="right">
                      <Skeleton width={50} sx={{ ml: "auto" }} />
                    </TableCell>

                    <TableCell align="right">
                      <Skeleton width={75} sx={{ ml: "auto" }} />
                    </TableCell>

                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Skeleton width={85} sx={{ ml: "auto" }} />
                    </TableCell>
                  </TableRow>
                ))}

              {/* Products */}
              {!topProductsLoading &&
                products.map((product, index) => {
                  const rank = index + 1;

                  return (
                    <TableRow
                      key={`${product.product_id}-${index}`}
                      hover
                      sx={{
                        transition: "all 0.15s ease",

                        "&:hover": {
                          bgcolor: "rgba(255,79,163,0.025)",
                        },

                        "& td": {
                          borderBottom: "1px solid #F1F1F3",
                        },
                      }}
                    >
                      {/* Rank */}
                      <TableCell
                        sx={{
                          pl: 3,
                          py: 2,
                        }}
                      >
                        <RankBadge rank={rank} />
                      </TableCell>

                      {/* Product */}
                      <TableCell
                        sx={{
                          py: 2,
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.5}
                          alignItems="center"
                        >
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              flexShrink: 0,
                              borderRadius: 2,
                              bgcolor: "rgba(255,79,163,0.08)",
                              color: GRABIT_PINK,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid rgba(255,79,163,0.10)",
                            }}
                          >
                            <Inventory2RoundedIcon fontSize="small" />
                          </Box>

                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontSize: 14,
                                fontWeight: 750,
                                color: "#27272A",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: 300,
                              }}
                            >
                              {product.product_name || "Unknown Product"}
                            </Typography>

                            {product.product_id != null && (
                              <Typography
                                sx={{
                                  mt: 0.25,
                                  fontSize: 11,
                                  color: "#A1A1AA",
                                }}
                              >
                                Product #{product.product_id}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Units */}
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 13,
                          fontWeight: 650,
                          color: "#3F3F46",
                        }}
                      >
                        {number(product.units_sold)}
                      </TableCell>

                      {/* Orders */}
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 13,
                          fontWeight: 650,
                          color: "#3F3F46",
                        }}
                      >
                        {number(product.orders)}
                      </TableCell>

                      {/* Average Price */}
                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 13,
                          fontWeight: 650,
                          color: "#52525B",
                        }}
                      >
                        {currency(product.average_price)}
                      </TableCell>

                      {/* Revenue */}
                      <TableCell
                        align="right"
                        sx={{
                          pr: 3,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: GRABIT_DARK_PINK,
                          }}
                        >
                          {currency(product.revenue)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {/* Empty */}
              {!topProductsLoading && products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Box
                      sx={{
                        py: 8,
                        textAlign: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          mx: "auto",
                          mb: 2,
                          borderRadius: "50%",
                          bgcolor: "rgba(255,79,163,0.08)",
                          color: GRABIT_PINK,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Inventory2RoundedIcon />
                      </Box>

                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#27272A",
                        }}
                      >
                        No product data found
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: 13,
                          color: "#71717A",
                        }}
                      >
                        Try changing the selected date range.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* =====================================================
          FOOTER INFO
      ===================================================== */}

      {!topProductsLoading && products.length > 0 && (
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-between"
          alignItems={{
            xs: "flex-start",
            sm: "center",
          }}
          spacing={1}
          sx={{
            mt: 2,
            px: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: "#A1A1AA",
            }}
          >
            Showing top {products.length} products for the selected period
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#A1A1AA",
            }}
          >
            Revenue calculated from product sales
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

/* ============================================================
   SUMMARY CARD
============================================================ */

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  loading,
  highlight = false,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 3.2,
        border: "1px solid #ECECF0",
        boxShadow: "0 6px 24px rgba(0,0,0,0.035)",
        bgcolor: "#fff",
        transition: "all 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#71717A",
                mb: 0.8,
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                fontSize: 22,
                lineHeight: 1.2,
                fontWeight: 800,
                color: highlight ? GRABIT_DARK_PINK : "#18181B",
              }}
            >
              {loading ? "..." : value}
            </Typography>

            <Typography
              sx={{
                mt: 0.6,
                fontSize: 11,
                color: "#A1A1AA",
              }}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.2,
              bgcolor: "rgba(255,79,163,0.09)",
              color: GRABIT_PINK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

/* ============================================================
   RANK BADGE
============================================================ */

const RankBadge = ({ rank }) => {
  let bgcolor = "#F4F4F5";
  let color = "#52525B";

  if (rank === 1) {
    bgcolor = "rgba(255,79,163,0.14)";
    color = GRABIT_DARK_PINK;
  }

  if (rank === 2) {
    bgcolor = "rgba(255,79,163,0.09)";
    color = "#D9468B";
  }

  if (rank === 3) {
    bgcolor = "rgba(255,79,163,0.06)";
    color = "#C02675";
  }

  return (
    <Box
      sx={{
        width: 34,
        height: 30,
        borderRadius: 1.8,
        bgcolor,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 800,
      }}
    >
      #{rank}
    </Box>
  );
};

export default TopProductsReport;
