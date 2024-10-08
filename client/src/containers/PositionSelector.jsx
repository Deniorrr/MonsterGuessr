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

function PositionSelector() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [solutionPosition, setSolutionPosition] = useState(null);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [higherLayer, setHigherLayer] = useState(false);
  const solution = {
    lat: 7.16430194039867,
    lng: 7.800292968750001,
  };
  const [result, setResult] = useState("");

  const zoom_level = 7;
  const bounds = [
    [0, 0], // Top-left corner
    [9.79, 11.03], // Bottom-right corner
  ];

  function LocationMarker() {
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
  }

  const generateMapsNavigation = () => {
    return (
      <div>
        {Object.keys(maps.MHW).map((region) => {
          const regionData = maps.MHW[region];
          return (
            <div key={region}>
              <h4>{region.replace("_", " ")}</h4>
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
    setSolutionPosition(solution);

    const distance = Math.sqrt(
      Math.pow(markerPosition.lat - solution.lat, 2) +
        Math.pow(markerPosition.lng - solution.lng, 2)
    );
    setPolylineCoords([markerPosition, solution]);
    setResult(`The distance is ${distance}`);
  };

  const switchLayers = () => {
    setHigherLayer(!higherLayer);
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
        <ImageOverlay
          url={
            higherLayer
              ? maps.MHW.wildspire_waste.maps[1]
              : maps.MHW.wildspire_waste.maps[0]
          }
          bounds={bounds}
        />
        <LocationMarker />
        {solutionPosition && (
          <Marker position={solutionPosition} className="pointer">
            <Popup>Gold Rathian</Popup>
          </Marker>
        )}
        {polylineCoords.length > 0 && (
          <Polyline positions={polylineCoords} color="blue" />
        )}
      </MapContainer>
      <div className="right">
        <p>Where Gold Rathian?</p>
        {generateMapsNavigation()}
        <button
          disabled={markerPosition === null}
          onClick={() => {
            guess();
          }}
        >
          Guess
        </button>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default PositionSelector;
