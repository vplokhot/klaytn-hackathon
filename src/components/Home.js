import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { getBlockHeights, getBlockHeight } from "../services/getBlockHeight";
import {
  getEventsByContractAddress,
  parseTransferEvents,
} from "../services/getEventsByContractAddress";

const currentDate = moment();
const today = currentDate.toISOString();
const yesterday = currentDate.subtract(1, "days").toISOString();
const address = "0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654";
// console.log(today.toISOString);
// console.log(lastWeek);

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const blocks = await getBlockHeight();
    const events = await getEventsByContractAddress(address, blocks);
    const transfers = await parseTransferEvents(events);
    // console.log(blocks);
  }
  render() {
    return (
      <React.Fragment>
        <div>{today}</div>
        <div>{yesterday}</div>
      </React.Fragment>
    );
  }
}

export default Home;
