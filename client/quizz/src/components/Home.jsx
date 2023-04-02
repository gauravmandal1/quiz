import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/quiz/getQuiz')
      .then(response => setQuizzes(response.data))
      .catch(error => console.log(error));
  }, []);
  console.log(quizzes);

  return (
    <div className="home-container">
      <h1>Quizzes</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz?._id}`}>{quiz?.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
