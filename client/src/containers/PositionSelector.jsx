import {
  MapContainer,
  ImageOverlay,
  Marker,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import maps from "../data/mapImages";
import GameNavbar from "./GameNavbar";
import PropTypes from "prop-types";
import { Grid, Box, Typography } from "@mui/material";
import mapPointer from "../assets/pointer_small.png";
import mapPointer2 from "../assets/pointer_small2.png";
import L from "leaflet";

PositionSelector.propTypes = {
  guessPosition: PropTypes.func.isRequired,
  question: PropTypes.object,
  nextQuestion: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool,
};

function PositionSelector(props) {
  const guessPosition = props.guessPosition;
  const nextQuestion = props.nextQuestion;
  const isLastQuestion = props.isLastQuestion;
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(
    maps.MHW.ancient_forest.maps[0]
  );
  const customIcon = new L.Icon({
    iconUrl: mapPointer,
    iconSize: [50, 68], // Adjust the size as needed
    iconAnchor: [25, 68], // Adjust the anchor point as needed
    popupAnchor: [1, -34], // Adjust the popup anchor point as needed
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    shadowSize: [68, 68], // Adjust the shadow size as needed
  });

  const customIcon2 = new L.Icon({
    iconUrl: mapPointer2,
    iconSize: [50, 68], // Adjust the size as needed
    iconAnchor: [25, 68], // Adjust the anchor point as needed
    popupAnchor: [1, -34], // Adjust the popup anchor point as needed
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    shadowSize: [68, 68], // Adjust the shadow size as needed
  });

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
      <Marker position={markerPosition} icon={customIcon2}></Marker>
    );
  };

  const resetMap = () => {
    nextQuestion();
    if (isLastQuestion) return;
    setAnswerConfirmed(false);
    setMarkerPosition(null);
    setShowSolution(false);
    setPolylineCoords([]);
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

  const getCorrectLayer = () => {
    let mapName = question.mapName.replace(/ /g, "_").toLowerCase(); // to lowercase and replace spaces with underscores
    const rightRegion = maps.MHW[mapName];

    return rightRegion.maps[question.layer - 1];
  };

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const renderSolution = () => {
    return (
      <Marker
        position={question.location}
        className="pointer"
        icon={customIcon}
      ></Marker>
    );
  };
  return (
    <Grid container style={{ height: "100%" }}>
      <Grid row item xs={9}>
        {isLoading ? (
          <Box className="loading-text">
            <Typography variant="h5">Loading...</Typography>
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
            url={showSolution ? getCorrectLayer() : selectedLayer}
            bounds={bounds}
            eventHandlers={{ load: handleMapLoad }}
          />
          <LocationMarker />
          {showSolution && renderSolution()}
          {polylineCoords.length > 0 && (
            <Polyline positions={polylineCoords} color="#11b8c7" />
          )}
        </MapContainer>
      </Grid>
      <Grid row item xs={3} className="aside-bar">
        <GameNavbar
          guess={guess}
          layer={layerIndex}
          question={question}
          selectedRegion={selectedRegion}
          resetMap={resetMap}
          switchMaps={switchMaps}
          switchLayers={switchLayers}
          markerPosition={markerPosition}
          isLastQuestion={isLastQuestion}
        />
      </Grid>
    </Grid>
  );
}

export default PositionSelector;

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
