import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="NavContainer">
      <div className="Ball" onClick={() => navigate("/")}></div>
      <div className="NavContent">
        {/* Login */}
        <div
          className={`NavIcon ${
            location.pathname === "/login" ? "Active" : ""
          }`}
          onClick={() => navigate("/")}
        >
          <h1>Login</h1>
        </div>
        {/* Create book */}
        <div
          className={`NavIcon ${
            location.pathname === "/create" ? "Active" : ""
          }`}
          onClick={() => navigate("/create")}
        >
          <h1>Create</h1>
        </div>
        {/* View books */}
        <div
          className={`NavIcon ${
            location.pathname === "/books" ? "Active" : ""
          }`}
          onClick={() => navigate("/books")}
        >
          <h1>Book's</h1>
        </div>
      </div>
    </div>
  );
}

export default Nav;
