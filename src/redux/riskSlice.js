import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dummyData from "../Data/transactions"; // Ensure this file contains your sample data

// Async function to fetch data (Simulating API Call)
export const fetchRiskData = createAsyncThunk(
  "risk/fetchRiskData",
  async (btcAddress, { rejectWithValue }) => {
    try {
      const foundData = dummyData.find(
        (item) => item.source_address === btcAddress.trim()
      );

      if (!foundData) {
        return rejectWithValue("Address not found!");
      }
      return foundData;
    } catch (error) {
      return rejectWithValue("Error fetching data!");
    }
  }
);

const riskSlice = createSlice({
  name: "risk",
  initialState: {
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiskData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchRiskData.rejected, (state, action) => {
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default riskSlice.reducer;
