import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// const { id } = useParams();

const Quiz = (props) => {
  const [quiz, setQuiz] = useState({});
  const [score, setScore] = useState(0);

  const quizId = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/quiz/getQuiz/${quizId}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.log(error));
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }
  console.log(quiz)

  const handleAnswer = (questionIndex, answerIndex) => {
    const answeredQuestion = { ...quiz.questions[questionIndex] };
    const answeredOption = { ...answeredQuestion.options[answerIndex] };
    answeredOption.selected = true;
    answeredQuestion.options = answeredQuestion.options.map(option => {
      if (option.id === answeredOption.id) {
        return answeredOption;
      } else {
        return option;
      }
    });
    const answeredQuiz = { ...quiz };
    answeredQuiz.questions[questionIndex] = answeredQuestion;
    setQuiz(answeredQuiz);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const answeredQuiz = { ...quiz };
    let totalScore = 0;
    answeredQuiz.questions.forEach(question => {
      const correctAnswer = question.options.find(option => option.correct);
      const answeredOption = question.options.find(option => option.selected);
      if (correctAnswer && answeredOption && correctAnswer.id === answeredOption.id) {
        totalScore += question.points;
      }
    });
    setScore(totalScore);
  };

  return (
    <div className="quiz-container">
      <h2>{quiz.name}</h2>
      <p>{quiz.description}</p>
      <form onSubmit={handleSubmit}>
        {quiz.questions && quiz.questions.map((question, index) => (
          <div key={question.id}>
            <h4>{index + 1}. {question.question}</h4>
            {question.options && question.options.map((option, optionIndex) => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={`question-${index}-option-${optionIndex}`}
                  name={`question-${index}`}
                  checked={option.selected}
                  onChange={() => handleAnswer(index, optionIndex)}
                />
                <label htmlFor={`question-${index}-option-${optionIndex}`}>
                  {option.text}
                </label>
              </div>
            ))}
            <hr />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {score > 0 && (
        <div>
          <h4>Your score: {score}</h4>
        </div>
      )}
    </div>
  );
};

export default Quiz;
