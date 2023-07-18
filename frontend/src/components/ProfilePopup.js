import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ProfilePopup({ isOpen, onClose, onSubmit, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      submitName={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type={"text"}
        required
        className="popup__input popup__input_name"
        name={"name"}
        placeholder={"Имя"}
        minLength={"2"}
        maxLength={"40"}
        autoComplete={"off"}
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__error name-error"></p>
      <input
        type={"text"}
        required
        className="popup__input popup__input_about"
        name={"about"}
        placeholder={"О себе"}
        minLength={"2"}
        maxLength={"200"}
        autoComplete={"off"}
        value={description}
        onChange={handleDescriptionChange}
      />
      <p className="popup__error about-error"></p>
    </PopupWithForm>
  );
}

export default ProfilePopup;
