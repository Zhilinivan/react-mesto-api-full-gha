import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ProfilePopup from "./ProfilePopup.js";
import ProfileAddCard from "./ProfileAddCard.js";
import ProfileAvatar from "./ProfileAvatar.js";

import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import * as auth from "../utils/Auth.js";

import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import sucess from "../images/Sucess.svg";
import unSucess from "../images/Unsucess.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard ||
    infoTooltip;

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [regImage, setRegImage] = useState("");
  const [regTitle, setRegTitle] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  function onRegister(email, password) {
    auth
      .registerUser(email, password)
      .then(() => {
        setRegImage(sucess);
        setRegTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch(() => {
        setRegImage(unSucess);
        setRegTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        setRegImage(unSucess);
        setRegTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoTooltip();
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleClickClose(evt) {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closeAllPopups();
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .setLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAvatarUpdate(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsAddPlacePopupOpen(false);
    setInfoTooltip(false);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function onSignOut() {
    setIsLoggedIn(false);
    setEmail(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <>
                <Header title="Регистрация" route="/sign-up" />
                <Login onLogin={onLogin} />
              </>
            }
          />

          <Route
            path="/sign-up"
            element={
              <>
                <Header title="Войти" route="/sign-in" />
                <Register onRegister={onRegister} />
              </>
            }
          />

          <Route
            exact
            path="/"
            element={
              <>
                <Header
                  title="Выйти"
                  mail={email}
                  onClick={onSignOut}
                  route=""
                />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }
          />

          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/sign-in"} />}
          />
        </Routes>

        <ProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleClickClose}
          onSubmit={handleUpdateUser}
          isLoading={isLoading}
        />
        <ProfileAddCard
          isOpen={isAddPlacePopupOpen}
          onClose={handleClickClose}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ProfileAvatar
          isOpen={isEditAvatarPopupOpen}
          onClose={handleClickClose}
          onUpdateAvatar={handleAvatarUpdate}
          isLoading={isLoading}
        />

        <ImagePopup onClose={handleClickClose} card={selectedCard} />
        <InfoTooltip
          image={regImage}
          title={regTitle}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
