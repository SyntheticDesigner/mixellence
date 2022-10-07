import Image from "next/image";
import React from "react";
import classes from "./Drink.module.css";
const Drink = ({ drink }) => {
  return (
    <div className={classes.drink}>
      <div className={classes.drinkImage}>
        <Image
          src={drink.image.url}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt={drink.name}
        />
      </div>
      <h3>{drink.name}</h3>
      <hr />
      <p>{drink.description}</p>
    </div>
  );
};

export default Drink;
