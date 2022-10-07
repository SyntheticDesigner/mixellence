import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import classes from "./InputField.module.css";
// import visibleOff from "../../images/icons/visible-off.svg"

const InputField = ({
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
        {type === "password" && (
          <button
            type='button'
            className={classes.revealBtn}
            onClick={() => {
              setVisible((old) => !old);
            }}
            tabIndex={-1}
          >
            <Image
              src={
                visible
                  ? "/images/icons/visible-off.svg"
                  : "/images/icons/visible-on.svg"
              }
              alt='close'
              height={30}
              width={30}
            />
          </button>
        )}
        {charLimit && (
          <p className={classes.charLimit}>
            {value ? value.length : 0} / {charLimit}
          </p>
        )}
        <input
          type={visible ? "text" : type}
          id={label && label.split(" ").join("")}
          placeholder=''
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

export default InputField;
