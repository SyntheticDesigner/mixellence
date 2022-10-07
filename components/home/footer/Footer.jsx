import React, { useEffect, useState } from "react";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";
import classes from "./footer.module.css";
import Image from "next/image";
import LoginModal from "../../admin/LoginModal";
import { useRouter } from "next/router";

const Footer = ({ contactInfo, loggedIn }) => {
  const [unlock1, setUnlock1] = useState(false);
  const [unlock2, setUnlock2] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (unlock1 && unlock2) {
      setUnlock1(false);
      setUnlock2(false);
      if (loggedIn) {
        router.push("/dashboard");
      } else {
        setModal(true);
      }
    }
  }, [unlock1, unlock2]);
  return (
    <footer className={classes.footer}>
      <div className={classes.imageLeft} onClick={() => setUnlock1(true)}>
        <Image
          src='/images/decals/feathers-medium.svg'
          height={196}
          width={344}
          alt="Mixellence"
        />
      </div>
      <div className={classes.mainContent}>
        <ContactInfo contactInfo={contactInfo} />
        <div
          className={classes.imageCenter}
          onClick={() => (unlock1 ? setUnlock2(true) : setUnlock1(true))}
        >
          <Image
            src='/images/decals/feathers-medium.svg'
            height={196}
            width={344}
            alt="Mixellence"
          />
        </div>
        <SocialLinks contactInfo={contactInfo} />
        <div className={classes.addInfo}>
          {contactInfo.serving && (
            <p>Proudly serving the {contactInfo.serving} Area</p>
          )}
          <p>
            Copyright Mixellence{" "}
            {contactInfo.license && (
              <span>| License #{contactInfo.license}</span>
            )}
          </p>
        </div>
      </div>
      <div className={classes.imageRight} onClick={() => setUnlock2(true)}>
        <Image
          src='/images/decals/feathers-medium.svg'
          height={196}
          width={344}
          alt="Mixellence"
        />
      </div>
      {modal && <LoginModal setModal={setModal} />}
    </footer>
  );
};

export default Footer;
