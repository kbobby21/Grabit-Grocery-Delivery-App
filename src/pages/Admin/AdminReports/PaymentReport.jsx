import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { fetchPaymentReport } from "../../../redux/slices/adminReportSlice";

const GRABIT_PINK = "#FF4FA3";
const GRABIT_DARK = "#111111";

const chartColors = [
  "#FF4FA3",
  "#7C3AED",
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#8B5CF6",
];

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

const PaymentReport = () => {
  const dispatch = useDispatch();

  const { paymentOverview, paymentMethods, paymentLoading, paymentError } =
    useSelector((state) => state.adminReports);

  const [range, setRange] = useState("30days");

  useEffect(() => {
    dispatch(fetchPaymentReport(range));
  }, [dispatch, range]);

  const methods = Array.isArray(paymentMethods) ? paymentMethods : [];

  /*
   * =========================================================
   * CHART DATA
   * Uses the existing paymentMethods response.
   * No API changes required.
   * =========================================================
   */

  const totalTransactions = useMemo(() => {
    return methods.reduce(
      (sum, method) => sum + Number(method.transactions ?? 0),
      0,
    );
  }, [methods]);

  const totalRevenue = useMemo(() => {
    return methods.reduce(
      (sum, method) => sum + Number(method.revenue ?? 0),
      0,
    );
  }, [methods]);

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
          lg: 4,
        },
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
                bgcolor: "rgba(255,79,163,0.10)",
                color: GRABIT_PINK,
              }}
            >
              <PaymentRoundedIcon />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: GRABIT_DARK,
                letterSpacing: "-0.7px",
                fontSize: {
                  xs: 27,
                  md: 32,
                },
              }}
            >
              Payment Report
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: 14,
            }}
          >
            Payment methods and transaction performance
          </Typography>
        </Box>

        {/* DATE RANGE */}

        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          disabled={paymentLoading}
          sx={{
            minWidth: 165,
            height: 42,
            bgcolor: "#fff",
            borderRadius: 2.5,
            fontSize: 13.5,
            fontWeight: 600,

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E5EA",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: GRABIT_PINK,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: GRABIT_PINK,
              borderWidth: 1.5,
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

      {paymentError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
            bgcolor: "#FFF5F5",
            border: "1px solid #FECACA",
          }}
        >
          {paymentError}
        </Alert>
      )}

      {/* =====================================================
          METRICS
      ===================================================== */}

      <Grid
        container
        spacing={{
          xs: 1.5,
          sm: 2,
          md: 2.5,
        }}
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Transactions"
            value={number(paymentOverview?.total_transactions)}
            icon={<PaymentRoundedIcon />}
            loading={paymentLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Successful Transactions"
            value={number(paymentOverview?.successful_transactions)}
            icon={<CheckCircleRoundedIcon />}
            loading={paymentLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Successful Revenue"
            value={currency(paymentOverview?.successful_revenue)}
            icon={<CurrencyRupeeRoundedIcon />}
            loading={paymentLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Failed Transactions"
            value={number(paymentOverview?.failed_transactions)}
            icon={<ErrorOutlineRoundedIcon />}
            loading={paymentLoading}
          />
        </Grid>
      </Grid>

      {/* =====================================================
          CHARTS
      ===================================================== */}

      <Grid
        container
        spacing={{
          xs: 2,
          md: 2.5,
        }}
        sx={{ mb: 3 }}
      >
        {/* TRANSACTION DISTRIBUTION */}

        <Grid item xs={12} lg={5}>
          <Card
            sx={{
              height: "100%",
              minHeight: 380,
              borderRadius: 3.5,
              border: "1px solid #EBEBEF",
              boxShadow: "0 4px 20px rgba(17,17,17,0.035)",
              bgcolor: "#fff",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  md: 3,
                },
                "&:last-child": {
                  pb: 3,
                },
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: 17,
                    color: GRABIT_DARK,
                  }}
                >
                  Transaction Distribution
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 13,
                    color: "#71717A",
                  }}
                >
                  Transactions by payment method
                </Typography>
              </Box>

              {paymentLoading ? (
                <ChartLoading />
              ) : methods.length === 0 ? (
                <ChartEmpty />
              ) : (
                <TransactionDonut
                  methods={methods}
                  totalTransactions={totalTransactions}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* REVENUE BY PAYMENT METHOD */}

        <Grid item xs={12} lg={7}>
          <Card
            sx={{
              height: "100%",
              minHeight: 380,
              borderRadius: 3.5,
              border: "1px solid #EBEBEF",
              boxShadow: "0 4px 20px rgba(17,17,17,0.035)",
              bgcolor: "#fff",
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2.5,
                  md: 3,
                },
                "&:last-child": {
                  pb: 3,
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                sx={{ mb: 3 }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: 17,
                      color: GRABIT_DARK,
                    }}
                  >
                    Revenue by Payment Method
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      fontSize: 13,
                      color: "#71717A",
                    }}
                  >
                    Payment revenue performance
                  </Typography>
                </Box>

                <Chip
                  label={currency(totalRevenue)}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,79,163,0.08)",
                    color: GRABIT_PINK,
                    fontWeight: 800,
                    borderRadius: 2,
                  }}
                />
              </Stack>

              {paymentLoading ? (
                <ChartLoading />
              ) : methods.length === 0 ? (
                <ChartEmpty />
              ) : (
                <RevenueBars methods={methods} />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* =====================================================
          PAYMENT METHODS DETAIL
      ===================================================== */}

      <Card
        sx={{
          borderRadius: 3.5,
          border: "1px solid #EBEBEF",
          boxShadow: "0 4px 20px rgba(17,17,17,0.035)",
          overflow: "hidden",
          bgcolor: "#fff",
        }}
      >
        <CardContent
          sx={{
            px: {
              xs: 2.5,
              md: 3,
            },
            pt: 3,
            pb: 2.5,
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
            spacing={1}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 17,
                  color: GRABIT_DARK,
                }}
              >
                Payment Methods
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                  color: "#71717A",
                }}
              >
                Detailed payment method performance
              </Typography>
            </Box>

            {!paymentLoading && methods.length > 0 && (
              <Chip
                icon={<TrendingUpRoundedIcon />}
                label={`${number(methods.length)} methods`}
                size="small"
                sx={{
                  height: 31,
                  bgcolor: "rgba(255,79,163,0.08)",
                  color: GRABIT_PINK,
                  fontWeight: 700,

                  "& .MuiChip-icon": {
                    color: GRABIT_PINK,
                    fontSize: 17,
                  },
                }}
              />
            )}
          </Stack>
        </CardContent>

        <Divider sx={{ borderColor: "#F0F0F2" }} />

        {paymentLoading ? (
          <ChartLoading height={220} />
        ) : methods.length === 0 ? (
          <ChartEmpty height={220} />
        ) : (
          <Stack
            spacing={1.5}
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
            }}
          >
            {methods.map((method, index) => (
              <PaymentMethodRow
                key={`${method.payment_method}-${index}`}
                method={method}
                index={index}
              />
            ))}
          </Stack>
        )}
      </Card>
    </Box>
  );
};

/* ============================================================
   METRIC CARD
============================================================ */

const MetricCard = ({ title, value, icon, loading }) => (
  <Card
    sx={{
      height: "100%",
      borderRadius: 3.5,
      border: "1px solid #EBEBEF",
      boxShadow: "0 4px 18px rgba(17,17,17,0.035)",
      bgcolor: "#fff",
      transition: "all 0.2s ease",

      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(17,17,17,0.07)",
        borderColor: "rgba(255,79,163,0.2)",
      },
    }}
  >
    <CardContent
      sx={{
        p: {
          xs: 2,
          sm: 2.25,
          md: 2.5,
        },
        "&:last-child": {
          pb: {
            xs: 2,
            sm: 2.25,
            md: 2.5,
          },
        },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Box>
          <Typography
            sx={{
              color: "#71717A",
              fontSize: 12.5,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              fontSize: {
                xs: 21,
                md: 23,
              },
              fontWeight: 800,
              color: GRABIT_DARK,
              letterSpacing: "-0.4px",
            }}
          >
            {loading ? "..." : value}
          </Typography>
        </Box>

        <Box
          sx={{
            flexShrink: 0,
            width: 46,
            height: 46,
            borderRadius: 2.5,
            bgcolor: "rgba(255,79,163,0.09)",
            color: GRABIT_PINK,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            "& svg": {
              fontSize: 22,
            },
          }}
        >
          {icon}
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

/* ============================================================
   DONUT CHART
============================================================ */

const TransactionDonut = ({ methods, totalTransactions }) => {
  const radius = 76;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;

  const segments = methods.map((method, index) => {
    const transactions = Number(method.transactions ?? 0);

    const percentage =
      totalTransactions > 0 ? transactions / totalTransactions : 0;

    const dashLength = percentage * circumference;

    const segment = {
      ...method,
      transactions,
      percentage,
      dashLength,
      offset: accumulated,
      color: chartColors[index % chartColors.length],
    };

    accumulated += dashLength;

    return segment;
  });

  return (
    <Box>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignItems="center"
        justifyContent="center"
        spacing={{
          xs: 3,
          sm: 4,
        }}
      >
        {/* DONUT */}

        <Box
          sx={{
            position: "relative",
            width: 220,
            height: 220,
            flexShrink: 0,
          }}
        >
          <svg
            width="220"
            height="220"
            viewBox="0 0 220 220"
            style={{
              transform: "rotate(-90deg)",
            }}
          >
            {/* Background */}

            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#F1F1F4"
              strokeWidth="24"
            />

            {/* Segments */}

            {segments.map((segment, index) => (
              <circle
                key={`${segment.payment_method}-${index}`}
                cx="110"
                cy="110"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="24"
                strokeDasharray={`${segment.dashLength} ${
                  circumference - segment.dashLength
                }`}
                strokeDashoffset={-segment.offset}
                strokeLinecap="butt"
              />
            ))}
          </svg>

          {/* Center */}

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 25,
                fontWeight: 800,
                color: GRABIT_DARK,
              }}
            >
              {number(totalTransactions)}
            </Typography>

            <Typography
              sx={{
                fontSize: 11,
                color: "#71717A",
                fontWeight: 600,
              }}
            >
              Transactions
            </Typography>
          </Box>
        </Box>

        {/* LEGEND */}

        <Stack
          spacing={1.3}
          sx={{
            width: "100%",
            maxWidth: 230,
          }}
        >
          {segments.map((segment, index) => (
            <Stack
              key={`${segment.payment_method}-legend-${index}`}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    bgcolor: segment.color,
                    flexShrink: 0,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 650,
                    color: "#3F3F46",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {segment.payment_method || "Unknown"}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: GRABIT_DARK,
                }}
              >
                {Math.round(segment.percentage * 100)}%
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

/* ============================================================
   REVENUE BAR CHART
============================================================ */

const RevenueBars = ({ methods }) => {
  const maxRevenue = Math.max(
    ...methods.map((method) => Number(method.revenue ?? 0)),
    1,
  );

  return (
    <Stack spacing={2.2}>
      {methods.map((method, index) => {
        const revenue = Number(method.revenue ?? 0);

        const percentage = Math.max(
          (revenue / maxRevenue) * 100,
          revenue > 0 ? 3 : 0,
        );

        return (
          <Box key={`${method.payment_method}-revenue-${index}`}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 0.8 }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: chartColors[index % chartColors.length],
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#3F3F46",
                  }}
                >
                  {method.payment_method || "Unknown"}
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: GRABIT_DARK,
                }}
              >
                {currency(revenue)}
              </Typography>
            </Stack>

            <Box
              sx={{
                height: 9,
                borderRadius: 10,
                bgcolor: "#F1F1F4",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${percentage}%`,
                  height: "100%",
                  borderRadius: 10,
                  bgcolor: chartColors[index % chartColors.length],
                  transition: "width 0.5s ease",
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
};

/* ============================================================
   PAYMENT METHOD ROW
============================================================ */

const PaymentMethodRow = ({ method, index }) => {
  return (
    <Box
      sx={{
        p: {
          xs: 1.8,
          sm: 2,
        },
        borderRadius: 2.5,
        bgcolor: "#FAFAFB",
        border: "1px solid transparent",
        transition: "all 0.18s ease",

        "&:hover": {
          bgcolor: "#FFF8FC",
          borderColor: "rgba(255,79,163,0.12)",
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
        {/* Left */}

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor:
                index % 2 === 0
                  ? "rgba(255,79,163,0.09)"
                  : "rgba(17,17,17,0.06)",
              color: index % 2 === 0 ? GRABIT_PINK : "#52525B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PaymentRoundedIcon
              sx={{
                fontSize: 20,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 14,
                color: "#27272A",
              }}
            >
              {method.payment_method || "Unknown"}
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: 12,
                color: "#71717A",
              }}
            >
              {number(method.transactions)} transactions
            </Typography>
          </Box>
        </Stack>

        {/* Right */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 2,
            sm: 4,
          }}
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
            justifyContent: {
              xs: "space-between",
              sm: "flex-end",
            },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 11,
                color: "#71717A",
                mb: 0.25,
              }}
            >
              Successful
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 750,
                color: "#16A34A",
              }}
            >
              {number(method.successful_transactions)}
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: "right",
              minWidth: 90,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                color: "#71717A",
                mb: 0.25,
              }}
            >
              Revenue
            </Typography>

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 800,
                color: GRABIT_PINK,
              }}
            >
              {currency(method.revenue)}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

/* ============================================================
   LOADING
============================================================ */

const ChartLoading = ({ height = 250 }) => (
  <Box
    sx={{
      minHeight: height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "3px solid rgba(255,79,163,0.15)",
        borderTopColor: GRABIT_PINK,
        animation: "paymentReportSpin 0.9s linear infinite",

        "@keyframes paymentReportSpin": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      }}
    />

    <Typography
      sx={{
        mt: 2,
        fontSize: 13,
        color: "#71717A",
        fontWeight: 600,
      }}
    >
      Loading payment report...
    </Typography>
  </Box>
);

/* ============================================================
   EMPTY
============================================================ */

const ChartEmpty = ({ height = 250 }) => (
  <Box
    sx={{
      minHeight: height,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      sx={{
        width: 52,
        height: 52,
        borderRadius: 2.5,
        bgcolor: "rgba(255,79,163,0.08)",
        color: GRABIT_PINK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 1.5,
      }}
    >
      <PaymentRoundedIcon />
    </Box>

    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 800,
        color: "#27272A",
      }}
    >
      No payment data found
    </Typography>

    <Typography
      sx={{
        mt: 0.5,
        fontSize: 12.5,
        color: "#71717A",
      }}
    >
      Payment activity will appear here when available.
    </Typography>
  </Box>
);

export default PaymentReport;
