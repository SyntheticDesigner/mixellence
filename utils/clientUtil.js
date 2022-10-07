export const addContact = async (
  phone,
  address,
  email,
  facebook,
  instagram,
  linkedIn
) => {
  //* Add calls should have all the keys it needs
  let result = await fetch("/api/contact-info", {
    method: "POST",
    body: JSON.stringify({
      phone,
      address,
      email,
      facebook,
      instagram,
      linkedIn,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await result.json();
  return data;
};

export const readContact = async () => {
  let result = await fetch("/api/contact-info");
  let data = await result.json();
  return data;
};

export const updateContact = async (updateObject) => {
  //* Update calls only need what you want to update.
  let result = await fetch("/api/contact-info", {
    method: "PATCH",
    body: JSON.stringify(updateObject),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await result.json();
  return data;
};

export const addWhatIs = async (body, image) => {
  //* Add calls should have all the keys it needs
  //* We need to convert the data into a FormData object.
  //* Which can be passed through a middleware and parsed.
  const formData = new FormData();
  formData.set("image", image);
  formData.set("body", body);
  let result = await fetch("/api/what-is", {
    method: "POST",
    body: formData,
  });
  let data = await result.json();
  return data;
};

export const readWhatIs = async () => {
  let result = await fetch("/api/what-is");
  let data = await result.json();
  return data;
};

export const updateWhatIs = async (updateObject) => {
  //* Update calls only need what you want to update.
  //* We need to convert the data into a FormData object.
  //* Which can be passed through a middleware and parsed.
  const formData = new FormData();
  //TODO throw error for invalid keys
  Object.keys(updateObject).forEach((key) => {
    formData.set(key, updateObject[key]);
  });
  let result = await fetch("/api/what-is", {
    method: "PATCH",
    body: formData,
  });
  let data = await result.json();
  return data;
};

export const addTestimonial = async (image, name, rating, body) => {
  //* Add calls should have all the keys it needs
  //* We need to convert the data into a FormData object.
  //* Which can be passed through a middleware and parsed.
  const formData = new FormData();
  formData.set("image", image);
  formData.set("name", name);
  formData.set("rating", rating);
  formData.set("body", body);
  let result = await fetch("/api/testimonials", {
    method: "POST",
    body: formData,
  });
  let data = await result.json();
  return data;
};

export const updateTestimonial = async (id, updateObject) => {
  //* Update calls only need what you want to update.
  //! To update must specify the id of what we are updating.
  //! We get the id from the server when we load the data
  //* We need to convert the data into a FormData object.
  //* Which can be passed through a middleware and parsed.
  const formData = new FormData();
  formData.set("id", id);
  //TODO throw error for invalid keys
  Object.keys(updateObject).forEach((key) => {
    formData.set(key, updateObject[key]);
  });
  let result = await fetch("/api/testimonials", {
    method: "PATCH",
    body: formData,
  });
  let data = await result.json();
  return data;
};

export const deleteTestimonial = async (id) => {
  let result = await fetch("/api/testimonials", {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await result.json();
  return data;
};

export const addMixologist = async (image, name, bio) => {
  //* Add calls should have all the keys it needs
  //* We need to convert the data into a FormData object.
  //* Which can be passed through a middleware and parsed.
  const formData = new FormData();
  formData.set("image", image);
  formData.set("name", name);
  formData.set("bio", bio);
  let result = await fetch("/api/mixologists", {
    method: "POST",
    body: formData,
  });
  let data = await result.json();
  return data;
};

export const updateMixologist = async (id, updateObject) => {
  //* Update calls only need what you want to update.
  //! To update must specify the id of what we are updating.
  //! We get the id from the server when we load the data
  //* We need to convert the data into a FormData object.
  //* Which can be passed through a middleware and parsed.
  const formData = new FormData();
  formData.set("id", id);
  //TODO throw error for invalid keys
  Object.keys(updateObject).forEach((key) => {
    formData.set(key, updateObject[key]);
  });
  let result = await fetch("/api/mixologists", {
    method: "PATCH",
    body: formData,
  });
  let data = await result.json();
  return data;
};

export const deleteMixologist = async (id) => {
  let result = await fetch("/api/mixologists", {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await result.json();
  return data;
};

export function setCookie(key, value, expiration) {
  let expires = new Date();
  expires.setTime(expires.getTime() + expiration * 1000);
  document.cookie =
    key + "=" + value + ";Expires=" + expires.toUTCString() + ";SameSite=Lax";
}

export function getCookie(key) {
  var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
  return keyValue ? keyValue[2] : null;
}

export const validateEmail = (email) => {
  const errors = [];
  const emailRegEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email && !email.match(emailRegEx)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address.",
    });
  }
  return errors;
};
