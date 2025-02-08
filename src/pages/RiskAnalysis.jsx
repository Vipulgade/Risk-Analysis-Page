import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRiskData } from "../redux/riskSlice";
import transactionsData from "../Data/transactions.json"; // Local JSON data
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";
import RiskMeter from "../components/RiskMeter";
import RiskDetails from "../components/RiskDetails";
import TransactionTable from "../components/TransactionDetails";
import Loader from "../components/Loader";
import RiskBarChart from "../components/RiskBarChart";

const RiskAnalysis = () => {
  const [btcAddress, setBtcAddress] = useState("");
  const [localRiskData, setLocalRiskData] = useState(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.risk);

  const handleSearch = () => {
    if (!btcAddress.trim()) return;
    dispatch(fetchRiskData(btcAddress.trim()));

    const foundData = transactionsData.find(
      (entry) => entry.source_address === btcAddress.trim()
    );

    if (foundData) {
      const extractedTransactions = foundData.level_vise_risk_analysis.flatMap((level) =>
        [...(level.payer_details || []), ...(level.beneficiary_details || [])].flatMap((entity) =>
          (entity.transactions || []).map((tx) => ({
            transaction_id: tx.transaction_id || "N/A",
            tx_amount: tx.tx_amount || "0.00",
            risk_level: foundData.risk || "Unknown",
          }))
        )
      );
      setLocalRiskData({ ...foundData, transactions: extractedTransactions });
    } else {
      setLocalRiskData(null);
    }
  };

  const riskDataToShow = localRiskData || data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right,rgb(125, 146, 184),rgb(172, 226, 237) ,rgb(228, 201, 162))",
        color: "#fff",
        padding: "20px",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom align="center">
          Crypto Risk Analysis
        </Typography>

        <Paper elevation={3} style={{ padding: "50px", margin:"50px", background: "#edf7f4", borderRadius: "20px" }}>
          <TextField
            label="Enter BTC Address"
            variant="outlined"
            fullWidth
            value={btcAddress}
            onChange={(e) => setBtcAddress(e.target.value)}
            sx={{ mb: 2, input: { color: "#1d1f1e" }, label: { color: "#f50a31" } }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Paper>

        {loading && <Loader />}

        {error && <Typography color="error">{error}</Typography>}

        {riskDataToShow && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <RiskMeter riskScore={parseInt(riskDataToShow.risk_score)} riskLabel={riskDataToShow.risk} />
            <RiskDetails data={riskDataToShow} />

            <Paper elevation={3} style={{ padding: "20px", marginTop: "20px", background: "#b6e0c3",borderRadius:"20px" }}>
              <Typography variant="h6">Risk Breakdown by Level</Typography>
              <RiskBarChart riskData={riskDataToShow.level_vise_risk_analysis} chartType="risk_percentage" />
            </Paper>

            {riskDataToShow.transactions?.length > 0 ? (
              <TransactionTable transactions={riskDataToShow.transactions} />
            ) : (
              <Typography variant="subtitle1" align="center" style={{ marginTop: "20px" }}>
                No transactions found.
              </Typography>
            )}
          </motion.div>
        )}

        {!riskDataToShow && !loading && (
          <Typography variant="subtitle1" style={{ marginTop: "20px" }} align="center">
            Enter a Bitcoin address to analyze risk.
          </Typography>
        )}
      </Container>
    </motion.div>
  );
};

export default RiskAnalysis;
