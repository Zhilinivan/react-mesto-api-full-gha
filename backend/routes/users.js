const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlTest } = require('../utils/constants');

const {
  getUserInfo, getUsers, findUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), getUserInfo);

router.get('/users', getUsers);
router.get('/users/:userId', findUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .pattern(urlTest)
      .required(),
  }),
}), updateUserAvatar);

module.exports = router;
