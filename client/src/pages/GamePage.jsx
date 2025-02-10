import PositionSelector from "../containers/PositionSelector";
import { useState, useEffect } from "react";
//import screenshotsData from "../assets/screenshots/screenshotsData";
import GameScore from "../containers/GameScore";
import axios from "axios";

const QUESTION_AMOUNT = 3;

function GamePage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    axios.get("http://localhost:3001/screens").then((response) => {
      const recievedData = response.data.map((result) => {
        return {
          ...result,
          location: {
            lat: result.lat,
            lng: result.lng,
          },
        };
      });
      setQuestions(recievedData);
      selectQuestion(0, recievedData[0]);
    });
  };

  useEffect(() => {
    getQuestions();
    //createOrder();
  }, []); // eslint-disable-line

  // const createOrder = () => {
  //   screenshotsData.sort(() => Math.random() - 0.5);
  //   selectQuestion(0);
  // };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex === QUESTION_AMOUNT) {
      return gameOver();
    }
    setQuestionIndex(nextIndex);
    selectQuestion(nextIndex);
  };

  const selectQuestion = (questionIndex, _question = null) => {
    //const randomIndex = Math.floor(Math.random() * screenshotsData.length);
    if (_question !== null) {
      setActiveQuestion(_question);
      return;
    }
    const question = questions[questionIndex];

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
      <PositionSelector
        guessPosition={guessPosition}
        question={activeQuestion}
        nextQuestion={nextQuestion}
        isLastQuestion={questionIndex === QUESTION_AMOUNT - 1}
      />

      <GameScore
        score={score}
        isGameOver={isGameOver}
        questionAmount={QUESTION_AMOUNT}
        questionIndex={questionIndex}
      />

      {/* <div>
        <img
          src={`data:image/png;base64,${questions[0].imageData}`}
          alt="Screenshot"
        />
      </div> */}
    </div>
  );
}

export default GamePage;
