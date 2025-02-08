import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import RiskAnalysis from "./pages/RiskAnalysis"; // Ensure this file exists

const App = () => {
  return (
    <Provider store={store}>
      <RiskAnalysis />
    </Provider>
  );
};

export default App;
