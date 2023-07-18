function InfoTooltip({ isOpen, onClose, image, title }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__status">
        <img className="popup__status-image" src={image} alt={title} />
        <h2 className="popup__status-message">{title}</h2>
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
