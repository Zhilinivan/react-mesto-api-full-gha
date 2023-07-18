import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function ProfileAvatar({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const [avatar, setAvatar] = React.useState("");

  useEffect(() => {
    if (isOpen) {
      setAvatar("");
    }
  }, [isOpen]);

  function handleAvatarSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatar,
    });
  }

  function handleAvatarChange(evt) {
    setAvatar(evt.target.value);
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      submitName={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAvatarSubmit}
    >
      <input
        onChange={handleAvatarChange}
        type={"url"}
        required
        className="popup__input popup__input_avatarsrc"
        name={"avatar"}
        placeholder={"Ссылка на аватар"}
        autoComplete={"off"}
        value={avatar}
      />
      <p className="popup__error avatar-error"></p>
    </PopupWithForm>
  );
}

export default ProfileAvatar;
