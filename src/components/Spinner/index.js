import React from "react";
import "./style.css";

function Spinner(props) {
  const { size = "large" } = props;
  return <div className={`Spinner Spinner--${size}`} />;
}

export default Spinner;
