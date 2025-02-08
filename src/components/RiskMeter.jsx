import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

const RiskMeter = ({ riskScore, riskLabel }) => {
  const riskColor = riskScore > 75 ? "red" : riskScore > 50 ? "orange" : "green";

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h6">Risk Score</Typography>
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant="determinate"
          value={riskScore}
          size={150}
          thickness={4}
          sx={{ color: riskColor }}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" component="div" color={riskColor}>
            {riskScore}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ color: riskColor, fontWeight: "bold", marginTop: 1 }}>
        {riskLabel}
      </Typography>
    </Box>
  );
};

export default RiskMeter;
