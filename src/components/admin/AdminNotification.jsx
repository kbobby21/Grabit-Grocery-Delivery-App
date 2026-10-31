import React from "react";

import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

const AdminNotification = ({ notifications = [], onClose, onClick }) => {
  if (!notifications.length) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,

        width: {
          xs: "calc(100% - 32px)",
          sm: 390,
        },

        display: "flex",
        flexDirection: "column",
        gap: 1.5,

        pointerEvents: "none",
      }}
    >
      {notifications.map((notification) => {
        const isDelivered = notification.type === "delivered";

        return (
          <Paper
            key={notification.id}
            elevation={0}
            onClick={() => onClick(notification)}
            sx={{
              pointerEvents: "auto",

              width: "100%",

              cursor: "pointer",

              borderRadius: 3,

              border: isDelivered ? "1px solid #BBF7D0" : "1px solid #FFB6D5",

              backgroundColor: "#FFFFFF",

              boxShadow: "0 16px 45px rgba(0,0,0,0.14)",

              overflow: "hidden",

              animation: "adminNotificationIn 0.35s ease-out",

              "@keyframes adminNotificationIn": {
                from: {
                  opacity: 0,
                  transform: "translateX(40px)",
                },

                to: {
                  opacity: 1,
                  transform: "translateX(0)",
                },
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ p: 2 }}
            >
              {/* Icon */}

              <Box
                sx={{
                  width: 46,
                  height: 46,
                  minWidth: 46,

                  borderRadius: 2.5,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  bgcolor: isDelivered ? "#DCFCE7" : "#FFF0F7",

                  color: isDelivered ? "#16A34A" : "#FF4FA3",
                }}
              >
                {isDelivered ? (
                  <LocalShippingRoundedIcon />
                ) : (
                  <ShoppingBagRoundedIcon />
                )}
              </Box>

              {/* Content */}

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "#111111",
                  }}
                >
                  {notification.title}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 12,
                    color: "#6B7280",
                  }}
                >
                  {notification.message}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.8,
                    fontSize: 11,
                    fontWeight: 700,
                    color: isDelivered ? "#16A34A" : "#FF4FA3",
                  }}
                >
                  Click to view order
                </Typography>
              </Box>

              {/* Close */}

              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();

                  onClose(notification.id);
                }}
                sx={{
                  alignSelf: "flex-start",

                  color: "#9CA3AF",
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Paper>
        );
      })}
    </Box>
  );
};

export default AdminNotification;
