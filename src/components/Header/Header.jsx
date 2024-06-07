import React from "react";
import "./style.css";

const Header = () => {
  const logoutFunc = () => {
    console.log("sameer sattar");
  };
  return (
    <div className="navbar">
      <p className="logo">Financely.</p>
      <p className="logo link" onClick={logoutFunc}>
        Logout
      </p>
    </div>
  );
};

export default Header;
