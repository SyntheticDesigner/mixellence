import React, { useEffect, useRef, useState } from "react";
import classes from "./Bartenders.module.css";
import Bartender from "./Bartender";
import { Element as ScrollElement, scroller } from "react-scroll";
import { motion, useAnimationControls, useInView } from "framer-motion";

const Bartenders = ({ bartenders }) => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50%" });
  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0 });
    }
  }, [isInView]);
  return (
    <div className={classes.bartendersArea} ref={ref}>
      <motion.div
        initial={{ y: 3000 }}
        animate={controls}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className={classes.container}
      >
        <h2>Get to know your bartender</h2>
        <hr />
        <p>
          We’re no strangers to delivering A1 service. Experience, knowledge,
          and a love of the craft go into every drink. There’s no stress when
          your guests are served by the best.
        </p>
        <div className={classes.bartenderList}>
          {Object.entries(bartenders).map(
            ([id, bartender], i) =>
              i < 50 && (
                <div className={classes.bartender} key={id}>
                  <Bartender bartender={bartender} />
                </div>
              )
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Bartenders;

// [[key, {name, bio, image}], [key, value]]
