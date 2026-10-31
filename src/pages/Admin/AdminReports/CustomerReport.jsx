import React, { useEffect, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

import { fetchCustomerReport } from "../../../redux/slices/adminReportSlice";

const GRABIT_PINK = "#FF4FA3";
const GRABIT_DARK = "#111111";

const currency = (value) =>
  `₹${Number(value ?? 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const number = (value) => Number(value ?? 0).toLocaleString("en-IN");

const CustomerReport = () => {
  const dispatch = useDispatch();

  const { customerOverview, customers, customerLoading, customerError } =
    useSelector((state) => state.adminReports);

  const [range, setRange] = useState("30days");

  useEffect(() => {
    dispatch(fetchCustomerReport(range));
  }, [dispatch, range]);

  const data = Array.isArray(customers) ? customers : [];

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
              <PeopleRoundedIcon />
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
              Customer Report
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: 14,
              ml: {
                xs: 0,
                sm: 0.2,
              },
            }}
          >
            Customer activity and purchase performance
          </Typography>
        </Box>

        {/* Date Range */}
        <Select
          size="small"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          disabled={customerLoading}
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
      {customerError && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2.5,
            bgcolor: "#FFF5F5",
            border: "1px solid #FECACA",
            alignItems: "center",
          }}
        >
          {customerError}
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
            title="Total Customers"
            value={number(customerOverview?.total_customers)}
            icon={<PeopleRoundedIcon />}
            loading={customerLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="New Customers"
            value={number(customerOverview?.new_customers)}
            icon={<PersonAddAltRoundedIcon />}
            loading={customerLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Active Customers"
            value={number(customerOverview?.active_customers)}
            icon={<TrendingUpRoundedIcon />}
            loading={customerLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Customer Revenue"
            value={currency(customerOverview?.total_revenue)}
            icon={<CurrencyRupeeRoundedIcon />}
            loading={customerLoading}
          />
        </Grid>
      </Grid>

      {/* =====================================================
          CUSTOMER PERFORMANCE
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
        {/* Card Header */}
        <CardContent
          sx={{
            px: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },
            pt: {
              xs: 2.5,
              md: 3,
            },
            pb: 2,
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
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: GRABIT_DARK,
                  letterSpacing: "-0.2px",
                }}
              >
                Customer Performance
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  fontSize: 13,
                }}
              >
                Customer orders and revenue performance
              </Typography>
            </Box>

            {!customerLoading && data.length > 0 && (
              <Chip
                icon={<GroupsRoundedIcon />}
                label={`${number(data.length)} customers`}
                size="small"
                sx={{
                  height: 32,
                  px: 0.5,
                  borderRadius: 2,
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

        {/* =====================================================
            TABLE
        ===================================================== */}
        {customerLoading ? (
          <LoadingState />
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <TableContainer
            sx={{
              overflowX: "auto",
              "&::-webkit-scrollbar": {
                height: 5,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#D4D4D8",
                borderRadius: 10,
              },
            }}
          >
            <Table
              sx={{
                minWidth: 620,
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
                      py: 1.8,
                      px: {
                        xs: 2,
                        md: 3,
                      },
                      borderBottom: "1px solid #EEEEF1",
                      color: "#71717A",
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 0.7,
                    }}
                  >
                    Customer
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      py: 1.8,
                      px: {
                        xs: 2,
                        md: 3,
                      },
                      borderBottom: "1px solid #EEEEF1",
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
                      px: {
                        xs: 2,
                        md: 3,
                      },
                      borderBottom: "1px solid #EEEEF1",
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
                {data.map((customer, index) => {
                  const customerName =
                    customer.customer_name ||
                    customer.name ||
                    customer.email ||
                    "Unknown Customer";

                  const orders = customer.orders ?? customer.total_orders ?? 0;

                  const revenue =
                    customer.revenue ?? customer.total_revenue ?? 0;

                  return (
                    <TableRow
                      key={`${customer.customer_id ?? "customer"}-${index}`}
                      hover
                      sx={{
                        transition: "background-color 0.15s ease",

                        "&:hover": {
                          bgcolor: "rgba(255,79,163,0.025)",
                        },

                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      {/* Customer */}
                      <TableCell
                        sx={{
                          px: {
                            xs: 2,
                            md: 3,
                          },
                          py: 2,
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >
                          <CustomerAvatar name={customerName} index={index} />

                          <Box
                            sx={{
                              minWidth: 0,
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 750,
                                fontSize: 14,
                                color: "#18181B",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: {
                                  xs: 180,
                                  sm: 280,
                                  md: 400,
                                },
                              }}
                            >
                              {customerName}
                            </Typography>

                            {customer.email &&
                              customer.customer_name &&
                              customer.email !== customer.customer_name && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    display: "block",
                                    mt: 0.25,
                                  }}
                                >
                                  {customer.email}
                                </Typography>
                              )}
                          </Box>
                        </Stack>
                      </TableCell>

                      {/* Orders */}
                      <TableCell
                        align="right"
                        sx={{
                          px: {
                            xs: 2,
                            md: 3,
                          },
                          py: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#3F3F46",
                          }}
                        >
                          {number(orders)}
                        </Typography>
                      </TableCell>

                      {/* Revenue */}
                      <TableCell
                        align="right"
                        sx={{
                          px: {
                            xs: 2,
                            md: 3,
                          },
                          py: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: GRABIT_PINK,
                          }}
                        >
                          {currency(revenue)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Bottom Padding */}
        {!customerLoading && data.length > 0 && (
          <Box
            sx={{
              height: {
                xs: 8,
                md: 12,
              },
            }}
          />
        )}
      </Card>
    </Box>
  );
};

/* ============================================================
   METRIC CARD
============================================================ */

const MetricCard = ({ title, value, icon, loading }) => {
  return (
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
          boxShadow: "0 8px 24px rgba(17,17,17,0.07)",
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
          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="body2"
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
                  xs: 22,
                  md: 24,
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
};

/* ============================================================
   CUSTOMER AVATAR
============================================================ */

const CustomerAvatar = ({ name, index }) => {
  const firstLetter = String(name || "C")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        flexShrink: 0,
        borderRadius: 2.2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor:
          index % 2 === 0 ? "rgba(255,79,163,0.10)" : "rgba(17,17,17,0.06)",
        color: index % 2 === 0 ? GRABIT_PINK : "#52525B",
        fontSize: 14,
        fontWeight: 800,
      }}
    >
      {firstLetter}
    </Box>
  );
};

/* ============================================================
   LOADING
============================================================ */

const LoadingState = () => (
  <Box
    sx={{
      py: {
        xs: 7,
        md: 9,
      },
      px: 3,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        mx: "auto",
        mb: 2,
        borderRadius: "50%",
        border: "3px solid rgba(255,79,163,0.15)",
        borderTopColor: "#FF4FA3",
        animation: "customerReportSpin 0.9s linear infinite",

        "@keyframes customerReportSpin": {
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
        fontSize: 14,
        fontWeight: 600,
        color: "#71717A",
      }}
    >
      Loading customer report...
    </Typography>
  </Box>
);

/* ============================================================
   EMPTY
============================================================ */

const EmptyState = () => (
  <Box
    sx={{
      py: {
        xs: 7,
        md: 9,
      },
      px: 3,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        width: 56,
        height: 56,
        mx: "auto",
        mb: 2,
        borderRadius: 3,
        bgcolor: "rgba(255,79,163,0.08)",
        color: GRABIT_PINK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <PeopleRoundedIcon />
    </Box>

    <Typography
      sx={{
        fontWeight: 800,
        fontSize: 15,
        color: "#27272A",
        mb: 0.5,
      }}
    >
      No customer data found
    </Typography>

    <Typography
      sx={{
        fontSize: 13,
        color: "#71717A",
      }}
    >
      Customer activity will appear here when available.
    </Typography>
  </Box>
);

export default CustomerReport;
