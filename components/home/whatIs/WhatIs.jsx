import React, { useRef, useEffect } from "react";
import classes from "./WhatIs.module.css";
import Image from "next/image";
import { motion, useInView, useAnimationControls } from "framer-motion";
import ReactMarkdown, { Components } from "react-markdown";

const WhatIs = (props) => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50%" });
  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0 });
    }
  }, [isInView]);

  return (
    <section className={classes.outerContainer} title='About' ref={ref}>
      <motion.div
        initial={{ y: 2000 }}
        animate={controls}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className={classes.whatIsSection}
      >
        <div className={classes.whatIsTextWrapper}>
          <h2 className={classes.whatIsTitle}>What is Mixellence?</h2>
          <hr className={classes.underline} />
          <div className={classes.placeholderFramerMotion2}>
            <div className={classes.whatIsBody}>
              <ReactMarkdown>{props.body}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className={classes.whatIsPhoto}>
          <Image src={props.image} alt='Roel' width='412' height='363' />
        </div>
      </motion.div>
    </section>
  );
};

export default WhatIs;
