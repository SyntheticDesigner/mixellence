import React, { useEffect, useRef, useState } from "react";
import classes from "./Serving.module.css";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useInView,
} from "framer-motion";
import clsx from "clsx";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";
let images = [
  { type: "concert", text: "Venues / Small Concerts", blurData: "" },
  { type: "private", text: "Private Parties", blurData: "" },
  { type: "corporate", text: "Corporate Events", blurData: "" },
  { type: "food", text: "Food Pop-Ups", blurData: "" },
  { type: "wedding", text: "Weddings", blurData: "" },
];

//TODO to improve load time and create image place holders we might try using the blurhash package and create encoded blurred image's at the time of upload these images would be much faster to load and could be used in the placeholder property on next/images
//* Beside that we want to make sure these event images are as small as they can be without losing quality
const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 2000 : -2000,
      opacity: 1,
    };
  },
  textEnter: (direction) => {
    return {
      x: direction > 0 ? 2000 : -2000,
      opacity: 1,
    };
  },

  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 2000 : -2000,
      opacity: 1,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Serving = (props) => {
  const router = useRouter();
  let slug = router.query.slug ? router.query.slug[0] : "home";
  const [[page, direction], setPage] = useState([0, 0]);
  const controls = useAnimationControls();
  const ref = useRef(null);
  const [to, setTo] = useState();
  const [pause, setPause] = useState(false);

  const paginate = (newDirection) => {
    let newPage = page + newDirection;
    if (newPage < 0) {
      newPage = images.length - 1;
    } else {
      newPage = newPage % images.length;
    }
    setPage([newPage, newDirection]);
  };

  const isInView = useInView(ref, { margin: "-50%" });

  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0 });
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView && !pause) {
      clearTimeout(to);
      let _to = setTimeout(() => {
        paginate(1);
      }, 4250);
      setTo(_to);
    }
    return clearTimeout(to);
  }, [page, isInView, pause]);

  return (
    <section title='Serving' className={classes.servingSection} ref={ref}>
      <div className={classes.patternTop}>
        <Image
          src={"/images/decals/white-native-pattern-half.svg"}
          alt='Pattern Image'
          width='360'
          height='31'
        />
      </div>
      <motion.div
        className={classes.servingWrapper}
        initial={{ y: 2000 }}
        animate={controls}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <div className={classes.servingTitle}> Serving</div>
        <hr className={classes.servingUnderline} />
        <p className={classes.servingText}>
          Whether it’s a lavish wedding reception, an private party with
          friends, or an independent art exhibit, you’ll find that our
          professionalism and quality of service remain ever consistent. And
          that means happy guests!
        </p>
        <div
          className={classes.servingCarousel}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className={classes.carouselItem}
              title={images[page].type}
              key={page}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
              exit='exit'
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <div className={classes.carouselImage}>
                <Image
                  src={`/images/events/desktop-${images[page].type}-event.png`}
                  layout='fill'
                  objectFit='cover'
                  objectPosition='center'
                  alt={images[page].type}
                  // priority={true}
                  // placeholder='blur'
                  // blurDataURL=''
                />
              </div>
              <motion.div
                className={classes.carouselText}
                custom={direction}
                variants={variants}
                initial='enter'
                animate='center'
                transition={{
                  delay: 0.01,
                  duration: 1,
                  ease: "easeOut",
                }}
                exit='exit'
              >
                <h2>{images[page].text}</h2>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={classes.controller}>
          <button
            className={classes.prev}
            onClick={() => paginate(-1)}
          ></button>
          <div
            onClick={() => setPage([0, 0 - page])}
            className={clsx(classes.ind, page === 0 && classes.indOn)}
          ></div>
          <div
            onClick={() => setPage([1, 1 - page])}
            className={clsx(classes.ind, page === 1 && classes.indOn)}
          ></div>
          <div
            onClick={() => setPage([2, 2 - page])}
            className={clsx(classes.ind, page === 2 && classes.indOn)}
          ></div>
          <div
            onClick={() => setPage([3, 3 - page])}
            className={clsx(classes.ind, page === 3 && classes.indOn)}
          ></div>
          <div
            onClick={() => setPage([4, 4 - page])}
            className={clsx(classes.ind, page === 4 && classes.indOn)}
          ></div>

          <button className={classes.next} onClick={() => paginate(1)}></button>
        </div>
        <button
          className={classes.servingBookNowBtn}
          onClick={() =>
            slug === "get-quote"
              ? scroller.scrollTo(slug, {
                  duration: 800,
                  delay: 0,
                  smooth: "ease",
                  offset: -80,
                })
              : router.push("/get-quote", undefined, { scroll: false })
          }
        >
          Book Now
        </button>
      </motion.div>
      <div className={classes.patternBottom}>
        <Image
          src={"/images/decals/white-native-pattern-half.svg"}
          alt='Pattern Image'
          width='360'
          height='31'
        />
      </div>
    </section>
  );
};

export default Serving;
