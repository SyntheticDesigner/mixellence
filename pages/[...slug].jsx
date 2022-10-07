import Home from "../components/home/Home";
import TestHome from "../components/home/TestHome";
import { readData } from "../utils/firebaseSDK/firebaseDB";
import { validateUser } from "../utils/firebaseSDK/firebaseAdmin";
/*
 * Left the props destructured to illustrate whats happening.
 * -----------------------------------------------------------------------
 * In get serverSideProps at the bottom we get all the data from the server
 * It is then passed to the props in the index pages functional component
 * props is destructured and then the destructured content is passed to
 * the home component in a prop called data as an object.
 */

export default function HomePage({
  contactInfo,
  whatIs,
  testimonials,
  mixologists,
}) {
  const test = false;

  if (test) return <TestHome />;

  return (
    <>
      <Home
        data={{
          contactInfo,
          whatIs,
          testimonials,
          mixologists,
        }}
      />
    </>
  );
}
//TODO What if something is missing from the data currently causes 500 page
export async function getServerSideProps(ctx) {
  const contactInfo = await readData("contact-info");
  const whatIs = await readData("what-is");
  const testimonials = await readData("testimonials");
  const mixologists = await readData("mixologists");
  const props = {
    contactInfo,
    whatIs,
    testimonials,
    mixologists,
  };

  if (ctx.req.cookies.__session) {
    let uid = await validateUser(ctx.req.cookies.__session);
    if (uid) {
      props["loggedIn"] = true;
    }
  }

  return {
    props,
  };
}
