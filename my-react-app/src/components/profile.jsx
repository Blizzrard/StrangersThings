import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { myData } from "../api/api";

export default function Profile() {
  const { authToken } = useOutletContext();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    try {

      Promise.all([myData(authToken[0])]).then((values) => {
        setUserProfile(values[0]);
      });
    } catch (error) {}
  }, []);
  if (authToken[0] !== "" && userProfile.data !== undefined) {
    return (
      <div>
        <h1>Username: {userProfile.data.username}</h1>
        <h1>Messages: {userProfile.data.messages.length}</h1>
        <h1>Posts: {userProfile.data.posts.length}</h1>
      </div>
    );
  } else {
    return <></>;
  }
}
