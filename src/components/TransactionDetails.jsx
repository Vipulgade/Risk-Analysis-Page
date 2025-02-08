import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";

const TransactionDetails = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <Typography variant="h6" align="center" style={{ marginTop: "20px" }}>
        No Transactions Found
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px",borderRadius:"20px" }}>
      <Typography variant="h4" align="center"   style={{ backgroundColor: "#517dc9" ,borderRadius:"10px"}} gutterBottom>
        Transaction History
      </Typography>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#a9ba91" }}>
            <TableCell><strong>Transaction ID</strong></TableCell>
            <TableCell><strong>Amount (BTC)</strong></TableCell>
            <TableCell><strong>Risk Level</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index} style={{ backgroundColor: "#f5f7f2" }}>
              <TableCell>{tx.transaction_id || "N/A"}</TableCell>
              <TableCell>{tx.tx_amount ? `${tx.tx_amount} BTC` : "N/A"}</TableCell>
              <TableCell>{tx.risk_level || "Unknown"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionDetails;
