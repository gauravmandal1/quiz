import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// // const { id } = useParams();

// const Quiz = (props) => {
//   const [quiz, setQuiz] = useState({});
//   const [score, setScore] = useState(0);

//   const {quizId} = useParams();

//   useEffect(() => {
//     axios.get(`http://localhost:8000/quiz/getQuiz/${quizId}`)
//       .then(response => setQuiz(response.data))
//       .catch(error => console.log(error));
//   }, [quizId]);

//   if (!quiz) {
//     return <div>Loading...</div>;
//   }
//   console.log(quiz)

//   // define state to keep track of user's answers
// const [userAnswers, setUserAnswers] = useState([]);

// // define handleAnswer function to update user's answers
// const handleAnswer = (questionIndex, optionIndex) => {
//   setUserAnswers(prevAnswers => {
//     // copy previous answers array
//     const newAnswers = [...prevAnswers];
//     // update answer for the given question
//     newAnswers[questionIndex] = optionIndex;
//     // return updated answers array
//     return newAnswers;
//   });
// }

// // define submit function to calculate score and give feedback to user
// const handleSubmit = (event) => {
//   event.preventDefault();
//   // calculate score based on user's answers and correct answers
//   const correctAnswers = quiz.questions.map(question => question.correctOption);
//   const score = userAnswers.reduce((acc, answer, index) => {
//     return answer === correctAnswers[index] ? acc + 1 : acc;
//   }, 0);
//   // give feedback to user
//   alert(`Your score is ${score} out of ${quiz.questions.length}`);
// }


//   return (
//     <div className="quiz-container">
//   <h1>Quiz page</h1>
//   <h2>{quiz.name}</h2>
//   <p>{quiz.description}</p>

//   <form onSubmit={handleSubmit}>
//     {quiz.questions && quiz.questions.map((question, index) => (
//       <div key={question.id}>
//         <h4>{index + 1}. {question.text}</h4>
//         {question.options && question.options.map((option, optionIndex) => (
//           <div key={option.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 name={`question-${index}-option-${optionIndex}`}
//                 checked={option.selected}
//                 onChange={() => handleAnswer(index, optionIndex)}
//               />
//               {option.text}
//               {option.correct && <span className="correct-answer"> (correct)</span>}
//               {!option.correct && option.selected && <span className="incorrect-answer"> (incorrect)</span>}
//             </label>
//           </div>
//         ))}
//         <hr />
//       </div>
//     ))}
//     <button type="submit">Submit</button>
//   </form>
//   {score > 0 && (
//     <div>
//       <h4>Your score: {score}</h4>
//     </div>
//   )}
// </div>

//   );
// };

// export default Quiz;
function Quiz() {
  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const {quizId} = useParams();

  useEffect(() => {
    
    axios.get(`http://localhost:8000/quiz/getQuiz/${quizId}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.log(error));
  }, []);

  function handleAnswer(questionIndex, optionIndex) {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   let newScore = 0;

  //   quiz.questions.forEach((question, index) => {
  //     const selectedOption = answers[index];
  //     if (selectedOption !== undefined && question.options[selectedOption].isCorrect) {
  //       newScore += 1;
  //     }
  //   });
  //   setScore(newScore);
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    const answeredQuestions = quiz.questions.filter(question => question.options.some(option => option.selected));
    const score = answeredQuestions.reduce((acc, question) => {
      const correctOption = question.options.find(option => option.isCorrect);
      const selectedOption = question.options.find(option => option.selected);
      if (correctOption && selectedOption && correctOption.id === selectedOption.id) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(score);
  };
  

  return (
    <div className="quiz-container">
      <h1>Quiz Page</h1>
      <h2>{quiz.name}</h2>
      <p>{quiz.description}</p>
      <form onSubmit={handleSubmit}>
        {quiz.questions && quiz.questions.map((question, index) => (
          <div key={question.id}>
            <h4>{index + 1}. {question.text}</h4>
            {question.options && question.options.map((option, optionIndex) => (
              <div key={option.id}>
                <input
                  type="radio"
                  id={`question-${index}-option-${optionIndex}`}
                  name={`question-${index}`}
                  checked={answers[index] === optionIndex}
                  onChange={() => handleAnswer(index, optionIndex)}
                />
                <label htmlFor={`question-${index}-option-${optionIndex}`}>
                  {option.text}
                </label>
                {option.correct && <span className="correct-answer"> (correct)</span>}
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
}
export default Quiz;
