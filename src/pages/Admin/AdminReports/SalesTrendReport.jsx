import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

import { fetchSalesTrend } from "../../../redux/slices/adminReportSlice";

const PINK = "#FF4FA3";
const DARK_PINK = "#E6328B";
const LIGHT_PINK = "rgba(255,79,163,0.10)";

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

const SalesTrendReport = () => {
  const dispatch = useDispatch();

  const { salesTrend, salesTrendLoading, salesTrendError } = useSelector(
    (state) => state.adminReports,
  );

  const [range, setRange] = useState("30days");

  useEffect(() => {
    dispatch(fetchSalesTrend(range));
  }, [dispatch, range]);

  /*
   * API can return:
   *
   * [
   *   {
   *     date: "2026-08-01",
   *     revenue: 500,
   *     orders: 3
   *   }
   * ]
   *
   * OR:
   *
   * {
   *   success: true,
   *   range: "30days",
   *   trend: [...]
   * }
   *
   * OR:
   *
   * {
   *   success: true,
   *   data: [...]
   * }
   */

  const data = useMemo(() => {
    if (Array.isArray(salesTrend)) {
      return salesTrend;
    }

    if (Array.isArray(salesTrend?.trend)) {
      return salesTrend.trend;
    }

    if (Array.isArray(salesTrend?.data)) {
      return salesTrend.data;
    }

    return [];
  }, [salesTrend]);

  /*
   * Normalize API data
   */
  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: item.date || item.day || item.label || item.created_at || "",

      revenue: Number(
        item.revenue ?? item.total_revenue ?? item.sales ?? item.amount ?? 0,
      ),

      orders: Number(item.orders ?? item.total_orders ?? item.order_count ?? 0),
    }));
  }, [data]);

  /*
   * Summary calculations
   */
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  const totalOrders = chartData.reduce((sum, item) => sum + item.orders, 0);

  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const highestRevenue = Math.max(...chartData.map((item) => item.revenue), 0);

  const highestRevenueDay = chartData.find(
    (item) => item.revenue === highestRevenue,
  );

  const averageDailyRevenue =
    chartData.length > 0 ? totalRevenue / chartData.length : 0;

  /*
   * Date formatting
   */
  const formatDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatLongDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },

        minHeight: "100vh",

        bgcolor: "#F7F7F9",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

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
        spacing={2}
        sx={{
          mb: {
            xs: 3,
            md: 4,
          },
        }}
      >
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.2}
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

                background: "linear-gradient(135deg, #FF4FA3 0%, #E6328B 100%)",

                color: "#fff",

                boxShadow: "0 8px 20px rgba(230,50,139,0.22)",
              }}
            >
              <TrendingUpRoundedIcon />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 26,
                  md: 30,
                },
                fontWeight: 850,
                letterSpacing: "-0.7px",
                color: "#18181B",
              }}
            >
              Sales Trend
            </Typography>
          </Stack>

          <Typography
            sx={{
              color: "#71717A",
              fontSize: 14,
              ml: {
                xs: 0,
                sm: 0,
              },
            }}
          >
            Track revenue and orders over time
          </Typography>
        </Box>

        {/* DATE RANGE */}

        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          sx={{
            minWidth: 165,

            bgcolor: "#fff",

            borderRadius: 2.5,

            fontSize: 13.5,

            fontWeight: 700,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E4E4E7",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: PINK,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: PINK,
            },
          }}
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="7days">Last 7 Days</MenuItem>
          <MenuItem value="30days">Last 30 Days</MenuItem>
          <MenuItem value="90days">Last 90 Days</MenuItem>
        </Select>
      </Stack>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {salesTrendError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
          }}
        >
          {salesTrendError}
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
          title="Total Revenue"
          value={currency(totalRevenue)}
          subtitle="Revenue generated"
          icon={<CurrencyRupeeRoundedIcon />}
        />

        <SummaryCard
          title="Total Orders"
          value={number(totalOrders)}
          subtitle="Orders received"
          icon={<ShoppingBagRoundedIcon />}
        />

        <SummaryCard
          title="Average Order Value"
          value={currency(averageOrderValue)}
          subtitle="Average per order"
          icon={<ShowChartRoundedIcon />}
        />

        <SummaryCard
          title="Avg. Daily Revenue"
          value={currency(averageDailyRevenue)}
          subtitle="Daily average"
          icon={<TrendingUpRoundedIcon />}
        />
      </Box>

      {/* =====================================================
          MAIN CHART CARD
      ===================================================== */}

      <Card
        sx={{
          borderRadius: 4,

          border: "1px solid #ECECF0",

          boxShadow: "0 8px 30px rgba(0,0,0,0.045)",

          overflow: "hidden",

          mb: 3,
        }}
      >
        <CardContent
          sx={{
            p: {
              xs: 2.5,
              md: 3.5,
            },
            "&:last-child": {
              pb: {
                xs: 2.5,
                md: 3.5,
              },
            },
          }}
        >
          {/* Chart Header */}

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
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#18181B",
                }}
              >
                Revenue Performance
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#71717A",
                }}
              >
                Revenue generated during the selected period
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${PINK}, ${DARK_PINK})`,
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#71717A",
                }}
              >
                Revenue
              </Typography>
            </Stack>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* Loading */}

          {salesTrendLoading ? (
            <Box
              sx={{
                height: 380,

                display: "flex",

                flexDirection: "column",

                alignItems: "center",

                justifyContent: "center",

                gap: 1.5,
              }}
            >
              <CircularProgress
                size={32}
                thickness={4}
                sx={{
                  color: PINK,
                }}
              />

              <Typography
                sx={{
                  fontSize: 13,
                  color: "#71717A",
                }}
              >
                Loading sales trend...
              </Typography>
            </Box>
          ) : chartData.length === 0 ? (
            <Box
              sx={{
                height: 380,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#71717A",
                  fontSize: 14,
                }}
              >
                No sales trend data available
              </Typography>
            </Box>
          ) : (
            <RevenueChart
              chartData={chartData}
              maxRevenue={highestRevenue}
              formatDate={formatDate}
            />
          )}
        </CardContent>
      </Card>

      {/* =====================================================
          BEST PERFORMING DAY
      ===================================================== */}

      {chartData.length > 0 && (
        <Card
          sx={{
            borderRadius: 4,

            border: "1px solid #ECECF0",

            boxShadow: "0 8px 30px rgba(0,0,0,0.04)",

            mb: 3,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2.5,
                md: 3,
              },
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
              spacing={2}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2.5,

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    bgcolor: LIGHT_PINK,
                    color: PINK,
                  }}
                >
                  <TrendingUpRoundedIcon />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#71717A",
                      fontWeight: 600,
                    }}
                  >
                    Best Performing Day
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#18181B",
                    }}
                  >
                    {highestRevenueDay
                      ? formatLongDate(highestRevenueDay.date)
                      : "-"}
                  </Typography>
                </Box>
              </Stack>

              <Box
                sx={{
                  textAlign: {
                    xs: "left",
                    sm: "right",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#71717A",
                  }}
                >
                  Revenue
                </Typography>

                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: 850,
                    color: DARK_PINK,
                  }}
                >
                  {currency(highestRevenue)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* =====================================================
          DAILY SALES
      ===================================================== */}

      {chartData.length > 0 && (
        <Card
          sx={{
            borderRadius: 4,

            border: "1px solid #ECECF0",

            boxShadow: "0 8px 30px rgba(0,0,0,0.04)",

            overflow: "hidden",
          }}
        >
          <CardContent
            sx={{
              p: 0,
            }}
          >
            <Box
              sx={{
                p: {
                  xs: 2.5,
                  md: 3,
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 800,
                  color: "#18181B",
                }}
              >
                Daily Sales
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#71717A",
                }}
              >
                Detailed revenue and order performance
              </Typography>
            </Box>

            <Divider />

            {chartData.map((item, index) => (
              <Box
                key={`${item.date}-${index}`}
                sx={{
                  px: {
                    xs: 2.5,
                    md: 3,
                  },

                  py: 2,

                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  gap: 2,

                  borderBottom:
                    index !== chartData.length - 1
                      ? "1px solid #F0F0F2"
                      : "none",

                  transition: "background 0.2s ease",

                  "&:hover": {
                    bgcolor: "#FFF8FC",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: 2,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      bgcolor: LIGHT_PINK,
                      color: PINK,
                    }}
                  >
                    <ShoppingBagRoundedIcon
                      sx={{
                        fontSize: 18,
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#27272A",
                      }}
                    >
                      {formatDate(item.date)}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#71717A",
                        mt: 0.2,
                      }}
                    >
                      {number(item.orders)}{" "}
                      {item.orders === 1 ? "order" : "orders"}
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 850,
                    color: DARK_PINK,
                  }}
                >
                  {currency(item.revenue)}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

/* ============================================================
   SUMMARY CARD
============================================================ */

const SummaryCard = ({ title, value, subtitle, icon }) => {
  return (
    <Card
      sx={{
        borderRadius: 3.5,

        border: "1px solid #ECECF0",

        boxShadow: "0 6px 22px rgba(0,0,0,0.035)",

        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",

          boxShadow: "0 10px 28px rgba(0,0,0,0.07)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.5,

          "&:last-child": {
            pb: 2.5,
          },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 600,
                color: "#71717A",
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                mt: 0.8,

                fontSize: {
                  xs: 20,
                  md: 22,
                },

                fontWeight: 850,

                letterSpacing: "-0.4px",

                color: "#18181B",
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,

                fontSize: 11.5,

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

              borderRadius: 2.5,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              bgcolor: LIGHT_PINK,

              color: PINK,
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
   REVENUE CHART
============================================================ */

const RevenueChart = ({ chartData, maxRevenue, formatDate }) => {
  return (
    <Box>
      {/* Chart */}

      <Box
        sx={{
          height: {
            xs: 280,
            sm: 340,
          },

          position: "relative",

          display: "flex",

          alignItems: "flex-end",

          gap: {
            xs: 0.5,
            sm: 1,
          },

          px: 1,

          overflowX: "auto",

          overflowY: "hidden",

          "&::-webkit-scrollbar": {
            height: 5,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E4E4E7",
            borderRadius: 10,
          },
        }}
      >
        {/* Grid */}

        <Box
          sx={{
            position: "absolute",

            left: 0,
            right: 0,
            top: 0,
            bottom: 0,

            display: "flex",

            flexDirection: "column",

            justifyContent: "space-between",

            pointerEvents: "none",
          }}
        >
          {[0, 1, 2, 3, 4].map((line) => (
            <Box
              key={line}
              sx={{
                borderTop: "1px dashed rgba(113,113,122,0.18)",

                width: "100%",
              }}
            />
          ))}
        </Box>

        {/* Bars */}

        {chartData.map((item, index) => {
          const percentage =
            maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;

          const height = item.revenue > 0 ? Math.max(percentage, 3) : 1;

          return (
            <Box
              key={`${item.date}-${index}`}
              sx={{
                minWidth: {
                  xs: 42,
                  sm: 52,
                },

                flex: chartData.length <= 12 ? 1 : "none",

                height: "100%",

                display: "flex",

                alignItems: "flex-end",

                justifyContent: "center",

                position: "relative",

                zIndex: 1,

                "&:hover .revenue-bar": {
                  opacity: 0.85,

                  transform: "translateY(-3px)",
                },

                "&:hover .revenue-label": {
                  opacity: 1,
                },
              }}
            >
              {/* Revenue label */}

              <Box
                className="revenue-label"
                sx={{
                  position: "absolute",

                  bottom: `calc(${height}% + 8px)`,

                  left: "50%",

                  transform: "translateX(-50%)",

                  opacity: chartData.length <= 15 ? 1 : 0,

                  transition: "opacity 0.2s ease",

                  whiteSpace: "nowrap",

                  zIndex: 3,

                  px: 0.7,

                  py: 0.3,

                  borderRadius: 1,

                  bgcolor: "#18181B",

                  color: "#fff",

                  fontSize: 9,

                  fontWeight: 700,
                }}
              >
                {currency(item.revenue)}
              </Box>

              {/* Bar */}

              <Box
                className="revenue-bar"
                sx={{
                  width: {
                    xs: 20,
                    sm: 28,
                  },

                  height: `${height}%`,

                  minHeight: item.revenue > 0 ? 7 : 2,

                  borderRadius: "7px 7px 3px 3px",

                  background:
                    "linear-gradient(180deg, #FF4FA3 0%, #E6328B 100%)",

                  boxShadow: "0 4px 12px rgba(230,50,139,0.18)",

                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
              />
            </Box>
          );
        })}
      </Box>

      {/* Date labels */}

      <Box
        sx={{
          display: "flex",

          gap: {
            xs: 0.5,
            sm: 1,
          },

          px: 1,

          mt: 1.2,

          overflowX: "auto",

          "&::-webkit-scrollbar": {
            height: 4,
          },

          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#E4E4E7",
            borderRadius: 10,
          },
        }}
      >
        {chartData.map((item, index) => (
          <Box
            key={`${item.date}-label-${index}`}
            sx={{
              minWidth: {
                xs: 42,
                sm: 52,
              },

              flex: chartData.length <= 12 ? 1 : "none",

              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 9.5,

                color: "#71717A",

                whiteSpace: "nowrap",
              }}
            >
              {formatDate(item.date)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Chart footer */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        justifyContent="space-between"
        spacing={1}
        sx={{
          mt: 3,

          px: 1.5,

          py: 1.5,

          borderRadius: 2.5,

          bgcolor: "#FAFAFB",
        }}
      >
        <Typography
          sx={{
            fontSize: 12,

            color: "#71717A",
          }}
        >
          Highest revenue
        </Typography>

        <Typography
          sx={{
            fontSize: 12,

            fontWeight: 800,

            color: DARK_PINK,
          }}
        >
          {currency(maxRevenue)}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SalesTrendReport;
