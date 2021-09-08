import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Navbar({ loginPage }) {
  const { logout, currentUser } = useAuth();

  //Logs Out User
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    console.log("User Logged Out");
  };
  return (
    <div className="Nav">
      <div className="navLinks">
        <div className="navItem">
          {/* If User is logged in, Shows logout button else login button*/}
          {currentUser ? (
            <Link to="/register">
              <button className="loginButton" onClick={handleLogout}>
                Logout
              </button>
            </Link>
          ) : loginPage ? (
            ""
          ) : (
            <Link to="register">
              <button className="loginButton">Login</button>
            </Link>
          )}
        </div>
        <div className="navItem">
          <Link to="/">
            <button className="homeButton">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
