import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, " portfolio props");
    this.state = { rows: [] };
  }

  async componentDidMount() {
    const result = await axios.get("http://localhost:8080/portfolio");
    const portfolio = result.data;
    console.log(portfolio, " portfolio ");
    this.setState({ rows: portfolio });
  }
  render() {
    console.log(this.state, " portfolio state");
    return <h1>Test</h1>;
  }
}

export default Graph;
