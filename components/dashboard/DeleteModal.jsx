import Image from "next/image";
import React, { useEffect, useState } from "react";
import { deleteMixologist, deleteTestimonial } from "../../utils/clientUtil";
import clsx from "clsx";
import dashClasses from "./dashboard.module.css";
import LoadingBtn from "../layout/props/LoadingBtn";

const DeleteModal = ({ data, update, type }) => {
  const [reqDel, setReqDel] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [to, setTo] = useState();

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

  const handleDelete = async () => {
    if (confirm.toLowerCase() === "yes") {
      setLoading(true);
      if (type === "testimonial") {
        try {
          const result = await deleteTestimonial(data.id);
          setError(false);
          setLoading(false);
          setSubmitted(true);
          update();
        } catch (err) {
          setError(true);
          setLoading(false);
          setSubmitted(true);
        }
      } else {
        try {
          const result = await deleteMixologist(data.id);
          setError(false);
          setLoading(false);
          setSubmitted(true);
          update();
        } catch (err) {
          setError(true);
          setLoading(false);
          setSubmitted(true);
        }
      }
    }
  };
  return (
    <>
      <button
        type='button'
        className={dashClasses.deleteBtn}
        onClick={() => setReqDel(!reqDel)}
        title='Delete'
      >
        {reqDel ? (
          <Image
            src='/images/icons/close-white.svg'
            alt='close'
            height={20}
            width={20}
          />
        ) : (
          <Image
            src='/images/icons/trash.svg'
            alt='delete'
            height={20}
            width={20}
          />
        )}
      </button>
      {reqDel &&
        (error ? (
          <div className={dashClasses.deleteConfirm}>
            <div
              className={dashClasses.confirmBg}
              onClick={() => setReqDel(!reqDel)}
            />
            <p>
              Something went wrong cant delete. <br /> <br /> If problem
              persists contact web admin.
            </p>
          </div>
        ) : (
          <div className={dashClasses.deleteConfirm}>
            <div
              className={dashClasses.confirmBg}
              onClick={() => setReqDel(!reqDel)}
            />
            <Image
              src={data.image.url}
              alt={data.image.url}
              height={75}
              width={75}
            />
            <div className={dashClasses.input}>
              <label>Would you like to delete {data.name}?</label>
              <p>
                Type <u>yes</u> to confirm.
              </p>
              <input
                type='text'
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
              />
            </div>
            <LoadingBtn
              value='Confirm Deletion'
              className={clsx(
                dashClasses.dashSaveBtn,
                confirm.toLowerCase() !== "yes" && dashClasses.btnDisabled
              )}
              loading={loading}
              submitted={submitted}
              error={error}
              type="button"
              onClick={handleDelete}
            />
            {/* <button
              type='button'
              className={clsx(
                dashClasses.dashSaveBtn,
                confirm.toLowerCase() !== "yes" && dashClasses.btnDisabled
              )}
              onClick={handleDelete}
            >
              Confirm Deletion
            </button> */}
          </div>
        ))}
    </>
  );
};

export default DeleteModal;
