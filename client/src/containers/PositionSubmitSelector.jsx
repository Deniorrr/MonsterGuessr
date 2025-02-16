import {
  MapContainer,
  ImageOverlay,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import maps from "../data/mapImages";
import {
  Grid,
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ButtonGroup,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import mapPointer from "../assets/pointer_small.png";
import L from "leaflet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MuiFileInput } from "mui-file-input";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import axios from "axios";

function PositionSubmitSelector() {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedLayer, setSelectedLayer] = useState(
    maps.MHW.ancient_forest.maps[0]
  );
  const customIcon2 = new L.Icon({
    iconUrl: mapPointer,
    iconSize: [50, 68], // Adjust the size as needed
    iconAnchor: [25, 68], // Adjust the anchor point as needed
    popupAnchor: [1, -34], // Adjust the popup anchor point as needed
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
    shadowSize: [68, 68], // Adjust the shadow size as needed
  });

  const [selectedRegion, setSelectedRegion] = useState(maps.MHW.ancient_forest);
  const [layerIndex, setLayerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [easyMode, setEasyMode] = useState(false);
  //const [question, setQuestion] = useState(null);
  const bounds = [
    [0, 0], // Top-left corner
    //[9.79, 11.03], // Bottom-right corner
    [9, 16],
  ];

  const zoom_level = 7;

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
      },
    });

    return markerPosition === null ? null : (
      <Marker position={markerPosition} icon={customIcon2}></Marker>
    );
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("region", selectedRegion.name);
    formData.append("layer", layerIndex + 1);
    formData.append("lat", markerPosition.lat);
    formData.append("lng", markerPosition.lng);
    formData.append("easyMode", easyMode);
    axios
      .post("http://localhost:3001/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const switchMaps = (region) => {
    if (region === selectedRegion) return;
    setIsLoading(true);
    setSelectedRegion(region);
    setLayerIndex(0);
    setSelectedLayer(region.maps[0]);
  };

  const switchLayers = (index) => {
    if (index === layerIndex) return;
    setIsLoading(true);
    setLayerIndex(index);
    setSelectedLayer(selectedRegion.maps[index]);
  };

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const handleSwitchLayers = (layerIndex) => {
    setLayerIndex(layerIndex);
    switchLayers(layerIndex);
  };

  const handleChange = (newRegion) => {
    setLayerIndex(0);
    if (newRegion !== null) {
      const regionData = maps.MHW[newRegion];
      switchMaps(regionData);
      setSelectedRegion(maps.MHW[newRegion]);
    }
  };

  const handleFileSelect = (value) => {
    setFile(value);
  };

  const generateMapsNavigation = () => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography fontWeight={"bold"}>MH World</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ButtonGroup orientation="vertical">
            {Object.keys(maps.MHW).map((region) => {
              return (
                <Button
                  key={region}
                  onClick={() => handleChange(region)}
                  variant={selectedRegion === region ? "contained" : "outlined"}
                >
                  {maps.MHW[region].name}
                </Button>
              );
            })}
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    );
  };

  const generateLayersNavigation = () => {
    return (
      <ButtonGroup variant="outlined">
        {Array.from({ length: selectedRegion.maps.length }, (_, index) => (
          <Button
            key={index}
            onClick={() => handleSwitchLayers(index)}
            variant={layerIndex === index ? "contained" : "outlined"}
          >
            {index + 1}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <div className="game-container">
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
              url={selectedLayer}
              bounds={bounds}
              eventHandlers={{ load: handleMapLoad }}
            />
            <LocationMarker />
          </MapContainer>
        </Grid>
        <Grid row item xs={3} className="aside-bar">
          {
            //FORM
          }
          <Box component={"nav"}>
            <Typography
              variant="h5"
              margin={"10px"}
              marginTop={"2em"}
              textAlign={"center"}
            >
              Screenshot
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <MuiFileInput
                value={file}
                onChange={handleFileSelect}
                placeholder="Insert an image"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InsertDriveFileIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              marginTop={"2em"}
            >
              <Typography variant="h5" margin={"10px"} textAlign={"center"}>
                Easy mode
              </Typography>
              <Checkbox
                onChange={() => {
                  console.log("Switching to ", !easyMode);
                  setEasyMode(!easyMode);
                }}
                checked={easyMode}
              />
            </Box>
            <Typography
              variant="h5"
              margin={"10px"}
              marginTop={"2em"}
              textAlign={"center"}
            >
              Region
            </Typography>
            {generateMapsNavigation()}
            <Typography
              variant="h5"
              margin={"10px"}
              marginTop={"2em"}
              textAlign={"center"}
            >
              Layer
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              {generateLayersNavigation()}
            </Box>

            <Button
              variant="contained"
              style={{ width: "100%", marginTop: "2em" }}
              onClick={() => {
                submitHandler();
              }}
              disabled={markerPosition == null}
            >
              {markerPosition == null ? "Select position" : "Submit"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default PositionSubmitSelector;

//it is possible that each map will have to have the same dimensions
//because the bounds are set to the first map's dimensions and they are not updated when the map is switched
