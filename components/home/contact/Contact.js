import clsx from "clsx";
import { useAnimationControls, useInView, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { validateEmail } from "../../../utils/clientUtil";
import InputField from "../../layout/props/InputField";
import LoadingSpinner from "../../layout/props/LoadingSpinner";
import TextArea from "../../layout/props/TextArea";
import classes from "./Contact.module.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [to, setTo] = useState();
  const [emailTo, setEmailTo] = useState();

  const controls = useAnimationControls();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50%" });

  useEffect(() => {
    if (isInView) {
      controls.start({ y: 0 });
    }
  }, [isInView]);

  useEffect(() => {
    if (submitted) {
      let _to = setTimeout(() => {
        setSubmitted(false);
        setError(false);
      }, 8000);
      setTo(_to);
    }
    return clearTimeout(to);
  }, [submitted]);

  const handleEmailChange = (e) => {
    clearTimeout(emailTo);
    let _to = setTimeout(() => {
      let errors = validateEmail(e.target.value);
      setEmailErrors(errors);
    }, 1300);
    setEmailTo(_to);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name.length || !email.length || emailErrors.length) {
      setSubmitted(true);
      setError(true);
      return;
    }
    try {
      const result = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          body,
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      setName("");
      setEmail("");
      setBody("");
      setLoading(false);
      setError(false);
      setSubmitted(true);
    } catch (error) {
      setLoading(false);
      setSubmitted(true);
      setError(true);
      console.log(error);
    }
  };

  return (
    <section title='Contact Us' className={classes.contactArea} ref={ref}>
      <div className={classes.decal}>
        <Image
          src='/images/decals/white-native-pattern-half.svg'
          width={360}
          height={31}
        />
      </div>
      <motion.div
        initial={{ y: 2000 }}
        animate={controls}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        className={classes.container}
      >
        <form onSubmit={handleSubmit}>
          <h2>Ready for a quote? Reach out to us!</h2>
          <hr />
          <div className={classes.topRow}>
            <InputField
              label='Name*'
              className={classes.input}
              value={name}
              setValue={setName}
              charLimit='30'
            />
            <InputField
              label='Email*'
              type='email'
              className={classes.input}
              value={email}
              setValue={setEmail}
              errors={emailErrors}
              onChange={handleEmailChange}
            />
          </div>
          <TextArea
            charLimit={800}
            label='Message'
            className={classes.bottomRow}
            value={body}
            setValue={setBody}
            cols='30'
            rows='10'
          />
          <button
            type='submit'
            className={clsx(
              classes.sendBtn,
              (!name.length || !email.length || emailErrors.length) &&
                classes.disabledBtn,
              submitted &&
                !loading &&
                (error ? classes.errorBtn : classes.successBtn)
            )}
          >
            {loading ? (
              <LoadingSpinner />
            ) : submitted ? (
              error ? (
                <Image alt="error" src='/images/icons/error.svg' height={35} width={35} />
              ) : (
                <Image alt="success" src='/images/icons/success.svg' height={35} width={35} />
              )
            ) : (
              "Send"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
