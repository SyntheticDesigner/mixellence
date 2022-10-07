import React from "react";
// import SelectArrow from "../../svg/SelectArrow";
import classes from "./Selector.module.css";
import clsx from "clsx";

const Selector = ({
  style,
  label,
  setValue,
  value,
  optionArray,
  selectorRef,
  required,
}) => {
  return (
    <div className={clsx(classes.selectorContainer, style)}>
      <label htmlFor={label}>{label}</label>
      <select
        id={label}
        onChange={setValue ? (e) => setValue(e.target.value) : null}
        value={value}
        ref={selectorRef}
        required={required}
      >
        <option value={undefined}></option>
        {optionArray}
      </select>
    </div>
  );
};

export default Selector;
