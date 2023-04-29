import { useNavigate, useOutletContext } from "react-router-dom";

export default function Logout() {
  const {
    authToken: [authToken, setAuthToken],
  } = useOutletContext();
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  const navigate = useNavigate();
  setAuthToken("");
  navigate("/");
}
