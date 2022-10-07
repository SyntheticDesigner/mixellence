import React from "react";
import { motion } from "framer-motion";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.loadingSpinner}>
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "linear",
        }}
      >
        <svg
          width='39'
          height='39'
          viewBox='0 0 39 39'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M2 19.5C2 29.165 9.83501 37 19.5 37C29.165 37 37 29.165 37 19.5C37 9.83501 29.165 2 19.5 2'
            stroke='white'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </motion.div>
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
      >
        <svg
          width='25'
          height='25'
          viewBox='0 0 25 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M23 12.5C23 6.70103 18.299 2 12.5 2C6.70103 2 2 6.70103 2 12.5C2 18.299 6.70103 23 12.5 23'
            stroke='white'
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
