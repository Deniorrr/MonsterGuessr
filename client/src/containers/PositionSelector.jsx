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
import { Grid, Box, Typography } from "@mui/material";

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
  const [answerConfirmed, setAnswerConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        if (answerConfirmed) return;
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
    setAnswerConfirmed(false);
    setMarkerPosition(null);
    setShowSolution(false);
    setPolylineCoords([]);
    nextQuestion();
    //selectQuestion();
  };

  const guess = () => {
    setAnswerConfirmed(true);
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
    setIsLoading(true);
    setSelectedRegion(region);
    setLayerIndex(0);
    setSelectedLayer(region.maps[0]);
  };

  const switchLayers = (index) => {
    setIsLoading(true);
    setLayerIndex(index);
    setSelectedLayer(selectedRegion.maps[index]);
  };

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const renderSolution = () => {
    return (
      <Marker position={question.location} className="pointer">
        <Popup>Answer</Popup>
      </Marker>
    );
  };
  return (
    <Grid container style={{ height: "100%", zIndex: 1 }}>
      <Grid row item xs={9}>
        {isLoading ? (
          <Box className="loading-text">
            <Typography>Loading...</Typography>
          </Box>
        ) : null}
        <MapContainer
          center={[4.5, 8]}
          zoom={zoom_level}
          scrollWheelZoom={true}
          minZoom={7}
          maxZoom={9}
          maxBounds={bounds}
        >
          <ImageOverlay
            url={selectedLayer}
            bounds={bounds}
            eventHandlers={{ load: handleMapLoad }}
          />
          <LocationMarker />
          {showSolution && renderSolution()}
          {polylineCoords.length > 0 && (
            <Polyline positions={polylineCoords} color="blue" />
          )}
        </MapContainer>
      </Grid>
      <Grid row item xs={3} className="aside-bar">
        <GameNavbar
          guess={guess}
          question={question}
          selectedRegion={selectedRegion}
          resetMap={resetMap}
          switchMaps={switchMaps}
          switchLayers={switchLayers}
          markerPosition={markerPosition}
        />
      </Grid>
    </Grid>
  );
}

export default PositionSelector;

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
