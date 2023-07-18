const jwt = require('jsonwebtoken');
const { secretString } = require('../utils/constants');
const AuthError = require('../utils/errors/autherror');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new AuthError('Неправильные почта или пароль'));
  }

  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, secretString);
  } catch (err) {
    return next(new AuthError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};
