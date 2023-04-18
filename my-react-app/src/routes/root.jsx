import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/navbar";
import fetchAllPosts from "../api/api";

export default function Root() {
  return (
    <div>
      <Navbar />
      <Outlet context={fetchAllPosts} />
    </div>
  );
}
