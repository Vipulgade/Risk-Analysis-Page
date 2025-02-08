import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRiskData } from "../redux/riskSlice";
import { TextField, Button } from "@mui/material";

const SearchBar = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (address.trim()) {
      dispatch(fetchRiskData(address));
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px 0" ,backgroundColor:"#c1e6cc"}}>
      <TextField
        label="Enter BTC Address"
        variant="outlined"
        onChange={(e) => setAddress(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
