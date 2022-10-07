import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./WhatIs.module.css";
import dashClasses from "../dashboard.module.css";
import { updateWhatIs } from "../../../utils/clientUtil";
import LoadingBtn from "../../layout/props/LoadingBtn";

function WhatIsForm({ whatIs }) {
  let reader;
  if (typeof window !== "undefined") {
    reader = new window.FileReader();
  }
  const [photo, setPhoto] = useState();
  const [bio, setBio] = useState(whatIs.body);
  const [_image, set_image] = useState();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [to, setTo] = useState();

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      set_image(reader.result);
    };
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = await updateWhatIs({ body: bio, image: photo });
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
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className={classes.whatIsContainer}>
        <div className={classes.whatIsTextArea}>
          <button
            type='button'
            className={classes.clearBtn}
            onClick={() => setBio("")}
            title="Clear"
          >
            <Image src='/images/icons/clear.svg' alt="Clear Text" width='16px' height='16px' />
          </button>
          <textarea
            value={bio}
            placeholder='Enter Description'
            onChange={(e) => {
              handleBioChange(e);
            }}
          ></textarea>
        </div>
        <div className={classes.photoContainer}>
          <label htmlFor='whatIsImage'>
            {whatIs.image && (
              <div>
                <Image
                  src={_image ? _image : whatIs.image.url}
                  height={400}
                  width={400}
                  alt="Upload an Image for the What Is Section"
                />
              </div>
            )}
            <div className={classes.overlay}>
              <Image
                src='/images/icons/upload-image.png'
                height={400}
                width={400}
                alt="Upload Image"
              />
            </div>
          </label>
          <input
            id='whatIsImage'
            type='file'
            onChange={(e) => handlePhotoChange(e)}
          />
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
  );
}

export default WhatIsForm;
