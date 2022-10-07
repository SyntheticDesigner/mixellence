import Image from "next/image";
import React from "react";
import classes from "./footer.module.css";

const SocialLinks = ({
  contactInfo: { facebook, google, instagram, twitter, tiktok, yelp },
}) => {
  return (
    <div className={classes.socialLinks}>
      {yelp && (
        <a href={yelp}>
          <Image src='/images/icons/yelp.svg' height={35} width={35} alt="yelp" />
        </a>
      )}
      {google && (
        <a href={google}>
          <Image src='/images/icons/google.svg' height={35} width={35} alt="google business"/>
        </a>
      )}
      {facebook && (
        <a href={facebook}>
          <Image src='/images/icons/facebook.svg' height={35} width={35} alt="facebook"/>
        </a>
      )}
      {twitter && (
        <a href={twitter}>
          <Image src='/images/icons/twitter.svg' height={35} width={35} alt="twitter"/>
        </a>
      )}
      {yelp && (
        <a href={yelp}>
          <Image src='/images/icons/yelp.svg' height={35} width={35} alt="yelp"/>
        </a>
      )}
      {instagram && (
        <a href={instagram}>
          <Image src='/images/icons/instagram.svg' height={35} width={35} alt="instagram"/>
        </a>
      )}
      {tiktok && (
        <a href={tiktok}>
          <Image src='/images/icons/tiktok.svg' height={35} width={35} alt="tiktok"/>
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
