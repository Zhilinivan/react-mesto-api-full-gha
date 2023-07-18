const mongoose = require('mongoose');
const { urlTest } = require('../utils/constants');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле "name" должно быть заполнено'],
      minlength: [2, 'Минимальная длина 2 символа.'],
      maxlength: [30, 'Максимальная длина 30 символов.'],
    },
    link: {
      type: String,
      validate: {
        validator: (url) => urlTest.test(url),
        message: 'Некорректный URL',
      },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
