import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import onboardingData from "../../constants/onboarding";
import OnboardingCard from "../../components/common/OnboardingCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import PATHS from "../../routes/paths";

function Onboarding() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const lastStep = activeStep === onboardingData.length - 1;

  const handleNext = () => {
    if (lastStep) {
      navigate(PATHS.LOGIN);
      return;
    }

    setActiveStep((prev) => prev + 1);
  };

  const handleSkip = () => {
    navigate(PATHS.LOGIN);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
      }}
    >
      {/* Skip */}

      <Box display="flex" justifyContent="flex-end">
        {!lastStep && <Button onClick={handleSkip}>Skip</Button>}
      </Box>

      {/* Content */}

      <OnboardingCard
        title={onboardingData[activeStep].title}
        subtitle={onboardingData[activeStep].subtitle}
      />

      {/* Bottom */}

      <Stack spacing={3}>
        {/* Dots */}

        <Stack direction="row" spacing={1} justifyContent="center">
          {onboardingData.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: activeStep === index ? 24 : 10,
                height: 10,
                borderRadius: 5,
                bgcolor: activeStep === index ? "primary.main" : "#D9D9D9",
                transition: ".3s",
              }}
            />
          ))}
        </Stack>

        <PrimaryButton onClick={handleNext}>
          {lastStep ? "Get Started" : "Next"}
        </PrimaryButton>
      </Stack>
    </Box>
  );
}

export default Onboarding;
