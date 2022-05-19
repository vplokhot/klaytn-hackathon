const axios = require("axios");
const moment = require("moment");
// require("dotenv").config();

const url = "https://api.covalenthq.com/v1";
const key = process.env.REACT_APP_CKEY; //example key
const chain_id = process.env.REACT_APP_CHAIN_ID;

async function getBlockHeights(start_date, end_date) {
  console.log(start_date, " start_date ");
  console.log(end_date, " end_date ");
  try {
    const response = await axios.get(
      `${url}/${chain_id}/block_v2/${start_date}/${end_date}/`,
      {
        headers: { "content-type": "application/json" },
        params: {
          key: key,
        },
      }
    );
    const blocks = response.data.data;
    return blocks;
  } catch (error) {
    console.log(error);
  }
}

async function getBlockHeight(block_height = "latest") {
  console.log("getblockheight");
  try {
    const response = await axios.get(
      `${url}/${chain_id}/block_v2/${block_height}/`,
      {
        headers: { "content-type": "application/json" },
        params: {
          key: key,
        },
      }
    );
    const block = response.data.data;
    console.log(block, " block ");
    return block;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getBlockHeights, getBlockHeight };
