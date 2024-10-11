import PositionSelector from "../containers/PositionSelector";
import { useState } from "react";

function GamePage() {
  const guessPosition = (selectedPosition, answer) => {
    const distance = Math.sqrt(
      Math.pow(selectedPosition.markerPosition.lat - answer.location.lat, 2) +
        Math.pow(selectedPosition.markerPosition.lng - answer.location.lng, 2)
    );

    let result = `The distance is ${distance}`;
    result +=
      selectedPosition.layer == answer.layer
        ? "Correct Layer"
        : "Incorrect Layer";
    result +=
      selectedPosition.region == answer.mapName
        ? "Correct Map"
        : "Incorrect Map";
    console.log(result);
  };

  return (
    <div>
      <PositionSelector guessPosition={guessPosition} />
    </div>
  );
}

export default GamePage;
