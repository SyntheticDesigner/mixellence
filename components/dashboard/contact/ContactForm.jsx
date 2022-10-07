// TODO - Mask the phone number (000)000-0000
import React, { useEffect, useState } from "react";
import classes from "./ContactForm.module.css";
import dashClasses from "../dashboard.module.css";
import { useRouter } from "next/router";
import { readContact, updateContact } from "../../../utils/clientUtil";
import LoadingBtn from "../../layout/props/LoadingBtn";
import { setCookie } from "../../../utils/clientUtil";
import Image from "next/image";

function Contact({ contactInfo: contactData }) {
  const router = useRouter();
  //Manage the state values of inputs
  const [contactInfo, setContactInfo] = useState(contactData);
  const [phone, setPhone] = useState(contactInfo.phone);
  const [mobile, setMobile] = useState(contactInfo.mobile);
  const [address, setAddress] = useState(contactInfo.address);
  const [email, setEmail] = useState(contactInfo.email);
  const [license, setLicense] = useState(contactInfo.license);
  const [serving, setServing] = useState(contactInfo.serving);
  const [socialYelp, setSocialYelp] = useState(contactInfo.yelp);
  const [socialGoogle, setSocialGoogle] = useState(contactInfo.google);
  const [socialFB, setSocialFB] = useState(contactInfo.facebook);
  const [socialInstagram, setSocialInstagram] = useState(contactInfo.instagram);
  const [socialTwitter, setSocialTwitter] = useState(contactInfo.twitter);
  const [socialTikTok, setSocialTikTok] = useState(contactInfo.tiktok);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [to, setTo] = useState();

  // Functions that update the state values as each character is entered.
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleLicenseChange = (e) => {
    setLicense(e.target.value);
  };
  const handleServingChange = (e) => {
    setServing(e.target.value);
  };

  const handleYelpChange = (e) => {
    setSocialYelp(e.target.value);
  };

  const handleGoogleChange = (e) => {
    setSocialGoogle(e.target.value);
  };
  const handleFBChange = (e) => {
    setSocialFB(e.target.value);
  };

  const handleInstagramChange = (e) => {
    setSocialInstagram(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setSocialTwitter(e.target.value);
  };

  const handleTikTokChange = (e) => {
    setSocialTikTok(e.target.value);
  };

  // Sends the full form with all the data that has been added
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = await updateContact({
      phone,
      mobile,
      address,
      email,
      serving,
      license,
      yelp: socialYelp,
      google: socialGoogle,
      facebook: socialFB,
      instagram: socialInstagram,
      twitter: socialTwitter,
      tiktok: socialTikTok,
    });
    if (data.error) {
      setLoading(false);
      setError(true);
      setSubmitted(true);
      console.log(data.error);
    } else {
      setLoading(false);
      setError(false);
      setSubmitted(true);
    }
    const updated = await readContact();
    setContactInfo(updated);
  };

  useEffect(() => {
    if (submitted) {
      let _to = setTimeout(() => {
        setSubmitted(false);
        setError(false);
      }, 3000);
      setTo(_to);
    }
    return clearTimeout(to);
  }, [submitted]);

  return (
    //This submit button sends all the changes in the form
    <div className={classes.dashFormContainer}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={classes.dashWelcome}>
          <h1>Welcome Roel</h1>
          <button
            type='button'
            className={classes.logout}
            onClick={() => {
              setCookie("__session", "", 0);
              router.replace("/");
            }}
          >
            Log out
          </button>
        </div>

        <h3 className={classes.dashContactInfoTitle}> Contact Info </h3>
        <div className={classes.dashContactInputContainer}>
          <div className={classes.dashContactContainerLeft}>
            <div className={classes.dashInput}>
              <label htmlFor='phone'>Phone Number :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setPhone("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='tel'
                  value={phone}
                  id='phone'
                  onChange={(e) => {
                    handlePhoneChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='mobile'>Mobile Number :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setMobile("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='tel'
                  value={mobile}
                  id='mobile'
                  onChange={(e) => {
                    handleMobileChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='address'>Address :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setAddress("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  value={address}
                  id='address'
                  onChange={(e) => {
                    handleAddressChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='email'>Email :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setEmail("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='email'
                  value={email}
                  id='email'
                  onChange={(e) => {
                    handleEmailChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='license'>License :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setLicense("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  value={license}
                  id='license'
                  onChange={(e) => {
                    handleLicenseChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='serving'>Areas Serving :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setServing("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  value={serving}
                  id='serving'
                  onChange={(e) => {
                    handleServingChange(e);
                  }}
                />
              </div>
            </div>
          </div>
          {/*    SECOND COLUMN OF INPUTS   */}
          <div className={classes.dashSocialMediaContainerRight}>
            <div className={classes.dashInput}>
              <label htmlFor='dashYelpInput'>Yelp :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setSocialYelp("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  id='dashYelpInput'
                  value={socialYelp}
                  onChange={(e) => {
                    handleYelpChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='dashGoogleInput'>Google My Business :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setSocialGoogle("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  id='dashGoogleInput'
                  value={socialGoogle}
                  onChange={(e) => {
                    handleGoogleChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='dashFBInput'>FaceBook :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setSocialFB("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  id='dashFBInput'
                  value={socialFB}
                  onChange={(e) => {
                    handleFBChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='dashInstagramInput'>Instagram :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setSocialInstagram("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  id='dashInstagramInput'
                  value={socialInstagram}
                  onChange={(e) => {
                    handleInstagramChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='dashTwitterInput'>Twitter :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setSocialTwitter("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  id='dashTwitterInput'
                  value={socialTwitter}
                  onChange={(e) => {
                    handleTwitterChange(e);
                  }}
                />
              </div>
            </div>
            <div className={classes.dashInput}>
              <label htmlFor='dashTikTokInput'>TikTok :</label>
              <div className={classes.inputWrapper}>
                <button
                  type='button'
                  className={classes.clearBtn}
                  onClick={() => setSocialTikTok("")}
                  title='Clear'
                >
                  <Image
                    alt='Clear Text'
                    src='/images/icons/clear.svg'
                    width='16px'
                    height='16px'
                  />
                </button>
                <input
                  type='text'
                  id='dashTikTokInput'
                  value={socialTikTok}
                  onChange={(e) => {
                    handleTikTokChange(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <LoadingBtn
          className={dashClasses.dashSaveBtn}
          value='Save'
          type='submit'
          loading={loading}
          submitted={submitted}
          error={error}
        />
      </form>
    </div>
  );
}
export default Contact;
