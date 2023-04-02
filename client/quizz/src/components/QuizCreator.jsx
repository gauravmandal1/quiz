import React, { useState } from "react";
import axios from "axios";

function QuizCreator() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [gradingSystem, setGradingSystem] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    const newQuestion = {
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const saveQuiz = () => {
    const quizData = {
      name,
      description,
      points,
      gradingSystem,
      timeLimit,
      questions,
    };
  
    axios.post('http://localhost:8000/quiz', quizData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Points:</label>
      <input
        type="number"
        value={points}
        onChange={(e) => setPoints(e.target.value)}
      />

      <label>Grading System:</label>
      <select
        value={gradingSystem}
        onChange={(e) => setGradingSystem(e.target.value)}
      >
        <option value="">Select Grading System</option>
        <option value="Percentage">Percentage</option>
        <option value="Letter Grade">Letter Grade</option>
      </select>

      <label>Time Limit:</label>
      <input
        type="number"
        value={timeLimit}
        onChange={(e) => setTimeLimit(e.target.value)}
      />

      <button onClick={addQuestion}>Add Question</button>

      {questions.map((question, index) => (
        <div key={index}>
          <label>Question {index + 1}:</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[index].text = e.target.value;
              setQuestions(updatedQuestions);
            }}
          />

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>Option {optionIndex + 1}:</label>
              <input
                type="text"
                value={option.text}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].options[optionIndex].text =
                    e.target.value;
                  setQuestions(updatedQuestions);
                }}
              />

              <label>Correct Answer:</label>
              <input
                type="radio"
                name={`correctAnswer${index}`}
                checked={option.isCorrect}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].options[optionIndex].isCorrect =
                    e.target.checked;
                  setQuestions(updatedQuestions);
                }}
              />
            </div>
          ))}
        </div>
      ))}

      <button onClick={saveQuiz}>Save Quiz</button>
    </div>
  );
}

export default QuizCreator;
