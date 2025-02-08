import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRiskData = createAsyncThunk("risk/fetchRiskData", async (address) => {
  const response = await axios.get(`https://api.blockchain.com/v3/address/${address}`);
  return response.data;
});
