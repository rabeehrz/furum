const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createForm = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    title: Joi.string().max(500).required(),
    description: Joi.string().max(500).required(),
    graded: Joi.boolean().required(),
    limit: Joi.number(),
    questions: Joi.array().items(
      Joi.object().keys({
        type: Joi.string().required(),
        required: Joi.boolean().required(),
        content: Joi.string().required(),
        data: Joi.object().keys({
          options: Joi.array().items(Joi.string()),
        }),
      })
    ),
  }),
};

module.exports = {
  createForm,
};
