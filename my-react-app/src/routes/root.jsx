import { Outlet } from "react-router-dom";
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
      Promise.all([localStorage.getItem("token")]).then((values) => {
        setAuthToken(values[0]);
      });
    } catch (error) {}
  }, []);
  return (
    <div>
      <Navbar
        context={{
          authToken: [authToken, setAuthToken],
          userProfile: [userProfile, setUserProfile],
        }}
      />
      <Outlet
        context={{
          fetchAllPosts: fetchAllPosts,
          myData: myData,
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
