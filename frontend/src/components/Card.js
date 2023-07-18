import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, likes, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__bottom">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-group">
          <button
            type={"button"}
            className={cardLikeButtonClassName}
            aria-label={"поставить лайк"}
            onClick={handleLikeClick}
          />

          <p className="card__likes">{likes}</p>
        </div>

        {isOwn && (
          <button
            className="card__delete-button"
            type={"button"}
            aria-label={"удалить карточку"}
            onClick={handleDeleteClick}
          />
        )}
      </div>
    </li>
  );
}

export default Card;
