import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const COHORT_NAME = "2301-FTB-MT-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Login() {
  const navigate = useNavigate();
  const {
    usernameEntry: [usernameEntry, setUsernameEntry],
    authToken: [authToken, setAuthToken],
    passwordEntry: [passwordEntry, setPasswordEntry],
    myData,
    userProfile: [userProfile, setUserProfile],
  } = useOutletContext();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                username: `${usernameEntry}`,
                password: `${passwordEntry}`,
              },
            }),
          });
          const result = await response.json();
          setAuthToken(result.data.token);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("isLoggedIn", true);
          setUserProfile(myData);
          setUsernameEntry("");
          setPasswordEntry("");
          navigate("/");
          return result;
        } catch (error) {}
      }}
    >
      <fieldset>
        <label htmlFor="username">Username:</label>
        <input
          id="usernameEntry"
          type="text"
          placeholder="John Smith..."
          value={usernameEntry}
          onChange={(e) => {
            setUsernameEntry(e.target.value);
          }}
        ></input>
      </fieldset>
      <fieldset>
        <label htmlFor="password">Password:</label>
        <input
          id="passwordEntry"
          type="password"
          placeholder="Password..."
          value={passwordEntry}
          onChange={(e) => setPasswordEntry(e.target.value)}
        ></input>
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
