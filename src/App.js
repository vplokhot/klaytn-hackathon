import moment from "moment";
import React from "react";
import Home from "./components/Home";
import { getBlockHeights } from "./services/getBlockHeight";

function App() {
  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
}

export default App;
