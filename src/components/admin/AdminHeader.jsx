import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const AdminHeader = ({ onMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        ml: {
          xs: 0,
          md: "260px",
        },
        width: {
          xs: "100%",
          md: "calc(100% - 260px)",
        },
        bgcolor: "#FFFFFF",
        color: "#111111",
        borderBottom: "1px solid #E5E7EB",
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "76px !important",
          px: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {/* Mobile menu */}
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            mr: 1,
          }}
        >
          <MenuRoundedIcon />
        </IconButton>

        {/* Page / brand area */}
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: {
                xs: 16,
                md: 18,
              },
              fontWeight: 700,
              color: "#111111",
            }}
          >
            Grabit Admin
          </Typography>

          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
              fontSize: 12,
              color: "#6B7280",
            }}
          >
            Manage your grocery platform
          </Typography>
        </Box>

        {/* Notification */}
        <IconButton
          sx={{
            mr: 1,
            color: "#555",
          }}
        >
          <NotificationsNoneRoundedIcon />
        </IconButton>

        {/* Admin avatar */}
        <Avatar
          sx={{
            width: 38,
            height: 38,
            bgcolor: "#FF4FA3",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          BK
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
