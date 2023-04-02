const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizz');
const JSON =require('json-js');

// Get all quizzes
router.get('/getQuiz', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    console.log("all quizz sent ")
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single quiz
router.get('/getQuiz/:id', getQuiz, (req, res) => {
  res.json(res.quiz);
});

// Create a quiz
router.post('/', async (req, res) => {
  console.log("gotapicall")
  
  const { name, description, points, gradingSystem, timeLimit, questions } = req.body;
  const quiz = new Quiz({
    name: name,
    description: description,
    points: points,
    gradingSystem: gradingSystem,
    timeLimit: timeLimit,
    questions: questions
   
  });

  try {
    const newQuiz = await quiz.save();
    console.log("quizz created")
    res.status(201).json(newQuiz);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a quiz by ID
async function getQuiz(req, res, next) {
  let quiz;
  try {
    quiz = await Quiz.findById(req.params.id);
    if (quiz == null) {
      return res.status(404).json({ message: 'Cannot find quiz' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.quiz = quiz;
  next();
}

module.exports = router;
