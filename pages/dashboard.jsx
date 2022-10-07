import React from "react";
import ContactForm from "../components/dashboard/contact/ContactForm";
import WhatIs from "../components/dashboard/whatIs/WhatIs";
import Testimonial from "../components/dashboard/testimonial/Testimonial";
import Bartender from "../components/dashboard/bartender/Bartender";
import { validateUser } from "../utils/firebaseSDK/firebaseAdmin";
import { readData } from "../utils/firebaseSDK/firebaseDB";
import Home from "../components/home/Home";

function Dashboard({
  loggedIn,
  contactInfo,
  whatIs,
  testimonials,
  mixologists,
}) {
  if (loggedIn)
    return (
      <div style={{ paddingTop: "80px" }}>
        <ContactForm contactInfo={contactInfo} />
        <WhatIs whatIs={whatIs} />
        <Testimonial testimonials={testimonials} />
        <Bartender bartenders={mixologists} />
      </div>
    );
  return <div>404</div>;
}
// //! functions used in getServerSideProps relies on env variables configured to only be readable in
// //! server side code and can not be used in client side react code.
export async function getServerSideProps(ctx) {
  if (ctx.req.cookies.__session) {
    let uid = await validateUser(ctx.req.cookies.__session);
    if (uid) {
      const contactInfo = await readData("contact-info");
      const whatIs = await readData("what-is");
      const testimonials = await readData("testimonials");
      const mixologists = await readData("mixologists");
      return {
        props: {
          loggedIn: true,
          contactInfo,
          whatIs,
          testimonials,
          mixologists,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Dashboard;
