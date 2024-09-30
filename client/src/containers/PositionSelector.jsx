import mapImage from "../assets/map.png";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const position = [0, 0];

function PositionSelector() {
  return (
    <div>
      XD
      <MapContainer center={position} zoom={300} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={mapImage}
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default PositionSelector;
