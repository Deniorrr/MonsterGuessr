import PropTypes from "prop-types";
import maps from "../data/mapImages";
import { useState } from "react";

GameNavbar.propTypes = {
  guess: PropTypes.func.isRequired,
  question: PropTypes.object,
  selectedRegion: PropTypes.object,
  resetMap: PropTypes.func.isRequired,
  switchMaps: PropTypes.func.isRequired,
  switchLayers: PropTypes.func.isRequired,
  markerPosition: PropTypes.object,
};

function GameNavbar(props) {
  const guess = props.guess;
  const question = props.question;
  const selectedRegion = props.selectedRegion;
  const resetMap = props.resetMap;
  const switchMaps = props.switchMaps;
  const switchLayers = props.switchLayers;
  const markerPosition = props.markerPosition;

  const [hasGuessed, setHasGuessed] = useState(false);

  const guessHandler = () => {
    setHasGuessed(true);
    guess();
  };

  const nextHandler = () => {
    setHasGuessed(false);
    resetMap();
  };

  const renderQuestion = () => {
    if (question == null) return null;
    return (
      <figure>
        <img
          src={`/src/assets/screenshots/${question.screenName}`}
          alt="question"
        />
      </figure>
    );
  };

  const generateMapsNavigation = () => {
    return (
      <div>
        {Object.keys(maps.MHW).map((region) => {
          const regionData = maps.MHW[region];
          return (
            <div key={region}>
              <button onClick={() => switchMaps(regionData)}>
                {maps.MHW[region].name}
              </button>
              {/* <div>
                {regionData.maps.map((map, index) => {
                  return <p key={index}>Layer {index + 1}</p>;
                })}
              </div> */}
            </div>
          );
        })}
      </div>
    );
  };

  const generateLayersNavigation = () => {
    return (
      <div>
        {Array.from({ length: selectedRegion.maps.length }, (_, index) => (
          <button key={index} onClick={() => switchLayers(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <nav className="right">
      {renderQuestion()}

      {hasGuessed ? (
        <button onClick={() => nextHandler()}>Next</button>
      ) : (
        <button
          onClick={() => {
            guessHandler();
          }}
          disabled={markerPosition == null}
        >
          Guess
        </button>
      )}

      <h3>Region</h3>
      {generateMapsNavigation()}
      <h3>Layer</h3>
      {generateLayersNavigation()}
    </nav>
  );
}

export default GameNavbar;
