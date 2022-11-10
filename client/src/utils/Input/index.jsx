import React from "react";
import "./input.scss";

const Input = ({ type, value, setValue, placeholder, ...props }) => {
  return (
    <input
      {...props}
      onChange={(event) => setValue(event.target.value)}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
