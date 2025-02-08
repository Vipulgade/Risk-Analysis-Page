import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({ message = "Loading..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress size={50} />
      <Typography variant="body1" style={{ marginTop: "10px" }}>
        {message}
      </Typography>
    </Box>
  );
};

export default Loader;
