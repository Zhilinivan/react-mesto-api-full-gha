const handlerError = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  const message = statusCode === 500 ? 'Произошла ошибка' : error.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = handlerError;
