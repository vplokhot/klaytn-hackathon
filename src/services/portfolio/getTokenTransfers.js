const axios = require("axios");
require("dotenv").config();

const url = "https://api.covalenthq.com/v1";
const key = process.env.ckey; //example key
const chain_id = process.env.chain_id;

async function getTokenTransfers(contract_address) {
  try {
    const response = await axios.get(
      `${url}/${chain_id}/address/${address}/transfers_v2/`,
      {
        headers: { "content-type": "application/json" },
        params: {
          key: key,
          "contract-address": contract_address,
        },
      }
    );
    const transfers = response.data.data;
    return transfers.items;
  } catch (error) {
    console.log(error);
  }
}

// async function parseTokenTransfers(transfers) {
//   console.log(transfers.length);
// }

// async function getTokenTransfers(address, contract_address) {
//   const result = await fetchTokenTransfers(address, contract_address);
//   parseTokenTransfers(result);
//   return result;
// }

module.exports = { getTokenTransfers };
