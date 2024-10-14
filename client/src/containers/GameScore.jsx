import PropTypes from "prop-types";

GameScore.propTypes = {
  score: PropTypes.array.isRequired,
};

function GameScore(props) {
  return (
    <div>
      <h2>Score</h2>
      <ul>
        {props.score.map((score, index) => {
          return <li key={index}>{score}</li>;
        })}
      </ul>
    </div>
  );
}

export default GameScore;
