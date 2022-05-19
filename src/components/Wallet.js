import { useParams, Outlet } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const Wallet = () => {
  return (
    <>
      <h1>Wallet Search Bar TODO</h1>
      <Outlet />
    </>
  );
};

export default Wallet;
