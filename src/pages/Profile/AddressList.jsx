import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Radio,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectAddress, removeAddress } from "../../redux/slices/addressSlice";

function AddressList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addresses = [], selectedAddress } = useSelector(
    (state) => state.address,
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        pb: {
          xs: 8,
          sm: 10,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
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
          justifyContent="space-between"
          spacing={2}
          sx={{
            mb: {
              xs: 2.5,
              sm: 3,
            },
          }}
        >
          {/* LEFT */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.2}
            sx={{
              minWidth: 0,
            }}
          >
            <IconButton
              onClick={() => navigate("/checkout")}
              aria-label="Back to checkout"
              sx={{
                width: {
                  xs: 42,
                  sm: 46,
                },
                height: {
                  xs: 42,
                  sm: 46,
                },
                flexShrink: 0,
                borderRadius: 3,
                bgcolor: "background.paper",
                color: "text.primary",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "action.hover",
                  borderColor: "primary.main",
                  transform: "translateX(-2px)",
                },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: 21,
                    sm: 25,
                  },
                  fontWeight: 800,
                  color: "text.primary",
                  lineHeight: 1.15,
                  letterSpacing: "-0.5px",
                }}
              >
                My Addresses
              </Typography>

              <Typography
                sx={{
                  mt: 0.4,
                  fontSize: {
                    xs: 11,
                    sm: 12,
                  },
                  color: "text.secondary",
                }}
              >
                Manage your delivery locations
              </Typography>
            </Box>
          </Stack>

          {/* ADD ADDRESS */}
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => navigate("/addresses/new")}
            sx={{
              flexShrink: 0,
              minWidth: {
                xs: "auto",
                sm: 150,
              },
              px: {
                xs: 1.5,
                sm: 2,
              },
              py: 1.1,
              borderRadius: 3,
              fontWeight: 700,
              boxShadow: 3,
              "&:hover": {
                boxShadow: 5,
              },
            }}
          >
            <Box
              component="span"
              sx={{
                display: {
                  xs: "none",
                  sm: "inline",
                },
              }}
            >
              Add Address
            </Box>

            <Box
              component="span"
              sx={{
                display: {
                  xs: "inline",
                  sm: "none",
                },
              }}
            >
              Add
            </Box>
          </Button>
        </Stack>

        {/* =====================================================
            ADDRESS COUNT
        ===================================================== */}

        {addresses.length > 0 && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              mb: 1.5,
              px: 0.5,
            }}
          >
            <LocationOnRoundedIcon
              sx={{
                fontSize: 18,
                color: "primary.main",
              }}
            />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              Saved addresses
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              ({addresses.length})
            </Typography>
          </Stack>
        )}

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!addresses.length ? (
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 4,
                sm: 6,
              },
              borderRadius: 4,
              textAlign: "center",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                width: {
                  xs: 68,
                  sm: 78,
                },
                height: {
                  xs: 68,
                  sm: 78,
                },
                mx: "auto",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "primary.light",
                color: "primary.main",
              }}
            >
              <LocationOnRoundedIcon
                sx={{
                  fontSize: {
                    xs: 32,
                    sm: 38,
                  },
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: 18,
                  sm: 21,
                },
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              No addresses yet
            </Typography>

            <Typography
              sx={{
                mt: 0.8,
                maxWidth: 360,
                mx: "auto",
                fontSize: 13,
                lineHeight: 1.6,
                color: "text.secondary",
              }}
            >
              Add your delivery address to make checkout faster and easier.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => navigate("/addresses/new")}
              sx={{
                mt: 2.5,
                px: 3,
                py: 1.2,
                borderRadius: 3,
                fontWeight: 700,
              }}
            >
              Add Your First Address
            </Button>
          </Paper>
        ) : (
          /* =====================================================
             ADDRESS LIST
          ===================================================== */

          <Stack spacing={1.5}>
            {addresses.map((address) => {
              const isSelected = selectedAddress === address.id;

              return (
                <Paper
                  key={address.id}
                  elevation={0}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    p: {
                      xs: 1.5,
                      sm: 2,
                    },
                    borderRadius: 3.5,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: isSelected ? "primary.main" : "divider",
                    boxShadow: isSelected ? 4 : 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.main",
                      boxShadow: 4,
                    },
                  }}
                >
                  {/* SELECTED INDICATOR */}

                  {isSelected && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: 4,
                        bgcolor: "primary.main",
                      }}
                    />
                  )}

                  <Stack
                    direction="row"
                    alignItems="flex-start"
                    spacing={{
                      xs: 0.8,
                      sm: 1.2,
                    }}
                  >
                    {/* RADIO */}

                    <Radio
                      checked={isSelected}
                      onChange={() => dispatch(selectAddress(address.id))}
                      sx={{
                        mt: -0.5,
                        color: "action.active",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />

                    {/* ADDRESS ICON */}

                    <Box
                      sx={{
                        mt: 0.3,
                        width: {
                          xs: 38,
                          sm: 42,
                        },
                        height: {
                          xs: 38,
                          sm: 42,
                        },
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2.5,
                        bgcolor: isSelected ? "primary.light" : "action.hover",
                        color: "primary.main",
                      }}
                    >
                      <LocationOnRoundedIcon
                        sx={{
                          fontSize: {
                            xs: 19,
                            sm: 21,
                          },
                        }}
                      />
                    </Box>

                    {/* ADDRESS DETAILS */}

                    <Box
                      sx={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Typography
                          sx={{
                            fontSize: {
                              xs: 14,
                              sm: 15,
                            },
                            fontWeight: 800,
                            color: "text.primary",
                          }}
                        >
                          {address.name}
                        </Typography>

                        {isSelected && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.4}
                            sx={{
                              px: 0.8,
                              py: 0.3,
                              borderRadius: 1.5,
                              color: "success.main",
                            }}
                          >
                            <CheckCircleRoundedIcon
                              sx={{
                                fontSize: 13,
                              }}
                            />

                            <Typography
                              sx={{
                                fontSize: 9,
                                fontWeight: 800,
                                color: "success.main",
                              }}
                            >
                              SELECTED
                            </Typography>
                          </Stack>
                        )}
                      </Stack>

                      <Typography
                        sx={{
                          mt: 0.7,
                          fontSize: {
                            xs: 12,
                            sm: 13,
                          },
                          lineHeight: 1.55,
                          color: "text.secondary",
                        }}
                      >
                        {address.address}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.15,
                          fontSize: {
                            xs: 12,
                            sm: 13,
                          },
                          color: "text.secondary",
                        }}
                      >
                        {address.city}, {address.state} - {address.pincode}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.7,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {address.phone}
                      </Typography>
                    </Box>

                    {/* DELETE */}

                    <IconButton
                      onClick={() => dispatch(removeAddress(address.id))}
                      aria-label="Delete address"
                      sx={{
                        flexShrink: 0,
                        width: 38,
                        height: 38,
                        borderRadius: 2.5,
                        color: "text.secondary",
                        "&:hover": {
                          color: "error.main",
                          bgcolor: "error.light",
                        },
                      }}
                    >
                      <DeleteOutlineRoundedIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </IconButton>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>
        )}

        {/* =====================================================
            FOOTER
        ===================================================== */}

        {addresses.length > 0 && (
          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              fontSize: 10,
              fontWeight: 600,
              color: "text.disabled",
              letterSpacing: 0.5,
            }}
          >
            Your saved address will be available during checkout.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default AddressList;
