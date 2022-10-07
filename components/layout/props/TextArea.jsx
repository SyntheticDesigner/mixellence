import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import classes from "./TextArea.module.css";
// import visibleOff from "../../images/icons/visible-off.svg"

const TextArea = ({
  label,
  type,
  value,
  setValue,
  charLimit,
  blurHandler,
  errors,
  onChange,
  autoComplete,
  onClick,
  inputRef,
  className,
}) => {
  const [visible, setVisible] = useState(false);

  const changeHandler = (e) => {
    if (charLimit) {
      if (e.target.value.length > charLimit) {
        return;
      }
    }
    setValue && setValue(e.target.value);
    onChange && onChange(e);
    //this for additional functions to be performed optionally ex. validation
  };

  return (
    <>
      <div
        className={clsx(
          classes.inputField,
          errors && errors.length > 0 ? classes.inputError : null,
          className ? className : null
        )}
      >
        {label && (
          <label
            className={clsx(classes.inactive, value ? classes.active : null)}
            htmlFor={label.split(" ").join("")}
          >
            {label}
          </label>
        )}
        {charLimit && (
          <p className={classes.charLimit}>
            {value ? value.length : 0} / {charLimit}
          </p>
        )}
        <textarea
          id={label && label.split(" ").join("")}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
          autoComplete={autoComplete}
          onClick={onClick && onClick}
          ref={inputRef}
          required
        />
        {errors &&
          errors.length > 0 &&
          errors.map((error, i) => (
            <p key={i} className={classes.errorText}>
              {error.message}
            </p>
          ))}
      </div>
    </>
  );
};

export default TextArea;
