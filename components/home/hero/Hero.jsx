import React from "react";
import "../../layout/props/InputField";
import Image from "next/image";
import classes from "./Hero.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

const Hero = ({ contactInfo }) => {
  const router = useRouter();
  let slug = router.query.slug ? router.query.slug[0] : "home";

  return (
    <section title='Mixellence' className={classes.heroSection}>
      <div className={classes.heroImage}>
        <Image
          src={"/images/backgrounds/heroAnimate.png"}
          alt='Bartender pouring champaign'
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          priority={true}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: "easeOut",
        }}
        className={classes.titleFeathers}
      >
        <div className={classes.heroFeather}>
          <Image
            src={"/images/decals/feathers.svg"}
            alt='Mixellence'
            height={274}
            width={440}
          />
        </div>
        <div className={classes.heroTitle}>
          <h1>MIXELLENCE</h1>
        </div>
      </motion.div>
      <div>
        <motion.div
          initial={{ y: 2000 }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.8,
          }}
          className={classes.heroMonterey}
        >
          <p>Monterey Bay’s premier mobile</p>
          <p> bartending and beverage catering service.</p>
        </motion.div>
        <motion.div
          initial={{ y: 2000 }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.1,
            duration: 1.2,
            ease: "easeOut",
            delay: 0.8,
          }}
          className={classes.heroYouProvide}
        >
          You provide the alcohol. We’ll handle everything else.
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 2000 }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.1,
          duration: 1.2,
          ease: "easeOut",
          delay: 0.8,
        }}
        className={classes.heroContact}
      >
        <a
          title='Phone Number'
          href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
        >
          {contactInfo.phone}
        </a>
        <p>{contactInfo.email}</p>
      </motion.div>

      <button
        className={classes.bookNowBtn}
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
    </section>
  );
};

export default Hero;
