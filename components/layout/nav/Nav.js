import Link from "next/link";
import classes from "./Nav.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

const Nav = () => {
  const router = useRouter();
  let slug = router.query.slug
    ? router.query.slug[0]
    : router.pathname === "/dashboard"
    ? "dashboard"
    : "home";
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={clsx(classes.navBtn, open && classes.btnOpen)}
      >
        <div className={classes.top}></div>
        <div className={classes.mid}></div>
        <div className={classes.bot}></div>
      </button>
      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          delay: 1,
          duration: 0.5,
          ease: "easeOut",
        }}
        className={clsx(classes.navWrapper, open && classes.navOpen)}
      >
        <div onClick={() => setOpen(!open)} className={classes.backdrop}></div>
        <nav>
          <ul className={classes.navMenu}>
            <li
              onClick={() => setOpen(false)}
              className={classes.navLogoMobile}
            >
              <button
                onClick={() => {
                  slug === "home"
                    ? scroller.scrollTo(slug, {
                        duration: 800,
                        delay: 0,
                        smooth: "ease",
                        offset: -80,
                      })
                    : router.push("/", undefined, { scroll: false });
                }}
              >
                <Image
                  alt='Mixellence'
                  src='/images/decals/feathers-light.svg'
                  height={60}
                  width={96}
                />
              </button>
            </li>
            <li onClick={() => setOpen(false)}>
              <button
                onClick={() =>
                  slug === "about-us"
                    ? scroller.scrollTo(slug, {
                        duration: 800,
                        delay: 0,
                        smooth: "ease",
                        offset: -80,
                      })
                    : router.push("/about-us", undefined, { scroll: false })
                }
              >
                About Us
              </button>
            </li>
            <li onClick={() => setOpen(false)}>
              <button
                onClick={() =>
                  slug === "bartenders"
                    ? scroller.scrollTo(slug, {
                        duration: 800,
                        delay: 0,
                        smooth: "ease",
                        offset: -80,
                      })
                    : router.push("/bartenders", undefined, { scroll: false })
                }
              >
                Meet The Team
              </button>
            </li>
            <li onClick={() => setOpen(false)} className={classes.navLogo}>
              <button
                onClick={() =>
                  slug === "home"
                    ? scroller.scrollTo(slug, {
                        duration: 800,
                        delay: 0,
                        smooth: "ease",
                        offset: -80,
                      })
                    : router.push("/", undefined, { scroll: false })
                }
              >
                <Image
                  alt='Mixellence'
                  src='/images/decals/feathers-light.svg'
                  height={60}
                  width={96}
                />
              </button>
            </li>
            <li onClick={() => setOpen(false)}>
              <button
                onClick={() =>
                  slug === "testimonials"
                    ? scroller.scrollTo(slug, {
                        duration: 800,
                        delay: 0,
                        smooth: "ease",
                        offset: -80,
                      })
                    : router.push("/testimonials", undefined, { scroll: false })
                }
              >
                Testimonials
              </button>
            </li>
            <li onClick={() => setOpen(false)}>
              <button
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
                Get A Quote
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>
    </>
  );
};

export default Nav;
