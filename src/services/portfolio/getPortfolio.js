const axios = require("axios");
const ethers = require("ethers");
const { coins } = require("../../../coins.js");
require("dotenv").config();
const url = "https://api.covalenthq.com/v1";
const key = process.env.ckey; //example key
const chain_id = "1"; //eth network chainID on Covalent

async function getPortfolio(address) {
  const endpoint = `${url}/${chain_id}/address/${address}/balances_v2/`;

  let portfolio = [];
  let options = {
    headers: { "content-type": "application/json" },
    params: {
      key: key,
    },
  };

  try {
    const response = await axios.get(endpoint, options);
    const items = response.data.data.items;
    console.log(items[6]);
    for (let item of items) {
      //filter dust and extract useful data
      const spam = await filterSpam(item.contract_ticker_symbol);
      if (item.balance != "0" && !spam) {
        let asset = {};
        asset.contract_name = item.contract_name;
        asset.contract_ticker_symbol = item.contract_ticker_symbol;
        asset.contract_address = item.contract_address;
        asset.logo_url = item.logo_url;
        asset.balance = ethers.utils.formatUnits(
          item.balance,
          item.contract_decimals
        );
        asset.balance_24h = item.balance_24h;
        asset.logo_url = item.logo_url;
        asset.contract_decimals = item.contract_decimals;
        asset.quote_rate = item.quote_rate;
        portfolio.push(asset);
      }
    }
    return portfolio;
  } catch (error) {
    console.log(error);
  }
}

async function filterSpam(symbol) {
  let x = coins.filter((e) => {
    return e.symbol == symbol;
  });
  if (x.length > 0) {
    //coin exists, therefore not spam
    return false;
  }
  return true;
}

module.exports = { getPortfolio };
