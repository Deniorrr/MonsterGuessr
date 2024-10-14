import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import maps from "../data/mapImages";

import GameNavbar from "./GameNavbar";
import PropTypes from "prop-types";

PositionSelector.propTypes = {
  guessPosition: PropTypes.func.isRequired,
  question: PropTypes.object,
  nextQuestion: PropTypes.func.isRequired,
};

function PositionSelector(props) {
  const guessPosition = props.guessPosition;
  const nextQuestion = props.nextQuestion;
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(
    maps.MHW.ancient_forest.maps[0]
  );
  const [selectedRegion, setSelectedRegion] = useState(maps.MHW.ancient_forest);
  const [layerIndex, setLayerIndex] = useState(0);
  //const [question, setQuestion] = useState(null);
  const question = props.question;
  const bounds = [
    [0, 0], // Top-left corner
    //[9.79, 11.03], // Bottom-right corner
    [9, 16],
  ];

  const zoom_level = 7;

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng);
        setMarkerPosition(e.latlng);
      },
    });

    return markerPosition === null ? null : (
      <Marker position={markerPosition}>
        <Popup>
          Coordinates: {markerPosition.lat}, {markerPosition.lng}
        </Popup>
      </Marker>
    );
  };

  const resetMap = () => {
    setMarkerPosition(null);
    setShowSolution(false);
    setPolylineCoords([]);
    nextQuestion();
    //selectQuestion();
  };

  const guess = () => {
    const selectedPosition = {
      markerPosition,
      region: selectedRegion.name,
      layer: layerIndex + 1,
    };
    guessPosition(selectedPosition, question); //props
    //showResult(); // local or child component

    const solution = question.location;

    // const distance = Math.sqrt(
    //   Math.pow(markerPosition.lat - solution.lat, 2) +
    //     Math.pow(markerPosition.lng - solution.lng, 2)
    // );
    setPolylineCoords([markerPosition, solution]);
    setShowSolution(true);
  };

  const switchMaps = (region) => {
    setSelectedRegion(region);
    setLayerIndex(0);
    setSelectedLayer(region.maps[0]);
  };

  const switchLayers = (index) => {
    setLayerIndex(index);
    setSelectedLayer(selectedRegion.maps[index]);
  };

  const renderSolution = () => {
    return (
      <Marker position={question.location} className="pointer">
        <Popup>Answer</Popup>
      </Marker>
    );
  };
  return (
    <div>
      <MapContainer
        center={[4.5, 8]}
        zoom={zoom_level}
        scrollWheelZoom={true}
        minZoom={7}
        maxZoom={9}
        maxBounds={bounds}
      >
        <ImageOverlay url={selectedLayer} bounds={bounds} />
        <LocationMarker />
        {showSolution && renderSolution()}
        {polylineCoords.length > 0 && (
          <Polyline positions={polylineCoords} color="blue" />
        )}
      </MapContainer>
      <GameNavbar
        guess={guess}
        question={question}
        selectedRegion={selectedRegion}
        resetMap={resetMap}
        switchMaps={switchMaps}
        switchLayers={switchLayers}
        markerPosition={markerPosition}
      />
    </div>
  );
}

export default PositionSelector;

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
