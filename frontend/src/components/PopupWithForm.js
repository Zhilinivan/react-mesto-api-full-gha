function PopupWithForm({
  name,
  title,
  onClose,
  children,
  submitName,
  isOpen,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup__${name} ${isOpen ? `popup_opened` : ""}`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          type={"button"}
          className="popup__close-button"
          aria-label={"закрыть форму"}
        ></button>
        <h2 className="popup__name">{title}</h2>
        <form
          className="popup__form popup__form_profile"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            type={"submit"}
            className="popup__save-button"
            aria-label={"отправить форму"}
          >
            {submitName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
