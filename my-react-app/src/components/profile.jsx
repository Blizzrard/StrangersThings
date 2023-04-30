import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { myData } from "../api/api";

export default function Profile() {
  const {
    authToken: [authToken, setAuthToken],
    userProfile: [userProfile, setUserProfile],
  } = useOutletContext();
  useEffect(() => {
    try {
      Promise.all([myData(localStorage.getItem("token"))]).then((values) => {
        setUserProfile(values[0]);
        setAuthToken(localStorage.getItem("token"));
      });
    } catch (error) {}
  }, []);

  if (
    authToken !== "" &&
    userProfile &&
    userProfile.messages &&
    userProfile.posts &&
    userProfile !== null
  ) {
    let messages = userProfile.messages;
    return (
      <div>
        <h1>Username: {userProfile.username}</h1>
        <h1>Posts: {userProfile.posts.length}</h1>
        <h1>
          Messages: {userProfile.messages.length}
          <div className="messages">
            {messages.map((message) => {
              return (
                <div className="singleMessage">
                  <h1>From: {message.fromUser.username}</h1>
                  <p>Message: {message.content}</p>
                </div>
              );
            })}
          </div>
        </h1>
      </div>
    );
  } else if (userProfile === null) {
    return <div>You do not have a profile, please register</div>;
  } else {
    return (
      <>
        <div>Loading... </div>
      </>
    );
  }
}
