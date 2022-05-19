const axios = require("axios");
const moment = require("moment");
// require("dotenv").config();

const url = "https://api.covalenthq.com/v1";
const key = process.env.REACT_APP_CKEY; //example key
const chain_id = process.env.REACT_APP_CHAIN_ID;

async function getEventsByContractAddress(address, blocks) {
  const start_block = blocks.items[0].height;

  try {
    const response = await axios.get(
      `${url}/${chain_id}/events/address/${address}/`,
      {
        headers: { "content-type": "application/json" },
        params: {
          key: key,
          "starting-block": start_block - 10000,
          "ending-block": start_block,
        },
      }
    );
    const events = response.data.data;
    return events.items;
  } catch (error) {
    console.log(error);
  }
}

async function parseTransferEvents(events) {
  let transfers = [];
  for (let event of events) {
    if (event.decoded.name === "Approval") {
      transfers.push(event);
    }
  }
  console.log(transfers, "Transfers");
  return transfers;
}

module.exports = { getEventsByContractAddress, parseTransferEvents };
