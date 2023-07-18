const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { secretString } = require('../utils/constants');
const { BadRequestError } = require('../utils/errors/badrequesterror');
const { NotFoundError } = require('../utils/errors/notfounderror');
const { DataError } = require('../utils/errors/dataerror');

function regUser(req, res, next) {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new DataError('Email используется.'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function loginUser(req, res, next) {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      const token = jwt.sign({ userId }, secretString, { expiresIn: '7d' });
      res.send({ _id: token });
    })
    .catch(next);
}

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

function getUserInfo(req, res, next) {
  const { userId } = req.user;

  User
    .findById(userId)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь не найден');
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Переданы неккоректные данные.'));
      } else {
        next(error);
      }
    });
}

const findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден.'));
      } else res.send(user);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь не найден.'))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getUsers,
  getUserInfo,
  findUser,
  updateUserInfo,
  updateUserAvatar,
  regUser,
  loginUser,
};
