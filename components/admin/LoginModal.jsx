import React, { useEffect, useRef, useState } from "react";
import classes from "./LoginModal.module.css";
import clsx from "clsx";
import InputField from "../layout/props/InputField";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookie } from "../../utils/clientUtil";
import LoadingSpinner from "../layout/props/LoadingSpinner";
import LoadingBtn from "../layout/props/LoadingBtn";

const LoginModal = ({ setModal }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState(
    emailRef.current ? emailRef.current.value : ""
  );
  const [password, setPassword] = useState(
    passwordRef.current ? passwordRef.current.value : ""
  );
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [emailTimeout, setEmailTimeout] = useState(null);
  const [resetPassword, setResetPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [to, setTo] = useState();

  const validBtnClass =
    password.length && email.length && !emailError.length
      ? classes.validLogin
      : null;

  const validateEmail = async () => {
    const response = await fetch(`/api/auth/validate-email`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
    });
    let data = await response.json();
    if (response.ok) {
      setPasswordError([]);
      setEmailError([]);
      return true;
    } else {
      setPasswordError([]);
      setEmailError([{ field: "email", message: data.message }]);
      return false;
    }
  };

  useEffect(() => {
    if (submitted) {
      let _to = setTimeout(() => {
        setSubmitted(false);
        if (!error) {
          setResetPassword(false);
        } else {
          setError(false);
        }
      }, 5000);
      setTo(_to);
    }
    return clearTimeout(to);
  }, [submitted]);

  const validatePassword = async () => {
    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    setCookie("__session", data.idToken, 3600);
    if (response.ok) {
      setEmailError([]);
      return true;
    } else {
      setPasswordError([
        { field: "password", message: "Password is incorrect!" },
      ]);
      return false;
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setEmailError([]);
      const to = setTimeout(() => {
        validateEmail();
      }, 1200);
      setEmailTimeout(to);
      return clearTimeout(emailTimeout);
    }
  }, [email]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!emailError.length) {
      if (await validatePassword()) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await fetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    let data = await result.json();
    if (data.error) {
      setSubmitted(true);
      setLoading(false);
      setError(true);
      console.log(data);
    } else {
      setSubmitted(true);
      setLoading(false);
      setError(false);
    }
  };
  return createPortal(
    <div className={classes.modalBg}>
      <div
        className={classes.backDrop}
        onClick={() => {
          setResetPassword(false);
          setModal(false);
        }}
      />
      {resetPassword ? (
        <form className={classes.loginModal} onSubmit={handleResetSubmit}>
          <button
            type='button'
            className={classes.closeBtn}
            onClick={() => {
              setResetPassword(false);
            }}
          >
            <Image
              src='/images/icons/close.svg'
              alt='close'
              height={17}
              width={17}
            />
          </button>
          <h2>Reset Password</h2>
          <hr />

          {submitted && !error ? (
            <div style={{ textAlign: "center", font: "var(--desk-body)" }}>
              <b>
                An email has been sent please follow the steps to reset you
                password
              </b>
              <br />
              <br />
              <p>(If you do not see it check your spam folder)</p>
            </div>
          ) : submitted && error ? (
            <div style={{ textAlign: "center", font: "var(--desk-body)" }}>
              <b>
                There was an error sending the reset password email. <br />
                Double check your email. <br /> <br />If the error persists contact
                your web admin.
              </b>
            </div>
          ) : (
            <InputField
              label='Email'
              value={email}
              setValue={setEmail}
              className={classes.adminInput}
              errors={emailError}
              inputRef={emailRef}
            />
          )}
          <LoadingBtn
            value='Enter'
            className={clsx(classes.loginBtn, validBtnClass)}
            loading={loading}
            submitted={submitted}
            error={error}
          />
        </form>
      ) : loading ? (
        <div className={classes.loadingSpinner}>
          <LoadingSpinner />
        </div>
      ) : (
        <form className={classes.loginModal} onSubmit={handleSubmit}>
          <button
            type='button'
            className={classes.closeBtn}
            onClick={() => setModal(false)}
          >
            <Image
              src='/images/icons/close.svg'
              alt='close'
              height={17}
              width={17}
            />
          </button>
          <h2>Administrator login</h2>
          <hr />

          <InputField
            label='Email'
            value={email}
            setValue={setEmail}
            className={classes.adminInput}
            errors={emailError}
            inputRef={emailRef}
          />
          <InputField
            label='Password'
            type='password'
            className={classes.adminInput}
            value={password}
            setValue={setPassword}
            errors={passwordError}
            onChange={() => setPasswordError([])}
            inputRef={passwordRef}
          />
          <button
            type='submit'
            className={clsx(classes.loginBtn, validBtnClass)}
          >
            Enter
          </button>
          <button
            type='button'
            className={classes.forgotBtn}
            onClick={() => setResetPassword(true)}
          >
            Forgot password?
          </button>
        </form>
      )}
    </div>,
    document.getElementById("modalPortal")
  );
};

export default LoginModal;
