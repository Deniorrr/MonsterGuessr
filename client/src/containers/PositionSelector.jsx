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
  const [selectedLayer, setSelectedLayer] = useState(
    maps.MHW.ancient_forest.maps[0]
  );
  const [selectedRegion, setSelectedRegion] = useState(maps.MHW.ancient_forest);
  const [layerIndex, setLayerIndex] = useState(0);
  const [layerAmount, setLayerAmount] = useState(3);
  const [solution, setSolution] = useState({
    lat: 7.16430194039867,
    lng: 7.800292968750001,
  });
  const [bounds, setBounds] = useState([
    [0, 0], // Top-left corner
    //[9.79, 11.03], // Bottom-right corner
    [9, 16],
  ]);
  const [center, setCenter] = useState([4.5, 8]);
  // const solution = {
  //   lat: 7.16430194039867,
  //   lng: 7.800292968750001,
  // };
  const [result, setResult] = useState("");

  const zoom_level = 7;

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
              <button onClick={() => switchMaps(regionData)}>
                {region.replace("_", " ")}
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
    setSolutionPosition(solution);

    const distance = Math.sqrt(
      Math.pow(markerPosition.lat - solution.lat, 2) +
        Math.pow(markerPosition.lng - solution.lng, 2)
    );
    setPolylineCoords([markerPosition, solution]);
    setResult(`The distance is ${distance}`);
  };

  const switchLayers = (index) => {
    setLayerIndex(index);
    setSelectedLayer(selectedRegion.maps[index]);
  };

  const generateLayersNavigation = () => {
    return (
      <div>
        {Array.from({ length: layerAmount }, (_, index) => (
          <button key={index} onClick={() => switchLayers(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  const switchMaps = (region) => {
    console.log(region);
    setSelectedRegion(region);
    setSelectedLayer(region.maps[0]);
    setLayerAmount(region.maps.length);
    setBounds([
      [0, 0],
      [region.ratio.height, region.ratio.width],
    ]);
    setCenter([region.ratio.height / 2, region.ratio.width / 2]);
  };
  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom_level}
        scrollWheelZoom={true}
        minZoom={7}
        maxZoom={9}
        maxBounds={bounds}
      >
        <ImageOverlay url={selectedLayer} bounds={bounds} />
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
        {generateLayersNavigation()}
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

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
