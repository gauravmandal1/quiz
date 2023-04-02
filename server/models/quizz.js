const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  points: {
    type: Number,
    // required: true,
  },
  gradingSystem: {
    type: String,
    // required: true,
  },
  timeLimit: {
    type: Number,
    // required: true,
  },
  questions: [
    {
      text: {
        type: String,
        // required: true,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
