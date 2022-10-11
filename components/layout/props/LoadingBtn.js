import clsx from "clsx";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import classes from "./LoadingBtn.module.css";

const LoadingBtn = ({
  value,
  className,
  type,
  disabled,
  loading,
  submitted,
  error,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={clsx(
        className && className,
        disabled && classes.disabledBtn,
        !loading && submitted && (error ? classes.errorBtn : classes.successBtn)
      )}
      onClick={onClick ? onClick : null}
    >
      {loading ? (
        <LoadingSpinner />
      ) : submitted ? (
        error ? (
          <Image
            src='/images/icons/error.svg'
            alt='error'
            height={35}
            width={35}
          />
        ) : (
          <Image
            src='/images/icons/success.svg'
            alt='success'
            height={35}
            width={35}
          />
        )
      ) : (
        value
      )}
    </button>
  );
};

export default LoadingBtn;
