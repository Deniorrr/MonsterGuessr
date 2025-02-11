import PositionSelector from "../containers/PositionSelector";
import { useState, useEffect } from "react";
import GameScore from "../containers/GameScore";
import axios from "axios";
import PositionSubmitSelector from "../containers/PositionSubmitSelector";

const QUESTION_AMOUNT = 3;

function GamePage() {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);

  // const getQuestions = async () => {
  //   // axios.get("http://localhost:3001/screens").then((response) => {
  //   //   const recievedData = response.data.map((result) => {
  //   //     return {
  //   //       ...result,
  //   //       location: {
  //   //         lat: result.lat,
  //   //         lng: result.lng,
  //   //       },
  //   //     };
  //   //   });
  //   //   setQuestions(recievedData);
  //   //   selectQuestion(0, recievedData[0]);
  //   // });
  // };

  // useEffect(() => {
  //   getQuestions();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    setScore([...score, distance]);
  };

  const gameOver = () => {
    setIsGameOver(true);
  };

  return (
    <div className="game-container">
      <PositionSubmitSelector
        guessPosition={guessPosition}
        question={activeQuestion}
        nextQuestion={nextQuestion}
        isLastQuestion={questionIndex === QUESTION_AMOUNT - 1}
      />
    </div>
  );
}

export default GamePage;
