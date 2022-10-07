//  clear form on submit, set max value for rating = 5
import React, { useState } from "react";
import classes from "./Bartender.module.css";
import BartenderForm from "./BartenderForm";

function Bartender({ bartenders: data }) {
  const [bartenders, setBartenders] = useState(data);
  const update = async () => {
    let result = await fetch("/api/mixologists");
    let newData = await result.json();
    setBartenders(newData);
  };
  return (
    <>
      <div className={classes.whitespace}></div>
      <div className={classes.bartenderContainer}>
        <header className={classes.bartenderTitle}>Add/Edit Bartenders</header>
        <div className={classes.bartenderLayout}>
          <BartenderForm update={update} />
          {!bartenders.error && Object.keys(bartenders).map((key) => (
            <BartenderForm
              key={key}
              bartender={bartenders[key]}
              update={update}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Bartender;
