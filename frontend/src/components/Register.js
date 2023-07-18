import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <form className="sign" onSubmit={handleSubmit}>
      <h2 className="sign__title">Регистрация</h2>

      <input
        className="sign__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailInput}
        required
      />
      <input
        className="sign__input"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordInput}
        required
      />
      <button className="sign__submit" type="submit">
        Зарегистрироваться
      </button>

      <p className="sign__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="sign__link">
          Войти
        </Link>{" "}
      </p>
    </form>
  );
}

export default Register;
