import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TopHoldersTable from "../ui/TopHoldersTable";
import TokenPairs from "./TokenPairs";

class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
    console.log(props, "Token props");
  }

  async componentDidMount() {}
  render() {
    return <TopHolders />;
  }
}

const TopHolders = (props) => {
  const [holders, setHolders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const { tokenAddress } = location.state;

  useEffect(() => {
    axios
      .get("http://localhost:8080/tokenHolders", {
        params: {
          tokenAddress: tokenAddress,
        },
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setHolders(result.data);
        },
        (error) => {
          setIsLoaded(true);
          console.log(error, "error");
        }
      );
  }, []);

  if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    console.log(holders, "holders");
    return (
      <div>
        <h1>Top Holders</h1>
        <TopHoldersTable holders={holders} />
      </div>
    );
  }
};

export default Token;
