import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./Bartender.module.css";
import dashClasses from "../dashboard.module.css";
import { addMixologist, updateMixologist } from "../../../utils/clientUtil";
import { useRouter } from "next/router";
import DeleteModal from "../DeleteModal";
import LoadingBtn from "../../layout/props/LoadingBtn";

function BartenderForm({ bartender, update }) {
  const [_photo, set_photo] = useState("");
  const [photo, setPhoto] = useState();
  const [name, setName] = useState(bartender ? bartender.name : "");
  const [bio, setBio] = useState(bartender ? bartender.bio : "");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState();
  const [to, setTo] = useState();

  let reader;
  if (typeof window !== "undefined") {
    reader = new window.FileReader();
  }

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      set_photo(reader.result);
    };
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    if (bartender) {
      const data = await updateMixologist(bartender.id, {
        image: photo,
        name,
        bio,
      });
      if (data.error) {
        setLoading(false);
        setError(true);
        setSubmitted(true);
        console.log(data.error);
      } else {
        setError(false);
        setLoading(false);
        setSubmitted(true);
      }
    } else {
      const data = await addMixologist(photo, name, bio);
      if (!data.error) {
        setName("");
        setBio("");
        setPhoto(null);
        set_photo(null);
        setError(false);
        setLoading(false);
        setSubmitted(true);
      } else {
        setLoading(false);
        setError(true);
        setSubmitted(true);
        setErrorText(data.error);
        console.log(data.error);
      }
    }
    ////DONE: get new data from the server keep the scroll position the same somehow
    update();
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
      {error && (
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%)",
            height: "calc(100% - 80px)",
            width: "100%",
            display: "grid",
            placeItems: "center",
            color: "var(--error)",
            textAlign: "center",
            zIndex: "3",
            font: "var(--desk-title1)",
            "-webkit-backdrop-filter": "blur(4px)",
            fontSize: "36px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => {
            setSubmitted(false);
            setError(false);
          }}
        >
          {errorText}
        </div>
      )}
      {bartender && <DeleteModal data={bartender} update={update} />}
      <div className={classes.bartenderName}>
        {bartender ? bartender.name : "Add New Bartender"}
      </div>
      <label htmlFor={bartender ? bartender.id : "bartenderImage1"}>
        Bartender Image
      </label>
      <input
        className={classes.bartenderImage}
        id={bartender ? bartender.id : "bartenderImage1"}
        type='file'
        onChange={(e) => {
          handlePhotoChange(e);
        }}
      />
      <div className={classes.images}>
        <label htmlFor={bartender ? bartender.id : "bartenderImage1"}>
          <Image
            src='/images/icons/upload-image.png'
            alt='upload'
            height={75}
            width={75}
          />
        </label>
        {_photo ? (
          <label htmlFor={bartender ? bartender.id : "bartenderImage1"}>
            <Image
              src={_photo}
              height={75}
              width={75}
              alt={bartender ? bartender.name : "Placeholder"}
            />
          </label>
        ) : bartender ? (
          <label htmlFor={bartender ? bartender.id : "bartenderImage1"}>
            <Image
              src={bartender.image.url}
              height={75}
              width={75}
              alt={bartender ? bartender.name : "Placeholder"}
            />
          </label>
        ) : (
          <></>
        )}
      </div>

      <p />
      <div className={classes.bartenderInput}>
        <label>Name</label>
        <div className={classes.inputWrapper}>
          <input
            type='text'
            value={name}
            onChange={(e) => {
              handleNameChange(e);
            }}
          />
          <button
            type='button'
            className={classes.clearBtn}
            onClick={() => setName("")}
            title='Clear'
          >
            <Image
              src='/images/icons/clear.svg'
              alt='Clear Text'
              width='16px'
              height='16px'
            />
          </button>
        </div>
      </div>
      <div className={classes.bartenderTextArea}>
        <label>Bio</label>
        <p>Recommended 35 - 40 words</p>
        <div className={classes.textAreaWrapper}>
          <textarea
            className={classes.textArea}
            value={bio}
            onChange={(e) => {
              handleBioChange(e);
            }}
          ></textarea>
          <button
            type='button'
            className={classes.clearBtn}
            onClick={() => setBio("")}
            title='Clear'
          >
            <Image
              src='/images/icons/clear.svg'
              alt='Clear Text'
              width='16px'
              height='16px'
            />
          </button>
        </div>
      </div>

      <br />
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

export default BartenderForm;
