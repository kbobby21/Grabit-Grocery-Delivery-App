import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchAllDeliveryPartners,
  updateAdminDeliveryPartnerStatus,
} from "../../../redux/slices/adminDeliverySlice";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "available":
      return "success";

    case "online":
      return "info";

    case "busy":
      return "warning";

    case "offline":
    default:
      return "default";
  }
};

const AdminDeliveryPartners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { partners, loading, error, statusLoading } = useSelector(
    (state) => state.adminDelivery,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchAllDeliveryPartners());
  }, [dispatch]);

  const filteredPartners = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return partners;
    }

    return partners.filter((partner) => {
      return (
        String(partner.id).includes(value) ||
        partner.name?.toLowerCase().includes(value) ||
        partner.phone?.toLowerCase().includes(value) ||
        partner.email?.toLowerCase().includes(value) ||
        partner.vehicle_type?.toLowerCase().includes(value) ||
        partner.vehicle_number?.toLowerCase().includes(value) ||
        partner.status?.toLowerCase().includes(value)
      );
    });
  }, [partners, search]);

  const handleRefresh = () => {
    dispatch(fetchAllDeliveryPartners());
  };

  const handleToggleActive = (partner) => {
    dispatch(
      updateAdminDeliveryPartnerStatus({
        partnerId: partner.id,
        data: {
          isActive: !partner.is_active,
        },
      }),
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Delivery Partners
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage delivery partners, availability and delivery activity.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
          onClick={() => {
            navigate("/admin/delivery/partners/create");
          }}
        >
          Add Delivery Partner
        </Button>
      </Stack>

      {/* SUMMARY CARDS */}
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
        <Card sx={{ p: 2.5, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Total Partners
          </Typography>

          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
            {partners.length}
          </Typography>
        </Card>

        <Card sx={{ p: 2.5, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Available
          </Typography>

          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
            {
              partners.filter(
                (partner) =>
                  partner.status === "available" && partner.is_active === true,
              ).length
            }
          </Typography>
        </Card>

        <Card sx={{ p: 2.5, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Busy
          </Typography>

          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
            {partners.filter((partner) => partner.status === "busy").length}
          </Typography>
        </Card>

        <Card sx={{ p: 2.5, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Offline
          </Typography>

          <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
            {partners.filter((partner) => partner.status === "offline").length}
          </Typography>
        </Card>
      </Box>

      {/* TABLE CARD */}
      <Card sx={{ borderRadius: 3 }}>
        <Box sx={{ p: 2.5 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <TextField
              size="small"
              placeholder="Search delivery partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: {
                  xs: "100%",
                  md: 350,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton onClick={handleRefresh} disabled={loading}>
              <RefreshRoundedIcon />
            </IconButton>
          </Stack>
        </Box>

        <Divider />

        {loading ? (
          <Box
            sx={{
              minHeight: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="error">{error}</Typography>

            <Button sx={{ mt: 2 }} variant="outlined" onClick={handleRefresh}>
              Retry
            </Button>
          </Box>
        ) : filteredPartners.length === 0 ? (
          <Box sx={{ p: 5, textAlign: "center" }}>
            <Typography fontWeight={600}>No delivery partners found</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {search
                ? "Try a different search."
                : "No delivery partners have been added yet."}
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>

                  <TableCell>Partner</TableCell>

                  <TableCell>Contact</TableCell>

                  <TableCell>Vehicle</TableCell>

                  <TableCell>Status</TableCell>

                  <TableCell>Active</TableCell>

                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredPartners.map((partner) => (
                  <TableRow key={partner.id} hover>
                    <TableCell>#{partner.id}</TableCell>

                    <TableCell>
                      <Typography fontWeight={600}>{partner.name}</Typography>

                      {partner.email && (
                        <Typography variant="caption" color="text.secondary">
                          {partner.email}
                        </Typography>
                      )}
                    </TableCell>

                    <TableCell>{partner.phone || "-"}</TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {partner.vehicle_type || "-"}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        {partner.vehicle_number || ""}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={partner.status || "offline"}
                        color={getStatusColor(partner.status)}
                        size="small"
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={partner.is_active ? "Active" : "Inactive"}
                        color={partner.is_active ? "success" : "default"}
                        size="small"
                        onClick={() => handleToggleActive(partner)}
                        disabled={statusLoading}
                        sx={{
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={0.5}
                      >
                        <IconButton
                          size="small"
                          title="View"
                          onClick={() =>
                            navigate(`/admin/delivery/partners/${partner.id}`)
                          }
                        >
                          <VisibilityRoundedIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          title="Edit"
                          onClick={() => {
                            // Edit partner next
                          }}
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
};

export default AdminDeliveryPartners;
