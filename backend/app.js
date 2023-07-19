require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();
const helmet = require('helmet');
const cors = require('cors');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/notfounderror');
const handlerError = require('./middlewares/handlererror');

mongoose.connect(DB_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});
app.use(errorLogger);
app.use(errors());

app.use(handlerError);

app.listen(PORT);
