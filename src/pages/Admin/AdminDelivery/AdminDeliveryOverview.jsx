import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import PersonOffRoundedIcon from "@mui/icons-material/PersonOffRounded";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAdminDeliveryPartners,
  fetchAdminDeliveryHistory,
} from "../../redux/slices/adminDeliverySlice";

const AdminDeliveryOverview = () => {
  const dispatch = useDispatch();

  const {
    partners = [],
    history = [],
    loading,
    historyLoading,
  } = useSelector((state) => state.adminDelivery || {});

  useEffect(() => {
    dispatch(fetchAdminDeliveryPartners());
    dispatch(fetchAdminDeliveryHistory());
  }, [dispatch]);

  const totalPartners = partners.length;

  const activePartners = partners.filter((partner) => partner.is_active).length;

  const availablePartners = partners.filter(
    (partner) => partner.status === "available" && partner.is_active,
  ).length;

  const busyPartners = partners.filter(
    (partner) => partner.status === "busy",
  ).length;

  const offlinePartners = partners.filter(
    (partner) => partner.status === "offline",
  ).length;

  const cards = [
    {
      title: "Total Partners",
      value: totalPartners,
      icon: <PeopleAltRoundedIcon />,
    },
    {
      title: "Active Partners",
      value: activePartners,
      icon: <CheckCircleRoundedIcon />,
    },
    {
      title: "Available",
      value: availablePartners,
      icon: <LocalShippingRoundedIcon />,
    },
    {
      title: "Busy",
      value: busyPartners,
      icon: <LocalShippingRoundedIcon />,
    },
    {
      title: "Offline",
      value: offlinePartners,
      icon: <PersonOffRoundedIcon />,
    },
    {
      title: "Deliveries",
      value: history.length,
      icon: <HistoryRoundedIcon />,
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Delivery Overview
          </Typography>

          <Typography color="text.secondary" mt={0.5}>
            Manage delivery partners and monitor deliveries.
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={2.5}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={card.title}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "primary.light",
                      color: "primary.main",
                    }}
                  >
                    {card.icon}
                  </Box>

                  <Typography color="text.secondary">{card.title}</Typography>

                  {loading || historyLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Typography variant="h4" fontWeight={700}>
                      {card.value}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDeliveryOverview;
