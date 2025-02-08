import React from "react";
import { Card, CardContent, Typography, Grid, LinearProgress, Box } from "@mui/material";
import { motion } from "framer-motion";

// Animation variants for smooth UI interactions
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const progressVariants = {
  hidden: { width: "0%" },
  visible: (score) => ({
    width: `${score}%`,
    transition: { duration: 1, ease: "easeInOut" },
  }),
};

const RiskDetails = ({ data }) => {
  if (!data) return null;

  const riskScore = Math.min(data.risk_score, 100);

  // Function to get color based on risk level
  const getRiskColor = (risk) => {
    switch (risk) {
      case "High":
        return "#d32f2f"; // Red
      case "Medium":
        return "#ffa726"; // Orange
      case "Low":
        return "#388e3c"; // Green
      default:
        return "#1976d2"; // Default Blue
    }
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible">
      <Card sx={{ mt: 2, p: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          {/* Title */}
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Risk Analysis Overview
          </Typography>

          {/* Source Address & Risk Score */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Source Address:
              </Typography>
              <Typography
                variant="body2"
                sx={{ wordBreak: "break-word", fontFamily: "monospace" }}
              >
                {data.source_address}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" fontWeight="bold" color="primary">
                Risk Score:
              </Typography>
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <Typography variant="h5" fontWeight="bold" color={getRiskColor(data.risk)}>
                  {data.risk_score} / 100
                </Typography>
              </motion.div>
            </Grid>
          </Grid>

          {/* Risk Level & Animated Progress Bar */}
          <Box mt={2}>
            <Typography variant="body1" fontWeight="bold" color="primary">
              Risk Level:
            </Typography>
            <motion.div
              custom={riskScore}
              variants={progressVariants}
              initial="hidden"
              animate="visible"
            >
              <LinearProgress
                variant="determinate"
                value={riskScore}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "#e0e0e0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: getRiskColor(data.risk),
                  },
                }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Typography variant="h6" mt={1} fontWeight="bold" color={getRiskColor(data.risk)}>
                {data.risk}
              </Typography>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RiskDetails;
