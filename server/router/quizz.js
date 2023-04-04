const express = require("express");
const router = express.Router();
const Quiz = require("../models/quizz");
const JSON = require("json-js");
const mongoose = require("mongoose");

// Get all quizzes
router.get("/getQuiz", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    console.log("all quizz sent ");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single quiz
router.get("/getQuiz/:id", getQuiz, (req, res) => {
  res.json(res.quiz);
});

// Create a quiz
router.post("/", async (req, res) => {
  console.log("gotapicall");

  const { name, description, points, gradingSystem, timeLimit, questions } =
    req.body;
  const quiz = new Quiz({
    name: name,
    description: description,
    points: points,
    gradingSystem: gradingSystem,
    timeLimit: timeLimit,
    questions: questions,
  });

  try {
    const newQuiz = await quiz.save();
    console.log("quizz created");
    res.status(201).json(newQuiz);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a quiz by ID
// async function getQuiz(req, res, next) {
//   let quiz;
//   try {
//     quiz = await Quiz.findById(req.params.id);
//     if (quiz == null) {
//       return res.status(404).json({ message: 'Cannot find quiz' });
//     }
//   } catch (err) {
//     console.log(err)
//     return res.status(500).json({ message: err.message });
//   }

//   res.quiz = quiz;
//   next();
// }

async function getQuiz(req, res, next) {
  try {
    const quizId = req.params.id;
    console.log("getquiz");
    if (typeof quizId === "object") {
      console.log(quizId.toString());
    } else {
      console.log(quizId);
    }
    // console.log("getquiz")

    if (!mongoose.isValidObjectId(quizId)) {
      return res.status(400).json({ message: "Invalid quiz ID" });
    }
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Cannot find quiz" });
    }
    res.quiz = quiz;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
