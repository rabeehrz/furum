const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    trim: true,
  },
  required: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
  },
});

questionSchema.plugin(toJSON);

const formSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    graded: {
      type: Boolean,
      required: true,
    },
    limit: {
      type: Number,
    },
    questions: {
      type: [questionSchema],
    },
  },
  {
    timestamps: true,
  }
);

formSchema.plugin(toJSON);

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
