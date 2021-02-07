const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createResponse = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    formId: Joi.string().required().custom(objectId),
    responses: Joi.array()
      .items(
        Joi.object().keys({
          questionId: Joi.string().required().custom(objectId),
          data: Joi.object()
            .keys({
              text: Joi.string().max(500),
              choices: Joi.array().items(Joi.string()).min(1),
            })
            .required(),
        })
      )
      .min(1)
      .required(),
  }),
};

const getResponsesByFormId = {
  params: Joi.object().keys({
    formId: Joi.string().required().custom(objectId),
  }),
};

const getResponse = {
  params: Joi.object().keys({
    responseId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createResponse,
  getResponsesByFormId,
  getResponse,
};
