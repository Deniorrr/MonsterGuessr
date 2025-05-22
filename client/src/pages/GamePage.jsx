import PositionSelector from "../containers/PositionSelector";
import { useState, useEffect } from "react";
import GameScore from "../containers/GameScore";
import axios from "axios";
import PropTypes from "prop-types";

const QUESTION_AMOUNT = 3;

GamePage.propTypes = {
  easyMode: PropTypes.bool,
};

function GamePage(props) {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  const easyMode = props.easyMode;

  const getQuestions = async () => {
    axios
      .get("http://localhost:3001/screens" + (easyMode ? "easymode" : ""))
      .then((response) => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex === QUESTION_AMOUNT) {
      return gameOver();
    }
    setQuestionIndex(nextIndex);
    selectQuestion(nextIndex);
  };

  const selectQuestion = (questionIndex, _question = null) => {
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
    const meters = (distance * 50) / 1.9;
    let lostPoints = 500 * ((meters - 10) / 200);
    if (lostPoints < 0) {
      lostPoints = 0;
    }
    if (lostPoints > 500) {
      lostPoints = 500;
    }
    const finalScore = 500 - lostPoints;
    console.log("finalScore", finalScore);
    // const distance = Math.sqrt(
    //   Math.pow(selectedPosition.markerPosition.lat - answer.location.lat, 2) +
    //     Math.pow(selectedPosition.markerPosition.lng - answer.location.lng, 2)
    // );
    setScore([...score, finalScore]);
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
    </div>
  );
}

export default GamePage;
