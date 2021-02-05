const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createForm = {
  body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    title: Joi.string().max(500).required(),
    description: Joi.string().max(500).required(),
    graded: Joi.boolean().required(),
    limit: Joi.number(),
    questions: Joi.array()
      .items(
        Joi.object().keys({
          type: Joi.string().required(),
          required: Joi.boolean().required(),
          content: Joi.string().required(),
          data: Joi.object().keys({
            options: Joi.array().items(Joi.string()),
          }),
        })
      )
      .required()
      .min(1),
  }),
};

const getForm = {
  params: Joi.object().keys({
    formId: Joi.string().required().custom(objectId),
  }),
};

const updateForm = {
  params: Joi.object().keys({
    formId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      userId: Joi.string().custom(objectId),
      title: Joi.string().max(500),
      description: Joi.string().max(500),
      graded: Joi.boolean(),
      limit: Joi.number(),
      questions: Joi.array()
        .items(
          Joi.object().keys({
            type: Joi.string().required(),
            required: Joi.boolean().required(),
            content: Joi.string().required(),
            data: Joi.object().keys({
              options: Joi.array().items(Joi.string()),
            }),
          })
        )
        .required()
        .min(1),
    })
    .min(1),
};

const deleteForm = {
  params: Joi.object().keys({
    formId: Joi.string().required().custom(objectId),
  }),
};

const getFormsByUser = {
  params: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
  }),
};

module.exports = {
  createForm,
  getForm,
  updateForm,
  deleteForm,
  getFormsByUser,
};
