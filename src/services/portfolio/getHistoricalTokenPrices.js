const axios = require("axios");
const ethers = require("ethers");
const { coins } = require("../../../coins.js");
require("dotenv").config();
const url = "https://api.covalenthq.com/v1";
const key = process.env.ckey; //example key
const chain_id = "1"; //eth network chainID on Covalent

async function fetchHistoricalTokenPrices(contract_addresses) {
  let assetData = [];
  try {
    const response = await axios.get(
      `${url}/pricing/historical_by_addresses_v2/${chain_id}/USD/${contract_addresses}/`,
      {
        headers: { "content-type": "application/json" },
        params: {
          key: key,
        },
      }
    );
    const prices = response.data.data;
    console.log(response.data.data);
    for (let price of prices) {
      assetData.push(price);
    }
    return prices;
  } catch (error) {
    console.log(error);
  }
}

async function getHistoricalTokenPrices(contract_addresses) {
  const result = fetchHistoricalTokenPrices(contract_addresses);
  return result;
}

module.exports = { getHistoricalTokenPrices };
