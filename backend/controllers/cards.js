const Card = require('../models/card');
const { BadRequestError } = require('../utils/errors/badrequesterror');
const { NotFoundError } = require('../utils/errors/notfounderror');
const { ForbiddenError } = require('../utils/errors/forbiddenerror');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user.payload;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(error);
      }
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.payload } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.payload } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

function deleteCard(req, res, next) {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена.');

      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) throw new ForbiddenError('Ошибка доступа.');

      card
        .remove()
        .then(() => res.send({ data: card }))
        .catch(next);
    })
    .catch(next);
}
module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
