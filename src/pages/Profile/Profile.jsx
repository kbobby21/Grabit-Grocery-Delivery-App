import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ShoppingBagOutlined,
  FavoriteBorder,
  LocationOnOutlined,
  AccountBalanceWalletOutlined,
  PersonOutlineOutlined,
  NotificationsOutlined,
  HelpOutlineOutlined,
  InfoOutlined,
  ChevronRight,
  Edit,
  WorkspacePremium,
} from "@mui/icons-material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home", { replace: true });
  };

  const quickActions = [
    {
      title: "Orders",
      icon: <ShoppingBagOutlined />,
      path: "/orders",
    },
    {
      title: "Wishlist",
      icon: <FavoriteBorder />,
      path: "/wishlist",
    },
    {
      title: "Addresses",
      icon: <LocationOnOutlined />,
      path: "/addresses",
    },
    {
      title: "Wallet",
      icon: <AccountBalanceWalletOutlined />,
      path: "/wallet",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
        overflow: "hidden",

        backgroundImage: `
          radial-gradient(
            circle at 5% 5%,
            rgba(255, 79, 163, 0.13) 0,
            rgba(255, 79, 163, 0.05) 20%,
            transparent 42%
          ),
          radial-gradient(
            circle at 95% 90%,
            rgba(255, 79, 163, 0.09) 0,
            rgba(255, 79, 163, 0.03) 22%,
            transparent 42%
          )
        `,

        "&::before": {
          content: '""',
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.045,
          filter: "blur(80px)",
          top: -140,
          right: -120,
          pointerEvents: "none",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "primary.main",
          opacity: 0.04,
          filter: "blur(90px)",
          bottom: -150,
          left: -130,
          pointerEvents: "none",
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
          py: {
            xs: 1.5,
            sm: 3,
          },
          pb: {
            xs: 8,
            sm: 10,
          },
          px: {
            xs: 1.5,
            sm: 2,
          },
        }}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{
            mb: {
              xs: 2,
              sm: 3,
            },
          }}
        >
          <IconButton
            onClick={() => navigate("/home")}
            aria-label="Back to home"
            sx={{
              width: {
                xs: 42,
                sm: 46,
              },
              height: {
                xs: 42,
                sm: 46,
              },
              borderRadius: 2.5,

              bgcolor: "transparent",
              color: "text.primary",

              border: "1px solid",
              borderColor: "divider",

              "&:hover": {
                bgcolor: "transparent",
                color: "primary.main",
                borderColor: "primary.main",
              },
            }}
          >
            <ArrowBackRoundedIcon />
          </IconButton>

          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 22,
                  sm: 26,
                },
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.5px",
              }}
            >
              My Profile
            </Typography>

            <Typography
              sx={{
                mt: 0.35,
                fontSize: 11.5,
                color: "text.secondary",
              }}
            >
              Manage your Grabit account
            </Typography>
          </Box>
        </Stack>

        {/* =====================================================
            PROFILE HERO
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",

            p: {
              xs: 2,
              sm: 3,
            },

            borderRadius: {
              xs: 3.5,
              sm: 4,
            },

            bgcolor: "background.paper",

            border: "1px solid",
            borderColor: "divider",

            boxShadow: {
              xs: "0 10px 35px rgba(0,0,0,0.06)",
              sm: "0 18px 50px rgba(0,0,0,0.08)",
            },

            "&::before": {
              content: '""',
              position: "absolute",
              width: 250,
              height: 250,
              borderRadius: "50%",
              bgcolor: "primary.main",
              opacity: 0.08,
              filter: "blur(55px)",
              top: -170,
              right: -120,
            },
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            alignItems={{
              xs: "center",
              sm: "center",
            }}
            spacing={{
              xs: 2,
              sm: 2.5,
            }}
            sx={{
              position: "relative",
            }}
          >
            {/* Avatar */}

            <Box
              sx={{
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{
                  width: {
                    xs: 76,
                    sm: 88,
                  },
                  height: {
                    xs: 76,
                    sm: 88,
                  },

                  bgcolor: "primary.main",
                  color: "#fff",

                  fontSize: {
                    xs: 30,
                    sm: 34,
                  },

                  fontWeight: 800,

                  border: "4px solid",
                  borderColor: "rgba(255,79,163,0.12)",

                  boxShadow: "0 8px 25px rgba(255,79,163,0.20)",
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>

              <Box
                sx={{
                  position: "absolute",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  bgcolor: "success.main",
                  border: "3px solid",
                  borderColor: "background.paper",
                  right: 2,
                  bottom: 4,
                }}
              />
            </Box>

            {/* User information */}

            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    sm: 23,
                  },
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {user?.name || "Grabit User"}
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  fontSize: 12.5,
                  color: "text.secondary",
                }}
              >
                {user?.phone || "Phone number not available"}
              </Typography>

              {user?.email && (
                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: 12,
                    color: "text.secondary",
                  }}
                >
                  {user.email}
                </Typography>
              )}

              <Box
                sx={{
                  mt: 1.3,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  px: 1.2,
                  py: 0.55,
                  borderRadius: 2,

                  bgcolor: "rgba(255,79,163,0.08)",
                  color: "primary.main",
                }}
              >
                <WorkspacePremium
                  sx={{
                    fontSize: 16,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  {user?.membership || "Regular"} Member
                </Typography>
              </Box>
            </Box>

            {/* Desktop edit */}

            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => navigate("/profile/edit")}
              sx={{
                minHeight: 42,
                px: 2,
                borderRadius: 2.5,
                textTransform: "none",
                fontSize: 12,
                fontWeight: 700,

                display: {
                  xs: "none",
                  sm: "inline-flex",
                },
              }}
            >
              Edit Profile
            </Button>
          </Stack>

          {/* Mobile edit */}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => navigate("/profile/edit")}
            sx={{
              mt: 2.5,
              minHeight: 44,
              borderRadius: 2.5,
              textTransform: "none",
              fontSize: 12.5,
              fontWeight: 700,

              display: {
                xs: "flex",
                sm: "none",
              },
            }}
          >
            Edit Profile
          </Button>
        </Paper>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <Typography
          sx={{
            mt: {
              xs: 3.5,
              sm: 4,
            },
            mb: 1.5,
            fontSize: 15,
            fontWeight: 800,
          }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={1.5}>
          {quickActions.map((item) => (
            <Grid item xs={6} sm={3} key={item.title}>
              <Paper
                elevation={0}
                onClick={() => navigate(item.path)}
                sx={{
                  p: {
                    xs: 1.8,
                    sm: 2.2,
                  },

                  height: "100%",
                  minHeight: {
                    xs: 105,
                    sm: 120,
                  },

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",

                  borderRadius: 3,

                  bgcolor: "background.paper",

                  border: "1px solid",
                  borderColor: "divider",

                  cursor: "pointer",

                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "primary.main",
                    boxShadow: "0 10px 28px rgba(255,79,163,0.10)",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {item.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <Typography
          sx={{
            mt: 4,
            mb: 1.5,
            fontSize: 15,
            fontWeight: 800,
          }}
        >
          Account
        </Typography>

        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            borderRadius: 3.5,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 8px 28px rgba(0,0,0,0.04)",
          }}
        >
          <List disablePadding>
            <ListItemButton
              onClick={() => navigate("/profile/edit")}
              sx={{
                minHeight: 64,
                px: {
                  xs: 2,
                  sm: 2.5,
                },

                "&:hover": {
                  bgcolor: "rgba(255,79,163,0.035)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "primary.main",
                }}
              >
                <PersonOutlineOutlined />
              </ListItemIcon>

              <ListItemText
                primary="Edit Profile"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: "text.disabled",
                }}
              />
            </ListItemButton>

            <Divider />

            <ListItemButton
              onClick={() => navigate("/addresses")}
              sx={{
                minHeight: 64,
                px: {
                  xs: 2,
                  sm: 2.5,
                },

                "&:hover": {
                  bgcolor: "rgba(255,79,163,0.035)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "primary.main",
                }}
              >
                <LocationOnOutlined />
              </ListItemIcon>

              <ListItemText
                primary="Saved Addresses"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: "text.disabled",
                }}
              />
            </ListItemButton>

            <Divider />

            <ListItemButton
              onClick={() => navigate("/notifications")}
              sx={{
                minHeight: 64,
                px: {
                  xs: 2,
                  sm: 2.5,
                },

                "&:hover": {
                  bgcolor: "rgba(255,79,163,0.035)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "primary.main",
                }}
              >
                <NotificationsOutlined />
              </ListItemIcon>

              <ListItemText
                primary="Notifications"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: "text.disabled",
                }}
              />
            </ListItemButton>
          </List>
        </Paper>

        {/* =====================================================
            SUPPORT
        ===================================================== */}

        <Typography
          sx={{
            mt: 4,
            mb: 1.5,
            fontSize: 15,
            fontWeight: 800,
          }}
        >
          Support
        </Typography>

        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            borderRadius: 3.5,
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 8px 28px rgba(0,0,0,0.04)",
          }}
        >
          <List disablePadding>
            <ListItemButton
              sx={{
                minHeight: 64,
                px: {
                  xs: 2,
                  sm: 2.5,
                },

                "&:hover": {
                  bgcolor: "rgba(255,79,163,0.035)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "primary.main",
                }}
              >
                <HelpOutlineOutlined />
              </ListItemIcon>

              <ListItemText
                primary="Help & Support"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: "text.disabled",
                }}
              />
            </ListItemButton>

            <Divider />

            <ListItemButton
              sx={{
                minHeight: 64,
                px: {
                  xs: 2,
                  sm: 2.5,
                },

                "&:hover": {
                  bgcolor: "rgba(255,79,163,0.035)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color: "primary.main",
                }}
              >
                <InfoOutlined />
              </ListItemIcon>

              <ListItemText
                primary="About Grabit"
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              />

              <ChevronRight
                sx={{
                  fontSize: 20,
                  color: "text.disabled",
                }}
              />
            </ListItemButton>
          </List>
        </Paper>

        {/* =====================================================
            LOGOUT
        ===================================================== */}

        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{
            mt: 3.5,
            minHeight: 48,
            borderRadius: 2.8,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Logout
        </Button>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Stack
          alignItems="center"
          spacing={0.5}
          sx={{
            mt: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              color: "text.disabled",
              letterSpacing: 0.8,
            }}
          >
            GRAB EVERYTHING. DELIVERED FAST.
          </Typography>

          <Typography
            sx={{
              fontSize: 10,
              color: "text.disabled",
            }}
          >
            Grabit v1.0.0
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Profile;
