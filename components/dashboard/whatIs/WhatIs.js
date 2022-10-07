import React, { useState } from "react";
import classes from "./WhatIs.module.css";
import WhatIsForm from "./WhatIsForm";
import Image from "next/image";

function WhatIs({ whatIs }) {
  return (
    <>
      <div className={classes.whitespace}></div>

      <div className={classes.whatIsSection}>
        <header className={classes.whatIsTitle}>What is Mixellence?</header>
        <WhatIsForm whatIs={whatIs} />
      </div>
    </>
  );
}

export default WhatIs;
