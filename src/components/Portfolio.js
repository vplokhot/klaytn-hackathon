import React from "react";
import axios from "axios";
import PortfolioTable from "../ui/PortfolioTable";
import PortfolioHistory from "./PortfolioHistory";
import PriceChart from "../ui/PriceChart";

class Portfolio extends React.Component {
  constructor(props) {
    console.log("Portfolio constructor");
    console.log(props, "Portfolio props");

    super(props);
    this.state = { rows: [], priceData: [] };
  }

  async componentDidMount() {
    console.log("Portfolio componentDidMount");

    const result = await axios.get(
      "http://localhost:8080/covalent/getPortfolio"
    );
    const portfolio = result.data;
    console.log(portfolio, " portfolio");
    let contract_address = [];
    for (let asset of portfolio) {
      contract_address.push(asset.contract_address);
    }
    let formattedTickers = contract_address.join();
    console.log(formattedTickers);
    const priceData = await axios
      .get("http://localhost:8080/getHistoricalTokenPrices", {
        params: {
          contract_addresses: formattedTickers,
        },
      })
      .then(
        (result) => {
          return result;
        },
        (error) => {
          console.log(error, "error");
        }
      );
    this.setState({ rows: portfolio, priceData: priceData });
  }
  render() {
    return (
      <div>
        <div>
          {/* <PriceChart priceData={this.state.priceData} /> */}
          <PortfolioHistory />
        </div>{" "}
        <PortfolioTable rows={this.state.rows} />{" "}
      </div>
    );
  }
}

export default Portfolio;
