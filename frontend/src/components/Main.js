import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt={"Аватарка"}
          />
          <button
            type={"button"}
            className="profile__avatar-button"
            aria-label={"изменить аватар"}
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-group">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type={"button"}
              className="profile__edit-button"
              aria-label={"редактирование профиля"}
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type={"button"}
          className="profile__add-button"
          aria-label={"добавление карточки"}
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              likes={card.likes.length}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
