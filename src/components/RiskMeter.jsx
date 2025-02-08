import React from "react";
import { CircularProgress, Typography, Box, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const RiskMeter = ({ riskScore, riskLabel }) => {
  const riskColor = riskScore > 75 ? "#d32f2f" : riskScore > 50 ? "#f57c00" : "#388e3c";
  
  // Chart Data for Risk Percentage
  const data = [
    { name: "Risk Level", value: riskScore, color: riskColor },
    { name: "Safe Zone", value: 100 - riskScore, color: "#b0bec5" },
  ];

  return (
    <Paper elevation={3} sx={{ padding: "30px", background: "#e3d9bc", borderRadius: "50px", textAlign: "center" }}>
      <Typography variant="h5" sx={{ color: "#344718", marginBottom: "10px" }}>Risk Score</Typography>

      {/* Circular Progress with Animation */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
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
      </motion.div>

      {/* Risk Label */}
      <Typography variant="body1" sx={{ color: riskColor, fontWeight: "bold", marginTop: 1 }}>
        {riskLabel}
      </Typography>

      {/* Risk Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default RiskMeter;
