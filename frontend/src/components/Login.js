import { useState } from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <form className="sign" onSubmit={handleSubmit}>
      <h2 className="sign__title">Вход</h2>

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
        Войти
      </button>
    </form>
  );
}

export default Login;
