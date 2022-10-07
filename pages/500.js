import React, { useState } from "react";
import LoginModal from "../components/admin/LoginModal";

const Error = () => {
  const [modal, setModal] = useState(false);
  return (
    <div
      onDoubleClick={() => setModal(true)}
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
        color: "white",
        backgroundColor: "var(--bg-dark)",
        textAlign: "center",
      }}
    >
      500 : Missing Information! <br /> Check Dashboard or contact Web Admin
      {modal && <LoginModal setModal={setModal} />}
    </div>
  );
};

export default Error;
