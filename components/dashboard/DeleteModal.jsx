import Image from "next/image";
import React, { useState } from "react";
import { deleteMixologist, deleteTestimonial } from "../../utils/clientUtil";
import clsx from "clsx";
import dashClasses from "./dashboard.module.css";

const DeleteModal = ({ data, update, type }) => {
  const [reqDel, setReqDel] = useState(false);
  const [confirm, setConfirm] = useState("");
  const handleDelete = async () => {
    if (confirm.toLowerCase() === "yes") {
      if (type === "testimonial") {
        const result = await deleteTestimonial(data.id);
        update();
        alert(result.message);
      } else {
        const result = await deleteMixologist(data.id);
        update();
        alert(result.message);
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
      {reqDel && (
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
          <button
            type='button'
            className={clsx(
              dashClasses.dashSaveBtn,
              confirm.toLowerCase() !== "yes" && dashClasses.btnDisabled
            )}
            onClick={handleDelete}
          >
            Confirm Deletion
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
