import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#FF0000", "#FFCC00", "#00C49F", "#0088FE"];

const RiskGraph = () => {
  const { data } = useSelector((state) => state.risk);

  if (!data) return null;

  const chartData = data.level_vise_risk_analysis.map((level) => ({
    name: `Level ${level.level}`,
    value: parseFloat(level.risk_percentage),
  }));

  return (
    <PieChart width={400} height={300}>
      <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
        {chartData.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default RiskGraph;
