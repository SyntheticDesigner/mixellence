import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import classes from "./Testimonials.module.css";
import homeClasses from "../Home.module.css";
import Testimonial from "./Testimonial";
import { motion, useAnimationControls, useInView } from "framer-motion";
const Testimonials = ({ testimonials }) => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50%" });
  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0 });
    }
  }, [isInView]);
  const [showMore, setShowMore] = useState(false);
  return (
    <section
      title='Testimonials'
      className={classes.testimonialsArea}
      ref={ref}
    >
      <motion.div
        initial={{ y: 3000 }}
        animate={controls}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className={classes.container}
      >
        <h2>Testimonials</h2>
        <hr />
        <div className={classes.testimonialList}>
          {showMore
            ? Object.entries(testimonials).map(([id, testimonial]) => (
                <div key={id}>
                  <Testimonial testimonial={testimonial} />
                </div>
              ))
            : Object.entries(testimonials).map(
                ([id, testimonial], i) =>
                  i < 2 && (
                    <div key={id}>
                      <Testimonial
                        index={i}
                        controls={controls}
                        testimonial={testimonial}
                      />
                    </div>
                  )
              )}
        </div>
        {Object.entries(testimonials).length > 2 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className={homeClasses.btn}
          >
            {showMore ? "Less" : "More"}
          </button>
        )}
      </motion.div>
    </section>
  );
};

export default Testimonials;

// [[key, {name, bio, image}], [key, value]]
