import Image from "next/image";
import React, { useEffect, useState } from "react";
import classes from "./Testimonial.module.css";
import dashClasses from "../dashboard.module.css";
import { addTestimonial, updateTestimonial } from "../../../utils/clientUtil";
import DeleteModal from "../DeleteModal";
import LoadingBtn from "../../layout/props/LoadingBtn";

function TestimonialForm({ testimonial, update }) {
  const [_photo, set_photo] = useState("");
  const [photo, setPhoto] = useState();
  const [name, setName] = useState(testimonial ? testimonial.name : "");
  const [rating, setRating] = useState(testimonial ? testimonial.rating : "");
  const [body, setBody] = useState(testimonial ? testimonial.body : "");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [to, setTo] = useState();
  const [errorText, setErrorText] = useState();

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

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    if (testimonial) {
      const data = await updateTestimonial(testimonial.id, {
        image: photo,
        name,
        rating,
        body,
      });
      setLoading(false);
      if (data.error) {
        setError(true);
        setSubmitted(true);
        console.log(data.error);
      } else {
        setError(false);
        setLoading(false);
        setSubmitted(true);
      }
    } else {
      const data = await addTestimonial(photo, name, rating, body);
      if (!data.error) {
        setName("");
        setBody("");
        setPhoto(null);
        set_photo(null);
        setRating("");
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
      {testimonial && (
        <DeleteModal data={testimonial} update={update} type='testimonial' />
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%)",
            height: "calc(100% - 77px)",
            width: "100%",
            display: "grid",
            placeItems: "center",
            color: "var(--error)",
            textAlign: "center",
            zIndex: "3",
            font: "var(--desk-title1)",
            fontSize: "36px",
            "-webkit-backdrop-filter": "blur(4px)",
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
      <div className={classes.testimonialClientName}>
        {testimonial ? testimonial.name : "Add New Testimonial"}
      </div>
      <label>Client image</label>
      <br />
      <input
        className={classes.clientImage}
        id={testimonial ? testimonial.id : "testimonialImage1"}
        type='file'
        onChange={(e) => {
          handlePhotoChange(e);
        }}
      />
      <div className={classes.images}>
        <label htmlFor={testimonial ? testimonial.id : "testimonialImage1"}>
          <Image
            src='/images/icons/upload-image.png'
            alt='Upload Image'
            height={75}
            width={75}
          />
        </label>
        {_photo ? (
          <label htmlFor={testimonial ? testimonial.id : "testimonialImage1"}>
            <Image
              src={_photo}
              height={75}
              width={75}
              alt={testimonial ? testimonial.name : "Placeholder"}
            />
          </label>
        ) : testimonial ? (
          <label htmlFor={testimonial ? testimonial.id : "testimonialImage1"}>
            <Image
              src={testimonial.image.url}
              alt={testimonial ? testimonial.name : "Placeholder"}
              height={75}
              width={75}
            />
          </label>
        ) : (
          <></>
        )}
      </div>

      <div className={classes.testimonialInput}>
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
      <div className={classes.testimonialInput}>
        <label>Rating (1 - 5)</label>
        <div className={classes.inputWrapper}>
          <input
            id='testimonialInput'
            type='text'
            value={rating}
            onChange={(e) => {
              handleRatingChange(e);
            }}
          />
          <button
            type='button'
            className={classes.clearBtn}
            onClick={() => setRating("")}
            title='Clear'
          >
            <Image
              src='/images/icons/clear.svg'
              width='16px'
              height='16px'
              alt='Clear Text'
            />
          </button>
        </div>
      </div>
      <div className={classes.testimonialTextArea}>
        <label>Body</label>
        <p>(recommended 35 - 40 maximum)</p>
        <div className={classes.textAreaWrapper}>
          <textarea
            value={body}
            onChange={(e) => {
              handleBodyChange(e);
            }}
            className={classes.textArea}
          />
          <button
            type='button'
            className={classes.clearBtn}
            onClick={() => setBody("")}
            title='Clear'
          >
            <Image
              src='/images/icons/clear.svg'
              width='16px'
              height='16px'
              alt='Clear Text'
            />
          </button>
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

export default TestimonialForm;
