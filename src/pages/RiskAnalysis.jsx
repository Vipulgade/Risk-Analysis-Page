import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRiskData } from "../redux/riskSlice";
import transactionsData from "../Data/transactions.json"; // Local JSON data
import { TextField, Button, Typography, Container, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import RiskMeter from "../components/RiskMeter";
import RiskDetails from "../components/RiskDetails";
import TransactionTable from "../components/TransactionDetails";
import Loader from "../components/Loader";
import RiskBarChart from "../components/RiskBarChart";

// Motion Animations
const fadeInVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const RiskAnalysis = () => {
  const [btcAddress, setBtcAddress] = useState("");
  const [localRiskData, setLocalRiskData] = useState(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.risk);

  // 🔍 Search Handler: Fetch from API (Redux) or Fallback to JSON
  const handleSearch = () => {
    if (!btcAddress.trim()) return;

    // Fetch data from Redux API
    dispatch(fetchRiskData(btcAddress.trim()));

    // Local JSON Fallback
    const foundData = transactionsData.find(
      (entry) => entry.source_address === btcAddress.trim()
    );

    if (foundData) {
      // Process Transactions for Table
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

  // Determine which data source to use
  const riskDataToShow = localRiskData || data;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <motion.div variants={fadeInVariant} initial="hidden" animate="visible">
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
          Crypto Risk Analysis
        </Typography>

        {/* Search Section */}
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 2 }}>
          <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
            <TextField
              label="Enter BTC Address"
              variant="outlined"
              fullWidth
              value={btcAddress}
              onChange={(e) => setBtcAddress(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ px: 4, height: "56px" }}
            >
              Search
            </Button>
          </Box>
        </Paper>

        {/* Loader */}
        {loading && <Loader />}

        {/* Error Handling */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Display Risk Data */}
        {riskDataToShow && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Risk Meter & Details */}
            <RiskMeter riskScore={parseInt(riskDataToShow.risk_score)} riskLabel={riskDataToShow.risk} />
            <RiskDetails data={riskDataToShow} />

            {/* Risk Breakdown Chart */}
            <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Risk Breakdown by Level
              </Typography>
              <RiskBarChart riskData={riskDataToShow.level_vise_risk_analysis} chartType="risk_percentage" />
            </Paper>

            {/* Transaction Table */}
            <Paper sx={{ p: 3, mt: 3, borderRadius: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Transactions
              </Typography>
              {riskDataToShow.transactions && riskDataToShow.transactions.length > 0 ? (
                <TransactionTable transactions={riskDataToShow.transactions} />
              ) : (
                <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
                  No transactions found.
                </Typography>
              )}
            </Paper>
          </motion.div>
        )}

        {/* Default Message */}
        {!riskDataToShow && !loading && (
          <Typography variant="subtitle1" sx={{ mt: 3 }} align="center">
            Enter a Bitcoin address to analyze risk.
          </Typography>
        )}
      </motion.div>
    </Container>
  );
};

export default RiskAnalysis;
