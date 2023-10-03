import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <header>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {isAuthenticated ? (
          <NavLink to="/my-blogs">My blogs</NavLink>
        ) : (
          <NavLink to="/">Logo</NavLink>
        )}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/category">Category</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/register">Register</NavLink>
        {isAuthenticated ? (
          <NavLink to="/account">Account</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
