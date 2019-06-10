import React from "react";
import "./index.scss";

function Checkbox({ name, checked }) {
  return (
    <div className="Checkbox">
      <input
        className="Checkbox__input"
        type="checkbox"
        name={name}
        value={checked}
        checked={checked}
        onChange={() => null}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}

export default Checkbox;
