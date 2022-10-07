import React, { useEffect, useState } from "react";
import LoginModal from "../admin/LoginModal";
import classes from "./Home.module.css";
import Hero from "./hero/Hero";
import WhatIs from "./whatIs/WhatIs";
import Serving from "./serving/serving";
import Bartenders from "./bartenders/Bartenders";
import Footer from "./footer/Footer";
import Contact from "./contact/Contact";
import Testimonials from "./testimonials/Testimonials";
import Drinks from "./drinks/Drinks";
import { Element as ScrollElement, scroller } from "react-scroll";
import { useRouter } from "next/router";

const Home = ({
  data: { contactInfo, whatIs, testimonials, mixologists, loggedIn },
}) => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  let slug = router.query.slug ? router.query.slug[0] : "home";
  useEffect(() => {
    scroller.scrollTo(slug, {
      duration: 800,
      delay: 0,
      smooth: "ease",
      offset: -80,
    });
  }, [slug]);
  return (
    <div className={classes.homeWrapper}>
      <ScrollElement name='home'>
        <Hero contactInfo={contactInfo} />
      </ScrollElement>
      <ScrollElement name='about-us'>
        <WhatIs body={whatIs.body} image={whatIs.image.url} />
      </ScrollElement>
      <Serving />
      <ScrollElement name='bartenders'>
        <Bartenders bartenders={mixologists} />
      </ScrollElement>
      <Drinks />
      <ScrollElement name='testimonials'>
        <Testimonials testimonials={testimonials} />
      </ScrollElement>
      <ScrollElement name='get-quote'>
        <Contact />
      </ScrollElement>
      <Footer contactInfo={contactInfo} loggedIn={loggedIn} />
      {modal && <LoginModal setModal={setModal} />}
    </div>
  );
};

export default Home;
