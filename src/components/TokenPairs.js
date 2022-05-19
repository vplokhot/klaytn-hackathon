import * as React from "react";
import { gql, useQuery } from "@apollo/client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TopHoldersTable from "../ui/TopHoldersTable";

import { PAIR_DAY_DATA, PAIR_SEARCH } from "../apollo/queries";
import TokenPairsTable from "../ui/TokenPairsTable";

// class TokenPairs extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { rows: [] };
//     console.log(props, "Token props");
//   }

//   async componentDidMount() {}
//   render() {
//     return <TopHolders />;
//   }
// }

const TokenPairs = (props) => {
  const location = useLocation();
  const { tokenAddress } = location.state;
  const { data, loading, error } = useQuery(PAIR_SEARCH, {
    variables: { token: [tokenAddress] },
  });

  const pairIds = [
    "0xbf2597e532423f93f48780d4d620a427f1bf7cf7",
    "0xc738583b09673823454b7aab7efb9d7587d5430a",
    "0xee210f7ee6bff700f96ed97809344ce871864e3d",
    "0xee9b50b74a132912cf55e7699ef3aa7ae2b00e0c",
  ];

  const {
    data: pairData,
    loading: pairLoading,
    error: pairError,
  } = useQuery(PAIR_DAY_DATA, {
    variables: { pairs: pairIds },
  });

  console.log(data, " --------- data");
  console.log(pairLoading, " --------- pairLoading");
  console.log(pairError, " --------- pairError");
  const [isLoaded, setIsLoaded] = useState(false);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8080/tokenHolders", {
  //         params: {
  //           tokenAddress: tokenAddress,
  //         },
  //       })
  //       .then(
  //         (result) => {
  //           setIsLoaded(true);
  //           setHolders(result.data);
  //         },
  //         (error) => {
  //           setIsLoaded(true);
  //           console.log(error, "error");
  //         }
  //       );
  //   }, []);

  //   if (!isLoaded) {
  //     return <div>Loading ...</div>;
  //   } else {
  //     console.log(holders, "holders");
  //     return (
  //       <div>
  //         <h1>Top Holders</h1>
  //         <TopHoldersTable holders={holders} />
  //       </div>
  //     );
  //   }

  if (loading) return <div>Loading...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return <TokenPairsTable pairs={data} />;
};

export default TokenPairs;
