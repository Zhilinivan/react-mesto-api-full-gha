function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_fullscreen" ${card ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div className="popup__container-fullscreen">
        <button
          type={"button"}
          className="popup__close-button"
          aria-label={"закрыть попап"}
        ></button>
        <img
          className="popup__image-fullscreen"
          src={card?.link}
          alt={card?.name}
        />
        <p className="popup__title-fullscreen">{card?.name}</p>
      </div>
    </div>
  );
}
export default ImagePopup;
