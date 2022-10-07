import React, { useState } from "react";
import LoginModal from "../../admin/LoginModal";
import classes from "./footer.module.css";

const ContactInfo = ({ contactInfo }) => {
  return (
    <div className={classes.contactInfo}>
      <h2 onClick={() => setModal(true)}>Contact</h2>
      {contactInfo.address && (
        <p title='Business Address'>{contactInfo.address}</p>
      )}
      {(contactInfo.phone || contactInfo.mobile) && (
        <p>
          {contactInfo.phone && (
            <a
              title='Phone Number'
              href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
            >
              Phone: {contactInfo.phone}
            </a>
          )}
          {contactInfo.phone && contactInfo.mobile && <span> | </span>}
          {contactInfo.mobile && (
            <a
              title='Mobile Phone Number'
              href={`tel:${contactInfo.mobile.replace(/\D/g, "")}`}
            >
              Mobile: {contactInfo.mobile}
            </a>
          )}
        </p>
      )}
      {contactInfo.email && <p>Email: {contactInfo.email}</p>}
    </div>
  );
};

export default ContactInfo;
