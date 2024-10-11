import React from "react";

function GameNavbar() {
  return (
    <nav className="right">
      {renderQuestion()}
      {generateMapsNavigation()}
      {generateLayersNavigation()}
      <button
        disabled={markerPosition === null}
        onClick={() => {
          guess();
        }}
      >
        Guess
      </button>
      <button onClick={() => resetMap()}>Next</button>

      <p>{result}</p>
    </nav>
  );
}

export default GameNavbar;
