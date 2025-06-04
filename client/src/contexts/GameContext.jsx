import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const GameContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }, props) => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const QUESTION_AMOUNT = 3;
  const [lastAnswerInMeters, setLastAnswerInMeters] = useState(0);

  const easyMode = props.easyMode || false;

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
    setLastAnswerInMeters(meters);
    let finalScore = 0;
    if (selectedPosition.region == answer.mapName) {
      //if map is correct
      let lostPoints = 500 * ((meters - 10) / 200); // up to 10 meters is 500 points, 200 meters is 0 points
      if (lostPoints < 0) {
        lostPoints = 0;
      }
      if (lostPoints > 500) {
        lostPoints = 500;
      }
      finalScore = 500 - lostPoints;
      if (Math.abs(selectedPosition.layer - answer.layer) == 1) {
        // if layer is wrong by 1, halve the score
        finalScore = finalScore / 2;
      }
      if (Math.abs(selectedPosition.layer - answer.layer) == 2) {
        // if layer is wrong by 2, third the score
        finalScore = finalScore / 3;
      }
    }
    console.log("finalScore", finalScore);

    setScore([...score, finalScore]);
  };

  const isLastQuestion = () => {
    return questionIndex === QUESTION_AMOUNT - 1;
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex === QUESTION_AMOUNT) {
      return gameOver();
    }
    setQuestionIndex(nextIndex);
    selectQuestion(nextIndex);
  };

  const gameOver = () => {
    setIsGameOver(true);
  };

  const value = {
    activeQuestion,
    setActiveQuestion,
    questionIndex,
    setQuestionIndex,
    score,
    setScore,
    isGameOver,
    setIsGameOver,
    questions,
    setQuestions,
    getQuestions,
    selectQuestion,
    QUESTION_AMOUNT,
    guessPosition,
    lastAnswerInMeters,
    isLastQuestion,
    nextQuestion,
  };

  useEffect(() => {
    getQuestions();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
  easyMode: PropTypes.bool,
};
