import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function ProfileAddCard({ isOpen, onClose, onAddPlace, isLoading }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      title: title,
      link: link,
    });
  }

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"addcard"}
      title={"Новое место"}
      submitName={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type={"text"}
        required
        className="popup__input popup__input_title"
        name={"title"}
        placeholder={"Название"}
        minLength={"2"}
        maxLength={"30"}
        autoComplete={"off"}
        value={title}
        onChange={handleTitleChange}
      />
      <p className="popup__error title-error"></p>
      <input
        type={"url"}
        required
        className="popup__input popup__input_src"
        name={"link"}
        placeholder={"Ссылка на картинку"}
        autoComplete={"off"}
        value={link}
        onChange={handleLinkChange}
      />
      <p className={"popup__error link-error"}></p>
    </PopupWithForm>
  );
}

export default ProfileAddCard;
