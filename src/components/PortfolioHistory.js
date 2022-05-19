import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PortfolioTable from "../ui/PortfolioTable";

export default class PortfolioHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }

  async componentDidMount() {
    const result = await axios.get("http://localhost:8080/portfolio");
    const portfolio = result.data;
    this.setState({ rows: portfolio });
  }
  render() {
    return (
      <div>
        {" "}
        <HistoricalData />{" "}
      </div>
    );
  }
}

const HistoricalData = (props) => {
  const [portfolioHistory, setPortfolioHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const { tokenAddress } = location.state;

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/portfolioHistory", {
    //     params: {
    //       address: "0xF2c765d0B35BcfC64edb4dC9bd74f833e05Efac7",
    //     },
    //   })
    //   .then(
    //     (result) => {
    //       console.log(result, " ------ result -----");
    //       setIsLoaded(true);
    //       setPortfolioHistory(result.data);
    //     },
    //     (error) => {
    //       setIsLoaded(true);
    //       console.log(error, "error");
    //     }
    //   );
  }, []);

  if (!isLoaded) {
    return <div>Loading ...</div>;
  } else {
    return (
      <div>
        <h1>Portfolio History</h1>
      </div>
    );
  }
};
