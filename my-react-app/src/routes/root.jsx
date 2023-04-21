import { Outlet, useOutletContext } from "react-router-dom";
import Navbar from "../components/navbar";
import { fetchAllPosts, myData } from "../api/api";
import { useEffect, useState } from "react";

export default function Root() {
  const [posts, setPosts] = useState([]);
  const [usernameEntry, setUsernameEntry] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [passwordEntry, setPasswordEntry] = useState("");
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    try {
      setAuthToken(localStorage.getItem("token"));
      console.log(authToken);
      myData(authToken);
    } catch (error) {}
  }, []);
  console.log(userProfile);
  return (
    <div>
      <Navbar />
      <Outlet
        context={{
          fetchAllPosts: fetchAllPosts,
          myData: myData(authToken),
          posts: [posts, setPosts],
          usernameEntry: [usernameEntry, setUsernameEntry],
          authToken: [authToken, setAuthToken],
          passwordEntry: [passwordEntry, setPasswordEntry],
          userProfile: [userProfile, setUserProfile],
        }}
      />
    </div>
  );
}
