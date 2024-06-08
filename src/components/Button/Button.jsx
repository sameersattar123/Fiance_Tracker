import React from "react";
import "./style.css";

const Button = ({ text, onClick, blue , disabled }) => {
  return (
    <div className={blue ? "btn btn-blue" : "btn"} disabled={disabled} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
