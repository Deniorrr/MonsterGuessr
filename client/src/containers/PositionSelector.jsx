import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import maps from "../data/mapImages";
import screenshotsData from "../assets/screenshots/screenshotsData";
import PropTypes from "prop-types";

PositionSelector.propTypes = {
  guessPosition: PropTypes.func.isRequired,
};

function PositionSelector(props) {
  const guessPosition = props.guessPosition;
  const [markerPosition, setMarkerPosition] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(
    maps.MHW.ancient_forest.maps[0]
  );
  const [selectedRegion, setSelectedRegion] = useState(maps.MHW.ancient_forest);
  const [layerIndex, setLayerIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const bounds = [
    [0, 0], // Top-left corner
    //[9.79, 11.03], // Bottom-right corner
    [9, 16],
  ];
  const [result, setResult] = useState("");

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

  useEffect(() => {
    selectQuestion();
  }, []);

  const selectQuestion = () => {
    const randomIndex = Math.floor(Math.random() * screenshotsData.length);
    const question = screenshotsData[randomIndex];
    setQuestion(question);
  };

  const resetMap = () => {
    setMarkerPosition(null);
    setShowSolution(false);
    setPolylineCoords([]);
    setResult("");
    selectQuestion();
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
              <div>
                {regionData.maps.map((map, index) => {
                  return <p key={index}>Layer {index + 1}</p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
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

    const distance = Math.sqrt(
      Math.pow(markerPosition.lat - solution.lat, 2) +
        Math.pow(markerPosition.lng - solution.lng, 2)
    );
    setPolylineCoords([markerPosition, solution]);
    let result = `The distance is ${distance}`;
    result +=
      layerIndex + 1 == question.layer ? "Correct Layer" : "Incorrect Layer";
    result +=
      selectedRegion.name == question.mapName ? "Correct Map" : "Incorrect Map";
    setResult(result);
    setShowSolution(true);
  };

  const switchLayers = (index) => {
    setLayerIndex(index);
    setSelectedLayer(selectedRegion.maps[index]);
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

  const switchMaps = (region) => {
    setSelectedRegion(region);
    setLayerIndex(0);
    setSelectedLayer(region.maps[0]);
  };

  const renderSolution = () => {
    return (
      <Marker position={question.location} className="pointer">
        <Popup>Gold Rathian</Popup>
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
      <div className="right">
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
      </div>
    </div>
  );
}

export default PositionSelector;

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
