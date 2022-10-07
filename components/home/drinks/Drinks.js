import { motion, useAnimationControls, useInView } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Drink from "./Drink";
import classes from "./Drink.module.css";

const drinks = {
  paloma: {
    name: "Paloma",
    id: "paloma",
    image: { url: "/images/drinks/paloma.png" },
    description:
      "Tequila, lime juice, and your favorite brand of grapefruit flavored soda. This refreshing cocktail will have your guests lining up for more.",
  },
  mojito: {
    name: "Mojito",
    id: "mojito",
    image: { url: "/images/drinks/mojito.png" },
    description:
      "AKA The Cuban Highball. Another popular one with our clients. White rum, sugar, lime juice, soda water, and mint. A timeless classic.",
  },
  margarita: {
    name: "Margarita",
    id: "margarita",
    image: { url: "/images/drinks/margarita.png" },
    description:
      "The classic margarita. Tequila, triple sec, and lime juice. Shaken with ice or blended if you prefer. Oh and we won’t forgot to salt the rim for you.",
  },
};

const Drinks = () => {
  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px" });
  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0 });
    }
  }, [isInView]);
  return (
    <section name='Cocktails' className={classes.drinkSection} ref={ref}>
      <div className={classes.topImage}>
        <Image
          src='/images/decals/white-native-pattern-half.svg'
          width={360}
          height={31}
        />
      </div>
      <motion.div
        initial={{ y: 3000 }}
        animate={controls}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className={classes.container}
      >
        <h2>Popular cocktails</h2>
        <hr />
        <div className={classes.drinkList}>
          {Object.entries(drinks).map(([id, drink], i) => (
            <div key={id}>
              <Drink drink={drink} />
            </div>
          ))}
        </div>
      </motion.div>
      <div className={classes.bottomImage}>
        <Image
          src='/images/decals/white-native-pattern-half.svg'
          width={360}
          height={31}
        />
      </div>
    </section>
  );
};

export default Drinks;
