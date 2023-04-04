// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import QuizCreator from "./components/QuizCreator";

// function App() {
//   return (
//     <>
//     <h1>Hii </h1>
//     <BrowserRouter>
//     <Home/>
//     </BrowserRouter>
//     <QuizCreator/>
//     </>
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>

//     //   {/* <BrowseRouter>
//     //   <Routes>

//     //     <Route exact path="/" component={Home} />
//     //     <Route exact path="/quiz/:id" component={Quiz} />
//     //     <Route exact path="/quiz-creator" component={QuizCreator} />
//     //     </Routes>
//     // </BrowseRouter> */}
//     // {/* <Home/> */}
//     // {/* <QuizCreator/> */}

//     // </div>

//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
// import QuizPage from "./QuizPage";
import "./index.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createQuiz" element={<QuizCreator />} />
          <Route exact path="/quiz/:quizId" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
