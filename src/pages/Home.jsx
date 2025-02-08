import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import RiskMeter from "../components/RiskDetails";
import TransactionList from "../components/TransactionDetails";
import RiskGraph from "../components/RiskGraph";

const Home = () => {
  const { data, loading, error } = useSelector((state) => state.risk);

  return (
    <div>
      <SearchBar />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <>
          <RiskMeter riskLevel={data.risk_level} />
          <TransactionList transactions={data.transactions} />
          <RiskGraph data={data.risk_history} />
        </>
      )}
    </div>
  );
};

export default Home;
