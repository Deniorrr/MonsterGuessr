import PositionSelector from "../containers/PositionSelector";
import { useState, useEffect } from "react";
import screenshotsData from "../assets/screenshots/screenshotsData";
import GameScore from "../containers/GameScore";
import { Link } from "react-router-dom";

const QUESTION_AMOUNT = 3;

function GamePage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    createOrder();
  }, []); // eslint-disable-line

  const createOrder = () => {
    screenshotsData.sort(() => Math.random() - 0.5);
    selectQuestion(0);
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex === QUESTION_AMOUNT) {
      return gameOver();
    }
    setQuestionIndex(nextIndex);
    selectQuestion(nextIndex);
  };

  const selectQuestion = (questionIndex) => {
    //const randomIndex = Math.floor(Math.random() * screenshotsData.length);
    const question = screenshotsData[questionIndex];
    setActiveQuestion(question);
  };

  const guessPosition = (selectedPosition, answer) => {
    const distance = Math.sqrt(
      Math.pow(selectedPosition.markerPosition.lat - answer.location.lat, 2) +
        Math.pow(selectedPosition.markerPosition.lng - answer.location.lng, 2)
    );
    setScore([...score, distance]);
  };

  const gameOver = () => {
    setIsGameOver(true);
  };

  return (
    <div className="game-container">
      {/* <Link to="/">
        <button>BACK</button>
      </Link> */}

      {isGameOver ? (
        <h1>Game Over</h1>
      ) : (
        <PositionSelector
          guessPosition={guessPosition}
          question={activeQuestion}
          nextQuestion={nextQuestion}
        />
      )}

      {/* <GameScore score={score} /> */}
    </div>
  );
}

export default GamePage;
