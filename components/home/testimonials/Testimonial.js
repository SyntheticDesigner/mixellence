import Image from "next/image";
import classes from "./Testimonials.module.css";
import {motion} from "framer-motion"

const Testimonial = ({ testimonial, controls, index }) => {
  return (
    <motion.div
      initial={{ y: 1000 * (index + 1) }}
      animate={controls}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      className={classes.testimonial}
    >
      <div className={classes.clientImage}>
        <Image
          src={testimonial.image.url}
          height={160}
          width={160}
          objectFit='cover'
          objectPosition='center'
          lazyBoundary="1200px"
          alt={testimonial.name}
        />
      </div>

      <div>
        <h3>{testimonial.name}</h3>
        {/* <p className={classes.metaInfo}>
          <span>Date of review</span> / <span>Type of event</span>
        </p> */}
        <div className={classes.stars}>
          {[...Array(JSON.parse(testimonial.rating))].map((_, i) => (
            <div key={i}>
              <Image src='/images/icons/star.svg' alt="star" height={14} width={14} />
            </div>
          ))}
        </div>
        <p className={classes.body}>{testimonial.body}</p>
      </div>
    </motion.div>
  );
};

export default Testimonial;
