import React, { useState } from "react";
import {
  addContact,
  readContact,
  updateContact,
  addWhatIs,
  readWhatIs,
  updateWhatIs,
  addMixologist,
  updateMixologist,
  deleteMixologist,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../utils/clientUtil";
import LoginModal from "../admin/LoginModal";

const TestHome = () => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState();
  const [name, setName] = useState();

  const handleContactAdd = async () => {
    let data = await addContact(
      "559-222-2222",
      "blah blah way, blah CA, 99999",
      "test@test.com",
      "facebook",
      "instagram",
      "linkedIn"
    );
    console.log(data);
  };

  const handleContactRead = async () => {
    let data = await readContact();
    console.log(data);
  };

  const handleContactUpdate = async () => {
    //* Update calls only need what you want to update.
    let data = await updateContact({ email: name });
    console.log(data);
  };

  let handleWhatIsAdd = async () => {
    //* Add calls should have all the keys it needs
    //* We need to convert the data into a FormData object.
    //* Which can be passed through a middleware and parsed.
    let data = await addWhatIs(
      "Ut voluptate eiusmod cupidatat cillum cillum aliquip officia culpa aliquip ex duis ad. Eu exercitation officia sunt anim sit dolore incididunt consectetur tempor sint commodo non. Dolor aute mollit incididunt non aliqua eu. Dolore esse est magna fugiat consectetur officia labore. Qui irure ad tempor occaecat fugiat. Proident elit ullamco ut est irure ipsum duis enim ullamco mollit do. Proident nostrud ad excepteur commodo Lorem ea.",
      file
    );
    console.log(data);
  };

  const handleWhatIsRead = async () => {
    let data = await readWhatIs();
    console.log(data);
  };

  let handleWhatIsUpdate = async () => {
    //* Update calls only need what you want to update.
    let data = updateWhatIs({ image: file, body: name });
    console.log(data);
  };

  let handleTestAdd = async () => {
    //* Add calls should have all the keys it needs
    let data = await addTestimonial(
      file,
      name,
      5,
      "Deserunt ex sit aliqua dolore occaecat minim reprehenderit ipsum eu. Voluptate enim officia commodo qui labore ullamco minim nulla enim culpa ea ad mollit. Irure esse duis cillum magna labore fugiat aute ut. Cillum aute excepteur ex reprehenderit nisi consectetur anim culpa aliquip incididunt eiusmod. Proident adipisicing voluptate aute eu irure elit nisi sunt. Consectetur occaecat et aliquip incididunt culpa laboris excepteur anim adipisicing ut magna minim anim."
    );
    console.log(data);
  };

  let handleTestUpdate = async () => {
    //* Update calls only need what you want to update.
    //! To update must specify the id of what we are updating.
    //! We get the id from the server when we load the data
    let data = await updateTestimonial("qKTbuYCn9vkssoP", {
      image: file,
      name,
    });
    console.log(data);
  };

  const handleTestDelete = async () => {
    let data = await deleteTestimonial("qKTbuYCn9vkssoP");
    console.log(data);
  };

  let handleMixAdd = async () => {
    //* Add calls should have all the keys it needs
    let data = await addMixologist(
      file,
      name,
      "Lorem in aute ea ea non cupidatat eu Lorem irure. Ullamco laboris elit magna anim. Aliquip esse amet occaecat anim fugiat reprehenderit irure proident proident."
    );
    console.log(data);
  };

  let handleMixUpdate = async () => {
    //* Update calls only need what you want to update.
    //! To update must specify the id of what we are updating.
    //! We get the id from the server when we load the data
    let data = await updateMixologist("3Cf3633rgEdvsY2", {
      image: file,
      name,
    });
    console.log(data);
  };

  const handleMixDelete = async () => {
    let data = await deleteMixologist("3Cf3633rgEdvsY2");
    console.log(data);
  };

  return (
    <div>
      <button onClick={() => setModal(!modal)}>Log In</button>
      <form action=''>
        <input
          type='file'
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <input
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='Name'
        />
      </form>
      <h3>Contact Info</h3>
      <button onClick={handleContactAdd}>Add Contact Info</button>
      <button onClick={handleContactRead}>Read Contact Info</button>
      <button onClick={handleContactUpdate}>Update Contact Info</button>
      <h3>What Is</h3>
      <button onClick={handleWhatIsAdd}>Add What Is</button>
      <button onClick={handleWhatIsRead}>Read What Is</button>
      <button onClick={handleWhatIsUpdate}>Update What Is</button>
      <h3>Testimonials</h3>
      <button onClick={handleTestAdd}>Add Testimonial</button>
      <button onClick={handleTestDelete}>Delete Testimonial</button>
      <button onClick={handleTestUpdate}>Update Testimonial</button>
      <h3>Mixologists</h3>
      <button onClick={handleMixAdd}>Add Mixologist</button>
      <button onClick={handleMixDelete}>Delete Mixologist</button>
      <button onClick={handleMixUpdate}>Update Mixologist</button>
      {modal && <LoginModal setModal={setModal} />}
    </div>
  );
};

export default TestHome;
