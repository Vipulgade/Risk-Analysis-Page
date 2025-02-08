// src/features/transactionsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk to Fetch Transaction Data
export const fetchTransactionData = createAsyncThunk(
  "transactions/fetchTransactionData",
  async (address, { rejectWithValue }) => {
    try {
      const response = await fetch(`/data/transactions.json`); // Load mock JSON
      const data = await response.json();
      const filteredData = data.find((entry) =>
        entry.transactions.some((txn) =>
          txn.payer_details.some((payer) => payer.payer_address === address)
        )
      );
      if (!filteredData) throw new Error("Address not found");
      return filteredData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Redux Slice
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {}, // No manual reducers needed for async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactionData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
