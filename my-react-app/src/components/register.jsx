import { useState } from "react";

const COHORT_NAME = "2301-FTB-MT-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function Register() {
  const [usernameEntry, setUsernameEntry] = useState("");
  const [passwordEntry, setPasswordEntry] = useState("");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`${BASE_URL}/users/register`, {
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
          console.log(result);
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
          type="text"
          placeholder="Password..."
          value={passwordEntry}
          onChange={(e) => setPasswordEntry(e.target.value)}
        ></input>
      </fieldset>
      <button>Submit</button>
    </form>
  );
}
