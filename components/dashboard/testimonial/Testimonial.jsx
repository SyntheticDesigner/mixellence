import React, { useState } from "react";
import classes from "./Testimonial.module.css";
import TestimonialForm from "./TestimonialForm";

function Testimonial({ testimonials: data }) {
  const [testimonials, setTestimonials] = useState(data);
  const update = async () => {
    let result = await fetch("/api/testimonials");
    let newData = await result.json();
    setTestimonials(newData);
  };
  return (
    <>
      <div className={classes.whitespace}></div>
      <div className={classes.testimonialContainer}>
        <header className={classes.testimonialTitle}>
          Add/Edit Testimonials
        </header>
        <div className={classes.testimonialClientLayout}>
          <TestimonialForm update={update} />
          {!testimonials.error &&
            Object.keys(testimonials).map((key) => (
              <TestimonialForm
                key={key}
                testimonial={testimonials[key]}
                update={update}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Testimonial;
