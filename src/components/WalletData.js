import React from "react";
import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import PortfolioTable from "../ui/PortfolioTable";

const URL = "http://localhost:8080/covalent/getPortfolio";

const WalletData = () => {
  const { walletAddress } = useParams();
  const { loading, error, data } = useAxios(URL, {
    params: {
      address: walletAddress,
    },
  });

  if (loading) return "Loading Wallet ...";
  if (error) return "Something went wrong!";

  if (data) {
    return (
      <React.Fragment>
        <h1>Address: {walletAddress}</h1>
        <PortfolioTable rows={data.data} />
      </React.Fragment>
    );
  } else {
    return <h1>Something went wrong!</h1>;
  }
};

export default WalletData;
