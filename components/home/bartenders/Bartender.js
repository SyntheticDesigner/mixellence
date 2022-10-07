import Image from "next/image";
import React from "react";
import Link from "next/link";
import classes from "./Bartenders.module.css";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";
const Bartender = ({ bartender }) => {
  const router = useRouter();
  let slug = router.query.slug ? router.query.slug[0] : "home";
  return (
    <>
      <div className={classes.clientImage}>
        <Image
          src={bartender.image.url}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          lazyBoundary='1200px'
          alt={bartender.name}
        />
      </div>
      <div className={classes.body}>
        <h3>{bartender.name}</h3>
        <hr />
        <p>{bartender.bio}</p>
      </div>
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
    </>
  );
};

export default Bartender;
