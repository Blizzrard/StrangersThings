import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navBar">
      <Link to={"/"}>Home</Link>
      <Link to={"/posts"}>Posts</Link>
      <Link to={"/profile"}>Profile</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
    </div>
  );
}
