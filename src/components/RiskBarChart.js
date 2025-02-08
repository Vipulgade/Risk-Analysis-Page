import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const RiskBarChart = ({ riskData }) => {
  if (!riskData || riskData.length === 0) {
    return <p>No risk data available.</p>;
  }

  // 🚀 Process data for the combined chart (Risk Score, Total Amount & Risk Percentage)
  const chartData = 
  riskData.map((level, index) => {
   
    const totalAmount = [...(level.payer_details || []), ...(level.beneficiary_details || [])]
      .flatMap((entity) => entity.transactions || [])
      .reduce((sum, tx) =>  parseFloat(tx.tx_amount || 0), 0);

    return {
       
      level: `Level ${index + 1}`,
      
      total_amount: totalAmount.toFixed(2),
      risk_percentage: parseFloat(level.risk_percentage || 0).toFixed(2),
      
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 30, right: 40, left: 30, bottom: 10 }}>
        <CartesianGrid strokeDasharray="0 0
        
        " />
        <XAxis dataKey="level" />
        <YAxis />
        <Tooltip />
        <Legend />
      
        <Bar dataKey="total_amount" fill="#3498DB" name=" Amount (BTC)" />
        <Bar dataKey="risk_percentage" fill="#32CD32" name="Risk Percentage (%)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiskBarChart;
