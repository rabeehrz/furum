const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const responsesSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  data: {
    type: Object,
  },
});

responsesSchema.plugin(toJSON);

const responseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Form',
      required: true,
    },
    responses: {
      type: [responsesSchema],
    },
  },
  {
    timestamps: true,
  }
);

responseSchema.plugin(toJSON);

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;
