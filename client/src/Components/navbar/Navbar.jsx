import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./navbar.css";
export const Navbar = () => {
  const {user}=useContext(UserContext);
  console.log("USER INFO : ",user);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">KAJBOOKING</span>
        </Link>
        <div className="navItems">
          {user ? user.username : <>
          <button className="navButton">Register</button>
          <Link to="/login">
            <button className="navButton">Login</button>
          </Link>
          </>}
        </div>
      </div>
    </div>
  );
};
