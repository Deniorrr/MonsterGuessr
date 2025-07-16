import PositionSelector from "../containers/PositionSelector";
import GameScore from "../containers/GameScore";
import { GameProvider } from "../contexts/GameContext";
import PropTypes from "prop-types";
import "../styles/GamePage.scss"; // Assuming you have a GamePage.scss for specific styles

GamePage.propTypes = {
  easyMode: PropTypes.bool,
};

function GamePage(props) {
  const easyMode = props.easyMode;

  return (
    <GameProvider easyMode={easyMode}>
      <div className="game-container">
        <PositionSelector />

        <GameScore />
      </div>
    </GameProvider>
  );
}

export default GamePage;
